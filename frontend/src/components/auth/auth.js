import React, {useState} from 'react';
import AuthService from '../../services/authService';
import SignIn from '../../pages/signIn';

const Auth = (props) => {
    const [userName, updateUserName] = useState("");
    const [userPass, updateUserPass] = useState("");

    const token = localStorage.getItem('token');

    console.log(token)
    if (token){
        return props.children;
    }

    const authService = new AuthService();

    const handleSubmit = (event) => {
        event.preventDefault();
        authService.authenticateUser({
            username: userName,
            password: userPass
        })
        .then((result) => {
            if (result.token){
                props.setToken(result.token);
                updateUserName(null);
                updateUserPass(null);
            }
        });
        
    }
    const handleChangeUserName = (event) => {
        updateUserName(event.target.value);
    }
    const handleChangePass = (event) => {
        updateUserPass(event.target.value);
    }

    return <SignIn 
                handleChangeUserName={handleChangeUserName}
                handleChangePass={handleChangePass}
                userName={userName}
                userPass={userPass}
                handleSubmit={handleSubmit}
            />
}

export default Auth;