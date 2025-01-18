-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`countries` (
`country_id` unsigned BIGINT(20) NOT NULL AUTO_INCREMENT,
`country_name` VARCHAR(255) NULL DEFAULT NULL,
`country_code` VARCHAR(255) NULL DEFAULT NULL,
PRIMARY KEY (`country_id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `full-stack-ecommerce`.`product_category`
-- -----------------------------------------------------


CREATE TABLE IF NOT EXISTS `full-stack-ecommerce`.`states` (
`country_id` unsigned SMALLINT(20) NOT NULL,
`state_id`  unsigned SMALLINT NOT NULL DEFAULT NULL AUTO_INCREMENT,
`state_name` VARCHAR(255) NULL DEFAULT NULL,
`state_code` VARCHAR(255) NULL DEFAULT NULL,
PRIMARY KEY (`state_id`),
KEY `fk_category` (`country_id`),
CONSTRAINT `fk_category` FOREIGN KEY (`country_id`) REFERENCES `countries` (`country_id`)
)
ENGINE=InnoDB
AUTO_INCREMENT = 1;
-- -----------------------------------------------------
-- Insert Values into countries table
-- -----------------------------------------------------


Insert into Countries values 
(1,'India','IN'),
(2,'United States','US'),
(3,'Brazil','BR');

-- -----------------------------------------------------
-- Insert Values into states table
-- -----------------------------------------------------


Insert into states values 
(1,1,'Andhra Pradesh','AP'),
(1,2,'Gujarat','GJ'),
(1,3,'Haryana','HR'),
(1,4,'Uttar Pradesh','UP'),
(1,5,'Karnataka','KT')
;