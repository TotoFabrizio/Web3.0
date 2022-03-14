    DROP DATABASE IF EXISTS web3_0;
    CREATE DATABASE web3_0;
    USE web3_0;
    CREATE TABLE users(
        id INT(10) AUTO_INCREMENT NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(60) NOT NULL,
        PRIMARY KEY (id)
    );
    INSERT INTO
        users
    VALUES(
        DEFAULT,
        "tomas.fabrizio02@gmail.com",
        "$2a$10$Dg4juHqOZihiPlDd6aUlQuH.LLuQCFYYvMZJQ0sqJmCEzWDcc9cVu"
    ),
    (
        DEFAULT,
        "juanibordil@gmail.com",
        "$2a$10$otJjZB4dcgnt6.G0EAEXeuZJqoMuTlMXUFeRuJnV.wvM3vAyL22bm"
    ),
    (
        DEFAULT,
        'qwe@qwe.com',
        '$2a$10$HWGehePpXekQ9jp2hvyw1eNnE7FMPvRQHpLjGVZYtLyom0xklNnDa'
    );