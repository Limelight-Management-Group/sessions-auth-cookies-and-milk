-- DROP DATABASE IF EXISTS the_jolly_green_giant;

-- CREATE DATABASE the_jolly_green_giant;

-- \c the_jolly_green_giant




DROP TABLE IF EXISTS users;
CREATE TABLE users(
id SERIAL PRIMARY KEY,
username VARCHAR(30) NOT NULL UNIQUE,
password TEXT,
f_name TEXT,
l_name TEXT,
email TEXT,
location TEXT,
age integer
);


DROP TABLE IF EXISTS messages;
CREATE TABLE messages(
id SERIAL PRIMARY KEY,
message TEXT,
sender TEXT
);

-- DROP TABLE IF EXISTS mentorship;
-- CREATE TABLE mentorship(
-- mentors_id INTEGER REFERENCES Users(id),
-- mentees_id INTEGER REFERENCES Users(id)
-- );

-- DROP TABLE IF EXISTS conversation;
-- CREATE TABLE conversation(
-- messages_id INTEGER PRIMARY KEY, 
-- user_one INTEGER ,
-- user_two INTEGER ,
-- FOREIGN KEY (user_one) REFERENCES users(id),
-- FOREIGN KEY (user_two) REFERENCES users(id)
-- );




