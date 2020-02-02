import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Answer } from "./Answer";
import { User } from "./User";
import { Course } from "./Course";

@Entity()
export class ApprovedCourse {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    approved: boolean;

    @ManyToOne(type => User, user => user.approvedCourses)
    user: User

    @ManyToOne(type => Course, course => course.approvedCourses)
    course: Course
}