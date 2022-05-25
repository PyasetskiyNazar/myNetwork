import { BaseThunkType, InferActionsType } from '../redux-store/redux-store';
import { ChatMessageType, StatusType } from '../api/chat-api';
import { actions } from './../actions/chatActions';
import { chatAPI } from './../api/chat-api';
import { Dispatch } from 'redux';


let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType 
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesResived(messages))
    }
  }
  return _newMessageHandler
}

let _newStatusChangedHandler: ((status: StatusType) => void) | null = null
const newStatusChangedHandler = (dispatch: Dispatch) => {
  if (_newStatusChangedHandler === null) {
    _newStatusChangedHandler = (status) => {
      dispatch(actions.changedStatus(status))
    }
  }
  return _newMessageHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-recived', newMessageHandler(dispatch))
  chatAPI.subscribe('status-changed', newStatusChangedHandler(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-recived', newMessageHandler(dispatch))
  chatAPI.unsubscribe('status-changed', newStatusChangedHandler(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async () => {
  chatAPI.sendMessage(message)
}

// reducer receives only part of the state required only by this current reducer
const chatReducer = (state = initialState, action: ActionsType) => {

  switch (action.type) {
    case 'APP/MESSAGES_RESIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages].slice(-100)
      };
    case 'APP/CHANGED_STATUS':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state;
  }
}
export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


export default chatReducer;