"use server";

import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongodb-connect";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";

export async function fetchQuestions(_params: GetQuestionsParams) {
    try {
        await connectToDatabase();

        const questions = Question.find({})
            .populate({ path: "tags", model: Tag })
            .populate({ path: "author", model: User })
            .sort({ createdAt: -1 });

        return questions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createQuestion(params: CreateQuestionParams) {
    try {
        await connectToDatabase();

        const { title, explanation, tags, authorId } = params;

        const question = await Question.create({
            title,
            explanation,
            author: authorId,
        });

        const tagDocuments = [];

        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag.trim()}$`, "i") } },
                { $setOnInsert: { name: tag }, $push: { question: question._id } },
                { upsert: true, new: true }
            );

            tagDocuments.push(existingTag._id);
        }

        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocuments } },
        });
    } catch (error) {
        console.error(error);
    }
}
