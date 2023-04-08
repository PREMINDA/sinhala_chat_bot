import { InputProps } from "@/interfaces/models";
import { useState, createContext } from "react";
import SpeechToText from "./SpeechToText";
import { SpeechContext } from "./context";




const ChatInput = ({ onSend, disabled }: InputProps) => {
   const [input, setInput] = useState<string>("");

   const sendInput = () => {
      if (input.trim() === '' || disabled) return;
      onSend(input);
      setInput('');
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         sendInput();
      }
   }

   return (
      <SpeechContext.Provider value={{input,setInput}}> 
      <div className="bg-white border-2 p-2 rounded-lg flex justify-center">
         <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 px-3 text-gray-800 rounded-lg focus:outline-none"
            type="text"
            placeholder="Ask me anything..."
            disabled={disabled}
            onKeyDown={handleKeyDown}
         />
         {disabled && (
            <div className="flex items-center justify-center opacity-50">
               <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                     className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                  >Loading...</span
                  >
               </div>
            </div>
         )}{!disabled && (
            <button
            className="flex justify-center items-center"
               onClick={() => sendInput()}
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-send w-6 h-6 mr-2 opacity-50 " viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 
                  0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 
                  0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 
                  10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                  />
               </svg>
            </button>)}
            {<SpeechToText />}
      </div>
      </ SpeechContext.Provider > 
   )
}

export default ChatInput;