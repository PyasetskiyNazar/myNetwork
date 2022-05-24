import React from 'react';
import classes from './Message.module.css'

type PropsType = {
    text: string
}

const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.message}>
            {props.text}
        </div>)
}

export default Message;