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
    <div className="flex justify-center items-center">
      <button
        onClick={handleStart}
        className={`${isAnimating ? 'animate-pulse' : ''} ${isAnimating?'bg-red-700':'bg-slate-300' } w-8 h-8 rounded-md`}
        onAnimationEnd={handleAnimationEnd}
      >
          <svg className={` bi bi-send w-8 h-8 mr-2 opacity-40 p-1 rounded-md`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z"/>
          </svg>
      </button>
    </div>
  );
}

export default SpeechToText;