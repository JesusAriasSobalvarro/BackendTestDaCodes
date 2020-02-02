import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinTable} from "typeorm";
import { Course } from "./Course";
import { Question } from "./Question";
import { ApprovedLesson } from "./ApprovedLesson";

@Entity()
export class Lesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lessonName: string;

    @JoinTable()
    @ManyToMany(type => Lesson, lesson => lesson.id)
    requiredLessons: Lesson[];

    @ManyToOne(type => Course, course => course.lessons)
    course: Course;

    @OneToMany(type => Question, question => question.lesson)
    questions: Question[]

    @OneToMany(type => ApprovedLesson, approvedLesson => approvedLesson.lesson)
    approvedLessons: ApprovedLesson[]
}
