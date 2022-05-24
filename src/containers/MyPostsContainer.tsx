import MyPosts from './../components/Profile/MyPosts/MyPosts';
import { connect } from 'react-redux';
import { actions } from './../actions/profileActions';
import { AppStateType } from '../redux-store/redux-store';
import { PostsProfileType } from '../reducers/profileReducer';

type MapStateToPropsType = {
  posts: Array<PostsProfileType>
  newPostText: string
  auth: boolean
}

type MapDispatchToPropsType = {
  addPosts: (postBody: string) => void
}

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    auth: state.auth.isAuth
  }
}

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
  addPosts: actions.actionAddPost
})(MyPosts)

export default MyPostsContainer;