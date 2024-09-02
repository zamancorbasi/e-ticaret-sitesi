import React, { useState } from "react";
import './styles.scss';
import { auth, handleUserProfile } from './../../firebase/utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Button from '../forms/Button';
import FormInput from '../forms/FormInput';

const SignUp = () => {
    const initialState = {
        displayName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        errors: []
    };

    const [state, setState] = useState({ ...initialState });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (state.password !== state.confirmedPassword) {
            const err = ["Passwords don't match"];
            setState({
                ...state,
                errors: err
            });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            const { user } = userCredential;

            await handleUserProfile(user, { displayName: state.displayName });

            setState({ ...initialState });

        } catch (error) {
            setState({
                ...state,
                errors: [error.message]
            });
        }
    };

    return (
        <div className='signUp'>
            <div className='wrap'>
                <h1>SIGN UP</h1>

                {state.errors.length > 0 && (
                    <ul>
                        {state.errors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                )}

                <div className='formWrap'>
                    <form onSubmit={handleFormSubmit}>
                        <FormInput
                            type="text"
                            name="displayName"
                            value={state.displayName}
                            placeholder="Full Name"
                            onChange={handleChange}
                        />

                        <FormInput
                            type="email"
                            name="email"
                            value={state.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={state.password}
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <FormInput
                            type="password"
                            name="confirmedPassword"
                            value={state.confirmedPassword}
                            placeholder="Confirm your password"
                            onChange={handleChange}
                        />

                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
