import { useNavigate, useParams } from "react-router";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { CodeTypeModel } from "../../../../../model/config/code-type";
import { Card, FormControl, Grid, TextField } from "@mui/material";
import EliteButton from "../../../../../components/elite-button";
import snackbarUtils from "../../../../../utils/snackbar";
import codeTypeStore from "../../../../../stores/config/code-type";

const AddEditCodeType: React.FC = () => {

    const navigate = useNavigate();
    const { codeTypeId } = useParams();
    const { getCodeTypesById, saveCodeType, updateCodeType } = codeTypeStore;

    let initialValues = {
        code: '',
        name: '',
        description: ''
    } as CodeTypeModel;

    const [codeTypeValue, setCodeTypeValue] = useState<CodeTypeModel>(initialValues);

    const codeTypeSchema = yup.object().shape({
        code: yup.string().required("Code is required."),
        name: yup.string().required("Name is required."),
        description: yup.string().required("Description is required.")
    });

    const handleSubmit = async (payload: CodeTypeModel) => {
        if (codeTypeId) {
            updateCodeType(Number(codeTypeId), payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code type has been updated successfully!!!');
                    navigate('/config/code-type');
                }
            });
        } else {
            saveCodeType(payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code type has been added successfully!!!');
                    navigate('/config/code-type');
                }
            });
        }
    }

    const loadCodeType = async () => {
        if (codeTypeId) {
            const existingCodeType = await getCodeTypesById(Number(codeTypeId));
            setCodeTypeValue(existingCodeType);
        }
    }

    useEffect(() => {
        loadCodeType();
    }, []);

    return (
        <>
            <BreadCrumb heading={codeTypeId ? 'Edit Code Type' : 'Add Code Type'} backLink="/config/code-type" />

            <Formik
                onSubmit={handleSubmit}
                initialValues={codeTypeValue}
                validationSchema={codeTypeSchema}
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
                                        <EliteButton fullWidth type='submit'> {codeTypeId ? 'Update' : 'Add'} </EliteButton>
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

export default AddEditCodeType;
