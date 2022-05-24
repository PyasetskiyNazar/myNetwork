import { Formik, Form, Field, ErrorMessage } from 'formik';
import classes from './ProfileDataForm.module.css'
import * as Yup from 'yup'
import { ProfileType } from '../../common/Types';


type OptionalObjectSchema = {
    fullName: string
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
}

type PropsType = {
    profile: ProfileType
    updateUserProfile: (profile: ProfileType) => Promise<void>
    updateProfileError: string
    goOutEditMode: () => void
}

const ProfileDataForm: React.FC<PropsType> = (props) => {
    const { profile, updateUserProfile, goOutEditMode, updateProfileError } = props

    const initialValues = {
        photos: profile.photos,
        userId: profile.userId,
        fullName: profile.fullName,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        aboutMe: profile.aboutMe,
        lookingForAJob: profile.lookingForAJob,
        contacts: {
            facebook: profile.contacts.facebook,
            website: profile.contacts.website,
            vk: profile.contacts.vk,
            twitter: profile.contacts.twitter,
            instagram: profile.contacts.instagram,
            youtube: profile.contacts.youtube,
            github: profile.contacts.github,
            mainLink: profile.contacts.mainLink
        }

    }
    const onSubmit = (values: ProfileType) => {

        updateUserProfile(values).then(
            () => { goOutEditMode() }
        )        
    }

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Required'),
        lookingForAJobDescription: Yup.string().required('Required'),
        lookingForAJob: Yup.string().required('Required'),

    })
        
    return (
        <>
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className={classes.formControl}>
                        <label htmlFor="fullName"><b>Full Name</b></label>
                        <Field placeholder="Full name"
                            name="fullName"
                            type="text"
                        />
                        <ErrorMessage name='fullName' component="span" className={classes.errors} />
                    </div>

                    <div className={classes.formControl}>
                        <Field type="checkbox"
                            name="lookingForAJob"
                        /><b>Looking For A Job</b>
                    </div>

                    <div className={classes.formControl}>
                        <label htmlFor="lookingForAJobDescription"><b>My Professional skills: </b></label>
                        <Field placeholder="My Professional skills: "
                            name="lookingForAJobDescription"
                            type="text"
                        />
                        <ErrorMessage name='lookingForAJobDescription' component="span" className={classes.errors} />
                    </div>

                    <div className={classes.formControl}>
                        <label htmlFor="aboutMe"><b>About Me:</b></label>
                        <Field placeholder="About me"
                            name="aboutMe"
                            type="text"
                        />
                        <ErrorMessage name='aboutMe' component="span" className={classes.errors} />
                    </div>
                    <div className={classes.formControl}>
                        <label htmlFor="contacts"><b>Contacts: </b></label>
                    </div>
                    <div className={classes.formControl}>
                        {Object.keys(profile.contacts).map(
                            key =>
                                <div key={key}>
                                    <label htmlFor={key}><b>{`${key} :`}</b></label>
                                    <Field key={key} placeholder={key} name={'contacts.' + key} type="text" contactvalue={profile.contacts[key]} />
                                    <ErrorMessage name={'contacts.' + key} component="span" className={classes.errors} />
                                </div>
                        )}
                    </div>
                    <div>
                        {updateProfileError ? <span>{updateProfileError}</span> : null}
                    </div>
                    <div>
                        <button type="submit" >Save</button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
export default ProfileDataForm;