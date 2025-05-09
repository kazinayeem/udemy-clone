"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCourseDescription = void 0;
const genai_1 = require("@google/genai");
const GEMINI_API_KEY = "AIzaSyCU_3pVcZZOwqBh448m-G7NduL613sQ63M";
const ai = new genai_1.GoogleGenAI({ apiKey: GEMINI_API_KEY });
function isBangla(text) {
    return /[\u0980-\u09FF]/.test(text);
}
function cleanGeneratedHTML(text) {
    return text
        .replace(/^```html\s*/i, "") // Remove ```html at start
        .replace(/^```\s*/i, "") // Or just ```
        .replace(/```$/i, "") // Remove ending ```
        .replace(/<\/?html>/gi, "") // Remove <html> and </html>
        .replace(/<\/?body>/gi, "") // Remove <body> and </body>
        .trim();
}
const generateCourseDescription = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: "Course title is required." });
        return;
    }
    const lang = isBangla(title) ? "Bangla" : "English";
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash-001",
            contents: `
      Generate a detailed, engaging, and informative course description for the course titled: "${title}".
      
      Instructions:
      - Detect the language of the title (Bangla or English) and write the full description in that same language.
      - Use that language consistently throughout — do not mix languages.
      - Format the response as clean HTML without any <html>, <body>, or code block (e.g., \`\`\`) wrappers.
      - Structure the content for direct use in a Quill rich text editor (use paragraphs, bullet points, and headings if needed).
      - Begin with an engaging introduction that explains what the course is about.
      - Clearly explain why the course is important and relevant — who it's for, what career or skill benefits it offers.
      - Use emojis/icons like ✅ 🚀 💡 📱 🎯 to make key points more visually engaging.
      - Make the tone helpful, motivating, and student-focused.
      - Do NOT include any markdown or code formatting — output only plain HTML.
      `,
        });
        const response = await result.text;
        const html = cleanGeneratedHTML(response || "");
        res.status(200).json({ description: html });
    }
    catch (error) {
        console.error("Error generating course description:", error);
        res.status(500).json({ error: "Failed to generate course description" });
        return;
    }
};
exports.generateCourseDescription = generateCourseDescription;
