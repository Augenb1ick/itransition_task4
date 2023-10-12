import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../Register/Register.css';
import LoginFormValues from '../../models/LoginFormValues';

interface LoginProps {
    onLogin: (data: LoginFormValues) => void;
    loginErr: string;
    isLoading: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, loginErr, isLoading }) => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<LoginFormValues>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        const lowerCaseEmail = data.email.toLowerCase();

        const processedData = {
            ...data,
            email: lowerCaseEmail,
        };
        onLogin(processedData);
    };

    return (
        <section className='auth'>
            <h1 className='auth__heading'>Hello!</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='auth__form'
                action='submit'
            >
                <label className='auth__label'>E-mail</label>
                <input
                    disabled={isLoading}
                    {...register('email', {
                        required: { value: true, message: 'This field is required' },
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Please enter a valid email address',
                        },
                    })}
                    className='auth__input'
                    type='email'
                />
                <span className='auth__input-error'>{errors?.email?.message}</span>
                <label className='auth__label'>Password</label>
                <input
                    disabled={isLoading}
                    {...register('password', {
                        required: { value: true, message: 'This field is required' },
                    })}
                    className='auth__input'
                    type='password'
                />
                <span className='auth__input-error'>{errors?.password?.message}</span>
                <span className='auth__err-message'>{loginErr}</span>
                <button
                    disabled={!isValid || isLoading}
                    className={`auth__submit-btn ${!isValid || isLoading ? 'auth__submit-btn_disabled' : ''
                        }`}
                    type='submit'
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div className='auth__redirect'>
                <p className='auth__redirect-text'>Not registered yet?</p>
                <Link to='/signup' className='auth__redirect-btn'>
                    Sign up
                </Link>
            </div>
        </section>
    );
};

export default Login;
