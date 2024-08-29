import React from "react";
import SignIn from './../../components/SignIn';

const Login = props => {
    return(
        <div className="login">
            <div className="wrap">
                <h2>Login</h2>
                <SignIn/>

            </div>
        </div>

    );
}

export default Login;