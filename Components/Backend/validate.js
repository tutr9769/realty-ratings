/*
this module is specifically for functions wich validate user input.
this module SHOULD NOT perform queries
*/

const emailRgx = /^\S+@colorado.edu$/;

function register(username, email, password) {
  if (username == null || email == null || password == null) {
    return false;
  }
  if (username.length < 4 || username.length > 30) {
    return false;
  }
  if (!email.match(emailRgx)) {
    return false;
  }
  if (password.length < 9) {
    return false;
  }
  return true;
}

// function bedrooms_number(bedrooms){
//   if(isNaN(bedrooms)){
//     return false;
//   }
//   return true;
// }

function property(imageUrl, title, city, zip, streetAddress, unit, rent, bathrooms, bedrooms, leasing_company) {
  if (
    imageUrl == null ||
    title == null ||
    city == null ||
    zip == null ||
    streetAddress == null ||
    unit == null ||
    rent == null
  ) {
    console.log("-- 1")
    return false;
  }
  if(!(city == "Broomfield" || city == "Boulder")){
    console.log("-- 2")
    return false;
  }
  if(rent < 0 || rent > 10000){
    console.log("-- 3")
    return false;
  }

  if(bedrooms < 0 || bedrooms > 50){
    console.log("-- 4")
    return false;
  }

  // if(isNaN(bedrooms)){
  //   return false;
  // }

  // if(isNaN(bathrooms)){
  //   return false;
  // }

  // if(isNaN(rent)){
  //   return false;
  // }

  // if(isNaN(zip)){
  //   return false;
  // }

  if(bathrooms < 0 || bathrooms > 50){
    console.log("-- 5")
    return false;
  }

  if(unit.length > 6){
    console.log("-- 6")
    return false;
  }

  if(streetAddress.length < 10 || streetAddress.length > 100){
    console.log("-- 7")
    return false;
  }

  if(title.length > 100){
    console.log("-- 8")
    return false;
  }
  // TODO property validation here
  // doesnt have to be super strict, just stop basic BS
  // - imageUrl should just be a valid link like https://...
  // - make sure title isnt riculous like ^*#%$*#$%
  // - city either broomfield or boulder
  // - make sure street adress is valid ish
  // - make sure unit is valid ish
  // - make sure rent isnt less than 0 or above something ridiculous
  return true;
}

function review(rating, txt, property, author) {
  if (rating == null || txt == null || property == null || author == null) {
    return false;
  }
  if (rating < 1 || rating > 5) {
    return false;
  }
  if (txt.length < 1 || txt.length > 500) {
    return false;
  }
  return true;
}

function search(limit, offset, minRating, minRent, maxRent) {
  if (limit < 1 || limit > 10) {
    return false;
  }
  if (offset < 0) {
    return false;
  }
  if (minRating < 1 || minRating > 5) {
    return false;
  }
  if (minRent < 0 || maxRent < minRent) {
    return false;
  }
  return true;
}

function image(file) {
  if (file.size > 1000000) {
    return false;
  }
  // TODO make sure file is an image both in name and in mime type
  // you will want to print the file obj to see what its like
  return true;
}

module.exports = {
  register,
  property,
  review,
  search,
  image,
};
