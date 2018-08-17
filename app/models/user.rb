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
    results = DB.exec("SELECT * FROM users;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "username" => result["username"],
        "password" => result["password"],
        "address" => result["address"]
      }
    end
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec("SELECT * FROM users WHERE id=#{id};")
    result = results.first
    return {
      "id" => result["id"].to_i,
      "username" => result["username"],
      "password" => result["password"],
      "address" => result["address"]
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
