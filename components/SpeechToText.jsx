import React, { useContext, useState } from "react";
import dynamic from 'next/dynamic';
import { SpeechContext } from "./context";

const SpeechToText = () => {
  const [transcription, setTranscription] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const {setInput} = useContext(SpeechContext);

 const handleStart = () => {
    setIsAnimating(true);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'si';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscription(result);
      setInput(result);
    }

    recognition.onerror = (event) => {
      console.error(event.error);
    }
  }

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  }

  return (
    <div className="inline-block">
      <button
        onClick={handleStart}
        className={isAnimating ? 'animate-pulse' : ''}
        onAnimationEnd={handleAnimationEnd}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 12a3 3 0 116 0v3a3 3 0 01-6 0v-3zm-3 0a6 6 0 1112 0v3a6 6 0 01-12 0v-3z" />
          <path fillRule="evenodd" d="M10 2a8 8 0 018 8v3a1 1 0 11-2 0v-3a6 6 0 10-12 0v3a1 1 0 11-2 0v-3a8 8 0 018-8zm-6 8a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

export default SpeechToText;