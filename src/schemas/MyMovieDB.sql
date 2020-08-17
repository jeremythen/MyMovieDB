CREATE TABLE IF NOT EXISTS `movies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(50),
  `year` int,
  `time` int,
  `lang` varchar(50),
  `country` varchar(50),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS `actors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(50),
  `last_name` varchar(50)
);

CREATE TABLE IF NOT EXISTS `directors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(50),
  `last_name` varchar(50)
);

CREATE TABLE IF NOT EXISTS `movie_casts` (
  `actor_id` int,
  `movie_id` int,
  `role` varchar(50),
  PRIMARY KEY (`actor_id`, `movie_id`)
);

CREATE TABLE IF NOT EXISTS `movie_direction` (
  `director_id` int,
  `movie_id` int,
  PRIMARY KEY (`director_id`, `movie_id`)
);

CREATE TABLE IF NOT EXISTS `genres` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` ENUM ('ACTION', 'ADVENTURE', 'COMEDY', 'CRIME', 'DRAMA', 'FANTASY', 'HISTORICAL', 'HORROR', 'ROMANCE', 'SAGA', 'SOCIAL', 'THRILLER', 'URBAN', 'MYSTERY', 'POLITICAL', 'MAGICAL_REALISM', 'PHILOSOPHICAL', 'SPECULATIVE', 'WESTERN', 'PARANOID_FICTION', 'HISTORICAL_FICTION', 'ABSURDIST', 'SURREAL', 'WHIMSICAL')
);

CREATE TABLE IF NOT EXISTS `movie_genre` (
  `movie_id` int,
  `genre_id` int
);

CREATE TABLE IF NOT EXISTS `ratings` (
  `movie_id` int,
  `reviewer_id` int,
  `reviewer_stars` int2
);

CREATE TABLE IF NOT EXISTS `reviewers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50)
);

ALTER TABLE `movie_casts` ADD FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`);

ALTER TABLE `movie_casts` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

ALTER TABLE `movie_genre` ADD FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`);

ALTER TABLE `movie_direction` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

ALTER TABLE `movie_direction` ADD FOREIGN KEY (`director_id`) REFERENCES `directors` (`id`);

ALTER TABLE `movie_genre` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

ALTER TABLE `ratings` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`);

ALTER TABLE `ratings` ADD FOREIGN KEY (`reviewer_id`) REFERENCES `reviewers` (`id`);

INSERT INTO movies (`title`, `year`, `time`, `lang`, `country`) VALUES ('My first movie', 2020, 120, 'ENG', 'DR');

INSERT INTO actors (`first_name`, `last_name`) VALUES ('Jeremy', 'Then');

INSERT INTO directors (`first_name`, `last_name`) VALUES ('Jeremy', 'Then');

INSERT INTO movie_casts (`actor_id`, `movie_id`) VALUES (1, 1);

INSERT INTO movie_direction (`director_id`, `movie_id`) VALUES (1, 1);

INSERT INTO genres (`title`) VALUES ('ACTION');
INSERT INTO genres (`title`) VALUES ('ADVENTURE');
INSERT INTO genres (`title`) VALUES ('COMEDY');
INSERT INTO genres (`title`) VALUES ('CRIME');
INSERT INTO genres (`title`) VALUES ('DRAMA');
INSERT INTO genres (`title`) VALUES ('FANTASY');
INSERT INTO genres (`title`) VALUES ('HISTORICAL');
INSERT INTO genres (`title`) VALUES ('HORROR');

INSERT INTO movie_genre (`movie_id`, `genre_id`) VALUES (1, 1);

INSERT INTO reviewers (`name`) VALUES ('Jeremy Then S.');

INSERT INTO ratings (`movie_id`, `reviewer_id`, `reviewer_stars`) VALUES (1, 1, 5);
