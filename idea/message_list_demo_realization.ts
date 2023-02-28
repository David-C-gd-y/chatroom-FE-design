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


// <template #dropdown>
// <el-dropdown-menu>
//   <!-- v-if="item.mute != 1 && item.username !== loginUserId && !item.owner && !isGroupAdmin(item.username) && !item.admin"  -->
//   <el-dropdown-item 
//     v-if="item.mute != 1 && item.username !== loginUserId" 
//     @click="mute(item)">禁言</el-dropdown-item>
//   <el-dropdown-item 
//     v-if="item.mute == 1 && item.username !== loginUserId" 
//     @click="delMute(item)">解除禁言</el-dropdown-item>
//   <el-dropdown-item v-if="item.username !== loginUserInfo.username" @click="atMember(item)">@他（她）</el-dropdown-item>
//   <el-dropdown-item @click="memberDetail(item)">查看详情</el-dropdown-item>
//   <el-dropdown-item v-if="item.username !== loginUserInfo.username" @click="conversation(item)">发起会话</el-dropdown-item>
//   <el-dropdown-item 
//     v-if="item.mute != 1 && item.username !== loginUserId"
//     @click="getOut(item)">移出群聊</el-dropdown-item>
// </el-dropdown-menu>
// <!-- <el-dropdown-menu v-else>
//   <el-dropdown-item v-if="item.username !== loginUserInfo.username" @click="atMember(item)">@他（她）</el-dropdown-item>
//   <el-dropdown-item @click="memberDetail(item)">查看详情</el-dropdown-item>
//   <el-dropdown-item v-if="item.username !== loginUserInfo.username" @click="conversation(item)">发起会话</el-dropdown-item>
// </el-dropdown-menu> -->
// </template>