import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Course } from "./../entity/Course";
import { ApprovedCourse } from "./../entity/ApprovedCourse";
import { checkUserAllowed } from "./UserController";

var _ = require("underscore")

export async function getAllCourses(request: Request, response: Response) {
    const courseRepository = getManager().getRepository(Course);
    const courses = await courseRepository.find({
        relations: ["requiredCourses"]
    });
    response.send(courses);
}

export async function deleteCouse(request: Request, response: Response) {
    var userId = request.header('User-Id');

    if (await checkUserAllowed(userId ? userId : 0)) {
        const courseRepository = getManager().getRepository(Course);
        const course = await courseRepository.findOne({
            where: {
                id: request.body.id
            }
        });

        await courseRepository.delete(course);
        response.send(`Course Deleted Id: ${request.body.id}`);
    } else {
        response.send(`You must be a professor to delete a course.`)
    }
}

export async function postCourse(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;

    if (await checkUserAllowed(userId ? userId : 0)) {
        const courseRepository = getManager().getRepository(Course);
        const course = await courseRepository.create(body);

        await courseRepository.save(course);
        response.send(course);
    } else {
        response.send(`You must be a professor to post a course.`)
    }
}

export async function editCourse(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;

    if (await checkUserAllowed(userId ? userId : 0)) {

        const courseRepository = getManager().getRepository(Course);
        const course = await courseRepository.findOne({
            where: {
                id: request.body.id
            }
        });

        course.courseName = body.courseName;
        course.lessons = body.lessons;
        course.requiredCourses = body.requiredCourses;

        await courseRepository.save(course);
        response.send(course);
    } else {
        response.send(`You must be a professor to edit a course.`)
    }
}

export async function getStudentCourses(request: Request, response: Response) {
    var userId = request.header('User-Id');

    const approvedCourseRepo = getManager().getRepository(ApprovedCourse);
    const courseRepo = getManager().getRepository(Course);

    const approvedCourseList = await approvedCourseRepo.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: ["course", "user"]
    });

    const courses = await courseRepo.find({
        relations: ["requiredCourses"]
    })

    var promiseCoursesArray = approvedCourseList.map((item) => {
        return new Promise(async (resolve) => {
            var availableCourse = await _.filter(courses, (course) => {
                return _.some(course.requiredCourses, (value) => {
                    return value.id == item.course.id;
                })
            })
            resolve(availableCourse);
        })
    })

    promiseCoursesArray.push(new Promise(async (resolve, reject) => {
        try {
            var coursesWithoutCorrelatives = _.filter(courses, course => {
                return _.isEmpty(course.requiredCourses);
            });
            var filteredCourses = _.filter(coursesWithoutCorrelatives, (course) => {
                return !_.some(approvedCourseList, (approvedCourse) => {
                    return approvedCourse.course.id === course.id
                })
            })
            resolve(filteredCourses);
        } catch (error) {
            reject(error);
        }
    }))

    Promise.all(promiseCoursesArray).then(async (value) => {
        /* Flatten array of promises */
        var availableCourses = [].concat.apply([], value);
        response.send({
            "availableCourses": availableCourses,
            "allCourses": courses
        })
    }).catch((error) => {
        response.send(error)
    })
}
