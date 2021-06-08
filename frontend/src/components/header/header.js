import React from 'react';
import SignOut from '../../pages/signOut';

const Header = ({setToken}) => {
    return (
        <div>
            <h1>Header</h1>
            <SignOut setToken={setToken}/>
        </div>
                
    );
}

export default Header;