import { ProfileType } from '../../common/Types';
import ProfileContacts from './ProfileContacts';

type PropsType = {
      profile: ProfileType
      isOwner: boolean
      goToEditMode: () => void
}

const ProfileData: React.FC<PropsType> = (props) => {
      const { profile, isOwner, goToEditMode } = props

      return (
            <div>
                  {isOwner && <div>
                        <button onClick={goToEditMode}>Edit</button>
                  </div>}
                  <div>
                        <b>Full name: </b>{profile.fullName}
                  </div>
                  {profile.lookingForAJob ?
                        <>
                              <div>
                                    <b>Looking For A Job: </b> <b>{'Yes'}</b>
                              </div>
                              <div>
                                    <b>My Professional skills: </b>{profile.lookingForAJobDescription}
                              </div> </> : null}

                  <div>
                        <b>About Me: </b>{profile.aboutMe}
                  </div>
                  <div>
                        <b>Contacts: </b>{Object.keys(profile.contacts).map(
                              key => <ProfileContacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                        )}
                  </div>
            </div>
      )
}
export default ProfileData;