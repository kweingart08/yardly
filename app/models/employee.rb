class Employee

  # ==================================================
  #                      SET UP
  # ==================================================
  # connect to postgres
  if(ENV['DATABASE_URL'])
     uri = URI.parse(ENV['DATABASE_URL'])
     DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  else
     DB = PG.connect(host: "localhost", port: 5432, dbname: 'yardly_development')
  end

  # ==================================================
  #                      ROUTES
  # ==================================================

  # get all
  def self.all
    results = DB.exec(
      <<-SQL
      SELECT
        employees.*,
        users.id AS employee_user_id,
        users.username AS employee_username,
        users.password AS employee_password,
        users.address AS employee_address,
        services.id AS service_id,
        services.service_type,
        services.service_price,
        reviews.id AS review_id,
        reviews.user_id AS reviewer_id,
        reviews.employee_id AS employee_reviewed_id,
        reviews.review_notes,
        reviews.rating,
        reviewers.username AS reviewer_name
      FROM employees
      LEFT JOIN users
        ON employees.user_id = users.id
      LEFT JOIN services
        ON employees.id = services.employee_id
      LEFT JOIN reviews
        ON employees.id = reviews.employee_id
      LEFT JOIN users AS reviewers
        ON reviews.user_id = reviewers.id
      ORDER BY employees.id ASC;
      SQL
    )
    results.each do |result|
      p result
    end
    employees = []
    last_employee_id = nil;
    service_id_list = []
    reviews_id_list = []
    results.each do |result|
      if result["id"] != last_employee_id
        employee = {
          "employee_id" => result["id"].to_i,
          "user_id" => result["employee_user_id"].to_i,
          "employee_name" => result["employee_username"],
          "employee_password" => result["employee_password"],
          "employee_address" => result["employee_address"],
          "services" => [],
          "reviews" => []
        }
        employees.push(employee)
        last_employee_id = result["id"]
      end
      if service_id_list.include?(result["service_id"])
      else
        employees.last["services"].push({
          "service_type" => result["service_type"],
          "service_price" => result["service_price"].to_f,
          })
        service_id_list.push(result["service_id"])
      end
      if result["review_id"]
        if reviews_id_list.include?(result["review_id"])
        else
          employees.last["reviews"].push({
            "review" => result["review_notes"],
            "rating" => result["rating"],
            "reviewers_name" => result["reviewer_name"]
            })
          reviews_id_list.push(result["review_id"])
        end
      end
    end
    return employees
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT
          employees.*,
          users.id AS person_id,
          users.username,
          users.password,
          users.address
        FROM employees
        LEFT JOIN users
        ON employees.user_id = users.id
        WHERE employees.id = #{id};
      SQL
    )
    result = results.first
    return {
      "employee_id" => result["id"].to_i,
      "user_id" => result["person_id"].to_i,
      "username" => result["username"],
      "password" => result["password"],
      "address" => result["address"]
    }
  end

  # create new user
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO employees (user_id)
        VALUES (#{opts["user_id"]})
        RETURNING id, user_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i
    }
  end

  # delete one user by id
  def self.delete(id)
    results = DB.exec("DELETE FROM employees WHERE id=#{id};")
    return {"deleted" => true}
  end

  # update user information by id
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE employees
        SET user_id=#{opts["user_id"]}
        WHERE id = #{id}
        RETURNING id, user_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i
    }
  end

end
