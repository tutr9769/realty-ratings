/*
this is the main api module
since this file gets messy, we should outsource as much functionality as possible to other modules (i.e. validate.js, db.js, etc)

TO RUN THE API
1) create a file called ".env" inside /Backend
2) input the following data in .env:
  PRODUCTION="false"
  DB_NAME="< your psql db name >"
  DB_PASSWORD="< your psql password >"
  SECRET=" < some random string > (used for jwt) "
3) run "npm install" if you do not have the dependencies
4) run "node index.js" or "nodemon index.js" 
*/
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const validate = require("./validate");
const errorHandler = require("./errorHandler");
const { errors } = require("./errorHandler");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const upload = require("./upload");
var multer = require("multer");
var multerUpload = multer();

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

// jwt auth middleware
function authenticate(req, res, next) {
  try {
    let header = req.get("Authorization");
    let token = header && header.split(" ")[1];
    if (token == null) {
      throw errors.nullToken;
    }
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        throw errors.invalidToken;
      }
      res.id = data.id;
      res.username = data.username;
      next();
    });
  } catch (err) {
    next(err); // next passes it to the error handler
  }
}

// TODO
// ping handler

app.post("/register", async (req, res, next) => {
  try {
    // check if fields are valid
    if (
      !validate.register(req.body.username, req.body.email, req.body.password)
    ) {
      throw errors.invalidRegister;
    }
    // check if username exsists
    let usernameExists = await db.usernameExists(req.body.username);
    if (usernameExists) {
      throw errors.usernameExists;
    }
    // check if email exists
    let emailExists = await db.emailExists(req.body.email);
    if (emailExists) {
      throw errors.emailExists;
    }
    // create user
    await db.register(req.body.username, req.body.email, req.body.password);
    res.status(201).json({});
  } catch (err) {
    next(err); // this cathes any errors and passes it onto errorHandler
  }
});

app.post("/login", async (req, res, next) => {
  try {
    // check if login is valid
    let valid = await db.login(req.body.username, req.body.password);
    if (!valid) {
      throw errors.invalidLogin;
    }
    let user = await db.getUser(req.body.username); // fetch user object
    user.jwt = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET
    ); // add jwt field to user object
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/profile", authenticate, async (req, res, next) => {
  try {
    res.status(200).json(await db.getUser(res.username));
  } catch (err) {
    next(err);
  }
});

app.post("/createProperty", authenticate, async (req, res, next) => { //need to edit for bed and bath
  try {
    console.log(req.body);
    // validate property
    if (
      !validate.property(
        req.body.imageUrl,
        req.body.title,
        req.body.city,
        req.body.zip,
        req.body.streetAddress,
        req.body.unit,
        req.body.rent,
        req.body.bathrooms,
        req.body.bedrooms,
        req.body.leasing_company
      )
    ) {
      throw errors.invalidProperty;
    }
    // add property to db
    let id = await db.createProperty(
      req.body.imageUrl,
      req.body.title,
      req.body.city,
      req.body.zip,
      req.body.streetAddress,
      req.body.unit,
      req.body.rent,
      req.body.bathrooms,
      req.body.bedrooms,
      req.body.leasing_company
    );
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

app.get("/properties/:property", async (req, res, next) => {
  try {
    let property = await db.getProperty(req.params.property);
    if (property == null) {
      throw errors.propertyNotFound;
    }
    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
});

app.post(
  "/properties/:property/createReview",
  authenticate,
  async (req, res, next) => {
    try {
      // validate review
      if (
        !validate.review(
          req.body.rating,
          req.body.txt,
          req.params.property,
          res.username
        )
      ) {
        throw errors.invalidReview;
      }
      // add review to database
      let id = await db.createReview(
        req.body.rating,
        req.body.txt,
        req.params.property,
        res.username
      );
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }
);

// the search handler is weird and has exceptions to the architecture
const orders = ["rent DESC", "rent ASC", "rating DESC", "rating ASC"];
app.get("/search", async (req, res, next) => {
  try {
    let limit = req.query.limit ? req.query.limit : 6;
    let offset = req.query.page ? req.query.page * req.query.limit : 0;
    let order = req.query.order ? req.query.order : 0;
    let minRating = req.query.minRating ? req.query.minRating : 1;
    let minRent = req.query.minRent ? parseInt(req.query.minRent) : 0;
    let maxRent = req.query.maxRent ? parseInt(req.query.maxRent) : 100000;
    if (
      !validate.search(limit, offset, minRating, minRent, maxRent) ||
      order < 0 ||
      order >= orders.length
    ) {
      throw errors.invalidSearch;
    }
    let properties = await db.search(
      limit,
      offset,
      orders[order],
      minRating,
      minRent,
      maxRent
    );
    res.status(200).json({ properties });
  } catch (err) {
    next(err);
  }
});

// uploads an image an return the url at s3 bucket
app.post("/upload", multerUpload.single("file"), async (req, res, next) => {
  try {
    if (typeof req.file != "object" || !validate.image(req.file)) {
      throw errors.invalidImage;
    }
    let url = await upload.uploadFile(req.file);
    res.status(200).json({ url });
  } catch (err) {
    next(err);
  }
});

// TODO
// create handler to call db and delete user
app.delete("/profile", authenticate, async (req, res, next) => {
  // get the username from res.username
  try{
    let user = await db.deleteUser(res.username);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

app.put("/avatar", authenticate, async (req, res, next) => {
  // get the username from res.username
  // update avatar via db.js
  try{
  let imageUrl = req.body.imageUrl;
  let user = await db.updateAvatar(res.username, imageUrl);
  res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

//update username
app.put("/profile/:id", authenticate, async (req, res, next) => {
  try{
    let new_username = req.body.username;
    let user = await db.changeUsername(res.id, new_username);
    res.status(200).json(id);
  } catch(err) {
    next(err);
  }
});

// send all exceptions to error handler
app.use(errorHandler.handleError);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
