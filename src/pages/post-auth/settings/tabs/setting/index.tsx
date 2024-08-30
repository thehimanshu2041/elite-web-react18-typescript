import { Card, FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { Field, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { UserModel, UserPatchSettingReqModel, UserSettingModel } from "../../../../../model/user";
import userStore from "../../../../../stores/user";
import snackbarUtils from "../../../../../utils/snackbar";

const Setting: React.FC = () => {

    const [isEditable, setIsEditable] = useState(false);
    const [userValue, setUserValue] = useState<UserModel>();
    const { getUserDetails, patchUserSettings, getUserSettings } = userStore;

    const initialValues = {
        uid: '',
        secret: '',
        token: '',
        refresh_credentials: false,
        notification: false,
        email: false,
        night_mode: false,
    };

    const [settingValue, setSettingValue] = useState(initialValues);

    const validationSchema = yup.object({
        uid: yup.string(),
        secret: yup.string(),
        token: yup.string(),
        refresh_credentials: yup.boolean(),
        notification: yup.boolean(),
        email: yup.boolean(),
        night_mode: yup.boolean(),
    });

    const handleSubmit = async (data: any, { resetForm }: { resetForm: () => void }) => {
        if (userValue?.id) {
            const changeSettingResult = await patchUserSettings(userValue.id, data as UserPatchSettingReqModel);
            if (changeSettingResult) {
                resetForm();
                setIsEditable(false);
                snackbarUtils.success("Settings has been successfully updated!!!");
                onInit();
            }
        }
    };

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const extUser = await getUserDetails();
        setUserValue(extUser);
        const userSetting = await getUserSettings();
        setSettingValue({
            uid: userSetting.uid,
            secret: userSetting.secret,
            token: userSetting.token,
            refresh_credentials: false,
            notification: userSetting.notification,
            email: userSetting.email,
            night_mode: userSetting.night_mode,
        });
    }

    return (
        <>
            <Formik
                initialValues={settingValue}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
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
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: "100%" }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Uid"
                                            placeholder="Uid"
                                            value={values.uid}
                                            name="uid"
                                            disabled={true}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: "100%" }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Token"
                                            placeholder="Token"
                                            value={values.token}
                                            name="token"
                                            disabled={true}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: "100%" }}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            label="Secret"
                                            placeholder="Secret"
                                            onChange={handleChange}
                                            value={values.secret}
                                            name="secret"
                                            disabled={true}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    as={Switch}
                                                    name="refresh_credentials"
                                                    checked={values.refresh_credentials}
                                                    onChange={handleChange}
                                                    disabled={!isEditable}
                                                />
                                            }
                                            label="Refresh Credentials"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    as={Switch}
                                                    name="notification"
                                                    checked={values.notification}
                                                    onChange={handleChange}
                                                    disabled={!isEditable}
                                                />
                                            }
                                            label="Notification"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    as={Switch}
                                                    name="email"
                                                    checked={values.email}
                                                    onChange={handleChange}
                                                    disabled={!isEditable}
                                                />
                                            }
                                            label="Email"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormControlLabel
                                            control={
                                                <Field
                                                    as={Switch}
                                                    name="night_mode"
                                                    checked={values.night_mode}
                                                    onChange={handleChange}
                                                    disabled={!isEditable}
                                                />
                                            }
                                            label="Night Mode"
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Card>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default Setting;
