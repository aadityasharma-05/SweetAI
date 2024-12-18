

import React, { createContext, useState, useEffect } from "react";
import run from '../Config/Gemini.js';

const Context = createContext();

const ContextProvider = (props) => {
  const [exampleState, setExampleState] = useState("Hello from Context!");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to send a prompt and store the response
  const onSent = async (prompt) => {
    try {
      setLoading(true);
      setError(null);
      const result = await run(prompt);
      setResponse(result);
      console.log("Response:", result);
    } catch (error) {
      console.error("Error sending prompt:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    onSent("What is ReactJS?");
  }, []); 

  const contextValue = {
    exampleState,
    setExampleState,
    response,
    onSent,
    loading,
    error
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
