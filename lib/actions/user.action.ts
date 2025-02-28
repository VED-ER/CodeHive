import User from "@/database/models/user.model";
import { connectToDatabase } from "../mongodb-connect";

export async function getUserById({ id }: any) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ clerkId: id });

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
