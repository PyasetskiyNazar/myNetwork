import React, { useState, useEffect, ChangeEvent } from 'react';

type PropsType = {
    status: string     
    updateUserStatus: (status: string ) => void
}

const ProfileStatus: React.FC<PropsType> = (props) => {


    let [editMode, setEditMode] = useState<boolean>();
    let [status, setStatusText] = useState<string>(props.status);

    const deActiveEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    const changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
        setStatusText(e.currentTarget.value)
    }

    const activeEditMode = () => {
        setEditMode(true)
    }

    useEffect(() => {
        setStatusText(props.status)
    }, [props.status])


    return (
        <>
            {
                !editMode ?
                    <div>
                        <span onDoubleClick={activeEditMode}><b>Status: </b>{props.status || "--------"}</span>
                    </div>
                    : <div>
                        <input
                            onBlur={deActiveEditMode}
                            onChange={changeStatusText}
                            value={status}
                            autoFocus={true}
                        />
                    </div>
            }
        </>
    )
}

export default ProfileStatus;
