/*
This module contains all custom error objects as well the error handler

HOW TO USE:
if you return any satus wich is not in the 200s you should create an error below
then throw the error in index.js when necessary
http status list: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
*/
module.exports = {
  errors: {
    invalidRegister: {
      msg: "register not valid",
      status: 406,
    },
    invalidLogin: {
      msg: "login credentials not valid",
      status: 401,
    },
    invalidProperty: {
      msg: "property not valid",
      status: 406,
    },
    invalidReview: {
      msg: "review not valid",
      status: 406,
    },
    invalidSearch: {
      msg: "search not valid",
      status: 406,
    },
    nullToken: {
      msg: "no token was provided",
      status: 401,
    },
    invalidToken: {
      msg: "token is invalid",
      status: 401,
    },
    propertyNotFound: {
      msg: "property not found",
      status: 404,
    },
    usernameExists: {
      msg: "username already exists",
      status: 406,
    },
    emailExists: {
      msg: "email already exists",
      status: 406,
    },
    invalidImage: {
      msg: "invalid image",
      status: 400,
    }
  },
  handleError: (err, req, res, next) => {
    try {
      res.status(err.status).json(err);
    } catch (errr) {
      res.status(500).json({ msg: "an unknown error occured", status: 500 });
      console.log(`unknown error: \n${err.stack}`);
    }
  },
};
