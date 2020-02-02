import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable} from "typeorm";
import { Lesson } from "./Lesson";
import { ApprovedCourse } from "./ApprovedCourse";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    courseName: string;

    @JoinTable()
    @ManyToMany(type => Course, course => course.id)
    requiredCourses: Course[];

    @OneToMany(type => Lesson, lesson => lesson.course)
    lessons: Lesson[]

    @OneToMany(type => ApprovedCourse, approvedCourse => approvedCourse.course)
    approvedCourses: ApprovedCourse[]
}