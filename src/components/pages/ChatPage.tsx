
import { useEffect, useState } from 'react';
const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: React.FC = () => {
  return <div>
    <Chat />
  </div>
}

const Chat: React.FC = () => {
  return <div>
    <Messages />
    <AddMessage />
  </div>
}

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<Array<ChatMessageType>>([])
  useEffect(() => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  }, [])


  return <div style={{ height: '400px', overflowY: 'auto' }}>
    {messages.map((m, index) => <ChatMessage key={index} message={m} />)}
  </div>
}

type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return <div>
    <img src={message.photo} style={{ width: '30px' }} /> <b>{message.userName}</b>
    <br />
    {message.message}
    <hr />
  </div>
}

const AddMessage: React.FC = () => {

  const [message, setMessage] = useState('')
  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel.send(message)
    setMessage('')
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    </div>
    <div>
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
}

export default ChatPage