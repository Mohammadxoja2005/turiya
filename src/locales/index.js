import { LANGUAGE } from "../tools/constats";
import { eng } from "./eng";
import { rus } from "./rus";
import { uzb } from "./uzb";

export const getLanguage = () => {
  return localStorage.getItem(LANGUAGE);
};

export const getText = (word) => {
  return getLanguage() === "uzb"
    ? uzb[word]
    : getLanguage() === "rus"
    ? rus[word]
    : eng[word];
};
