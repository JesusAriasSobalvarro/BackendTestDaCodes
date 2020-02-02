import { getAllCourses, postCourse, deleteCouse, editCourse, getStudentCourses } from "./../controller/CourseController";


/**
 * All course routes.
 */
export const CourseRoutes = [
    {
        path: "/allCourses",
        method: "get",
        action: getAllCourses
    },
    {
        path: "/studentCourses",
        method: "get",
        action: getStudentCourses
    },
    {
        path: "/createCourse",
        method: "post",
        action: postCourse
    },
    {
        path: "/deleteCourse",
        method: "delete",
        action: deleteCouse
    },
    {
        path: "/editCourse",
        method: "put",
        action: editCourse
    }
];