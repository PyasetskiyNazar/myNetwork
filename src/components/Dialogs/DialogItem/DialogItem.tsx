import  React  from 'react';
import { NavLink } from 'react-router-dom';
import classes from './DialogItem.module.css'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {

    return (
        <div className={`${classes.dialog} ${classes.active}`}>
            <NavLink
                className={dialogData => dialogData.isActive ? classes.activeDialog : classes.dialog}
                to={"/dialogs/" + props.id} > {props.name}
            </NavLink>
        </div>
    )
}

export default DialogItem;