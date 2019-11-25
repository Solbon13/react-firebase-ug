import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import profilePicture from "../../../assets/images/profile.jpg";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                {/*<img src={profilePicture}/>*/}
            </div>
            <div className={s.descriptionBlock}>
                ava + description
            </div>
        </div>
    )
}

export default ProfileInfo;