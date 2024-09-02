import React, { useState } from 'react';
import './styles.scss';
import Button from '../forms/Button';
import { signInWithGoogle } from './../../firebase/utils';
import FormInput from './../../components/forms/FormInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../firebase/utils';

const SignIn = () => {

    const initialState = {
        email: '',
        password: '',
    };

    const [state, setState] = useState(initialState);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, state.email, state.password);
            // Kullanıcı bilgilerini işleyebilirsiniz
            setState({ ...initialState });
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            if (err.code === 'auth/popup-closed-by-user') {
                alert('Oturum açma penceresi kapatıldı. Lütfen tekrar deneyin.');
            } else {
                console.error('Google ile oturum açma hatası:', err);
            }
        }
    }

    return (
        <div className='signIn'>
            <div className='wrap'>
                <h1>SIGN IN PAGE</h1>

                <div className='formWrap'>
                    <form onSubmit={handleSubmit}>

                        <FormInput
                        type="email"
                        name="email"
                        value={state.email}
                        placeholder="Email:"
                        onChange={handleChange}
                        />

                        <FormInput
                        type="password"
                        name="password"
                        value={state.password}
                        placeholder="Password:"
                        onChange={handleChange}
                        />

                        <div className='socialSignIn'>
                            <div className='row'>
                                <Button type="submit">
                                    LOGIN
                                </Button>
                            </div>
                        </div>

                        <div className='socialSignIn'>
                            <div className='row'>
                                <Button onClick={handleGoogleSignIn}>
                                    SIGN IN WITH GOOGLE
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
