import React from 'react';
import './styles.scss';
import Button from '../forms/Button';
import { signInWithGoogle } from './../../firebase/utils';

const SignIn = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
    }

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
                <h1>Sign in page</h1>

                <div className='formWrap'>
                    <form onSubmit={handleSubmit}>
                        <div className='socialSignIn'>
                            <div className='row'>
                                <Button onClick={handleGoogleSignIn}>
                                    Sign in with Google
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
