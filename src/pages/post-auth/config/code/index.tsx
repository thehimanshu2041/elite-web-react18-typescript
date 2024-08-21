import { useNavigate, useParams } from "react-router";
import EliteButton from "../../../../components/elite-button";
import { useEffect, useState } from "react";
import { CodeTypeModel } from "../../../../model/config/code-type";
import { Button, Card, FormControl, Grid, InputLabel, Menu, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CodeModel } from "../../../../model/config/code";
import codeStore from "../../../../stores/config/code";
import { AiFillDelete, AiFillEdit, AiOutlineMore } from "react-icons/ai";
import { IconContext } from "react-icons";
import NoContent from "../../../../components/no-content";
import snackbarUtils from "../../../../utils/snackbar-utils";
import BreadCrumb from "../../../../components/breadcrumb";
import codeTypeStore from "../../../../stores/config/code-type";

export interface TableHeader {
    id: string;
    label: string;
    align: 'left' | 'right' | 'center';
}

const Code: React.FC = () => {

    const TABLE_HEAD = [
        {
            id: 'id',
            label: 'Id',
            align: 'left'
        },
        {
            id: 'code',
            label: 'Code',
            align: 'left'
        },
        {
            id: 'name',
            label: 'Name',
            align: 'left'
        },
        {
            id: 'description',
            label: 'Description',
            align: 'left'
        },
        {
            id: 'actions',
            label: 'Actions',
            align: 'right'
        }
    ] as TableHeader[];

    const [codeType, setCodeType] = useState<CodeTypeModel[]>([]);
    const [codes, setCodes] = useState<CodeModel[]>([]);
    const [refId, setRefId] = useState<number>();
    const navigate = useNavigate();

    const { getCodeTypes } = codeTypeStore;
    const { getCodesById, deleteCodesById } = codeStore;

    const [anchorEl, setAnchorEl] = useState(null);
    const editOpen = Boolean(anchorEl);

    const handleOnChange = async (event: SelectChangeEvent<any>) => {
        setCodes([]);
        const value = event?.target?.value;
        if (value) {
            setRefId(value);
            getCodesById(value).then(c => setCodes(c));
        }
    };

    const handleEditClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEditClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (id: number | undefined) => {
        handleEditClose();
        navigate(`/config/code/add-edit/${refId}/${id}`);
    }

    const handleDelete = async (id: number | undefined) => {
        handleEditClose();
        if (id) {
            await deleteCodesById(id);
            snackbarUtils.success('Code has been successfully deleted!!!');
            window.location.reload();
        }
    }

    const loadData = async () => {
        await getCodeTypes().then(c => setCodeType(c));
    };

    useEffect(() => {
        snackbarUtils.info('Please select a code type!!!')
        loadData();
    }, []);


    return (
        <>
            <BreadCrumb heading="Code" actions={refId ? [<AddCode refId={refId} />] : null} />
            <Card className='p-5 shadow-none'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel id="CodeTypeId">Code type</InputLabel>
                            <Select
                                fullWidth
                                labelId="CodeTypeId"
                                label="CodeTypeId"
                                placeholder="CodeTypeId"
                                onChange={(val) => handleOnChange(val)}
                                name="codeTypeId"
                            >
                                {codeType.map((value, index) => (
                                    <MenuItem key={index} value={value.id}>
                                        {value.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <TableContainer className="rounded mx-3 mt-3">
                        <Table>
                            <TableHead >
                                <TableRow style={{ background: 'rgba(25, 35, 58, 0.1)' }}>
                                    {TABLE_HEAD.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.align}
                                        >
                                            {headCell.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {codes?.length > 0 && codes.map((row, index) => {
                                    return (
                                        <>
                                            <TableRow hover tabIndex={-1}>
                                                <TableCell align="left">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.code}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.description}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <Button
                                                            aria-controls={editOpen ? 'basic-menu' : undefined}
                                                            onClick={handleEditClick}
                                                            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                                        >
                                                            <IconContext.Provider value={{ className: 'text-xl' }}>
                                                                <AiOutlineMore />
                                                            </IconContext.Provider>
                                                        </Button>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={editOpen}
                                                            onClose={handleEditClose}
                                                        >
                                                            <MenuItem onClick={() => handleEdit(row.id)}>
                                                                <AiFillEdit className="text-green mr-2" />
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleDelete(row.id)}>
                                                                <AiFillDelete className="text-red mr-2" />
                                                                Delete
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        {codes?.length < 1 && <NoContent />}
                    </TableContainer>
                </Grid>
            </Card>
        </>
    );
};

export default Code;

export interface AddCodeProps {
    refId: number | undefined;
}

const AddCode: React.FC<AddCodeProps> = ({ refId }) => {
    const navigate = useNavigate();

    const handleAdd = async () => {
        console.log(refId);
        navigate(`/config/code/add-edit/${refId}`);
    };

    return (
        <>
            <EliteButton
                onClick={handleAdd}
            >
                Add Code Type
            </EliteButton>
        </>
    );
};