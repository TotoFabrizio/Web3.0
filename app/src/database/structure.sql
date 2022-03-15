    DROP DATABASE IF EXISTS web3_0;
    CREATE DATABASE web3_0;
    USE web3_0;
    CREATE TABLE users(
        id INT(10) AUTO_INCREMENT NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL,
        walletaddress VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );
    INSERT INTO
        users
    VALUES(
        DEFAULT,
        "tomas.fabrizio02@gmail.com",
        "toto fabrizio",
        "0x24f7AF0FB4E5F5CA059C554a54Ea074F0cA67a62"
    );