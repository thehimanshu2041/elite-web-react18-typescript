import { useNavigate, useParams } from "react-router";
import BreadCrumb from "../../../../../components/breadcrumb";
import countryStore from "../../../../../stores/config/country";
import { useEffect, useState } from "react";
import { CountryModel, CountryReqModel } from "../../../../../model/config/country";
import { Formik } from "formik";
import * as yup from "yup";
import snackbarUtils from "../../../../../utils/snackbar";
import { Card, FormControl, Grid, TextField } from "@mui/material";
import EliteButton from "../../../../../components/elite-button";

const AddEditCountry: React.FC = () => {
    const navigate = useNavigate();
    const { countryId } = useParams();

    let initialValues = {
        isp: '',
        name: '',
        niceName: '',
        iso3: '',
        numCode: '',
        phoneCode: ''
    } as any;

    const { getCountryById, createCountry, updateCountry } = countryStore;
    const [countryValue, setCountryValue] = useState<CountryReqModel | CountryModel>(initialValues);

    const countrySchema = yup.object().shape({
        isp: yup.string().required("Isp is required."),
        name: yup.string().required("Name is required."),
        niceName: yup.string().required("Nice name is required."),
        phoneCode: yup.string().required("Phone code is required.")
    });


    useEffect(() => {
        loadCountry();
    }, []);

    const loadCountry = async () => {
        if (countryId) {
            const existingCountry = await getCountryById(Number(countryId));
            setCountryValue(existingCountry);
        }
    }

    const handleSubmit = async (payload: CountryReqModel) => {
        if (countryId) {
            updateCountry(Number(countryId), payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code type has been updated successfully!!!');
                    navigate('/config/country');
                }
            });
        } else {
            createCountry(payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code type has been added successfully!!!');
                    navigate('/config/country');
                }
            });
        }
    }

    return (
        <>
            <BreadCrumb heading={countryId ? 'Edit Country' : 'Add Country'} backLink="/config/country" />

            <Formik
                onSubmit={handleSubmit}
                initialValues={countryValue}
                validationSchema={countrySchema}
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
                                                label="Isp"
                                                placeholder="Isp"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.isp}
                                                name="isp"
                                                error={!!touched.isp && !!errors.isp}
                                                helperText={!!touched.isp && errors.isp}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="Name"
                                                placeholder="Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.name}
                                                name="name"
                                                error={!!touched.name && !!errors.name}
                                                helperText={!!touched.name && errors.name}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="Nice name"
                                                placeholder="Nice name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.niceName}
                                                name="niceName"
                                                error={!!touched.niceName && !!errors.niceName}
                                                helperText={!!touched.niceName && errors.niceName}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                label="Iso3"
                                                placeholder="Iso3"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.iso3}
                                                name="iso3"
                                                error={!!touched.iso3 && !!errors.iso3}
                                                helperText={!!touched.iso3 && errors.iso3}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Num code"
                                                placeholder="Num code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.numCode}
                                                name="numCode"
                                                error={!!touched.numCode && !!errors.numCode}
                                                helperText={!!touched.numCode && errors.numCode}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormControl style={{ width: "100%" }}>
                                            <TextField
                                                fullWidth
                                                type="number"
                                                label="Phone code"
                                                placeholder="Phone code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.phoneCode}
                                                name="phoneCode"
                                                error={!!touched.phoneCode && !!errors.phoneCode}
                                                helperText={!!touched.phoneCode && errors.phoneCode}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <EliteButton fullWidth type='submit'> {countryId ? 'Update' : 'Add'} </EliteButton>
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

export default AddEditCountry;
