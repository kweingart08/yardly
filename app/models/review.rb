class Review

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
    results = DB.exec("SELECT * FROM reviews;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "user_id" => result["user_id"].to_i,
        "employee_id" => result["employee_id"].to_i,
        "review_notes" => result["review_notes"],
        "rating" => result["rating"].to_i
      }
    end
  end

  #get one (by id)
  def self.find(id)
    results = DB.exec("SELECT * FROM reviews WHERE id=#{id};")
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i,
      "employee_id" => result["employee_id"].to_i,
      "review_notes" => result["review_notes"],
      "rating" => result["rating"].to_i
    }
  end

  # create new user
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO reviews (user_id, employee_id, review_notes, rating)
        VALUES (#{opts["user_id"]}, #{opts["employee_id"]}, '#{opts["review_notes"]}', #{opts["rating"]})
        RETURNING id, user_id, employee_id, review_notes, rating;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i,
      "employee_id" => result["employee_id"].to_i,
      "review_notes" => result["review_notes"],
      "rating" => result["rating"].to_i
    }
  end

  # delete one user by id
  def self.delete(id)
    results = DB.exec("DELETE FROM reviews WHERE id=#{id};")
    return {"deleted" => true}
  end

  # update user information by id
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE reviews
        SET user_id=#{opts["user_id"]}, employee_id=#{opts["employee_id"]}, review_notes='#{opts["review_notes"]}', rating=#{opts["rating"]}
        WHERE id = #{id}
        RETURNING id, user_id, employee_id, review_notes, rating;
      SQL
    )
    result = results.first
    return {
      "id" => result["id"].to_i,
      "user_id" => result["user_id"].to_i,
      "employee_id" => result["employee_id"].to_i,
      "review_notes" => result["review_notes"],
      "rating" => result["rating"]
    }
  end



end
