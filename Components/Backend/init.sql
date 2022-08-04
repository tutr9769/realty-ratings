DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username TEXT NOT NULL UNIQUE,
    avatar TEXT DEFAULT 'https://i.nuuls.com/0ySJS.png' NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE NOT NULL,
    created DATE DEFAULT CURRENT_DATE NOT NULL --todo add role (possibly?)
);

CREATE TABLE properties (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    image_url TEXT,
    title TEXT,
    rating SMALLINT DEFAULT 5 NOT NULL, -- float
    review_count INT DEFAULT 0 NOT NULL,
    rent INT NOT NULL,
    city TEXT NOT NULL,
    zip INT NOT NULL, -- we may not need zipcode
    street_address TEXT NOT NULL,
    unit TEXT,
    created DATE DEFAULT CURRENT_DATE NOT NULL,
    leasing_company TEXT,
    bedrooms INT,
    bathrooms INT
);

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 0,
    txt TEXT NOT NULL,
    property BIGINT REFERENCES properties(id) NOT NULL,
    author TEXT REFERENCES users(username) NOT NULL
);

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/Union.jpg', 'Union Baseline', 2000, 'Boulder', 80303, '2726 Moorhead Ave', 'Leasing HQ');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/uClub.jpg', 'U Club', 2000, 'Boulder', 80303, '820 28th St', 'U Club leasing company');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/Province.jpg', 'The Province Boulder', 2000, 'Boulder', 80303, '950 28th St', 'Province Boulder');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/theLotus.jpg', 'The Lotus', 2500, 'Boulder', 80303, '900 28th St', 'The Lotus Leasing Company');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/BearCreek.jpg', 'Bear Creek', 1200, 'Boulder', 80303, '3275 Apache Rd', 'University of Colorado');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TimberRidge.jpg', 'Timber Ridge', 1350, 'Boulder', 80303, '1025 Adams Cir', 'Timber Ridge leasing company');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/LandMarkLofts.jpg', 'Landmark Lofts', 2600, 'Boulder', 80303, '2810 College Ave', 'Landmark lofts leasing company');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TheBlock.jpg', 'The Block Apartments', 4000, 'Boulder', 80303, '1005 14th St', 'FourStar');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TheArmory.jpg', 'The Armory Apartments', 3500, 'Boulder', 80304, '4730 Broadway St', 'Boulder Armory');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TheLux.jpg', 'The Lux', 5700, 'Boulder', 80302, '855 Broadway St', 'FourStar');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TheMansion.jpg', 'The Mansions', 6700, 'Boulder', 80302, '1101 University Ave', 'FourStar');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/CollegeTownhomes.jpg', 'College Townhomes', 3735, 'Boulder', 80302, '1200 College Ave', 'FourStar');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/LoftsOnCollege.jpg', 'Lofts on College', 6780, 'Boulder', 80302, '1350 College Ave', 'FourStar');

INSERT INTO properties (image_url, title, rent, city, zip, street_address, leasing_company)
VALUES ('https://csci-reality-proj.s3.us-west-1.amazonaws.com/TheLodge.jpg', 'The Lodge', 3885, 'Boulder', 80303, '2900 E. Aurora Ave', 'FourStar');