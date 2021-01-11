USE sql_intro;

/* Table Creations */

CREATE TABLE pokemon_type(
  type VARCHAR(20) NOT NULL PRIMARY KEY
);

CREATE TABLE pokemon(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  type VARCHAR(20),
  height INT,
  weight INT,
  FOREIGN KEY(type) REFERENCES pokemon_type(type)
);

CREATE TABLE town(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20)
);

CREATE TABLE trainer(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  town INT,
  FOREIGN KEY(town) REFERENCES town(id)
);

CREATE TABLE pokemon_trainer(
  p_id INT,
  t_id INT,
  FOREIGN KEY(p_id) REFERENCES pokemon(id),
  FOREIGN KEY(t_id) REFERENCES trainer(id)
);

/* Checks */

/* SELECT * FROM pokemon_trainer; */
/* SELECT * FROM trainer; */
/* SELECT * FROM town; */
/* SELECT * FROM pokemon; */
/* SELECT * FROM pokemon_type; */

/* Retry */

/* DROP TABLE pokemon_trainer;
DROP TABLE trainer;
DROP TABLE town;
DROP TABLE pokemon;
DROP TABLE pokemon_type; */