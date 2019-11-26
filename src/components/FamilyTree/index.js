import React, {Component} from 'react';
import {withFirebase} from '../Firebase';

class FamilyTreePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            persons: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.persons().on('value', snapshot => {
            const personsObject = snapshot.val();
            const personsList = Object.keys(personsObject).map(key => ({
                ...personsObject[key],
                uid: key,
            }));
            this.setState({
                persons: personsList,
                loading: false,
            });
        });
    }

    //
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {persons, loading} = this.state;
        return (
            <div>
                <h1>Древо</h1>
                {loading && <div>Loading ...</div>}
                <UserList persons={persons}/>
            </div>
        );

    }

}

const UserList = ({persons}) => (
    <ul>
        {persons.map(person => (
            <li key={person.uid}>
                {/*<span>
          <strong>ID:</strong> {user.uid}
        </span>*/}
                <span>
          {person.firstName + " " + person.name}
        </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(FamilyTreePage);
