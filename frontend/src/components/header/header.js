import React from 'react';
import SignOut from '../../pages/signOut';

const Header = ({setToken}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <h1>Tariff app</h1>
                </div>
                <div className="col-sm text-right">
                    <span className="float-right"><SignOut setToken={setToken}/></span>
                </div>
            </div>
        </div>  
    );
}

export default Header;