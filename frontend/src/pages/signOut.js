import React from 'react';

const SignOut = ({setToken}) => {
    const handleSignOut = (event) => {
        event.preventDefault();
        setToken("");
    }
    return (
        <form onSubmit={handleSignOut}>
            <button className="btn btn-danger" type="submit">Sign out</button>
        </form>
    );
}

export default SignOut;

