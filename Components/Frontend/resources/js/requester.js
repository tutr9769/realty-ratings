const production = false;
const apiUrl = production ? "outsite.com" : "localhost:3000";

let request = async function (url, options) {
  try {
    let res = await fetch(url, options);
    data = JSON.parse(await res.text());
    data.success = res.status > 199 || res.status < 300;
  } catch (err) {
    data = { status: 500, msg: "no response was recieved from backend" };
    data.success = false;
  }
  return data;
};

let register = async function (username, email, password) {
  let data = new URLSearchParams();
  data.append("username", username);
  data.append("email", email);
  data.append("password", password);
  return await request(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
};

let login = async function (username, password) {
  let data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);
  return await request(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
};

let createProperty = async function (
  token,
  title,
  city,
  zip,
  streetAddress,
  unit
) {
  let data = new URLSearchParams();
  data.append("title", title);
  data.append("city", city);
  data.append("zip", zip);
  data.append("streetAddress", streetAddress);
  data.append("unit", unit);
  return await request(`${apiUrl}/createProperty`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
};

let getProperty = async function (id) {
  return await request(`${apiUrl}/properties/${id}`, {
    method: "GET",
  });
};

let createReview = async function (token, id, rating, txt) {
  let data = new URLSearchParams();
  data.append("rating", rating);
  data.append("txt", txt);
  return await request(`${apiUrl}/properties/${id}/createReview`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
};

module.exports = {
  request,
  register,
  login,
  createProperty,
  getProperty,
  createReview,
};
