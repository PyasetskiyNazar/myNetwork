
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessageType } from '../../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening, sendMessage } from './../../reducers/chatReduser';
import { AppStateType } from '../../redux-store/redux-store';

const ChatPage: React.FC = () => {
  return <div>
    <Chat />
  </div>
}

const Chat: React.FC = () => {

  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)


  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  return <div>
    {status === 'error' && <div>Some error occured. Please refresh page</div>}
    <>
      <Messages />
      <AddMessage />
    </>

  </div>
}

const Messages: React.FC<{}> = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setAutoScroll] = useState(false)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    var element = e.currentTarget
    if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {      
      !isAutoScroll && setAutoScroll(true)
    } else {
      isAutoScroll && setAutoScroll(false)
    }
  }

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])


  return <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
    {messages.map((m, index) => <ChatMessage key={index} message={m} />)}
    <div ref={messagesAnchorRef}></div>
  </div>
}



const ChatMessage: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
  console.log("ChatMessage render");
  
  return <div>
    <img src={message.photo} style={{ width: '30px' }} /> <b>{message.userName}</b>
    <br />
    {message.message}
    <hr />
  </div>
})

const AddMessage: React.FC<{}> = () => {

  const [message, setMessage] = useState('')
  //const [readyState, setReadyState] = useState<'ready' | 'pending'>('pending')
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)


  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    </div>
    <div>
      <button disabled={status === 'ready'} onClick={sendMessageHandler}>Send</button>
    </div>
  </div>
}

export default ChatPage