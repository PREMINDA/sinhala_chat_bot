import { RefObject } from "react";

export enum Creator{
    User = 0,
    Bot  = 1
  }
  
export  interface MessageProps{
    text: string;
    user_input?:string;
    from: Creator;
    key:number;
    error?:boolean;
  }
  
export  interface InputProps{
    onSend: (text: string) => void;
    disabled: boolean;
  }

export enum UserComment{
  LIKE,
  UNLIKE,
  NO_COMMENT
}

export interface likeOption{
  rotaion?: string;
  onLikeClick:()=>void
}

export interface AutoScrolleDown{
  autoDown:(DivRef:React.RefObject<HTMLDivElement>)=>void
}


export interface PostCommment{
  onCommentPost:(text:string)=>void;
}

export interface CommentPayload{
  question?: string;
  chatbot_response: string;
  user_response: string;
}

export interface ReactionPayload{
  id?:string;
  question?: string;
  chatbot_response: string;
  reaction: string;
}

export interface SinhalaList{
  text:string;
  textNumber:number;
  location:number;
}

export interface AlertMessage{
  message:string;
  buttonClick: ()=>void;
}

export interface OnRecordEnd{
  recordEnd:(voice:string)=>void;
}
