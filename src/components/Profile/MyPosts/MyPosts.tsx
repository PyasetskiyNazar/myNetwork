import React from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import PostForm from './PostForm/PostForm';
import { useFormik } from 'formik'
import { PostsProfileType } from '../../../reducers/profileReducer';


type MapStateToPropsType = {
  posts: Array<PostsProfileType>  
  //post: PostsProfileType
}

type MapDispatchToPropsType = {
  addPosts: (postBody: string) => void
}


const MyPosts: React.FC<MapStateToPropsType & MapDispatchToPropsType> = React.memo((props) => {

  const postsElements = props.posts
    .map(post => (<Post message={post.message} key={post.id} likesCount={post.likesCount} />))

  const formik = useFormik({
    initialValues: {
      postBody: ''
    },
    onSubmit: (values, { resetForm }) => {
      props.addPosts(values.postBody);
      resetForm({ values: { postBody: '' } })
    }
  })

  return (

    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <PostForm formik={formik} />
      </div>
      {postsElements}
    </div>
  )
})

export default MyPosts;