import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("Error: VITE_GEMINI_API_KEY is not defined in the .env file");
}

// Initialize the API correctly
const genAI = new GoogleGenerativeAI(apiKey);

// Configuration for the model
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192
};

async function run(prompt) {
  try {
    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Generate content with the model
    const result = await model.generateContent(prompt);
    
    // Get the response text
    const response = await result.response;
    const text = response.text();
    
    console.log("Generated Response:", text);
    return text;
    
  } catch (error) {
    console.error("Error generating text:", error);
    throw error; // Propagate error to be handled by the caller
  }
}

export default run;