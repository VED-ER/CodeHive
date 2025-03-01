import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TagProps {
    _id: string;
    name: string;
    totalQuestions?: number;
    showCount?: boolean;
    className?: string;
}
const Tag = ({ _id, name, showCount, totalQuestions, className }: TagProps) => {
    return (
        <Link href={`/tags/${_id}`} className={cn("flex justify-between gap-2", className)}>
            <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
                {name}
            </Badge>

            {showCount && <p className="small-medium text-dark500_light700">{totalQuestions}</p>}
        </Link>
    );
};

export default Tag;
