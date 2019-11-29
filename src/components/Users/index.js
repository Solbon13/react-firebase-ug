import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import User from "./user";

class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            users: [],
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
                {users.map(user => (<User user={user} currentUser = {this.state.users.filter(item => item.uid == this.props.firebase.auth.currentUser.uid)[0].AccessPerson}/>))}
            </div>
        );
    }
}

export default withFirebase(UsersPage);