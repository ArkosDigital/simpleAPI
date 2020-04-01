-- Script for create whale database's tables
-- Whale v1 - Last update 05/02/2020
-- Table People

CREATE TABLE
IF NOT EXISTS People
(
    id varchar
(24) NOT NULL,
    CONSTRAINT People_PK PRIMARY KEY
(id)
);

-- Table People
CREATE TABLE
IF NOT EXISTS BasePeople
(
    id varchar
(24) NOT NULL,
    name varchar NOT NULL,
    CONSTRAINT BasePeople_FK_id FOREIGN KEY
(id) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT BasePeople_PK PRIMARY KEY
(id)
);

-- Table Dependants
CREATE TABLE
IF NOT EXISTS Dependants
(
    id_sponsor varchar
(24) NOT NULL,
    CONSTRAINT Dependants_FK_id_sponsor FOREIGN KEY
(id_sponsor) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT Dependants_FK_id FOREIGN KEY
(id) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT Dependants_PK PRIMARY KEY
(id)
)
INHERITS
(
    BasePeople
);

-- Table Users
CREATE TABLE
IF NOT EXISTS Users
(
    CONSTRAINT Users_FK_id FOREIGN KEY
(id) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT Users_PK PRIMARY KEY
(id)
)
INHERITS
(
    BasePeople
);

-- Table Identifications
CREATE TABLE
IF NOT EXISTS Identifications
(
    id varchar
(24) NOT NULL,
    identification varchar
(300) NOT NULL,
    type VARCHAR NOT NULL,
    CONSTRAINT Identifications_PK PRIMARY KEY
(id),
    CONSTRAINT unique_identification_type UNIQUE
(identification, type)
WITH
(FILLFACTOR = 100),
    CHECK
(TYPE
IN
('LOCAL', 'GOOGLE', 'FACEBOOK'))
);

CREATE TABLE
IF NOT EXISTS People_Identifications
(
    id varchar
(24) NOT NULL,
    id_identification varchar
(24) NOT NULL,
    id_person varchar
(24) NOT NULL,
    CONSTRAINT People_Identifications_PK PRIMARY KEY
(id),
    CONSTRAINT People_Identifications_FK_id_person FOREIGN KEY
(id_person) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT People_Identifications_FK_id_identification FOREIGN KEY
(id_identification) REFERENCES Identifications
(id) ON
DELETE CASCADE
);


CREATE TABLE
IF NOT EXISTS Passwords
(
    id varchar
(24) NOT NULL,
    id_identification varchar
(24) NOT NULL,
    hash varchar
(300) NOT NULL,
    CONSTRAINT Passwords_PK PRIMARY KEY
(id),
    CONSTRAINT Passwords_FK_id_identification FOREIGN KEY
(id_identification) REFERENCES Identifications
(id) ON
DELETE CASCADE
);

CREATE TABLE
IF NOT EXISTS Systems
(
    id varchar
(24) NOT NULL,
    name varchar NOT NULL,
    link varchar NOT NULL,
    CONSTRAINT Systems_PK PRIMARY KEY
(id)
);

CREATE TABLE
IF NOT EXISTS Permissions
(
    id varchar
(24) NOT NULL,
    id_system varchar
(24) NOT NULL,
    id_person varchar
(24) NOT NULL,
    permission json NOT NULL,
    CONSTRAINT Permissions_PK PRIMARY KEY
(id),
    CONSTRAINT Permissions_FK_id_person FOREIGN KEY
(id_person) REFERENCES People
(id) ON
DELETE CASCADE,
    CONSTRAINT Permissions_FK_id_system FOREIGN KEY
(id_system) REFERENCES Systems
(id) ON
DELETE CASCADE
);