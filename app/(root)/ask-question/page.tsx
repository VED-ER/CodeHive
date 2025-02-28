import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
    // const {userId} =await auth()
    const userId = "clerk_123456";

    if (!userId) {
        return redirect("/sign-in");
    }

    const mongoUser = await getUserById({ id: userId });

    return (
        <div>
            <h1 className="h1-bold text-dark100_light900">Ask a public question</h1>
            <div className="mt-9">
                <QuestionForm userId={JSON.stringify(mongoUser._id)} />
            </div>
        </div>
    );
};

export default AskQuestion;
