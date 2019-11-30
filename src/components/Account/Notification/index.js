import React, {Component} from 'react';
import {withFirebase} from "../../Firebase";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationsAccess: [],

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
    }

    //
    componentWillUnmount() {
        /*this.props.firebase.notifications().off();*/
    }
    render() {
        const {notificationsAccess} = this.state;
        return (
            <div>
                <UserList users={notificationsAccess}/>
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
