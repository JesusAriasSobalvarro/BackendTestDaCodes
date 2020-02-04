# DaCodes Backend Test

This repository contains code of an API developed as a test from DaCodes.

## Description

The API developed is intended for e-learning courses to integrate in a system. The purpose of this API is that professors are able to manage courses configuration and performance reviews and, for students, to take courses when using a frontend.

## Installation and usage
### Requirements
To run this project on your local machine you will need to install the following software:
1. NodeJs 
2. Postman
3. MySQL server
4. MySQL workbench (optional)

**Note:** When installing MySQL server make sure to enable legacy authentication. This is because TypeORM connects via user and password. For the steps necessary to enable this you can visit [this site.](https://stackoverflow.com/questions/49931541/mysql-changing-authentication-type-from-standard-to-caching-sha2-password)

### Steps
1. To start the server you will need to download/clone this repo.
2. Open a terminal in the folder you downloaded this repo.
3. Run
```
npm install -g ts-node
npm install
ts-node node_modules\typeorm\cli.js migration:run
npm start
```
5. Open the Postman collection (ApiBackendDaCodes.postman_collection) to start testing the endpoints.

## Frameworks and libraries used
1. Express: Ive used this framework to setup routing in a quick manner.
2. BodyParser: This middleware allows an easier way to handle encoded/formatted data.
3. TypeORM: Used to develop models and types compatible with SQL.
4. Underscore: Used to work with lists. Useful for operations such as filtering, sorting, etc.