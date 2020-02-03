# DaCodes Backend Test

This repository contains code of an API developed as a test from DaCodes.

## Description

We require to develop an API for e-learning courses to integrate in our system. The purpose of this tool is for us, as professors to manage courses configuration and performance reviews and, for our students, to take courses when using our frontend. Our PM is a very busy person, so we don’t have detailed tasks but only the business rules to work with. Here they are:

### Instructions 

1. We have courses that contain lessons and lessons that contain questions
2. The courses are correlative with previous ones
3. The lessons are correlative with previous ones
4. The questions for each lesson have no correlation
5. All questions for a lesson are mandatory
6. Each question has a score
7. Each lesson has an approval score that has to be met by the sum of correctly answered questions to approve it
8. A course is approved when all lessons are passed.
9. There’s no restriction on accessing approved courses
10. Only professors can create and manage courses, lessons and questions
11. Any student can take a course
12. Initially, we’ll need to support these types of questions:
* Boolean
* Multiple choice where only one answer is correct
* Multiple choice where more than one answer is correct
* Multiple choice where more than one answer is correct and all of them must be answered correctly
* Frontend guys specifically asked for these endpoints for the students to use:

13. Get a list of all courses, telling which ones the student can access
14. Get lessons for a course, telling which ones the student can access
15. Get lesson details for answering its questions
16. Take a lesson (to avoid several requests, they asked to send all answers in one go)
17. Basic CRUD for courses, lessons and questions

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