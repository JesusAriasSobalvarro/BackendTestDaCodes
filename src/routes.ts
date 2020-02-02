import { CourseRoutes } from "./routes/courseRoutes";
import { LessonRoutes } from "./routes/lessonRoutes";
import { QuestionRoutes } from "./routes/questionRoutes";


/**
 * All application routes.
 */
export const AppRoutes = [
    ...CourseRoutes,
    ...LessonRoutes,
    ...QuestionRoutes
];