import { ReactNode } from "react";

export enum FormQuery {
  ADD_COURSE = "add-course",
}

export interface FormConfig {
  query: FormQuery;
  title: string;
  form: ReactNode;
  is_student_allow: boolean;
}

export const forms: FormConfig[] = [
  {
    query: FormQuery.ADD_COURSE,
    title: "Создание курса",
    form: "",
    is_student_allow: false,
  },
];
