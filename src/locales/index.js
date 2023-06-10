import { LANGUAGE } from "../tools/constats";
import { en } from "./eng";
import { ru } from "./rus";
import { uz } from "./uzb";

export const getLanguage = () => {
  return localStorage.getItem(LANGUAGE);
};

export const getText = (word) => {
  return getLanguage() === "uz"
    ? uz[word]
    : getLanguage() === "ru"
      ? ru[word]
      : en[word];
};
