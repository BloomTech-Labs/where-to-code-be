🚫 Note: All lines that start with 🚫 are instructions and should be deleted before this is posted to your portfolio. This is intended to be a guideline. Feel free to add your own flare to it.

🚫 The numbers 1️⃣ through 3️⃣ next to each item represent the week that part of the docs needs to be comepleted by.  Make sure to delete the numbers by the end of Labs.

🚫 Each student has a required minimum number of meaningful PRs each week per the rubric.  Contributing to docs does NOT count as a PR to meet your weekly requirements.

# API Documentation

#### Backend delpoyed at [Hive Stack Heroku](https://hive-stack.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- create **.env**
  - **DEV_SERVER** development database url
  - **JWT_SECRET** secret for jwtoken
  - **GCP_KEY** API key for Google Cloud Platform
  - **TESTING_DATABASE** database url for testing environment
- **knex migrate:latest** migrate tables for database
- **knex seed:run** runs seeded testing data
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### NodeJs

🚫 Why did you choose this framework?

-    Point One
-    Point Two
-    Point Three
-    Point Four

## 2️⃣ Endpoints

#### Authentication Routes

| Method | Endpoint                | Access Control  | Description                                  |
| ------ | ----------------------- | --------------- | -------------------------------------------- |
| POST   | `/auth/user/register`   | public          | Create an account for a basic user.          |
| POST   | `/auth/login`           | public          | Login to a users account.                    |
| GET    | `/auth/info`            | registered user | Validate token and retrieve user data        | 
| PUT    | `/auth/update`          | registered user | Update a users credentials.                  |
| DELETE | `/auth/delete-account`  | registered user | Delete the users account.                    |

#### User Routes

| Method | Endpoint                | Access Control  | Description                                        |
| ------ | ----------------------- | --------------- | -------------------------------------------------- |
| GET    | `/users`                | public          | Returns a list of all registered users.            |
| GET    | `/users/:userId`        | public          | Returns info for a single user.                    |
| PUT    | `/users/`               | registered user | Updates a users `firstName` & `lastName`.          |

There are six test users seeded into the database:
| Email           | Password |
| --------------- | -------- |
| test1@gmail.com | test     |
| test2@gmail.com | test2    |
| test3@gmail.com | test3    |
| test4@gmail.com | test4    |
| test5@gmail.com | test5    |
| test6@gmail.com | test6    |

#### Location Routes

| Method | Endpoint                        | Access Control  | Description                                        |
| ------ | ------------------------------- | --------------- | -------------------------------------------------- |
| GET    | `/locations`                    | public          | Gets all of the locations in the database.         |
| GET    | `/locations/:id`                | public          | Gets a single location based on `id` or `googleId`.|
| POST   | `/locations`                    | public          | Adds a location to the database.                   |
| GET    | `/locations/saved`              | registered user | Retrieve a users saved locations.                  |
| POST   | `/locations/saved/:locationId`  | registered user | Adds a location to a users saved list.             |
| DELETE | `/locations/saved/:locationId`  | registered user | Remove a location from users saved list.           |

# Data Model

#### BASIC USERS

---

```
{
  id: INTEGER
  username: STRING
  firstName: STRING
  lastName: STRING
  reviewCount: INTEGER
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### LOCATIONS

---

```
{
  id: INTEGER,
  googleId: STRING, // used when storing location from google
  name: STRING,
  address: STRING,
  phone: STRING,
  icon: STRING      // url for image of location
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user
<br>
<br>
<br>
`getAll_locations()` -> Returns all locations

`getLocationsBy(id)` ->  Returns a single location by id.
  - Supplied as object: `{ id: 1 }` or `{ googleId: "jh5678ujklo0987udsew2qwsdfdr2222" }`

`addLocation(location)` -> Returns the added location object inside an array.

`updateLocation(id, update)` -> Update a location by id.

`deleteLocation(id)` -> Delete a location by id.
<br>
<br>
<br>
`googleLocationObject(location)` -> Returns a location object using location.googleId.

`findLocation()` -> Middleware that finds a location and adds it to res.locals.location

`addIfDoesNotExist()` -> Middleware that adds Google Place ID to our database before next()

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  DEV_SERVER - development database url
    *  JWT_SECRET - secret for jwtoken
    *  TESTING_DATABASE - database url for testing environment
    *  ENVIRONMENT - set to "development" until ready for "production"
    *  GCP_KEY - API token for Google Cloud Platform
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](🚫link to your frontend readme here) for details on the fronend of our project.
🚫 Add DS iOS and/or Andriod links here if applicable.

[![Maintainability](https://api.codeclimate.com/v1/badges/07dd8f429c840cfe6961/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/where-to-code-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07dd8f429c840cfe6961/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/where-to-code-be/test_coverage)
