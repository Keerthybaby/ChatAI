// import { GoogleGenAI, HarmCategory, HarmBlockThreshold } from "@google/genai";

// const safetySettings = [
//   {
//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
//   },
// ];

// const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
//   safetySettings,
// });

// export default model;

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_PUBLIC_KEY});

export default ai;