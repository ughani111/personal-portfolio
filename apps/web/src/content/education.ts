import type { Certification, Education, Language } from "@/types/portfolio";

export const educationEntries = [
  {
    degree: "Bachelor of Computer Science",
    focus: "Network and Software Engineering",
    institution: "Allama Iqbal Open University",
    period: "2008 - 2012",
    published: true
  }
] satisfies Education[];

export const certifications = [] satisfies Certification[];

export const languages = [
  {
    label: "English",
    proficiency: "Advanced professional proficiency"
  },
  {
    label: "German",
    proficiency: "B1/B2 certified; continuing development"
  },
  {
    label: "Urdu",
    proficiency: "Native"
  },
  {
    label: "Pashto",
    proficiency: "Native or fluent"
  },
  {
    label: "Punjabi",
    proficiency: "Conversational or fluent"
  }
] satisfies Language[];
