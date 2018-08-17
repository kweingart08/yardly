# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# set up tables
# CREATE TABLE users (id SERIAL, username VARCHAR(16), password VARCHAR(16), address TEXT);
# CREATE TABLE employees (id SERIAL, user_id INT);
# CREATE TABLE services (id SERIAL, service_type VARCHAR(155), service_price DECIMAL, employee_id INT);
# CREATE TABLE reviews (id SERIAL, user_id INT, employee_id INT, review TEXT, rating INT);


# set up data
# INSERT INTO users (username, password, address) VALUES ('kate', 'kate', '100 fake dr, Columbus, Ohio');
# INSERT INTO users (username, password, address) VALUES ('andy', 'andy', '100 fake dr, Columbus, Ohio');
# INSERT INTO users (username, password, address) VALUES ('alex', 'alex', '100 fake dr, Columbus, Ohio');
#
# INSERT INTO employees (user_id) VALUES (1);
# INSERT INTO employees (user_id) VALUES (2);
#
# INSERT INTO services (service_type, service_price, employee_id) VALUES ('Mow Lawn - 1/2Acre', 25.00, 1);
# INSERT INTO services (service_type, service_price, employee_id) VALUES ('Edge Lawn', 12.00, 1);
# INSERT INTO services (service_type, service_price, employee_id) VALUES ('Plant Flowers', 15.00, 1);
#
#
# INSERT INTO services (service_type, service_price, employee_id) VALUES ('Mow Lawn - 1/2Acre', 28.00, 2);
# INSERT INTO services (service_type, service_price, employee_id) VALUES ('Mulch', 15.00, 2);


# INSERT INTO reviews (user_id, employee_id, review, rating) VALUES (1, 2, 'They did such a great job!', 5);
