import { getTimeAgo } from "@/lib/date";
import { formatAndDivideNumber } from "@/lib/utils";
import { Question } from "@/types";
import Link from "next/link";
import Metric from "../shared/Metric";
import Tag from "../Tag";

interface QuestionCardProps {
    question: Question;
}

const QuestionCard = ({
    question: { _id, title, tags, author, upvotes, views, answers, createdAt },
}: QuestionCardProps) => {
    return (
        <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                    <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
                        {getTimeAgo(createdAt)}
                    </span>
                    <Link href={`/question/${_id}`}>
                        <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                            {title}
                        </h3>
                    </Link>
                </div>

                {/* If signed in add edit delete actions */}
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag key={tag._id} _id={tag._id} name={tag.name} />
                ))}
            </div>

            <div className="flex-between mt-6 w-full flex-wrap gap-3">
                <Metric
                    imgUrl="/assets/icons/avatar.svg"
                    alt="user"
                    value={author.name}
                    title={` - asked ${getTimeAgo(createdAt)}`}
                    href={`/profile/${author._id}`}
                    isAuthor
                    textStyles="body-medium text-dark400_light700"
                />
                <div className="flex-center gap-3">
                    <Metric
                        imgUrl="/assets/icons/like.svg"
                        alt="Upvotes"
                        value={formatAndDivideNumber(upvotes)}
                        title=" Votes"
                        isAuthor
                        textStyles="small-medium text-dark400_light800"
                    />
                    <Metric
                        imgUrl="/assets/icons/message.svg"
                        alt="message"
                        value={formatAndDivideNumber(answers.length)}
                        title=" Answers"
                        textStyles="small-medium text-dark400_light800"
                    />
                    <Metric
                        imgUrl="/assets/icons/eye.svg"
                        alt="eye"
                        value={formatAndDivideNumber(views)}
                        title=" Views"
                        textStyles="small-medium text-dark400_light800"
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
