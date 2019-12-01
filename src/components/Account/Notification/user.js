import React from 'react';
import styles from "../../Users/users.module.css";
import userPhoto from "../../../assets/images/user_add.png";
import {NavLink} from "react-router-dom";

let User = ({notification, users, db, currentUser}) => {

    let userAdd = () => {
        //себе
        let userEdit = users.filter(item => (item.uid === currentUser.uid));
        userEdit[0].AccessPerson.push(notification.userFrom);
        console.log(userEdit)
        db.tablePath('users').child('/' + currentUser.uid).set(userEdit[0]);
        //ему
        userEdit = users.filter(item => (item.uid === notification.currentUserUID));
        userEdit[0].AccessPerson.push(notification.userTo);
        console.log(userEdit)
        db.tablePath('users').child('/' + notification.currentUserUID).set(userEdit[0]);
        db.tablePath('notifications').child('/' + notification.uid).remove()
    }

    let userDel = () => {
        db.tablePath('notifications').child('/' + notification.uid).remove()
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

                             <button  onClick={userAdd}>
                                Принять
                                </button>

                        <button  onClick={userDel}>
                                Отказать
                                </button>


                    </div>
                </span>
            <span>
                    <span>
                        <div>{notification.userFrom}</div>
                        <div>{notification.userTo}</div>
                    </span>
                </span>
            <hr/>
        </div>)

}

export default User;