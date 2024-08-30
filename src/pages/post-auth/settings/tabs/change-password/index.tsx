import { Card, FormControl, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import userStore from "../../../../../stores/user";
import { UserModel, UserPasswordPatchReqModel } from "../../../../../model/user";
import snackbarUtils from "../../../../../utils/snackbar";

const ChangePassword: React.FC = () => {

    const [isEditable, setIsEditable] = useState(false);
    const { getUserDetails, patchUserPassword } = userStore;
    const [userValue, setUserValue] = useState<UserModel>();

    const initialValues = {
        old_password: "",
        password: "",
        cpassword: ""
    };

    const changePasswordScheme = yup.object().shape({
        old_password: yup.string().min(6, 'Password must be at least 6 characters long').required("Password is required."),
        password: yup.string().min(6, 'Password must be at least 6 characters long').required("Password is required."),
        cpassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Confirm Password is required.")
    });

    const handleSubmit = async (data: any, { resetForm }: { resetForm: () => void }) => {
        if (userValue?.id) {
            const changePasswordResult = await patchUserPassword(userValue.id, data as UserPasswordPatchReqModel);
            if (changePasswordResult) {
                resetForm();
                setIsEditable(false);
                snackbarUtils.success("Password has been successfully updated!!!");
            }
        }
    };

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const extUser = await getUserDetails();
        setUserValue(extUser);
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={changePasswordScheme}
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
                                <Grid item xs={12} md={12} className="flex justify-end">
                                    {!isEditable && <>
                                        <button className='cursor-pointer text-xl hover:bg-transparent pb-2'>
                                            <i className='fas fa-edit' onClick={(e) => { e.preventDefault(); setIsEditable(true) }} />
                                        </button>
                                    </>}
                                    {isEditable && <>
                                        <button className='cursor-pointer text-xl hover:bg-transparent pb-2' type='submit'>
                                            <i className='fas fa-check' />
                                        </button>
                                    </>}
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                className="w-full md:w-1/3"
                                                type="password"
                                                label="Old Password"
                                                placeholder="Old Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.old_password}
                                                name="old_password"
                                                disabled={!isEditable}
                                                error={!!touched.old_password && !!errors.old_password}
                                                helperText={!!touched.old_password && errors.old_password}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                className="w-full md:w-1/3"
                                                type="password"
                                                label="Password"
                                                placeholder="Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                name="password"
                                                disabled={!isEditable}
                                                error={!!touched.password && !!errors.password}
                                                helperText={!!touched.password && errors.password}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                className="w-full md:w-1/3"
                                                type="password"
                                                label="Confirm Password"
                                                placeholder="Confirm Password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.cpassword}
                                                name="cpassword"
                                                disabled={!isEditable}
                                                error={!!touched.cpassword && !!errors.cpassword}
                                                helperText={!!touched.cpassword && errors.cpassword}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Card>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
}

export default ChangePassword;
