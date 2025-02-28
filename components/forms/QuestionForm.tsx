"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeProvider";
import { createQuestion } from "@/lib/actions/question.action";
import { questionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreatableMultiSelect } from "../CreatableMultiSelect";
import { Button } from "../ui/button";

interface QuestionFormProps {
    edit?: boolean;
    userId: string;
}

const QuestionForm = ({ edit, userId }: QuestionFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const { theme } = useTheme();

    const router = useRouter();

    const editorRef = useRef(null);

    const form = useForm<z.infer<typeof questionSchema>>({
        resolver: zodResolver(questionSchema),
        defaultValues: {
            title: "",
            explanation: "",
            tags: [],
        },
    });

    // used to get rid of console error Warning: Prop id did not match. Server: "react-select-2-live-region" Client: "react-select-3-live-region" error
    useEffect(() => setIsMounted(true), []);

    async function onSubmit(values: z.infer<typeof questionSchema>) {
        setIsSubmitting(true);
        try {
            await createQuestion({ ...values, authorId: JSON.parse(userId) });
            router.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Question Title <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Input
                                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Be specific and imagine you&apos;re asking a question to another
                                person.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="explanation"
                    render={({ field }) => (
                        <FormItem className="flex w-full flex-col gap-3">
                            <FormLabel className="paragraph-semibold text-dark400_light800">
                                Detailed explanation of your problem{" "}
                                <span className="text-primary-500">*</span>
                            </FormLabel>
                            <FormControl className="mt-3.5">
                                <Editor
                                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                                    // @ts-ignore
                                    onInit={(evt, editor) => {
                                        // @ts-ignore
                                        editorRef.current = editor;
                                    }}
                                    onBlur={field.onBlur}
                                    // @ts-ignore
                                    onEditorChange={(content) => field.onChange(content)}
                                    initialValue=""
                                    init={{
                                        height: 350,
                                        menubar: false,
                                        plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "preview",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "codesample",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                        ],
                                        toolbar:
                                            "undo redo | " +
                                            "codesample | bold italic forecolor | alignleft aligncenter |" +
                                            "alignright alignjustify | bullist numlist",
                                        content_style:
                                            "body { font-family:Inter; font-size:16px; }",
                                        skin: theme === "dark" ? "oxide-dark" : "",
                                        content_css: theme === "dark" ? "dark" : "",
                                    }}
                                />
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                                Introduce the problem and expand on what you put in the title.
                                Minimum 20 characters.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                />
                {isMounted && (
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                                <FormLabel className="paragraph-semibold text-dark400_light800">
                                    Tags <span className="text-primary-500">*</span>
                                </FormLabel>
                                <FormControl className="mt-3.5">
                                    <CreatableMultiSelect
                                        {...field}
                                        options={[]}
                                        className="!min-h-[56px] px-3 py-1"
                                        classNamePrefix="react-select"
                                        onChange={(selectedOption) => {
                                            const tags = selectedOption.map((tag) => tag.value);
                                            field.onChange(tags);
                                        }}
                                        value={field.value.map((tag) => ({
                                            value: tag,
                                            label: tag,
                                        }))}
                                        hideDropdownIndicator={true}
                                        noOptionsMessage={() => "Start typing to create a tag"}
                                    />
                                </FormControl>
                                <FormDescription className="body-regular mt-2.5 text-light-500">
                                    Add up to 3 tags to describe what your question is about. Press
                                    enter to add a tag or click &quot;create&quot;.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                )}
                <Button
                    type="submit"
                    className="primary-gradient w-fit !text-light-900"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>{edit ? "Editing..." : "Posting..."}</>
                    ) : (
                        <>{edit ? "Edit Question" : "Ask a Question"}</>
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default QuestionForm;
