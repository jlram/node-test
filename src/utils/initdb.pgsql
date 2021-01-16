-- Drops post table
DROP TABLE IF EXISTS like_post;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS custom_user;

-- Creates user table
CREATE TABLE IF NOT EXISTS custom_user (
    id SERIAL PRIMARY KEY, 
    name varchar(50) NOT NULL, 
    surname varchar(50) NOT NULL
);

-- Creates post table
CREATE TABLE IF NOT EXISTS post (
    id SERIAL PRIMARY KEY,
    title varchar(50) NOT NULL, 
    content varchar(50) NOT NULL
);

CREATE TABLE like_post (
  post_id    int REFERENCES post (id) ON UPDATE CASCADE ON DELETE CASCADE
, user_id int REFERENCES custom_user (id) ON UPDATE CASCADE
, CONSTRAINT like_pkey PRIMARY KEY (post_id, user_id)  -- explicit pk
);

 INSERT INTO custom_user( name, surname ) VALUES( 'Jose Luis', 'Ramos');