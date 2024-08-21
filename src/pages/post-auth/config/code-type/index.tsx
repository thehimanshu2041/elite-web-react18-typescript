import { Button, Card, Grid, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import BreadCrumb from "../../../../components/breadcrumb";
import { useEffect, useState } from "react";
import { CodeTypeModel } from "../../../../model/config/code-type";
import * as React from 'react';
import { IconContext } from "react-icons";
import { AiFillDelete, AiFillEdit, AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from "react-router";
import EliteButton from "../../../../components/elite-button";
import snackbarUtils from "../../../../utils/snackbar-utils";
import NoContent from "../../../../components/no-content";
import codeTypeStore from "../../../../stores/config/code-type";

export interface TableHeader {
    id: string;
    label: string;
    align: 'left' | 'right' | 'center';
}

const CodeType: React.FC = () => {

    const [codeType, setCodeType] = useState<CodeTypeModel[]>([]);
    const { getCodeTypes, deleteCodeType } = codeTypeStore;
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const editOpen = Boolean(anchorEl);

    const handleEditClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEditClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (id: number | undefined) => {
        handleEditClose();
        navigate(`/config/code-type/add-edit/${id}`);
    }

    const handleDelete = async (id: number | undefined) => {
        handleEditClose();
        if (id) {
            await deleteCodeType(id);
            snackbarUtils.success('Code type has been successfully deleted!!!')
            getCodeTypes().then(c => setCodeType(c));
        }
    }

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

    useEffect(() => {
        getCodeTypes().then(c => setCodeType(c));
    }, []);

    return (
        <>
            <BreadCrumb heading="Code Type" actions={[<AddCodeType />]} />
            <Card className='p-5 shadow-none'>
                <Grid>
                    <TableContainer className="rounded">
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
                                {codeType?.length > 0 && codeType.map((row, index) => {
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
                        {codeType?.length < 1 && <NoContent />}
                    </TableContainer>
                </Grid>
            </Card>
        </>
    );
};

export default CodeType;


const AddCodeType = () => {
    const navigate = useNavigate();

    const handleAdd = async () => {
        navigate('/config/code-type/add-edit');
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