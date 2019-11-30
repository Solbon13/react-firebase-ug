import React, {Component} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { withAuthorization } from '../Account/Session';


class DialogsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
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
      });
    });
    this.props.firebase.messages().on('value', snapshot => {
      const messagesObject = snapshot.val();
      const messagesList = Object.keys(messagesObject).map(key => ({
        ...messagesObject[key],
        uid: key,
      }));
      this.setState({
        messages: messagesList,
      });
    });
  }

  //
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

render() {
  const {messages, users} = this.state;


  let dialogsElements =  users.map( d => <DialogItem name={d.username} id={d.uid} />  );
  let messagesElements = messages.map( m => {
    if (this.props.firebase.auth.currentUser.uid === m.uidUser1)
    return <Message message={m.message}/>
  } );
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        { dialogsElements }
        {/*{loading && <div>Loading ...</div>}
        <UserList users={users}/>*/}
      </div>
      <div className={s.messages}>
        { messagesElements }
        {this.props.login}
      </div>
    </div>
  )
}
};

const condition = authUser => !!authUser;
export default withAuthorization(condition)(DialogsPage);