import { InferActionsType } from "../redux-store/redux-store"

export const actions = {
    actionAddMessage: (text: string) => ({ type: 'dialogs/ADD_MESSAGE', text } as const)
}
type ActionsType = InferActionsType<typeof actions>

export type DialogsActionType = {
    id: number
    name: string
}
 export type MessagesActionType = {
    id: number
    message: string
}

export type InitialStateType = typeof initialState

let initialState = {
    dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Sacha" },
        { id: 3, name: "Danulo" },
        { id: 4, name: "Ivanka" },
        { id: 5, name: "Petro" },
        { id: 6, name: "Yaroslava" }
    ] as Array<DialogsActionType>,
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hello" },
        { id: 3, message: "How is your day?" },
        { id: 4, message: "Ok" }
    ] as Array<MessagesActionType>
}

// reducer receives only part of the state required only by this current reducer
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'dialogs/ADD_MESSAGE':
            let messageId: number = state.messages.length + 1;
            return {
                ...state,
                messages: [...state.messages, { id: messageId, message: action.text }]
            };
        default:
            return state;
    }
}

export default dialogsReducer;