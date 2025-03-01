import Image from "next/image";
import Link from "next/link";
import Tag from "../Tag";

const hotQuestions = [
    { _id: 1, title: "How do I use express as a custom server in NextJS?" },
    { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
    { _id: 3, title: "How to Perfectly Center a Div with Tailwind CSS?" },
    {
        _id: 4,
        title: "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
];

const popularTags = [
    { _id: "1", name: "javascript", totalQuestions: 5 },
    { _id: "2", name: "react", totalQuestions: 5 },
    { _id: "3", name: "next", totalQuestions: 5 },
    { _id: "4", name: "vue", totalQuestions: 2 },
    { _id: "5", name: "redux", totalQuestions: 10 },
];

const RightSidebar = () => {
    return (
        <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-l p-3 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden xl:w-[330px] 2xl:w-[370px]">
            <div className="flex flex-col">
                <div>
                    <h3 className="h3-bold text-dark200_light900">Hot Questions</h3>
                    <div className="mt-7 flex w-full flex-col gap-5">
                        {hotQuestions.map((question, index) => (
                            <Link
                                key={question._id}
                                href={"/"}
                                className="hover:background-light800_dark400 rounded-lg p-3"
                            >
                                <div className="flex items-center gap-4">
                                    <Image
                                        src={
                                            (index + 1) % 2
                                                ? "/assets/icons/questionmark-square-hot.svg"
                                                : "/assets/icons/questionmark-square-cold.svg"
                                        }
                                        alt={"questionmark"}
                                        width={24}
                                        height={24}
                                        className="h-6 w-6"
                                    />
                                    <p className="text-dark500_light700">{question.title}</p>
                                    <Image
                                        src="/assets/icons/chevron-right.svg"
                                        alt={"questionmark"}
                                        width={20}
                                        height={20}
                                        className="invert-colors"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-16">
                    <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
                    <div className="mt-7 flex w-full flex-col gap-5">
                        {popularTags.map((tag) => (
                            <Tag
                                key={tag._id}
                                _id={tag._id}
                                name={tag.name}
                                totalQuestions={tag.totalQuestions}
                                showCount
                                className="hover:background-light800_dark400 items-center rounded-lg p-3"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RightSidebar;
