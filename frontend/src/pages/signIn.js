import React from 'react';
import {Link} from 'react-router-dom';

import './signIn.css';

const SignIn = ({
                handleChangeUserName, 
                handleChangePass, 
                handleSubmit, 
                userPass, 
                userName
            }) => {
    return(
        <main className="form-signin">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" onChange={handleChangeUserName} value={userName} placeholder="name_example"/>
                    <label htmlFor="floatingInput">User name</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword"  value={userPass} onChange={handleChangePass} placeholder="password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="row row-cols-2">
                    <div className="col">
                        <button type='submit' value='CHECK' className="btn btn-success">Sing in</button>
                    </div>
                    <div className="col">
                        <Link className="btn btn-primary" to="/register">Register</Link>
                    </div>
                </div>
                
            </form>
        </main>
    );
}

export default SignIn;