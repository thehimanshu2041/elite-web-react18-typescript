import React from 'react';
import './index.css';
import EliteButton from '../../../components/elite-button';
import { useAuth } from '../../../contexts/auth-context';
import { LoginReqModel } from '../../../model/auth';
import { useNavigate } from "react-router";
import { Formik } from "formik";
import * as yup from "yup";
import { FormControl, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

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

    const handleSubmit = async (payload: LoginReqModel) => {
        const signInResult = await auth.login(payload);
        if (signInResult) {
            navigate('/');
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
                            <div className="min-h-screen flex justify-center md:items-center">
                                <Grid item xs={12} md={6} className='py-5 px-10 bg-white border border-gray md:rounded'>
                                    <div className="flex justify-center text-5xl font-bold">
                                        <div>
                                            <img
                                                src={process.env.PUBLIC_URL + '/static/icons/logo-text-color.png'}
                                                alt='logo'
                                                width={'250px'}
                                                className="mx-auto rounded-full" />
                                        </div>
                                    </div>
                                    <div className="mt-5 flex flex-col justify-center items-center">
                                        <div className="w-full flex-1 mt-8">
                                            <div className="mx-auto max-w-xs">
                                                <FormControl style={{ width: "100%" }}>
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        label="Username"
                                                        placeholder="Username"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.username}
                                                        name="username"
                                                        error={!!touched.username && !!errors.username}
                                                        helperText={!!touched.username && errors.username}
                                                    />
                                                </FormControl>
                                                <FormControl style={{ width: "100%" }}>
                                                    <TextField
                                                        fullWidth
                                                        className='mt-5'
                                                        type="password"
                                                        label="Password"
                                                        placeholder="Password"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.password}
                                                        name="password"
                                                        error={!!touched.password && !!errors.password}
                                                        helperText={!!touched.password && errors.password}
                                                    />
                                                </FormControl>
                                                <EliteButton fullWidth type='submit' className="mt-5"> Login </EliteButton>
                                            </div>
                                            <span className='flex justify-end mt-3'>
                                                Don't have an account? <Link to="/registration" className="text-bold hover:underline">Register Here</Link>
                                            </span>
                                        </div>
                                    </div>
                                </Grid>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default Login;
