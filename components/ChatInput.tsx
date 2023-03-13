import { InputProps } from "@/interfaces/models";
import { useEffect, useMemo, useRef} from "react";
import useState from 'react-usestateref'
import SinhalaListview from "./SinhalaListview";

const ChatInput = ({onSend, disabled}:InputProps) => {
   const[input,setInput] = useState('');
   const[miniInput,setMiniInput1] = useState('');
   const[list,setList,listRef] = useState<string[]>([]);
   const ref1 = useRef<HTMLInputElement>(null);
   const ref2 = useRef<HTMLInputElement>(null);
   const ref3 = useRef<HTMLInputElement>(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const [isBackSpce,setIsBackSpce] = useState<boolean>(false);

   

   

   const sendInput = () => {
      onSend(input);
      setInput('');
   };
   
   const handleKeyDownInput = (e:React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
         sendInput();
      }
      if(e.key === ' '){
         setInput(input+' ')
         ref2.current?.focus();
      }
      if(e.key === 'Backspace'){
         setIsBackSpce(true);
         ref2.current?.focus();
      }else{
         setIsBackSpce(false);
      }
   }

   const handleKeyDownList = (e:React.KeyboardEvent<HTMLInputElement>) => {
      if(list.length>0){
         if(e.key === 'Enter'){
            ref2.current?.focus();
            setInput(input+' '+list[activeIndex]);
            setMiniInput1('');
            setActiveIndex(0); 
            setList([]);
         }
         if(e.key === ' '){
            ref2.current?.focus();
            setInput(input+' '+list[activeIndex]);
            setMiniInput1('');
            setActiveIndex(0);
            setList([]);
         }
   
         if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prevIndex) =>
              prevIndex === 0 ? list.length - 1 : prevIndex - 1
            );
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prevIndex) =>
              prevIndex === list.length - 1 ? 0 : prevIndex + 1
            );
          }
      }
   }

   const sinhalaType=(userInput:string)=>{
      setMiniInput1(userInput);
      
      let googleTransliterate = require('google-input-tool');
   
      
      setList([]);
      googleTransliterate(new XMLHttpRequest(), userInput, 'si-t-i0-und', 4).then(function (response: any) {
            response.forEach((element:string[],index:number) => {
               if(index == 4)return;
               setList([...listRef.current,element[0]]);
            });
      })
   }

   const mainInput=(letter:string)=>{
      if(!isBackSpce){
         setMiniInput1('');
         setMiniInput1(lastWord(letter));
         ref1.current?.focus();
      }else{
         setInput(letter)
      }
   }

   const lastWord =(words:string)=>{
      var n = words.split(" ");
      return n[n.length - 1];
  }

   return (
   <div>
      <div>
         <input onKeyDown={handleKeyDownList} style= {{width: `${miniInput.length}ch`}} className = "text-gray-800 focus:outline-none" value={miniInput} onChange={(e) => sinhalaType(e.target.value)} ref={ref1} type="text"/>
         <>
            <div ref={ref3} className="bg-white w-fit">
               {list && list.map((element:string,index:number)=>{
                return  <SinhalaListview key={index} location={index} textNumber={activeIndex} text={element}/>
               })}
            </div>
         </>
      </div>
    <div className="bg-white border-2 p-2 rounded-lg flex justify-center"> 
        <input 
            ref= {ref2}
            value={input}
            onKeyDown={handleKeyDownInput}
            onChange={(e) => {mainInput(e.target.value);}}
            className = "w-full p-2 px-3 text-gray-800 rounded-lg focus:outline-none"
            type="text"
            placeholder="Ask me anything..."
            disabled={disabled}
            
        />
        {disabled && (
            <div className="flex items-center justify-center opacity-50">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...
              </span
              >
            </div>
          </div>
        )}{!disabled && (
        <button
         onClick={()=>sendInput()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-send w-6 h-6 mr-2 opacity-50" viewBox="0 0 16 16"> 
               <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 
                  0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 
                  0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 
                  10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
               /> 
            </svg>
        </button>)}
    </div>
    </div>
   )
}

export default ChatInput;