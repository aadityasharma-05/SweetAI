import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log("API Key exists:", !!apiKey);
console.log("API Key length:", apiKey ? apiKey.length : 0);

if (!apiKey) {
  console.error("Error: VITE_GEMINI_API_KEY is not defined in the .env file");
  throw new Error("API key is missing");
}

// Initialize the API correctly
const genAI = new GoogleGenerativeAI(apiKey);

// Configuration for the model
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  console.log("🚀 Starting API call with prompt:", prompt);
  
  try {
    // Get the model - using gemini-1.5-flash as it's more reliable
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig 
    });
    
    console.log("✅ Model initialized successfully");
    
    // Generate content with the model
    console.log("📤 Sending request to Gemini API...");
    const result = await model.generateContent(prompt);
    
    console.log("📥 Received response from Gemini API");
    console.log("Raw result:", result);
    
    // Get the response text
    const response = await result.response;
    console.log("Response object:", response);
    
    const text = response.text();
    console.log("✅ Generated Response:", text);
    
    if (!text || text.trim() === '') {
      throw new Error("Empty response received from API");
    }
    
    return text;
    
  } catch (error) {
    console.error("❌ Error in run function:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error object:", error);
    
    // Check for specific error types
    if (error.message.includes('API_KEY_INVALID')) {
      throw new Error("Invalid API key. Please check your Gemini API key.");
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      throw new Error("API quota exceeded. Please check your billing or try again later.");
    } else if (error.message.includes('MODEL_NOT_FOUND')) {
      throw new Error("Model not found. The specified model may not be available.");
    } else if (error.message.includes('SAFETY')) {
      throw new Error("Content was blocked by safety filters. Please try rephrasing your prompt.");
    } else {
      throw new Error(`API Error: ${error.message}`);
    }
  }
}

export default run;