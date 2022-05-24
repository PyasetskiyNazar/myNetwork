import React from 'react';
import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { useFormik } from 'formik'

import { InitialStateType } from '../../reducers/dialogsReducer';

type PropsType = {
    dialogsPage: InitialStateType,
    handleAddNewMessage: (messageText: string) => void    
}


const Dialogs: React.FC<PropsType> = (props) => {

    const state = props.dialogsPage;

    const dialogsElements = state.dialogs
        .map(dialog => (<DialogItem id={dialog.id} name={dialog.name} key={dialog.id} />))

    const messagesElements = state.messages
        .map(message => (<Message text={message.message} key={message.id} />))

    const formik = useFormik({
        initialValues: {
            messageBody: ''
        },
        onSubmit: (values, { resetForm }) => {
            //alert(JSON.stringify(values, null, 2));
            props.handleAddNewMessage(values.messageBody);
            resetForm({ values: { messageBody: '' } });
        }
    });

    return (

        <div className={classes.dialogs} >
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <MessageForm formik={formik} />
            </div>
        </div >
    )
}

export default Dialogs;