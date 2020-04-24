# API Documentation

#### Backend delpoyed at [Hive Stack Heroku](https://hive-stack.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **yarn install** to install all required dependencies
- create **.env**
  - **DEV_SERVER** development database url
  - **JWT_SECRET** secret for jwtoken
  - **TESTING_DATABASE** database url for testing environment
- **knex migrate:latest** migrate tables for database
- **knex seed:run** runs seeded testing data
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

## NodeJs

#### **Reasons we chose NODE JS**

- **Optimal Learning Curve**

  - We all are very familiar with the technology and there was little to no additional learning required to get up and running quickly.

- **Javascript Syntax**

  - Unlike other server-side technologies (such as Angular), the syntax is Javascript based, not novel to the technology itself.

- **Easy Integration**

  - Hosting services like Heroku integrate well with Node without any additional dependencies.

## Endpoints

### Postman Docs: https://documenter.getpostman.com/view/9185503/SzS4RSns?version=latest 

> #### Authentication Routes

| Method | Endpoint               | Access Control  | Description                           |
| ------ | ---------------------- | --------------- | ------------------------------------- |
| POST   | `/auth/user/register`  | public          | Create an account for a basic user.   |
| POST   | `/auth/login`          | public          | Login to a users account.             |
| GET    | `/auth/info`           | registered user | Validate token and retrieve user data |
| PUT    | `/auth/update`         | registered user | Update a users credentials.           |
| DELETE | `/auth/delete-account` | registered user | Delete the users account.             |

> #### User Routes

| Method | Endpoint         | Access Control  | Description                               |
| ------ | ---------------- | --------------- | ----------------------------------------- |
| GET    | `/users`         | public          | Returns a list of all registered users.   |
| GET    | `/users/:userId` | public          | Returns info for a single user.           |
| PUT    | `/users/`        | registered user | Updates a users `firstName` & `lastName`. |

> #### Location Routes

| Method | Endpoint                         | Access Control  | Description                                                     |
| ------ | -------------------------------- | --------------- | --------------------------------------------------------------- |
| GET    | `/locations`                     | public          | Get all WiFi locations.                                         |
| GET    | `/locations/:locationId`         | public          | Get a single location based on `id` or `googleId`.              |
| POST   | `/locations`                     | public          | Add a location to the database.                                 |
| GET    | `/locations/saved`               | registered user | Gets a user's saved locations.                                  |
| POST   | `/locations/saved/:locationId`   | registered user | Adds a saved location to a specific user's list.                |
| DELETE | `/locations/saved/:locationId`   | registered user | Delete a single saved location from the user's list.            |
| GET    | `/locations/visited`             | registered user | Gets a user's visited locations.                                |
| POST   | `/locations/visited/:locationId` | registered user | Adds a location to a specific user's list of visited locations. |
| DELETE | `/locations/visited/:visitId`    | registered user | Delete a single visited location from the user's list.          |

## Test User Accounts

There are six test users seeded into the database:
| Email           | Password |
| --------------- | -------- |
| test1@gmail.com | test     |
| test2@gmail.com | test2    |
| test3@gmail.com | test3    |
| test4@gmail.com | test4    |
| test5@gmail.com | test5    |
| test6@gmail.com | test6    |

## Actions

> ### User Actions

`getAll_users()` -> No params, returns all users

`getUserById(userId)` -> Accepts a single param (the user's ID), returns a single user by user ID

`getUserInfo(userID)` -> Accepts a single param (the user's ID), returns user's information (including login credentials)

`add({user object})` --> Accepts user object ({username: string, firstname: string, lastname: string, email: string, password: string}) and creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`update(userId, {changes})` -> Accepts user ID and a changes object (populated with changes to either or all of user data columns) and returns an updated single user.

> ### User Credentials Actions

`findBy(userID)` -> Accepts a single param (the user's ID), returns a single user's **sensitive** information (including login credentials).

`add(user)` -> Accepts user object `[see data shape above]` and returns a new user.

`update(userID, {changes})` -> Accepts user ID and a changes object (populated with changes to either or all of user data columns), returns user's updated information (including updated login credentials)

`remove(userId)` -> Accepts user ID and effectively removes user from database (deletes credentials but leaves other user data intact).

> ### Location Actions

`getAll_locations()` -> Returns all locations in database.

`getLocationsById(locationID)` -> Accepts a single param (location ID) and returns all data for specified location.

`getLocationByGoogleId(googleID)` -> Accept a single param (google location ID) and returns all data for specified location.

`add({locations}) -> Accepts location object`[see data shape above]`, adds it to the database and returns the newly created location.

`updateLocation(locationID, {changes})` -> Accepts location ID and changes object, returns updated location.

`deleteLocation(locationID)` -> Accepts location ID and removes specified location from database.

`googleLocationObject(location)` -> Returns a structured object using `location.googleId`. Must be passed entire location object from our database.

`formatLocationObject(location)` -> Returns an object populated with Google Place details for locations with a googleId. Returns complete location object otherwise.

`formatAllLocationObjects(locationsList)` -> Returns all locations in array, and populate with details for any Google Places.

#### Middleware
___

`findLocation` -> Middleware that finds a location and adds it to res.locals.location

`addIfDoesNotExist` -> Middleware that adds Google Place ID to our database before next()

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  DEV_SERVER - development database url
    *  JWT_SECRET - secret for jwtoken
    *  TESTING_DATABASE - database url for testing environment
    *  ENVIRONMENT - set to "development" until ready for "production"

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

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

See [Frontend Documentation](https://github.com/Lambda-School-Labs/where-to-code-fe/blob/master/README.md) for details on the fronend of our project.

[![Maintainability](https://api.codeclimate.com/v1/badges/07dd8f429c840cfe6961/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/where-to-code-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07dd8f429c840cfe6961/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/where-to-code-be/test_coverage)
