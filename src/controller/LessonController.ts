import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Lesson } from "./../entity/Lesson";
import { ApprovedLesson } from "../entity/ApprovedLesson";
import { Question } from "../entity/Question";
import { Answer } from "../entity/Answer";
import { User } from "../entity/User";
import { ApprovedCourse } from "../entity/ApprovedCourse";
import { Course } from "../entity/Course";
import { checkUserAllowed } from "./UserController";

var _ = require("underscore")

export async function getAllLessons(request: Request, response: Response) {
    const lessonRepository = getManager().getRepository(Lesson);
    const lessons = await lessonRepository.find({
        relations: ["course", "requiredLessons"]
    });
    response.send(lessons);
}

export async function postLesson(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;

    if (await checkUserAllowed(userId ? userId : 0)) {
        const lessonRepository = getManager().getRepository(Lesson);
        const lesson = await lessonRepository.create(body);

        await lessonRepository.save(lesson);
        response.send(lesson);
    } else {
        response.send(`You must be a professor to create a lesson.`);
    }
}

export async function deleteLesson(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;

    if (await checkUserAllowed(userId ? userId : 0)) {
        const lessonRepository = getManager().getRepository(Lesson);
        const lesson = await lessonRepository.findOne({
            where: {
                id: request.body.id
            }
        });

        await lessonRepository.delete(lesson);
        response.send(`Lesson Deleted Id: ${request.body.id}`);
    } else {
        response.send(`You must be a professor to delete a lesson.`);
    }
}

export async function editLesson(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;

    if (await checkUserAllowed(userId ? userId : 0)) {
        const lessonRepository = getManager().getRepository(Lesson);
        const lesson = await lessonRepository.findOne({
            where: {
                id: request.body.id
            }
        });

        lesson.lessonName = body.lessonName;
        lesson.requiredLessons = body.requiredLessons;
        lesson.questions = body.questions;
        lesson.course = body.course

        await lessonRepository.save(lesson);
        response.send(lesson);

    } else {
        response.send(`You must be a professor to edit a lesson.`);
    }
}

export async function getLessonDetail(request: Request, response: Response) {
    var body = request.body;

    const lessonRepository = getManager().getRepository(Lesson);
    const lesson = await lessonRepository.findOne({
        where: {
            id: body.id
        },
        relations: ["questions"]
    });

    lesson.questions = await _.map(lesson.questions, (item) => {
        return {
            ...item,
            type: {
                type: item.type.type,
                data: item.type.data
            }
        }
    })
    response.send(lesson);
}

export async function getStudentLessons(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var courseId = request.body.courseId;

    const approvedLessonRepo = getManager().getRepository(ApprovedLesson);
    const lessonRepo = getManager().getRepository(Lesson);

    /* Get approved lessons of filtered by user */
    const approvedLessonList = await approvedLessonRepo.find({
        where: {
            user: {
                id: userId
            }
        },
        relations: ["lesson", "user"]
    });

    const lessons = await lessonRepo.createQueryBuilder("lesson")
        .leftJoinAndSelect("lesson.requiredLessons", "requiredLessons")
        .leftJoinAndSelect("lesson.course", "course")
        .getMany();

    /* Get lessons that can be accesed if its correlative lessons have been approved */
    var promiseLesonsArray = approvedLessonList.map((item) => {
        return new Promise(async (resolve) => {
            var availableLesson = await _.filter(lessons, (lesson) => {
                return _.some(lesson.requiredLessons, (requiredLesson) => {
                    return requiredLesson.id == item.lesson.id;
                })
            })

            /* Filter out lessons that belong to course of query */
            var lessonPerCourse = await _.filter(availableLesson, (lesson) => {
                return lesson.course.id == courseId;
            })
            resolve(lessonPerCourse);
        })
    })

    /* Get lessons that have not been approved and dont have any correlation */
    promiseLesonsArray.push(new Promise(async (resolve, reject) => {
        try {
            var lessonsWithoutRequirements = _.filter(lessons, (lesson) => {
                return _.isEmpty(lesson.requiredLessons);
            });

            /* Filter by course */
            var lessonsByCourse = _.filter(lessonsWithoutRequirements, (lesson) => {
                return lesson.course.id == courseId;
            });

            var filteredLessons = _.filter(lessonsByCourse, (lesson) => {
                return !_.some(approvedLessonList, (approvedLesson) => {
                    return approvedLesson.lesson.id === lesson.id
                })
            })
            resolve(filteredLessons)
        } catch (error) {
            reject(error)
        }
    }))

    Promise.all(promiseLesonsArray).then(async (value) => {
        /* Flatten array of promises */
        var availableLessons = [].concat.apply([], value);
        response.send({
            "availableLessons": availableLessons,
            "allLessons": lessons
        })
    }).catch((error) => {
        response.send(error)
    })
}

export async function takeLesson(request: Request, response: Response) {
    var userId = request.header('User-Id');
    var body = request.body;
    var lessonId = body.lessonId;
    var answersRequest = body.answers;

    const questionRepo = getManager().getRepository(Question);
    const answerRepo = getManager().getRepository(Answer);
    const userRepo = getManager().getRepository(User);
    const lessonRepo = getManager().getRepository(Lesson);
    const approvedLessonRepo = getManager().getRepository(ApprovedLesson);
    const approvedCourseRepo = getManager().getRepository(ApprovedCourse);
    const courseRepo = getManager().getRepository(Course);

    const questionList = await questionRepo.find({
        where: {
            lesson: {
                id: lessonId
            }
        },
        relations: ["lesson"]
    });

    /* Store the current total score: */
    var scoreRequest = 0;

    /* Check if all questions for a lesson have been answered. */
    if (questionList.length == answersRequest.length) {

        const user = await userRepo.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            response.send("Please use a valid User Id.")
        }

        const answerList = await answerRepo.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: ["question"]
        })

        /* Iterate over array submitted by the user */
        await _.each(answersRequest, async answer => {

            var questionInfo = await _.where(questionList, { id: answer.questionId })

            var answerDto = answerRepo.create();
            answerDto.question = _.first(questionInfo);
            answerDto.user = user;
            answerDto.score = 0
            answerDto.answer = {
                type: answer.type,
                data: answer.submittedAnswer
            }

            await _.some(questionInfo, async (question) => {
                /*
                    Check what type of answer comes from the request, possibilites are:
                        0 => Boolean
                        1 => Multiple choice where only one answer is correct
                        2 => Multiple choice where more than one answer is correct
                        3 => Multiple choice where more than one answer is correct and all of them must be answered correctly
                */
                switch (answer.type) {
                    case 0:
                        var answerValue = answer.submittedAnswer[0];
                        if (answerValue != null) {

                            if (answerValue == question.type.correctAnswer[0]) {
                                answerDto.score = answerValue == question.type.correctAnswer[0] ? question.score : 0;
                            }
                        }
                        break;
                    case 1:
                        if (answer.submittedAnswer.length == 1) {
                            var indexOfAnswer =

                                question.type.correctAnswer[0].toLowerCase().indexOf(
                                    answer.submittedAnswer[0].toLowerCase());

                            answerDto.score = indexOfAnswer != -1 ? question.score : 0;
                        }
                        break;
                    case 2:
                        if (answer.submittedAnswer.length >= 1) {
                            var filteredLessons = _.filter(question.type.correctAnswer, (lesson) => {
                                return _.some(answer.submittedAnswer, (approvedLesson) => {
                                    return approvedLesson.toLowerCase() === lesson.toLowerCase()
                                })
                            })
                            answerDto.score = filteredLessons.length * (question.score /
                                question.type.correctAnswer.length)
                        }
                        break;
                    case 3:
                        if (answer.submittedAnswer.length >= 1) {
                            var filteredLessons = _.filter(question.type.correctAnswer, (lesson) => {
                                return _.some(answer.submittedAnswer, (approvedLesson) => {
                                    return approvedLesson.toLowerCase() === lesson.toLowerCase()
                                })
                            })
                            answerDto.score = filteredLessons.length == question.type.correctAnswer.length ?
                                question.score : 0;
                        }
                        break;
                    default:
                        break;
                }

                /* Add score to accumulator variable */
                scoreRequest = scoreRequest + Number(answerDto.score);

                /* In case an answer is being resubmitted, edit it instead of adding another entry */
                var answersInDbList = await _.filter(answerList, (answer) => {
                    return answer.question.id == answer.questionId
                })

                if (answersInDbList.length > 0) {
                    var answerInDb = await _.first(answersInDbList)
                    answerDto.id = answerInDb.id;
                }

                try {
                    await answerRepo.save(answerDto)
                } catch (error) {
                    response.send(error)
                }
            })
        })

        /* Check if lesson was approved */
        var scoreNecessaryToPass = 0;
        await _.each(questionList, (question: Question) => {
            scoreNecessaryToPass = scoreNecessaryToPass + Number(question.score);
        })

        if (scoreNecessaryToPass == scoreRequest) {
            /* Check if user took this lesson before saving it */
            const approvedLessonInDbList = await approvedLessonRepo.find({
                where: {
                    user: {
                        id: userId
                    },
                    lesson: {
                        id: lessonId
                    }
                },
                relations: ["user", "lesson"]
            });

            if (approvedLessonInDbList.length == 0) {
                var approvedLesson = new ApprovedLesson();
                approvedLesson.approved = true;
                approvedLesson.lesson = (_.first(questionList)).lesson;
                approvedLesson.user = user;
                await approvedLessonRepo.save(approvedLesson);

                /* Update status of course in case user finishes of lessons of a course */
                const lessonInDb = await lessonRepo.findOne({
                    where: {
                        id: lessonId
                    },
                    relations: ["course"]
                });

                const course = await courseRepo.findOne({
                    where: {
                        id: lessonInDb.course.id
                    },
                    relations: ["lessons"]
                });

                const allApprovedLessonsInDb = await approvedLessonRepo.find({
                    where: {
                        user: {
                            id: userId
                        }
                    },
                    relations: ["user", "lesson"]
                });

                if (course.lessons.length == allApprovedLessonsInDb.length) {
                    var approvedCourse = new ApprovedCourse()
                    approvedCourse.course = course;
                    approvedCourse.approved = true;
                    approvedCourse.user = user;
                    approvedCourseRepo.save(approvedCourse)
                }
            }
        }
    } else {
        response.send("All questions must be answered.")
    }

    response.send({
        score: scoreRequest
    })
}