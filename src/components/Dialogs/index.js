import React from 'react';
import {withAuthorization} from '../Account/Session';

const DialogsPage = () => (
    <div>
        <h1>Dialogs Page</h1>
    </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(DialogsPage);