import { useNavigate } from "react-router";
import EliteButton from "../../../../components/elite-button";
import { useEffect, useState } from "react";
import { CodeTypeModel } from "../../../../model/config/code-type";
import {
    Button, Card, FormControl, Grid, InputLabel, Menu, MenuItem, Pagination, Select,
    SelectChangeEvent,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from "@mui/material";
import { CodeModel } from "../../../../model/config/code";
import codeStore from "../../../../stores/config/code";
import { AiFillDelete, AiFillEdit, AiOutlineMore } from "react-icons/ai";
import { IconContext } from "react-icons";
import NoContent from "../../../../components/no-content";
import snackbarUtils from "../../../../utils/snackbar";
import BreadCrumb from "../../../../components/breadcrumb";
import codeTypeStore from "../../../../stores/config/code-type";
import useDebounce from "../../../../utils/debounce";
import { TableHeader } from "../../../../model/elite";
import { ref } from "yup";

const Code: React.FC = () => {

    const TABLE_HEAD = [
        { id: 'id', label: 'Id', align: 'left' },
        { id: 'code', label: 'Code', align: 'left' },
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'description', label: 'Description', align: 'left' },
        { id: 'actions', label: 'Actions', align: 'right' }
    ] as TableHeader[];

    const [codeType, setCodeType] = useState<CodeTypeModel[]>([]);
    const [codes, setCodes] = useState<CodeModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [name, setName] = useState('');
    const debouncedSearchTerm = useDebounce(name, 500);

    const [refId, setRefId] = useState<any>('');
    const navigate = useNavigate();

    const { deleteCode, searchCode } = codeStore;
    const { getCodeTypeDetails } = codeTypeStore;

    const [menuAnchorEls, setMenuAnchorEls] = useState<{ [key: number]: HTMLElement | null }>({});

    useEffect(() => {
        getCodeTypeDetails().then(c => setCodeType(c));
    }, []);

    useEffect(() => {
        onInit(debouncedSearchTerm, currentPage, refId);
    }, [refId, debouncedSearchTerm, currentPage]);

    const onInit = async (searchTerm: string, page: number, refId: number) => {
        const data = await searchCode(refId, searchTerm, (page - 1), pageSize);
        setCodes(data.content);
        setTotalPages(data.totalPages);
    };

    const handleOptionChange = (e: SelectChangeEvent<string>) => {
        setRefId(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setCurrentPage(1);
    };

    const handleMenuClick = (event: any, id: number) => {
        setMenuAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
    };

    const handleMenuClose = (id: number) => {
        setMenuAnchorEls((prev) => ({ ...prev, [id]: null }));
    };

    const handleEdit = (id: number) => {
        handleMenuClose(id);
        navigate(`/config/code/add-edit/${id}`);
    }

    const handleDelete = async (id: number) => {
        handleMenuClose(id);
        if (id) {
            await deleteCode(id);
            snackbarUtils.success('Code has been successfully deleted!!!');
            setCurrentPage(1);
            onInit(debouncedSearchTerm, currentPage, refId);
        }
    }

    return (
        <>
            <BreadCrumb heading="Code" actions={[<AddCode />]} />
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
                                onChange={handleOptionChange}
                                name="codeTypeId"
                                value={refId}
                            >
                                <MenuItem key='ALL' value=''>
                                    ALL
                                </MenuItem>
                                {codeType.map((value, index) => (
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
                                label="Search"
                                placeholder="Search"
                                onChange={handleSearchChange}
                                name="search"
                            />
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
                                    const menuOpen = Boolean(menuAnchorEls[row.id]);
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
                                                            aria-controls={menuOpen ? 'basic-menu' : undefined}
                                                            onClick={(e) => handleMenuClick(e, row.id!)}
                                                            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                                        >
                                                            <IconContext.Provider value={{ className: 'text-xl' }}>
                                                                <AiOutlineMore />
                                                            </IconContext.Provider>
                                                        </Button>
                                                        <Menu
                                                            anchorEl={menuAnchorEls[row.id!]}
                                                            open={menuOpen}
                                                            onClose={() => handleMenuClose(row.id!)}
                                                        >
                                                            <MenuItem onClick={() => handleEdit(row.id!)}>
                                                                <AiFillEdit className="text-green mr-2" />
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={() => handleDelete(row.id!)}>
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

                                {codes?.length > 0 && <Pagination className="my-3"
                                    count={totalPages}
                                    page={currentPage}
                                    variant="outlined"
                                    onChange={(event, value) => setCurrentPage(value)}
                                />
                                }
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



const AddCode: React.FC = () => {
    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate(`/config/code/add-edit`);
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