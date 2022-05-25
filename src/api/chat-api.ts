let subscribers = {
  'messages-recived': [] as MessagesRecivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
  console.log('close sw');
  setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-recived'].forEach(s => s(newMessages))
}
const openHandler = () => {
  notifySubscriberAboutStatus('ready')
}

const errorHandler = () => {
  notifySubscriberAboutStatus('error')
  console.error('REFRESH PAGE')
}

const cleanUP = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

const notifySubscriberAboutStatus = (status: StatusType) => {
  subscribers["status-changed"].forEach(s=> s(status))
}

function createChannel() {
  cleanUP()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscriberAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
}


export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    subscribers['messages-recived'] = []
    subscribers['status-changed'] = []
    cleanUP()
    ws?.close()
  },
  subscribe(event: EventNamesType, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType | null) {
    // @ts-ignore
    subscribers[event].push(callback)
    return () => {
      // @ts-ignore
      subscribers[event] = subscribers[event].filter(s => s !== callback)
    }
  },
  unsubscribe(event: EventNamesType, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType | null) {
    // @ts-ignore
    subscribers[event] = subscribers[event].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}

type MessagesRecivedSubscriberType = (messages: ChatMessageType[]) => void 
type StatusChangedSubscriberType = (status: StatusType) => void 

export type StatusType = 'pending' | 'ready' | 'error'
type EventNamesType = 'messages-recived' | 'status-changed'

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}