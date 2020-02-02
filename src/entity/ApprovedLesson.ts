import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";
import { Course } from "./Course";
import { Lesson } from "./Lesson";

@Entity()
export class ApprovedLesson {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    approved: boolean;

    @ManyToOne(type => User, user => user.approvedLessons)
    user: User

    @ManyToOne(type => Lesson, lesson => lesson.approvedLessons)
    lesson: Lesson
}