import { Creator, MessageProps, UserComment , CommentPayload, ReactionPayload} from '@/interfaces/models'
import Image from 'next/image'
import ChatInput from './ChatInput'
import CommentInput from './CommentInput';
import{LikeSvgOutlinr,LikeSvgFill} from './likeSvg'
import { useState } from "react";




const ChatMessage = ({text, from, user_input,error }:MessageProps) => {

  const [inputUnlike,setInputUnlike] = useState<UserComment>(UserComment.NO_COMMENT);
  const [inputlike,setInputlike] = useState<UserComment>(UserComment.NO_COMMENT);
  const [isCommentDisable,setIsCommentDisable] = useState<boolean>(false);
  const [isReactionDisable,SetIsReactionDisable] = useState<boolean>(false);

  const apiCallonCommentPost =async (user_comment:string)=>{
    var payload : CommentPayload = {user_response:user_comment,question: user_input,chatbot_response:text}
    setIsCommentDisable(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_BOT_API}/feedback/create-response`, {method:'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload)
    }).then((res) => res.json());
    console.log(res);                                
  }

  const apiCallonReaction=async(reaction:UserComment)=>{
    var userReaction:string = UserComment[reaction];
    var payload: ReactionPayload = {question:user_input,reaction:userReaction,chatbot_response:text};
    console.log(process.env.NEXT_PUBLIC_CHAT_BOT_API);
    if(!(reaction == UserComment.NO_COMMENT)){
      SetIsReactionDisable(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_BOT_API}/feedback/create-rate`, {method:'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(payload)
    }).then((res) => res.json());
    }
    
  }

  const stateChangeLike=(reaction:UserComment)=>{
    if(!isReactionDisable){
      if(inputUnlike == UserComment.NO_COMMENT){
        setInputlike(reaction);
      }else{
        setInputlike(UserComment.LIKE);
        setInputUnlike(UserComment.NO_COMMENT);
      }
      apiCallonReaction(reaction);
    }
  }

  const stateChangeUnLike=(reaction:UserComment)=>{
    if(!isReactionDisable){
      if(inputlike == UserComment.NO_COMMENT){
        setInputUnlike(reaction);
      }else{
        setInputlike(UserComment.NO_COMMENT);
        setInputUnlike(UserComment.UNLIKE);
      }
      apiCallonReaction(reaction);
    }
}


  return (
    <>
      {from == Creator.User &&(
          <div className='rounded-xl p-4 mb-8 flex gap-4 items-start whitespace-pre-wrap'>
            <div className='h-8 w-8 rounded-full bg-blue-500' />
            <p className={`text-justify w-11/12 text-white`} >{text}</p>
          </div>
      )}
      {from == Creator.Bot &&(
          <div className='bg-chbg rounded-lg mb-8 p-4 flex flex-col gap-4 whitespace-pre-wrap items-start'>
            <div className='flex gap-4 w-full'>
              <div className='h-8 w-8 min-h-8 min-w-8 rounded-full bg-green-500' />
              <p className={`ext-justify w-11/12 ${error?'text-red-600':'text-white'}`} >{text}</p>
            </div>
            {!error &&
              <div className='flex gap-4 justify-end w-full'>
                {
                  inputlike == UserComment.NO_COMMENT?
                  <LikeSvgOutlinr onLikeClick={()=>stateChangeLike(UserComment.LIKE)} rotaion = 'rotate-0'/>:
                  <LikeSvgFill onLikeClick={()=>stateChangeLike(UserComment.NO_COMMENT)} rotaion='rotate-0'/>
                }
                
                {
                  inputUnlike == UserComment.NO_COMMENT?
                  <LikeSvgOutlinr onLikeClick={()=>stateChangeUnLike(UserComment.UNLIKE)} rotaion = 'rotate-180'/>:
                  <LikeSvgFill onLikeClick={()=>stateChangeUnLike(UserComment.NO_COMMENT)} rotaion='rotate-180'/>
                }
              </div>   
            }
            {!isCommentDisable && inputUnlike == UserComment.UNLIKE&&<CommentInput onCommentPost={(userComment)=>apiCallonCommentPost(userComment)}/>}
            {isCommentDisable && <h3 className='w-full flex justify-center text-slate-300 font-medium'>Thanks For Your Resposne</h3>}
          </div>
      )}
    </>
  );
};


export default ChatMessage;