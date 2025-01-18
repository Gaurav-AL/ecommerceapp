CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`users` (
`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
`first_name` VARCHAR(255) DEFAULT NOT NULL,
`last_name` VARCHAR(255) DEFAULT NOT NULL,
`middle_name` VARCHAR(255) DEFAULT NULL,
`date_of_birth` VARCHAR(255) DEFAULT NULL,
`email` VARCHAR(255) DEFAULT NOT NULL,
`contact_no` INT(11) DEFAULT NOT NULL,
`date_created` DATETIME(6) DEFAULT NULL,
`last_updated` DATETIME(6) DEFAULT NULL,
PRIMARY KEY (`id`),
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;

/*Similar Postgres Query */

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    date_of_birth DATE,
    email VARCHAR(255) NOT NULL,
    contact_no BIGINT NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
