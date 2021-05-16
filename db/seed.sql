-- DROP TABLE IF EXISTS helo_users;
-- CREATE TABLE helo_users 
-- ( 
--     id serial primary key,
--     username VARCHAR(200) not null, 
--     password VARCHAR(500) not null, 
--     profile_pic text 
-- )

-- DROP TABLE IF EXISTS helo_posts;
-- CREATE TABLE helo_posts 
-- ( 
--     id serial primary key, 
--     title VARCHAR(45) not null, 
--     content TEXT, img text, 
--     author_id INT REFERENCES helo_users(id), 
--     date_created TIMESTAMP 
-- )

 