import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    explanation: string;
    tags: Schema.Types.ObjectId[];
    views: number;
    upvotes: Schema.Types.ObjectId[];
    downvotes: Schema.Types.ObjectId[];
    author: Schema.Types.ObjectId;
    answers: Schema.Types.ObjectId[];
    createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
    title: { type: String, required: true },
    explanation: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
    createdAt: { type: Date, default: Date.now },
});

const Question = models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;
