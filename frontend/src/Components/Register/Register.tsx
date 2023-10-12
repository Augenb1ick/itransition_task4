import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Register.css';
import RegisterFormValues from '../../models/RegisterFormValues';


interface RegisterProps {
    onRegister: (data: RegisterFormValues) => void;
    registerErr: string;
    isLoading: boolean;
}

const Register: React.FC<RegisterProps> = ({ onRegister, registerErr, isLoading }) => {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<RegisterFormValues>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        const lowerCaseEmail = data.email.toLowerCase();

        const processedData = {
            ...data,
            email: lowerCaseEmail,
        };

        onRegister(processedData);
    };

    return (
        <section className='auth'>
            <h1 className='auth__heading'>Welcome!</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='auth__form'
                action='submit'
            >
                <label className='auth__label'>Name</label>
                <input
                    disabled={isLoading}
                    {...register('name', {
                        required: { value: true, message: 'This field is required' },
                    })}
                    className='auth__input'
                    type='text'
                />
                <span className='auth__input-error'>{(errors?.name?.message as string || '')}</span>
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
                    type='text'
                />
                <span className='auth__input-error'>{errors?.email?.message}</span>
                <label className='auth__label'>Password</label>
                <input
                    disabled={isLoading}
                    {...register('password', {
                        required: { value: true, message: 'This field is required' },
                    })}
                    className={`auth__input ${(errors?.password?.message || '').length > 0 ? 'auth__input_warning' : ''
                        }`}
                    type='password'
                />
                <span className='auth__input-error'>{errors?.password?.message}</span>
                <span className='auth__err-message'>{registerErr}</span>
                <button
                    disabled={!isValid || isLoading}
                    className={`auth__submit-btn ${!isValid || isLoading ? 'auth__submit-btn_disabled' : ''
                        }`}
                    type='submit'
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <div className='auth__redirect'>
                <p className='auth__redirect-text'>Already registered?</p>
                <Link to='/signin' className='auth__redirect-btn'>
                    Sign in
                </Link>
            </div>
        </section>
    );
};

export default Register;
