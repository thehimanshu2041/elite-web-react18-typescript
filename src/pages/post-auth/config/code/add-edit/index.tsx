import { useNavigate, useParams } from "react-router";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import EliteButton from "../../../../../components/elite-button";
import snackbarUtils from "../../../../../utils/snackbar";
import { CodeModel, CodeReqModel } from "../../../../../model/config/code";
import codeStore from "../../../../../stores/config/code";
import { CodeTypeModel } from "../../../../../model/config/code-type";
import codeTypeStore from "../../../../../stores/config/code-type";

const AddEditCode: React.FC = () => {

    const navigate = useNavigate();
    const { codeId } = useParams();
    const { getCodeById, createCode, updateCode } = codeStore;
    const { getCodeTypeDetails } = codeTypeStore;

    let initialValues = {
        codeTypeId: 0,
        code: '',
        name: '',
        description: ''
    } as any;

    const [codeValue, setCodeValue] = useState<CodeModel>(initialValues);
    const [codeTypes, setCodeTypes] = useState<CodeTypeModel[]>();

    const codeSchema = yup.object().shape({
        code: yup.string().required("Code is required."),
        name: yup.string().required("Name is required."),
        description: yup.string().required("Description is required."),
        codeTypeId: yup.number().min(1).required("Code type is required.")
    });

    const handleSubmit = async (payload: CodeReqModel) => {
        if (codeId) {
            updateCode(Number(codeId), payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code has been updated successfully!!!');
                    navigate('/config/code');
                }
            });
        } else {
            createCode(payload).then(data => {
                if (data) {
                    snackbarUtils.success('Code has been added successfully!!!');
                    navigate('/config/code');
                }
            });
        }
    }

    useEffect(() => {
        onInit();
    }, []);

    const onInit = async () => {
        const codeTypes = await getCodeTypeDetails();
        setCodeTypes(codeTypes);
        if (codeId) {
            const existingCodeType = await getCodeById(Number(codeId));
            setCodeValue(existingCodeType);
        }
    }

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
                                            <InputLabel id="CodeType">Code Type</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="CodeType"
                                                label="CodeType"
                                                placeholder="CodeType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.codeTypeId}
                                                name="codeTypeId"
                                                error={!!touched.codeTypeId && !!errors.codeTypeId}
                                            >
                                                {codeTypes?.map((value, index) => (
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
