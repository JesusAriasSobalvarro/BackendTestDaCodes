import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { Question } from "./Question";
import { User } from "./User"

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-json")
    answer: {
        type: number,
        data: string[],
    }

    @Column("decimal", { precision: 5, scale: 2 })
    score: number;

    @ManyToOne(type => Question, question => question.answers)
    question: Question;

    @ManyToOne(type => User, user => user.answers)
    user: User;
}