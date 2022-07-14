import { context, PersistentVector } from "near-sdk-as";
import { Message } from "./models";

@nearBindgen
export class Contract {

  allMessages: PersistentVector<Message> = new PersistentVector<Message>("a");

  @mutateState()
  submitMessage(content: string, receiver: string): Message {
    let sender: string = context.sender;
    let message: Message = new Message(content, sender, receiver);
    this.allMessages.push(message)

    return message;
  }

  // this will return metadata about the vector not the data inside it
  // getMessages(): PersistentVector<Message> {
  //   return this.allMessages
  // }

  getAllMessages(): Array<Message> {
    let messagesCount: i32 = this.allMessages.length
    let allMessages: Array<Message> = new Array<Message>(messagesCount);
    for (let i = 0; i < messagesCount; i++) {
      allMessages[i] = this.allMessages[i]
    }
    return allMessages
  }

  getUserMessages(): Array<Message> {
    let messagesCount: i32 = this.allMessages.length
    let allUserMessages: Array<Message> = new Array<Message>();
    for (let i = 0; i < messagesCount; i++) {
      if (context.sender == this.allMessages[i].receiver) {
        allUserMessages.push(this.allMessages[i])
      }
    }
    return allUserMessages
  }

}