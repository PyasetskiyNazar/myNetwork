import React, { useEffect } from 'react';
import Profile from './../components/Profile/Profile';
import { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, updateUserProfile } from '../reducers/profileReducer'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import withAuthNavigate from './../components/HOC/withAuthNavigate';
import { compose } from 'redux'
import { PhotosType, ProfileType } from '../components/common/Types';
import { AppStateType } from '../redux-store/redux-store';

type MapStateToPropsType = {
  profile: ProfileType
  status: string
  authorizedUserId: number
  updateProfileError: string
}

type PropsType = {
  // ownerId?: number | null
  // userId: number | null
  getUserProfile: (userId: number) => void
  updateUserStatus: (status: string) => void
  updateUserPhoto: (photo: PhotosType) => void
  getUserStatus: (userId: number) => void
  updateUserProfile: (profile: ProfileType) => Promise<void>

}

const ProfileContainer: React.FC<MapStateToPropsType & PropsType> = (props) => {
  let { userId } = useParams();
  let isOwner: boolean = true
  let currentUserId: number = Number(userId)

  if (!userId) {
    isOwner = false;
    currentUserId = props.authorizedUserId;
  }

  useEffect(() => {
    props.getUserProfile(currentUserId);
    props.getUserStatus(currentUserId)
  }, [userId])

  return (
    <Profile {...props}
      isOwner={!isOwner}
      profile={props.profile}
      status={props.status}
      updateUserStatus={props.updateUserStatus}
      updateUserPhoto={props.updateUserPhoto}
      updateUserProfile={props.updateUserProfile}
      updateProfileError={props.updateProfileError}
    />
  )
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  updateProfileError: state.profilePage.updateProfileError
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, updateUserPhoto, updateUserProfile }),
  withAuthNavigate
)(ProfileContainer);