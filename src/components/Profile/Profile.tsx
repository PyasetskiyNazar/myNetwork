import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './../../containers/MyPostsContainer';
import { PhotosType, ProfileType } from '../common/Types';


type PropsType = {
  updateUserPhoto: (photos: PhotosType) => void
  isOwner: boolean
  profile: ProfileType
  status: string
  updateUserStatus: (status: string) => void
  updateUserProfile: (profile: ProfileType) => Promise<any>
  updateProfileError: string
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        updateUserPhoto={props.updateUserPhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        updateUserProfile={props.updateUserProfile}
        updateProfileError={props.updateProfileError}
      />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;