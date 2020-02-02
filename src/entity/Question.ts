import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Lesson } from "./Lesson";
import { Answer } from "./Answer"

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column("decimal", { precision: 5, scale: 2 })
    score: number;

    @Column("simple-json")
    type: {
        type: number,
        data: string[],
        correctAnswer: string[],
    }

    @ManyToOne(type => Lesson, lesson => lesson.questions)
    lesson: Lesson

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[]

}