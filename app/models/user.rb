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




end
