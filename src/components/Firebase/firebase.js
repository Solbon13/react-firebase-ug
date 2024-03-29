import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCl2bpoGi4VPXC8GfUQx7iz3rNHPSnQpDQ",
    authDomain: "ug-garabal.firebaseapp.com",
    databaseURL: "https://ug-garabal.firebaseio.com",
    projectId: "ug-garabal",
    storageBucket: "ug-garabal.appspot.com",
    messagingSenderId: "692578517035",
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    recordsTable = (tableName, uid) => this.db.ref(`${tableName}/${uid}`);

    tablePath = (tableName) => this.db.ref(tableName);

    tableData = (tableName) => {
        let usersList = [];
        this.db.ref(tableName).on('value', snapshot => {
            const usersObject = snapshot.val();
            usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
        });
        return usersList
    }

    //надо только свои сообщения сделать
    messages = () => this.db.ref('messages');
    //надо только свою родню сделать
    persons = () => this.db.ref('Person');
    news = () => this.db.ref('news');
}

export default Firebase;