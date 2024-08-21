import { useNavigate, useParams } from "react-router";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Card, FormControl, Grid, TextField } from "@mui/material";
import EliteButton from "../../../../../components/elite-button";
import snackbarUtils from "../../../../../utils/snackbar-utils";
import { CodeModel } from "../../../../../model/config/code";
import codeStore from "../../../../../stores/config/code";

const AddEditCode: React.FC = () => {

    const navigate = useNavigate();
    const { codeId } = useParams();
    const { refId } = useParams();
    const { getCodeById, saveCode, updateCode } = codeStore;

    let initialValues = {
        code: '',
        name: '',
        description: ''
    } as CodeModel;

    const [codeValue, setCodeValue] = useState<CodeModel>(initialValues);

    const codeSchema = yup.object().shape({
        code: yup.string().required("Code is required."),
        name: yup.string().required("Name is required."),
        description: yup.string().required("Description is required.")
    });

    const handleSubmit = async (payload: CodeModel) => {
        payload.codeTypeId = Number(refId);
        if (codeId) {
            updateCode(Number(codeId), payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code has been updated successfully!!!');
                    navigate('/config/code');
                }
            });
        } else {
            saveCode(payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code has been added successfully!!!');
                    navigate('/config/code');
                }
            });
        }
    }

    const loadCode = async () => {
        if (codeId) {
            const existingCodeType = await getCodeById(Number(codeId));
            setCodeValue(existingCodeType);
        }
    }

    useEffect(() => {
        loadCode();
    }, []);

    return (
        <>
            <BreadCrumb heading={codeId ? 'Edit Code' : 'Add Code'} backLink="/config/code" />

            <Formik
                onSubmit={handleSubmit}
                initialValues={codeValue}
                validationSchema={codeSchema}
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
                                                label="Code"
                                                placeholder="Code"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.code}
                                                name="code"
                                                error={!!touched.code && !!errors.code}
                                                helperText={!!touched.code && errors.code}
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
                                                label="Description"
                                                placeholder="Description"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values?.description}
                                                name="description"
                                                error={!!touched.description && !!errors.description}
                                                helperText={!!touched.description && errors.description}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <EliteButton fullWidth type='submit'> {codeId ? 'Update' : 'Add'} </EliteButton>
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

export default AddEditCode;
