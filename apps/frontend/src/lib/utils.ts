import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTimeAgo = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
