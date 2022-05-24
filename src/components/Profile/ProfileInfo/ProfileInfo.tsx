import React, { useState } from 'react';
import classes from './ProfileInfo.module.css'
import imageForProfile from '../../../images/13966693.jpg';
import userNoImage from '../../../images/sinessman-avatar.jpg';
import Preloader from './../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileData from './ProfileData';
import ProfileDataForm from './ProfileDataForm';
import { PhotosType, ProfileType } from '../../common/Types';

type PropsType = {
    updateUserPhoto: (photos: PhotosType) => void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateUserStatus: (status: string) => void
    updateUserProfile: (profile: ProfileType) => Promise<any>
    updateProfileError: string    
}

const ProfileInfo: React.FC<PropsType> = (props) => {
    const { isOwner, profile, updateProfileError } = props;
    let [editMode, setEditMode] = useState(false);

    const onChangePhoto = (e: any) => {
        if (e.currentTarget.files.length) {
            props.updateUserPhoto(e.currentTarget.files[0])
        }
    }

    if (!props.profile) {
        return (
            <>
                <div className={classes.imageForProfile}>
                    <img alt="imageProfile" src={imageForProfile} />
                </div>
                <Preloader />
            </>
        )
    }

    return (
        <div>
            <div className={classes.imageProfile}>
                <img alt="imageProfile" src={imageForProfile} />
            </div>

            <div className={classes.profileDescription}>
                <div>
                    <div>
                        <img className={classes.avatarImage} src={!props.profile.photos.large && !profile.photos.small ? userNoImage : profile.photos.small} alt="imageUserProfile" />
                    </div>
                    <div>{isOwner ? <input onChange={onChangePhoto} type={"file"} /> : null}</div>
                    <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
                    {editMode ?
                        <ProfileDataForm
                            goOutEditMode={() => setEditMode(false)}
                            profile={profile}
                            updateUserProfile={props.updateUserProfile}
                            updateProfileError={updateProfileError}
                        /> :
                        <ProfileData isOwner={isOwner}
                            goToEditMode={() => setEditMode(true)}
                            profile={profile}
                        />
                    }
                </div>

            </div>
        </div>
    )
}

export default ProfileInfo;