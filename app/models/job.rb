class Job

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
    results = DB.exec("SELECT * FROM jobs;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "services_id" => result["services_id"].to_i,
        "requested_user_id" => result["requested_user_id"].to_i
      }
    end
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec("SELECT * FROM jobs WHERE id=#{id};")
    result = results.first
    return {
      "id" => result["id"].to_i,
      "services_id" => result["services_id"].to_i,
      "requested_user_id" => result["requested_user_id"].to_i
    }
  end

  # create new user
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO jobs (services_id, requested_user_id)
        VALUES (#{opts["services_id"]}, #{opts["requested_user_id"]})
        RETURNING id, services_id, requested_user_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "services_id" => result["services_id"].to_i,
      "requested_user_id" => result["requested_user_id"].to_i
    }
  end

  # delete one user by id
  def self.delete(id)
    results = DB.exec("DELETE FROM jobs WHERE id=#{id};")
    return {"deleted" => true}
  end

  # update user information by id
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE jobs
        SET services_id=#{opts["services_id"]}, requested_user_id=#{opts["requested_user_id"]}
        WHERE id = #{id}
        RETURNING id, services_id, requested_user_id;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "services_id" => result["services_id"].to_i,
      "requested_user_id" => result["requested_user_id"].to_i
    }
  end



end
