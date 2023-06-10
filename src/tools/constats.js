// export const API_PATH = "https://dilshodev.uz/api/v1/";

const language = localStorage.getItem("turiya-language");

export const API_PATH = `https://dilshodev.uz/${!language ? "ru" : language}/api/v1/`;

// export const API_PATH = `https://dilshodev.uz/api/v1`;

// export const API_PATH = "http://95.130.227.110/api/v1/";

// export const API_PATH = "http://185.217.131.162/api/v1/";
// export const API_PATH = "http://192.168.1.62:8000/api/v1/";

export const LANGUAGE = "turiya-language";
export const USER_TOKEN = "turiya";
