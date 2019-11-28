import React, {Component} from 'react';
import s from './News.module.css';
import {withAuthorization} from "../Account/Session";
import {withFirebase} from "../Firebase";

class NewsBox extends Component {

    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.state = {
            new: '',
            user: ''
        };
    }
    onChange(e){
        this.setState({
            new: e.target.value
        });
    }
    onKeyup(e){
        if(e.keyCode === 13 && (e.target.value) !== ''){
            e.preventDefault();
            let dbCon = this.props.firebase.news();
            dbCon.push({
                new: (e.target.value),
                user: this.props.firebase.auth.currentUser.email
            });
            this.setState({
                new: ''
            });
        }
    }
    render() {
        if(!(this.props.firebase.auth.currentUser == null)){
        return (

            <form className={s.form}>
        <textarea
            className="textarea"
            placeholder="Type a news"
            cols="100"
            onChange={this.onChange}
            onKeyUp={this.onKeyup}
            value={this.state.new}>
          </textarea>
            </form>
        )}
        else
            return (<div className={s.form}>Для добавления новостей необходимо авторизация</div>)
    }
}
const condition = authUser => !!authUser;
export default withFirebase(NewsBox);
