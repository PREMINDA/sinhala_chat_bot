import { Creator, MessageProps, UserComment , CommentPayload, ReactionPayload} from '@/interfaces/models'
import Image from 'next/image'
import ChatInput from './ChatInput'
import CommentInput from './CommentInput';
import{LikeSvgOutlinr,LikeSvgFill} from './likeSvg'
import { useState } from "react";




const ChatMessage = ({text, from, user_input }:MessageProps,) => {

  const [inputUnlike,setInputUnlike] = useState<UserComment>(UserComment.NO_COMMENT);
  const [inputlike,setInputlike] = useState<UserComment>(UserComment.NO_COMMENT);

  const apiCallonCommentPost = (user_comment:string)=>{
    var payload : CommentPayload = {user_response:user_comment,question: user_input,chatbot_response:text}
    console.log(payload);                                
  }

  const apiCallonReaction=()=>{
    var userReaction:string;
    if(inputlike == UserComment.LIKE)userReaction = UserComment[UserComment.LIKE];
    else if(inputUnlike == UserComment.UNLIKE)userReaction = UserComment[UserComment.UNLIKE];
    else userReaction = UserComment[UserComment.NO_COMMENT];
    
    var payload: ReactionPayload = {question:user_input,reaction:userReaction,chatbot_response:text}
    console.log(payload);
  }

  const stateChangeLike=()=>{
    if(inputUnlike == UserComment.NO_COMMENT){
      inputlike == UserComment.LIKE?setInputlike(UserComment.NO_COMMENT):setInputlike(UserComment.LIKE);
    }else{
      setInputlike(UserComment.LIKE);
      setInputUnlike(UserComment.NO_COMMENT);
    }
    console.log(UserComment[inputlike]);
    apiCallonReaction();
  }

  const stateChangeUnLike=()=>{
    if(inputlike == UserComment.NO_COMMENT){
      inputUnlike == UserComment.UNLIKE?setInputUnlike(UserComment.NO_COMMENT):setInputUnlike(UserComment.UNLIKE);
    }else{
      setInputlike(UserComment.NO_COMMENT);
      setInputUnlike(UserComment.UNLIKE);
    }
    apiCallonReaction();
}

  return (
    <>
      {from == Creator.User &&(
          <div className='rounded-xl p-4 mb-8 flex gap-4 items-start whitespace-pre-wrap'>
            <div className='h-8 w-8 rounded-full bg-blue-500' />
            <p className='text-white' >{text}</p>
          </div>
      )}
      {from == Creator.Bot &&(
          <div className='bg-chbg rounded-lg mb-8 p-4 flex flex-col gap-4 whitespace-pre-wrap items-start'>
            <div className='flex gap-4 w-full'>
              <div className='h-8 w-8 min-h-8 min-w-8 rounded-full bg-green-500' />
              <p className='text-white text-justify' >{text}</p>
            </div>
            <div className='flex gap-4 justify-end w-full'>
              {
                inputlike == UserComment.NO_COMMENT?
                <LikeSvgOutlinr onLikeClick={()=>stateChangeLike()} rotaion = 'rotate-0'/>:
                <LikeSvgFill onLikeClick={()=>stateChangeLike()} rotaion='rotate-0'/>
              }
              
              {
                inputUnlike == UserComment.NO_COMMENT?
                <LikeSvgOutlinr onLikeClick={()=>stateChangeUnLike()} rotaion = 'rotate-180'/>:
                <LikeSvgFill onLikeClick={()=>stateChangeUnLike()} rotaion='rotate-180'/>
              }
            </div>
            {inputUnlike == UserComment.UNLIKE&&<CommentInput onCommentPost={(userComment)=>apiCallonCommentPost(userComment)}/>}
          </div>
      )}
    </>
  );
};


export default ChatMessage;