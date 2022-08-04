/*
This module contains functions wich perform queries to the database
this file SHOULD NOT contain validation or security of queries... 
that should be the job of functions in validate.js
*/
const fs = require("fs");
const bcrypt = require("bcrypt");
const { Client } = require("pg");
const client = new Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  port: 5432,
});

(async () => {
  try {
    await new Promise((res) => setTimeout(res, 10000));
    await client.connect();
    let res = await client.query(
      "SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name='users')"
    );
    if (!res.rows[0].exists) {
      console.log("users table not found, running init.sql");
      let initSQL = fs.readFileSync("./init.sql", "utf8");
      res = await client.query(initSQL);
    } else {
      console.log("users table found, not running init.sql");
    }
  } catch (err) {
    console.log(`connection failed with error:\n${err}`);
  }
})();

async function usernameExists(username) {
  let res = await client.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE username=$1)",
    [username]
  );
  return res.rows[0].exists;
}

async function emailExists(email) {
  let res = await client.query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)",
    [email]
  );
  return res.rows[0].exists;
}

async function register(username, email, password) {
  bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      throw err;
    }
    await client.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
      [username, email, hash]
    );
  });
}

async function login(username, password) {
  let res = await client.query(
    "SELECT password_hash FROM users WHERE username=$1",
    [username]
  );
  if (res.rowCount > 0) {
    return await bcrypt.compare(password, res.rows[0].password_hash);
  }
  return false;
}

async function getUser(username) {
  let res = await client.query(
    "SELECT id, username, avatar, email, verified, created FROM users WHERE username=$1",
    [username]
  );
  let user;
  if (res.rowCount > 0) {
    user = res.rows[0];
  } else {
    return null;
  }
  res = await client.query("SELECT * FROM reviews WHERE author=$1", [username]);
  user.reviews = res.rows;
  return user;
}

async function createProperty(
  imageUrl,
  title,
  city,
  zip,
  streetAddress,
  unit,
  rent,
  bathrooms,
  bedrooms,
  leasing_company
) {
  let res = await client.query(
    "INSERT INTO properties (image_url, title, city, zip, street_address, unit, rent, bathrooms, bedrooms, leasing_company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
    [imageUrl, title, city, zip, streetAddress, unit, rent, bathrooms, bedrooms, leasing_company]
  );
  return res.rows[0].id;
}

async function createReview(rating, txt, property, author) {
  let res = await client.query(
    "INSERT INTO reviews (rating, txt, property, author) VALUES ($1, $2, $3, $4) RETURNING id",
    [rating, txt, property, author]
  );
  let revId = res.rows[0].id;
  res = await client.query(
    "UPDATE properties SET rating=(SELECT CAST(AVG(rating) AS int) FROM reviews WHERE property=$1), review_count=review_count+1 WHERE id=$1",
    [property]
  );
  return revId;
}

async function getProperty(id) {
  let res = await client.query("SELECT * FROM properties WHERE id=$1", [id]);
  if (res.rowCount < 1) {
    return null;
  }
  let property = res.rows[0];
  res = await client.query("SELECT * FROM reviews WHERE property=$1", [id]);
  property.reviews = res.rows;
  return property;
}

async function search(limit, offset, order, minRating, minRent, maxRent) {
  let res = await client.query(
    `SELECT * FROM properties
                                WHERE rating >= $1 
                                AND rent >= $4
                                AND rent <= $5
                                ORDER BY ${order}
                                LIMIT $2 OFFSET $3`,
    [minRating, limit, offset, minRent, maxRent]
  );
  return res.rows;
}

async function deleteUser(username) {
  // no validation just delete the user
  // Deleting reviews from user
  // let res = await client.query(
  //   `DELETE from reviews WHERE author=$1`,
  //   [username]
  // );
  let res = await client.query(
    `DELETE FROM users WHERE username=$1`,
    [username]
  );
  return res.rows;
}

async function updateAvatar(username, imageUrl) {
  // update profile picture of user
  let res = await client.query(
    'UPDATE users SET avatar= $2 WHERE username= $1',
    [username, imageUrl]
  );
  return res.rows;
}

async function changeUsername(user_id, new_username){
  let res = await client.query(
    'UPDATE users SET username= $2 WHERE id= $1',
    [new_username, user_id]
  );
  return res.rows;
}

module.exports = {
  usernameExists,
  emailExists,
  register,
  login,
  getUser,
  createProperty,
  createReview,
  getProperty,
  search,
  deleteUser,
  updateAvatar
};
