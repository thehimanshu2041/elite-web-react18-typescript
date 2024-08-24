import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import EliteButton from '../../../../../components/elite-button';
import BreadCrumb from '../../../../../components/breadcrumb';
import { FormControl, Grid, MenuItem, Select, TextField, InputLabel, Card } from '@mui/material';
import { AuthUserModel, CountryModel, GenderModel } from '../../../../../model/auth';
import { CodeModel } from '../../../../../model/config/code';
import codeStore from '../../../../../stores/config/code';
import snackbarUtils from '../../../../../utils/snackbar';
import { useAuth } from '../../../../../contexts/auth-context';
import countryStore from '../../../../../stores/config/country';
import { useNavigate, useParams } from 'react-router';
import userStore from '../../../../../stores/user';

const AddEditUser: React.FC = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const { getCountries } = countryStore;
    const { getCodesByType } = codeStore;
    const { getUserById, updateUser } = userStore;

    const { id } = useParams();

    const [country, setCountry] = useState<CountryModel[]>([]);
    const [gender, setGender] = useState<CodeModel[]>([]);

    const initialValues = {
        username: "",
        email: "",
        password: "",
        cpassword: "",
        first_name: "",
        last_name: "",
        gender: "",
        address: "",
        phone: "",
        country: ""
    };

    const [userValue, setUserValue] = useState(initialValues);

    const registrationSchema = yup.object().shape({
        username: yup.string().required("Username is required."),
        email: yup.string().email("Invalid email format").required("Email is required."),
        password: yup.string().min(6, 'Password must be at least 6 characters long').required("Password is required."),
        cpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Confirm Password is required."),
        first_name: yup.string().required("First Name is required."),
        last_name: yup.string().required("Last Name is required."),
        gender: yup.string().required("Gender is required."),
        address: yup.string().required("Address is required."),
        phone: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone is required."),
        country: yup.string().required("Country is required."),
    });

    const handleSubmit = async (data: any, { resetForm }: { resetForm: () => void }) => {
        const payload = {
            username: data.username,
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            gender: { id: data.gender } as GenderModel,
            address: data.address,
            phone: data.phone,
            country: { id: data.country } as CountryModel
        } as AuthUserModel;

        if (id) {
            const signUpResult = await updateUser(Number(id), payload);
            if (signUpResult) {
                snackbarUtils.success("User has been successfully updated!!!");
                resetForm();
                navigate('/config/user');
            }
        } else {
            const signUpResult = await auth.register(payload);
            if (signUpResult) {
                snackbarUtils.success("User has been successfully registered!!!");
                resetForm();
                navigate('/config/user');
            }
        }
    }

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        getCountries().then(c => setCountry(c));
        getCodesByType("GENDER").then(g => setGender(g));
        if (id) {
            const extUser = await getUserById(Number(id));
            setUserValue({
                username: extUser.username,
                email: extUser.email,
                password: '',
                cpassword: '',
                first_name: extUser.first_name,
                last_name: extUser.last_name,
                gender: String(extUser.gender?.id),
                address: extUser.address,
                phone: String(extUser.phone),
                country: String(extUser.country?.id)
            });
        }

    }

    return (
        <>
            <BreadCrumb heading={id ? 'Edit User' : 'Add User'} backLink="/config/user" />
            <Formik
                onSubmit={handleSubmit}
                initialValues={userValue}
                validationSchema={registrationSchema}
                enableReinitialize={true}
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
                            <Card className='p-5 shadow-none'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
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
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="email"
                                                label="Email"
                                                placeholder="Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                                error={!!touched.email && !!errors.email}
                                                helperText={!!touched.email && errors.email}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
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
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="password"
                                                label="Confirm Password"
                                                placeholder="Confirm Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.cpassword}
                                                name="cpassword"
                                                error={!!touched.cpassword && !!errors.cpassword}
                                                helperText={!!touched.cpassword && errors.cpassword}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="First Name"
                                                placeholder="First Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.first_name}
                                                name="first_name"
                                                error={!!touched.first_name && !!errors.first_name}
                                                helperText={!!touched.first_name && errors.first_name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="Last Name"
                                                placeholder="Last Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.last_name}
                                                name="last_name"
                                                error={!!touched.last_name && !!errors.last_name}
                                                helperText={!!touched.last_name && errors.last_name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <InputLabel id="Gender">Gender</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="Gender"
                                                label="Gender"
                                                placeholder="Gender"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.gender}
                                                name="gender"
                                                error={!!touched.gender && !!errors.gender}
                                            >
                                                {gender.map((value, index) => (
                                                    <MenuItem key={index} value={value.id}>
                                                        {value.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="Address"
                                                placeholder="Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                name="address"
                                                error={!!touched.address && !!errors.address}
                                                helperText={!!touched.address && errors.address}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Phone"
                                                placeholder="Phone"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                name="phone"
                                                error={!!touched.phone && !!errors.phone}
                                                helperText={!!touched.phone && errors.phone}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <InputLabel id="Country">Country</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="Country"
                                                label="Country"
                                                placeholder="Country"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.country}
                                                name="country"
                                                error={!!touched.country && !!errors.country}
                                            >
                                                {country.map((value, index) => (
                                                    <MenuItem key={index} value={value.id}>
                                                        {value.niceName}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <EliteButton fullWidth type='submit'> Register </EliteButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddEditUser;