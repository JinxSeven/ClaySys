﻿IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users')
BEGIN
    CREATE TABLE Users
    (
        id INT IDENTITY(101, 1) PRIMARY KEY,
        userName VARCHAR(25) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );
END;