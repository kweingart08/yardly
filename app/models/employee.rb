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
    results = DB.exec("SELECT * FROM employees;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "user_id" => result["user_id"].to_i
      }
    end
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec("SELECT * FROM employees WHERE id=#{id};")
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i
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
