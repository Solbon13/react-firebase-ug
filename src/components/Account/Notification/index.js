import React, {Component} from 'react';
import {withFirebase} from "../../Firebase";
import User from "./user";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsAccess: [],
            users: []
        };
    }

    componentDidMount() {
        this.props.firebase.tablePath('notifications').on('value', snapshot => {
            const valueObject = snapshot.val();
            const dataList = Object.keys(valueObject).map(key => ({
                ...valueObject[key],
                uid: key,
            }));
            this.setState({
                notificationsAccess: dataList.filter(item => (item.userTo.toLocaleLowerCase() === this.props.firebase.auth.currentUser.email.toLocaleLowerCase()))
            });
        });
        this.props.firebase.tablePath('users').on('value', snapshot => {
            const valueObject = snapshot.val();
            const dataList = Object.keys(valueObject).map(key => ({
                ...valueObject[key],
                uid: key,
            }));
            this.setState({
                users: dataList
            });
        });
    }

    //
    componentWillUnmount() {
        /*this.props.firebase.notifications().off();*/
    }

    render() {
        const {users, notificationsAccess} = this.state;
        return (
            <div>
                {notificationsAccess.map(notification => (
                    <User notification={notification} users = {users} db = {this.props.firebase} currentUser = {this.props.firebase.auth.currentUser}/>))}
            </div>
        )
    }
}


const UserList = ({notificationsAccess, users, db}) => {
    let userAdd = (notification) =>{
        debugger
        let userEdit = users.filter(item => (item.uid = notification.uid));
        console.log(userEdit)
        /*userEdit.AccessPerson.push(notification.userFrom);
        db.child('/' + userEdit.uid).set(userEdit)*/
    }

    return (

        <ul>
            {notificationsAccess.map(notification => (
                <li key={notification.uid}>

                <span>
          <strong>Username:</strong> {notification.userFrom}
        </span>
                    <button onClick={userAdd(notification)}>
                        Принять
                    </button>
                    <button>
                        Отказать
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default withFirebase(Notification);
