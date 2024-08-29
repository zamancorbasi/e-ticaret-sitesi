import React from "react";
import './styles.scss';
import { useState } from "react";

import Button from '../forms/Button';
import FormInput from '../forms/FormInput';

const SignUp = props => {
    const initialState = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    const [state, setState] = useState({...initialState});

    {/**
         handleChange(e) {

    }
        
        
        
        */}
   




    return(
      
        <div className='signUp'>
            <div className='wrap'>
                <h1>Sign up page</h1>

                <div className='formWrap'>
                    <form>
                        <div className='socialSignIn'>
                            <div className='row'>
                                <FormInput
                                type="text"
                                name="displayName"
                                value={state.displayName}
                                placeholder="Full Name"
                                />
                                <Button>
                                    Sign up
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
   

    );
}

export default SignUp;