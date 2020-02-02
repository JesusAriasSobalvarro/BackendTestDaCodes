import { getAllLessons, postLesson, deleteLesson, editLesson, getLessonDetail, getStudentLessons, takeLesson } from "./../controller/LessonController"

/**
 * All lesson routes.
 */
export const LessonRoutes = [
    {
        path: "/allLessons",
        method: "get",
        action: getAllLessons
    },
    {
        path: "/studentLessons",
        method: "get",
        action: getStudentLessons
    },
    {
        path: "/getLessonDetail",
        method: "get",
        action: getLessonDetail
    },
    {
        path: "/createLesson",
        method: "post",
        action: postLesson
    },
    {
        path: "/takeLesson",
        method: "post",
        action: takeLesson
    },
    {
        path: "/deleteLesson",
        method: "delete",
        action: deleteLesson
    },
    {
        path: "/editLesson",
        method: "put",
        action: editLesson
    }
];