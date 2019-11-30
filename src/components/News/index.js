import React, {Component} from 'react';
import {withFirebase} from "../Firebase";
import NewsBox from "./NewsBox";

class News extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            news: [
                {
                    new: '',
                    uid: 'none'
                }
            ],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.news().on('value', snapshot => {
            const newsObject = snapshot.val();
            const newsList = Object.keys(newsObject).map(key => ({
                ...newsObject[key],
                uid: key,
            }));
            this.setState({
                news: newsList,
                loading: false,
            });
        });
    }

    //
    componentWillUnmount() {
        this.props.firebase.news().off();
    }

    render() {
        const {news, loading} = this.state;

        return (
            <div>
                <h1>Новости</h1>
                <NewsBox />
                {loading && <div>Loading ...</div>}
                <NewList news={news}/>
            </div>
        );
    }
}

const NewList = ({news}) => (
    <ul>
        {news.map(newsPost => (
            <li key={newsPost.uid}>
                {/*<span>
          <strong>ID:</strong> {user.uid}
        </span>*/}
                <span>
          {newsPost.new}
        </span>
                {/*<span>
          <strong>Username:</strong> {user.username}
        </span>*/}
            </li>
        ))}
    </ul>
);

export default withFirebase(News);

