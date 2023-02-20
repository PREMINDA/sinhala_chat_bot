export enum Creator{
    User = 0,
    Bot  = 1
  }
  
export  interface MessageProps{
    text: string;
    from: Creator;
    key:number;
  }
  
export  interface InputProps{
    onSend: (text: string) => void;
    disabled: boolean;
  }
  