"use server";

import Question from "@/database/models/question.model";
import Tag from "@/database/models/tag.model";
import { connectToDatabase } from "../mongodb-connect";

export async function createQuestion(params: any) {
    try {
        connectToDatabase();

        const { title, explanation, tags, author, _path } = params;

        const question = await Question.create({
            title,
            explanation,
            author,
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
