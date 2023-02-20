import { Creator, MessageProps } from '@/interfaces/models'
import Image from 'next/image'

const ChatMessage = ({text, from }:MessageProps) => {
  return (
    <>
      {from == Creator.User &&(
          <div className='rounded-xl p-4 mb-8 flex gap-4 items-start whitespace-pre-wrap'>
            <div className='h-8 w-8 rounded-full bg-blue-500' />
            <p className='text-white' >{text}</p>
          </div>
      )}
      {from == Creator.Bot &&(
          <div className='bg-chbg rounded-lg mb-8 p-4 flex gap-4 whitespace-pre-wrap items-start'>
            <div className='h-8 w-8 max-w-full min-h-8 max-h-8 rounded-full bg-green-500' />
            <p className='text-white w-11/12 text-justify' >{text}</p>
          </div>
      )}
    </>
  );
};


export default ChatMessage;