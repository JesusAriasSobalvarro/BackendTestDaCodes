import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Question } from "./../entity/Question";

export async function getAllQuestions(request: Request, response: Response) {
    const questionRepository = getManager().getRepository(Question);
    const questions = await questionRepository.find();
    response.send(questions);
}

export async function postQuestion(request: Request, response: Response) {
    var body = request.body;

    const questionRepository = getManager().getRepository(Question);
    const question = await questionRepository.create(body);

    await questionRepository.save(question);
    response.send(question);
}

export async function deleteQuestion(request: Request, response: Response) {
    await getManager().getRepository(Question)
        .createQueryBuilder("")
        .delete()
        .where("id = :id", { id: request.body.id })
        .execute();
    response.send(`Question Deleted Id: ${request.body.id}`);
}

export async function editQuestion(request: Request, response: Response) {
    var body = request.body;

    const questionRepository = getManager().getRepository(Question);
    const question = await questionRepository.findOne({
        where: {
            id: request.body.id
        }
    });

    question.question = body.question;
    question.score = body.score;
    question.type = body.type;

    await questionRepository.save(question);
    response.send(question);
}