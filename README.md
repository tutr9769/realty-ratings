# csci-3308-spring22-011-05

### Where its hosted: (not online anymore)
https://realty-ratings.herokuapp.com/

### REPO ORGANIZATION

Components
  Backend
    houses the backend
    Test Cases
      houses the test cases
  Frontend
    houses the frontend prototype
  frontend-vue
    houses the final frontend which uses vue
  Graphics
    stores the graphics for this project
Milestones
  stores the milestone submissions for this project


### HOW TO RUN
To Run the backend: </br>
go to the root of the project and type the following </br>
```.../csci-3308-spring22-011-05>docker-compose up``` </br>
to refresh the cache / database do either of both of the following </br>
```docker system prune``` </br>
```docker-compose build --no-cache``` </br>

On the frontend:
navigate to frontend-vue:
```npm i```
```npm run serve```
### HOW TO TEST

The test case folder is located in the backend folder. In this test case folder you will find a few files with different test cases, for different function. You can run these tests with mocha + chai.
### API Calls

```
POST /register
 Body:
  username
  email
  password

Responds with 201(created) and id of user.
```

```
POST /login
 Body:
  username
  password

Return a user object along with a jwt.
```

```
GET /profile

Returns a user object.
```

```
POST /createProperty
 Authorization header required

Responds with 201(created) status and id of created property.
```

```
GET /properties/:property

Responds with property object.
```

```
POST /properties/:property/createReview

Responds with 201(created) and id of review.
```

```
POST /properties/:property/createReview

Responds with 201(created) and id of review.
```

```
GET /search?limit=6&page=0&order=0&minRating=1

Responds with list of properties.
```

```
Post /Viewall/properties/:property

Posts all apartment info in neat cards in neat list
```
