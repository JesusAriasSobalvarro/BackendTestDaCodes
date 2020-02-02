import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Answer } from "./Answer";
import { ApprovedCourse } from "./ApprovedCourse";
import { ApprovedLesson } from "./ApprovedLesson";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @OneToMany(type => Answer, answer => answer.user)
    answers: Answer[]

    @OneToMany(type => ApprovedCourse, approvedCourse => approvedCourse.user)
    approvedCourses: ApprovedCourse[]

    @OneToMany(type => ApprovedLesson, approvedLesson => approvedLesson.user)
    approvedLessons: ApprovedLesson[]
}