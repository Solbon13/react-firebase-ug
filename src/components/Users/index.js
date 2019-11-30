import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import User from "./user";

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
            notifications: []
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                users: usersList,
                loading: false,
            });
        });
        this.props.firebase.notifications().on('value', snapshot => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            this.setState({
                notifications: usersList
            });
        });
    }

    //
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {users, loading} = this.state;

        return (
            <div>
                <h1>Пользователи</h1>
                {loading && <div>Loading ...</div>}
                {users.map(user => (<User user={user}
                                          currentUser = {this.state.users.filter(item => item.uid === this.props.firebase.auth.currentUser.uid)[0].AccessPerson}
                                          notification = {this.state.notifications.filter(item => (item.userFrom.toLocaleLowerCase() === this.props.firebase.auth.currentUser.email.toLocaleLowerCase())
                                              && item.userTo.toLocaleLowerCase() === user.email.toLocaleLowerCase())}
                                          db = {this.props.firebase}/>))}
            </div>
        );
    }
}

export default withFirebase(UsersPage);