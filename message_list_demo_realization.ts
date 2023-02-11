type MessageBody = unknown;

type ParseType = (msgBody: MessageBody) => boolean;

class InputController<T = string> {
  public inputTypes: Map<T, ParseType>;
  constructor() {
    this.inputTypes = new Map();
  }

  defineInputType(type: T, parseType: ParseType) {
    this.inputTypes.set(type, parseType);
  }

  async input(type: T, msg: MessageBody) {
    try {
      const parse = this.inputTypes.get(type);
      if (!parse)
        return Promise.reject(
          `not found: the message tpes [${type}] of parse function`
        );
      if (parse(msg)) {
        // 通知 message list 有新节点进来
        this.notify(new Message(msg))

      } else {
        return Promise.reject("parse fail");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  notify(node: Message) {
    
  }
}

class Message {
  private requestStatus: 'pending' | 'fulfilled' | 'rejecred'
  public data: unknown;
  public next: Message | null;
  public prev: Message | null;
  constructor(data: unknown) {
    this.requestStatus = 'pending'
    this.data = data;
    this.next = null;
    this.prev = null;
  }


}

class MessageList {
  public head: Message | null;
  public tail: Message | null;
  public list: Array<Message>;
  constructor() {
    this.head = null;
    this.tail = null;
    this.list = [];
  }


}


class ChatWindow {
  constructor() {
    // 会话列表
    // this.conversationList = null
    // 会话窗口
    // this.conversation = null

  }
}