import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user_add.png";
import {NavLink} from "react-router-dom";

let User = ({user, currentUser, db, notification}) => {


    let getStatusButton = () => {
        if (currentUser.indexOf(user.email) !== -1)
            return "Доступен";
        else
            if (notification.length !== 0)
                return "Отправлен";
            else
                return "Не доступен";
    }

    let sendNotifications = () => {
        const uuidv1 = require('uuid/v1');
        let uid = uuidv1();
        let now = new Date();
        let access = {
            userFrom: currentUser[0],
            userTo: user.email,
            dateNotifications: now
        };
        db.recordsTable('notifications', uid)
            .set(access);
    }

    return (


        <div className={styles.user}>
                <span>
                    <div>
                       <NavLink to="">
                        <img src={userPhoto} alt=""
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>

                             <button  onClick={sendNotifications}>
                                 {getStatusButton()}
                                </button>


                    </div>
                </span>
            <span>
                    <span>
                        <div>{user.username}</div>
                        <div>{user.email}</div>
                    </span>
                </span>
            <hr/>
        </div>)

}

export default User;