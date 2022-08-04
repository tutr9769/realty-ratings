const production = false;
const apiUrl = production ? "oursite.com" : "http://localhost:3000";

let request = async function (url, options) {
  let data;
  try {
    let res = await fetch(url, options);
    data = JSON.parse(await res.text());
    data.success = res.status > 199 && res.status < 300;
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
  return await request(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
};

let profile = async function (token) {
  return await request(`${apiUrl}/profile`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

let createProperty = async function (
  token,
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
  let data = new URLSearchParams();
  data.append("imageUrl", imageUrl);
  data.append("title", title);
  data.append("city", city);
  data.append("zip", zip);
  data.append("streetAddress", streetAddress);
  data.append("unit", unit);
  data.append("rent", rent);
  data.append("bathrooms", bathrooms);
  data.append("bedrooms", bedrooms);
  data.append("leasing_company", leasing_company)
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

let search = async function (
  limit = 7,
  page = 0,
  order = 0,
  minRating = 1,
  minRent = 0,
  maxRent = 1000000000
) {
  return await request(
    `${apiUrl}/search?limit=${limit}&page=${page}&order=${order}&minRating=${minRating}&minRent=${minRent}&maxRent=${maxRent}`,
    {
      method: "GET",
    }
  );
};

let upload = async function (file) {
  let data = new FormData();
  data.append("file", file);
  return await request(`${apiUrl}/upload`, {
    method: "POST",
    body: data,
  });
};

//Function
let deleteUser = async function (token) {
  // TODO
  return await request(`${apiUrl}/profile`, {
    method: "DELETE",
    headers: { // makes sure that we're logged in
      Authorization: "Bearer " + token,
    },
  });
};

let updateAvatar = async function (token, imageUrl) {
  // TODO
  let data = new URLSearchParams();
  data.append("imageUrl", imageUrl);
  return await request(`${apiUrl}/avatar`,{
  method: "PUT",
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: data,
  });
}

module.exports = {
  request,
  register,
  login,
  profile,
  createProperty,
  getProperty,
  createReview,
  search,
  upload,
  updateAvatar,
  deleteUser,
};
