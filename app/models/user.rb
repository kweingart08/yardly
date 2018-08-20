class User

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
        users.*,
        jobs.id AS open_job_id,
        jobs.services_id,
        jobs.requested_user_id,
        services.service_type,
        services.service_price,
        services.employee_id AS hired_employee_id,
        employees.id AS hired_id,
        employees.user_id AS hired_employee_user_id,
        workers.id AS worker_id,
        workers.username AS hired_employee_name,
        reviews.id AS review_id,
        reviews.user_id AS reviewer_id,
        reviews.employee_id AS reviewed_employee_id,
        reviews.review_notes,
        reviews.rating,
        reviewed_person_name.username AS reviewed_person_name
      FROM users
      LEFT JOIN jobs
        ON users.id = jobs.requested_user_id
      LEFT JOIN services
        ON jobs.services_id = services.id
      LEFT JOIN employees
        ON services.employee_id = employees.id
      LEFT JOIN users AS workers
        ON employees.user_id = workers.id
      LEFT JOIN reviews
        ON users.id = reviews.user_id
      LEFT JOIN employees AS reviewed_employee
        ON reviews.employee_id = reviewed_employee.id
      LEFT JOIN users AS reviewed_person_name
        ON reviewed_employee.user_id = reviewed_person_name.id
      ORDER BY users.id ASC;
      SQL
    )
    users = []
    last_user_id = nil
    results.each do |result|
      if result["id"] != last_user_id
        users.push(
          {
            "user_id" => result["id"].to_i,
            "username" => result["username"],
            "password" => result["password"],
            "address" => result["address"],
            "open_requests" => [],
            "reviews_written" => []
          }
        )
        last_user_id = result["id"]
      end
      if result["open_job_id"]
        new_request = {
          "job_id" => result["open_job_id"].to_i,
          "service_type" => result["service_type"],
          "service_price" => result["service_price"].to_f,
          "workers_name" => result["hired_employee_name"]
        }
        users.last["open_requests"].push(new_request)
      end
      if result["review_id"]
        new_review = {
          "review_id" => result["review_id"].to_i,
          "reviewer_id" => result["reviewer_id"].to_i,
          "reviewed_employee_id" => result["reviewed_employee_id"].to_i,
          "employees_name" => result["reviewed_person_name"],
          "review" => result["review_notes"],
          "review_rating" => result["rating"]
        }
        users.last["reviews_written"].push(new_review)
      end
    end
    return users
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec(
      <<-SQL
      SELECT
        users.*,
        reviews.id AS review_id,
        reviews.user_id AS reviewer_id,
        reviews.employee_id AS reviewed_employee_id,
        reviews.review_notes,
        reviews.rating,
        employees.id AS worker_id,
        employees.user_id AS worker_user_id,
        persons.username AS employees_name
      FROM users
      LEFT JOIN reviews
        ON users.id = reviews.user_id
      LEFT JOIN employees
        ON reviews.employee_id = employees.id
      LEFT JOIN users AS persons
        ON employees.user_id = persons.id
      WHERE users.id=#{id};
      SQL
    )
    reviews_written = []
    results.each do |result|
      if result["review_id"]
        reviews_written.push({
          "review_id" => result["review_id"].to_i,
          "reviewer_id" => result["reviewer_id"].to_i,
          "reviewed_employee_id" => result["reviewed_employee_id"].to_i,
          "employees_name" => result["employees_name"],
          "review" => result["review_notes"],
          "review_rating" => result["rating"]
          })
      end
    end

    result=results.first
    return {
      "user_id" => result["id"].to_i,
      "username" => result["username"],
      "password" => result["password"],
      "address" => result["address"],
      "reviews_written" => reviews_written
    }
  end

  # create new user
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO users (username, password, address)
        VALUES ('#{opts["username"]}', '#{opts["password"]}', '#{opts["address"]}')
        RETURNING id, username, password, address;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "username" => result["username"],
      "password" => result["password"],
      "address" => result["address"]
    }
  end

  # delete one user by id
  def self.delete(id)
    results = DB.exec("DELETE FROM users WHERE id=#{id};")
    return {"deleted" => true}
  end

  # update user information by id
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE users
        SET username='#{opts["username"]}', password='#{opts["password"]}', address='#{opts["address"]}'
        WHERE id = #{id}
        RETURNING id, username, password, address;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "username" => result["username"],
      "password" => result["password"],
      "address" => result["address"]
    }
  end



end
