import React from 'react';
import classes from './Post.module.css'

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.item}>
            <img alt='postImage' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx4CtTjcL4KC9GoJ_BTx5R1UmktoHM2fSYIg&usqp=CAU" />
            {props.message}
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>

    )
}

export default Post;