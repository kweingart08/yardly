class Service

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
    results = DB.exec("SELECT * FROM services;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "service_type" => result["service_type"],
        "service_price" => result["service_price"].to_f,
        "employee_id" => result["employee_id"].to_i
      }
    end
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec("SELECT * FROM services WHERE id=#{id};")
    result = results.first
    return {
      "id" => result["id"].to_i,
      "service_type" => result["service_type"],
      "service_price" => result["service_price"].to_f,
      "employee_id" => result["employee_id"].to_i
    }
  end

  # create new user
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO services (service_type, service_price, employee_id)
        VALUES ('#{opts["service_type"]}', #{opts["service_price"]}, #{opts["employee_id"]})
        RETURNING id, service_type, service_price, employee_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "service_type" => result["service_type"],
      "service_price" => result["service_price"].to_f,
      "employee_id" => result["employee_id"].to_i
    }
  end

  # delete one user by id
  def self.delete(id)
    results = DB.exec("DELETE FROM services WHERE id=#{id};")
    return {"deleted" => true}
  end

  # update user information by id
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE services
        SET service_type='#{opts["service_type"]}', service_price=#{opts["service_price"]}, employee_id=#{opts["employee_id"]}
        WHERE id = #{id}
        RETURNING id, service_type, service_price, employee_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "service_type" => result["service_type"],
      "service_price" => result["service_price"].to_f,
      "employee_id" => result["employee_id"].to_i
    }
  end



end
