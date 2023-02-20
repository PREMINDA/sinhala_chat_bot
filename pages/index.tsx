import { Inter } from '@next/font/google'
import { Creator, MessageProps } from '@/interfaces/models'
import useState from 'react-usestateref'
import ChatMessage from '@/components/ChatMessage'
import ChatInput from '@/components/ChatInput'


const inter = Inter({ subsets: ['latin'] })
var test:MessageProps[] = [{text: "test", from: Creator.User, key: 1}, {text: "JavaScript often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third", from: Creator.Bot, key: 2},{text: "test", from: Creator.User, key: 3}, {text: "JavaScript often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third", from: Creator.Bot, key: 4}];

export default function Home() {
  const [message, setMessage, messageRef] = useState<MessageProps[]>(test);
  const [loading, setLoading] = useState(false);

  const callApi = async (input:string) =>{
    setLoading(true);
    const myMessage: MessageProps = { text: input, from: Creator.User, key: new Date().getTime() };
    setMessage([...messageRef.current, myMessage]);
    
    // const res = await fetch('/api/hello', {method:'POST',
    //   headers: {'Content-Type': 'application/json'}, 
    //   body: JSON.stringify({text: input})
    // }).then((res) => res.json());

    // setLoading(false);

    // if(res){
    //   const botMessage: MessageProps = { text: res.text, from: Creator.Bot, key: new Date().getTime() };
    //   setMessage([...messageRef.current, botMessage]);
    // }else{
    //   //show error
    // }

    
  }


  return (
    <main className='bg-thembg'>
    <div className='relative max-w-4xl mx-auto h-screen flex flex-col justify-between'>
      <div className='px-4 pt-10 '>
        {message && message.map((item) => { return <ChatMessage key={item.key} from={item.from} text={item.text}/> })}
        {message.length==0&&<p className='text-center text-gray-400'>I am at your Service</p>}
      </div>
      <div className='sticky bottom-0 w-full pb-10 px-4'>
        <ChatInput onSend={(input)=>callApi(input)} disabled={loading}/>
      </div>
    </div>
    </main>
  )
}
