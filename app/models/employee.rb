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
        jobs.id AS job_id,
        jobs.services_id,
        jobs.requested_user_id,
        job_requester.username AS requester_name,
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
      LEFT JOIN jobs
        ON services.id = jobs.services_id
      LEFT JOIN users AS job_requester
        ON jobs.requested_user_id = job_requester.id
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
    open_jobs_id_list = []
    results.each do |result|
      if result["id"] != last_employee_id
        employee = {
          "employee_id" => result["id"].to_i,
          "user_id" => result["employee_user_id"].to_i,
          "employee_name" => result["employee_username"],
          "employee_password" => result["employee_password"],
          "employee_address" => result["employee_address"],
          "services" => [],
          "reviews" => [],
          "open_jobs" => []
        }
        employees.push(employee)
        last_employee_id = result["id"]
      end
      if service_id_list.include?(result["service_id"])
      else
        employees.last["services"].push({
          "service_id" => result["service_id"].to_i,
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
      if result["job_id"]
        if open_jobs_id_list.include?(result["job_id"])
        else
          employees.last["open_jobs"].push({
            "job_id" => result["job_id"].to_i,
            "service_type" => result["service_type"],
            "service_price" => result["service_price"].to_f,
            "requester_name" => result["requester_name"]
            })
          open_jobs_id_list.push(result["job_id"])
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
        users.id AS employee_user_id,
        users.username AS employee_username,
        users.password AS employee_password,
        users.address AS employee_address,
        services.id AS service_id,
        services.service_type,
        services.service_price,
        jobs.id AS job_id,
        jobs.services_id,
        jobs.requested_user_id,
        job_requester.username AS requester_name,
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
      LEFT JOIN jobs
        ON services.id = jobs.services_id
      LEFT JOIN users AS job_requester
        ON jobs.requested_user_id = job_requester.id
      LEFT JOIN reviews
        ON employees.id = reviews.employee_id
      LEFT JOIN users AS reviewers
        ON reviews.user_id = reviewers.id
      WHERE employees.id=#{id};
      SQL
    )
    services = []
    reviews = []
    open_jobs = []

    results.each do |result|
      if result["service_id"]
        services.push({
          "service_id" => result["service_id"].to_i,
          "service_type" => result["service_type"],
          "service_price" => result["service_price"].to_f,
          })
      end

      if result["review_id"]
        reviews.push({
          "review" => result["review_notes"],
          "rating" => result["rating"],
          "reviewers_name" => result["reviewer_name"]
          })
      end

      if result["job_id"]
        open_jobs.push({
          "job_id" => result["job_id"].to_i,
          "service_type" => result["service_type"],
          "service_price" => result["service_price"].to_f,
          "requester_name" => result["requester_name"]
          })
      end

    end

    result = results.first
    return {
      "employee_id" => result["id"].to_i,
      "user_id" => result["employee_user_id"].to_i,
      "employee_name" => result["employee_username"],
      "employee_password" => result["employee_password"],
      "employee_address" => result["employee_address"],
      "services" => services,
      "reviews" => reviews,
      "open_jobs" => open_jobs
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
