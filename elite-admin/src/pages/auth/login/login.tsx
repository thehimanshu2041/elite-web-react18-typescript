import React, { useState } from 'react';
import './login.css';
import EliteButton from '../../../components/EliteButton';
import EliteInput from '../../../components/EliteInput';
import EliteLottiePlayer from '../../../components/EliteLottiePlayer';
import { useAuth } from './../../../contexts/AuthContext';
import { Auth } from '../../../model/auth.model';
import { useNavigate } from "react-router";
import snackbarUtils from '../../../utils/snackbarUtils';
import { Formik } from "formik";
import * as yup from "yup";

const Login: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: ""
    };

    const loginSchema = yup.object().shape({
        username: yup.string().required("Username is required."),
        password: yup.string().required("Password is required.")
    });

    const handleSubmit = async (payload: Auth) => {
        const signInResult = await auth.login(payload);
        if (signInResult) {
            navigate('/');
        } else {
            snackbarUtils.error('Incorrect username or password!!!')
        }
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={loginSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <div className="min-h-screen bg-blue text-gray-900 flex justify-center">
                                <div className="max-w-screen-xl m-0 sm:m-10 flex justify-center flex-1">
                                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white shadow sm:rounded-lg ">
                                        <div className="flex justify-center text-5xl font-bold">
                                            <div>
                                                <img
                                                    src={process.env.PUBLIC_URL + '/static/icons/logo-text-color.png'}
                                                    alt='logo'
                                                    width={'250px'}
                                                    className="mx-auto rounded-full" />
                                            </div>
                                        </div>
                                        <div className="mt-5 flex flex-col items-center">
                                            <div className="w-full flex-1 mt-8">
                                                <div className="mx-auto max-w-xs">
                                                    <EliteInput
                                                        type="text"
                                                        placeholder="username"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.username}
                                                        name="username"
                                                        error={!!touched.username && !!errors.username}
                                                        helperText={!!touched.username && errors.username}
                                                    />
                                                    <EliteInput
                                                        className='mt-5'
                                                        type="password"
                                                        placeholder="password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.password}
                                                        name="password"
                                                        error={!!touched.password && !!errors.password}
                                                        helperText={!!touched.password && errors.password}
                                                    />
                                                    <EliteButton fullWidth type='submit' className="mt-5"> Login </EliteButton>
                                                </div>
                                            </div>

                                            <div className="mx-auto my-5 max-w-xs">
                                                <div className="text-center leading-none text-gray-600 mt-3">
                                                    Or Login with OAUTH0
                                                </div>
                                                <EliteButton fullWidth className="mt-5"> OAUTH0 </EliteButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center hidden lg:flex">
                                        <div className="w-full bg-contain bg-center bg-no-repeat">
                                            <EliteLottiePlayer
                                                src={process.env.PUBLIC_URL + '/static/lottie/login.json'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Login;
