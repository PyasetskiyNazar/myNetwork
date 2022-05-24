import React from 'react';

import classes from './PostForm.module.css'

type PropsType = {
    formik: any
}

const PostForm: React.FC<PropsType> = (props) => {
    const formik = props.formik
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <textarea
                    name="postBody"
                    type="text"
                    placeholder="Enter new post message"
                    value={formik.postBody}
                    onChange={formik.handleChange} 
                    {...formik.getFieldProps('postBody')}
                />
            </div>
            <div>
                <button className={classes.AddButton} >Add Post</button>
            </div>
        </form>
    )
}

export default PostForm;