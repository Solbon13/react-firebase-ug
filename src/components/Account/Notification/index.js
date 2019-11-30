import React, {Component} from 'react';
import {withFirebase} from "../../Firebase";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsAcces: [],

        };
    }

    componentDidMount() {
        this.props.firebase.notifications().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                notificationsAcces: usersList.filter(item => (item.userTo.toLocaleLowerCase() === this.props.firebase.auth.currentUser.email.toLocaleLowerCase()))
            });
        });
    }

    //
    componentWillUnmount() {
        /*this.props.firebase.notifications().off();*/
    }
    render() {
        const {notificationsAcces} = this.state;
        return (
            <div>
                <UserList users={notificationsAcces}/>
            </div>
        )
    }
}

const UserList = ({users}) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
                {/*<span>
          <strong>ID:</strong> {user.uid}
        </span>*/}
                <span>
          <strong>E-Mail:</strong> {user.userTo}
        </span>
                <span>
          <strong>Username:</strong> {user.userFrom}
        </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(Notification);
