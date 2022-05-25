import { ChatMessageType, StatusType } from "../api/chat-api";

export const actions = {
  messagesResived: (messages: ChatMessageType[]) => ({ type: 'APP/MESSAGES_RESIVED', payload: {messages} } as const),
  changedStatus: (status: StatusType) => ({ type: 'APP/CHANGED_STATUS', payload: {status} } as const)
}