import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user_add.png";
import {NavLink} from "react-router-dom";

let User = ({user, currentUser}) => {

    console.log(currentUser)
    return (


        <div className={styles.user}>
                <span>
                    <div>
                       <NavLink to="">
                        <img src={userPhoto}
                             className={styles.userPhoto}/>
                       </NavLink>
                    </div>
                    <div>

                             <button>
                                 {currentUser.indexOf(user.email)!=-1 ? "Доступен" : "Не доступен"}
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