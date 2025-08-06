const { GoogleGenAI } = require("@google/genai");
const { questionAnswerPrompt } = require("../utils/prompts");
const { conceptExplainPrompt } = require("../utils/prompts.js");


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// @desc generateInterviewQuestions
// @route POST /api/ai/generate-questions
// @access Private


const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.models.generateContent({
            model: "gemini-1.5-pro-latest",
            contents: prompt,
        })

        let rawText = response.text;

        // clean it :remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/i, '')       // Remove opening ```json (case-insensitive)
            .replace(/```[\s]*$/, '')          // Remove closing ``` (with optional trailing spaces)
            .trim();

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
};



// @desc Genrate explains a interview question
// @route POST /api/ai/generate-explanation
// @access Private

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Missing required field" });
        }

        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model: "gemini-1.5-pro-latest",
            contents: prompt,
        })

        let rawText = response.text;

        // clean it :remove ```json and ``` from beginning and end
        const cleanedText = rawText
            .replace(/^```json\s*/i, '')       // Remove opening ```json (case-insensitive)
            .replace(/```[\s]*$/, '')          // Remove closing ``` (with optional trailing spaces)
            .trim();

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    }catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message,
        })
    }
}

module.exports = { generateConceptExplanation, generateInterviewQuestions }