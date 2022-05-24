import profileReducer from './../reducers/profileReducer';
import dialogsReducer from './../reducers/dialogsReducer';
import sidebarReducer from './../reducers/sidebarReducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hello Peater", likesCount: 1 },
                { id: 2, message: "Hello Tom", likesCount: 10 },
                { id: 3, message: "How are you?", likesCount: 20 },
                { id: 4, message: "I am fine", likesCount: 8 }
            ],
            newPostText: ""
        },
        dialogsMessages: {
            dialogs: [
                { id: 1, name: "Dima" },
                { id: 2, name: "Sacha" },
                { id: 3, name: "Danulo" },
                { id: 4, name: "Ivanka" },
                { id: 5, name: "Petro" },
                { id: 6, name: "Yaroslava" }
            ],
            messages: [
                { id: 1, message: "Hello" },
                { id: 2, message: "Hello" },
                { id: 3, message: "How is your day?" },
                { id: 4, message: "Ok" }
            ],
            newMessageBodyText: ""

        },
        sidebar: {}
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("state changed")
    },

    subscribe(observer) {
        this._callSubscriber = observer;  // pattern observer
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsMessages = dialogsReducer(this._state.dialogsMessages, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);       

    }
}

export default store;
window.store = store; // store OOP


