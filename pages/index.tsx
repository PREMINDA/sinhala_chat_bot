import { Inter } from '@next/font/google'
import { Creator, MessageProps } from '@/interfaces/models'
import useState from 'react-usestateref'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'
import styles from '@/styles/Home.module.css'
import Alert from '@/components/Alert'
import Modal from '@/components/Modal'
import { useRef } from 'react'



const inter = Inter({ subsets: ['latin'] })
var test:MessageProps[] = [{text: "test", from: Creator.User, key: 1}, 
{text: "JavaScript often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third", from: Creator.Bot, key: 2}
,{text: "test", from: Creator.User, key: 3},
 {text: "JavaScript often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third", from: Creator.Bot, key: 4}
];

export default function Home() {
  const [message, setMessage, messageRef] = useState<MessageProps[]>(test);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState<string>('');
  const DivRef = useRef<HTMLDivElement>(null);

  const AutoDown=()=>{
    const myDiv = DivRef.current;
    if (myDiv) {
      myDiv.scrollTo({ top: myDiv.scrollHeight });
      myDiv.addEventListener('DOMSubtreeModified', () => {
          myDiv.scrollTo({ top: myDiv.scrollHeight });
      });
    }
  }

  const onAlertClick=()=>{
    setError(false);
  }

  const callApi = async (input:string) =>{
    setLoading(true);
    const myMessage: MessageProps = { text: input, from: Creator.User, key: new Date().getTime(), error:false };
    setMessage([...messageRef.current, myMessage]);


    const res = await fetch(`${process.env.NEXT_PUBLIC_CHAT_BOT_API}/chat/ask`, {method:'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({text: input})
    }).then((res) => res.json()).catch((error:any)=>{
      const message = "Somthing Went Wrong Try Again...!"
      const botMessage: MessageProps = { text: message ,user_input: input, from: Creator.Bot, key: new Date().getTime(), error:true };
      setMessage([...messageRef.current, botMessage]);
      setErrorMessage(error.message)
      setError(true);
    });



    setLoading(false);

    if(res){
      const botMessage: MessageProps = { text: res.response,user_input: input, from: Creator.Bot, key: new Date().getTime(), error:false };
      setMessage([...messageRef.current, botMessage]);
    }
    AutoDown();
  }

  return (
    <>
      <main  ref={DivRef} className='bg-thembg h-screen scroll-smooth overflow-y-auto'>
        <div className='relative max-w-4xl mx-auto h-full flex flex-col justify-between'>
          <div className='px-4 pt-10'>
            {message && message.map((item) => { return <ChatMessage key={item.key} from={item.from} user_input={item.user_input} text={item.text} error={item.error}/> })}
            {message.length==0&&<p className='text-center text-gray-400'>I am at your Service</p>}
          </div>
          <div className='sticky bottom-0 w-full px-4 z-12'>
            <div className={styles.inputBg}>
            <ChatInput onSend={(input)=>callApi(input)} disabled={loading}/>
            </div>
          </div>
        </div>
      </main>
      {error &&
       <Modal>
        <Alert message={errorMessage} buttonClick={onAlertClick}></Alert>
      </Modal>
      }
    </>
  )
}
