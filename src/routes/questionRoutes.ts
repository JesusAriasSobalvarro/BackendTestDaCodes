import { getAllQuestions, postQuestion, deleteQuestion, editQuestion } from "./../controller/QuestionController"

/**
 * All question routes.
 */
export const QuestionRoutes = [
    {
        path: "/allQuestions",
        method: "get",
        action: getAllQuestions
    }, 
    {
        path: "/createQuestion",
        method: "post",
        action: postQuestion
    },
    {
        path: "/deleteQuestion",
        method: "delete",
        action: deleteQuestion
    },
    {
        path: "/editQuestion",
        method: "put",
        action: editQuestion
    }
];