import React, { createContext, useState } from "react";
import run from '../Config/Gemini.js';

const Context = createContext();

const ContextProvider = (props) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [recentprompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Function to send a prompt and store the response
  const onSent = async (prompt) => {
    console.log("🎯 onSent called with prompt:", prompt);
    
    if (!prompt || !prompt.trim()) {
      console.log("❌ Empty prompt, returning");
      return;
    }

    try {
      console.log("🔄 Setting loading state");
      setLoading(true);
      setError(null);
      setRecentPrompt(prompt);
      setShowResult(true);
      setResponse(""); // Clear previous response

      console.log("📞 Calling run function...");
      const result = await run(prompt);
      
      console.log("✅ Got result from run:", result);
      setResponse(result);
      
    } catch (error) {
      console.error("❌ Error in onSent:", error);
      setError(error.message);
      setResponse(`Error: ${error.message}`);
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  };

  // Test function to check if API is working
  const testAPI = async () => {
    console.log("🧪 Testing API...");
    try {
      const result = await run("Say hello!");
      console.log("✅ API Test successful:", result);
      return result;
    } catch (error) {
      console.error("❌ API Test failed:", error);
      throw error;
    }
  };

  const contextValue = {
    onSent,
    response,
    loading,
    error,
    input,
    setInput,
    recentprompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    testAPI, // Add test function
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };