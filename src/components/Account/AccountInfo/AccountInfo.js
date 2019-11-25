import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import profilePicture from "../../../assets/images/profile.jpg";

const AccountInfo = (props) => {
  return (
    <div>
      <div>
        <img src={profilePicture}/>
      </div>
      <div className={s.descriptionBlock}>
        {props.login}
      </div>
    </div>
  )
}

export default AccountInfo;