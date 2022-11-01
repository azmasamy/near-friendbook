@nearBindgen
export class Message{
  content:string;
  sender:string;
  receiver:string;
  
  constructor(contect:string, sender:string, receiver:string) {
    this.content = contect
    this.sender = sender
    this.receiver = receiver
  }
}