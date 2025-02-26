import { formatDistanceToNow } from "date-fns";

export function getTimeAgo(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
}
