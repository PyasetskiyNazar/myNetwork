import React from 'react';


type PropsType = {
    contactTitle: string
    contactValue: string
}

const ProfileContacts: React.FC<PropsType> = ({contactTitle, contactValue}) => {  
    return (
        <div>
            <b> - {contactTitle}</b>: {contactValue}
        </div>
    )
}
export default ProfileContacts;