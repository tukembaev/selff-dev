import { LucidePenSquare } from "lucide-react";
import {
  LuBook,
  LuBrain,
  LuDollarSign,
  LuFlaskConical,
  LuGlobe,
  LuCalculator,
  LuQuote,
} from "react-icons/lu";

export const genreStyles = {
  history: {
    bgClass: "bg-amber-50/50 dark:bg-amber-950/10",
    borderClass: "border-amber-300 dark:border-amber-700",
    icon: (
      <LuBook className="w-8 h-8 text-amber-500/70 dark:text-amber-400/70" />
    ),
  },
  mathematics: {
    bgClass: "bg-blue-50/50 dark:bg-blue-950/10",
    borderClass: "border-blue-300 dark:border-blue-700",
    icon: (
      <LuCalculator className="w-8 h-8 text-blue-500/70 dark:text-blue-400/70" />
    ),
  },
  programming: {
    bgClass: "bg-gray-50/50 dark:bg-gray-950/10",
    borderClass: "border-gray-300 dark:border-gray-700",
    icon: (
      <LuQuote className="w-8 h-8 text-gray-500/70 dark:text-gray-400/70" />
    ),
  },
  philosophy: {
    bgClass: "bg-purple-50/50 dark:bg-purple-950/10",
    borderClass: "border-purple-300 dark:border-purple-700",
    icon: (
      <LuBrain className="w-8 h-8 text-purple-500/70 dark:text-purple-400/70" />
    ),
  },
  science: {
    bgClass: "bg-teal-50/50 dark:bg-teal-950/10",
    borderClass: "border-teal-300 dark:border-teal-700",
    icon: (
      <LuFlaskConical className="w-8 h-8 text-teal-500/70 dark:text-teal-400/70" />
    ),
  },
  literature: {
    bgClass: "bg-rose-50/50 dark:bg-rose-950/10",
    borderClass: "border-rose-300 dark:border-rose-700",
    icon: (
      <LucidePenSquare className="w-8 h-8 text-rose-500/70 dark:text-rose-400/70" />
    ),
  },
  economics: {
    bgClass: "bg-red-50/50 dark:bg-red-950/10",
    borderClass: "border-red-100 dark:border-red-700",
    icon: (
      <LuDollarSign className="w-8 h-8 text-red-500/70 dark:text-red-400/70" />
    ),
  },
  psychology: {
    bgClass: "bg-indigo-50/50 dark:bg-indigo-950/10",
    borderClass: "border-indigo-300 dark:border-indigo-700",
    icon: (
      <LuBrain className="w-8 h-8 text-indigo-500/70 dark:text-indigo-400/70" />
    ),
  },
  culture: {
    bgClass: "bg-green-50/50 dark:bg-green-950/10",
    borderClass: "border-green-300 dark:border-green-700",
    icon: (
      <LuGlobe className="w-10 h-10 text-green-500/70 dark:text-green-400/70" />
    ),
  },
};
