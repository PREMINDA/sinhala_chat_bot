import { AutoScrolleDown } from '@/interfaces/models';
import React, { useRef } from 'react'

function AutoScroll<T>(OriginalComponent:React.ComponentType<T & AutoScrolleDown>){
    function AutoDown(DivRef:React.RefObject<HTMLDivElement>){
        const myDiv = DivRef.current;
        if (myDiv) {
            myDiv.scrollTo({ top: myDiv.scrollHeight });
            myDiv.addEventListener('DOMSubtreeModified', () => {
                myDiv.scrollTo({ top: myDiv.scrollHeight });
            });
        }
    }
    const NewComponent=(props:T)=>{
        return <OriginalComponent {...props} autoDown={AutoDown}/>
    }

    return NewComponent;
    
}
export default AutoScroll;