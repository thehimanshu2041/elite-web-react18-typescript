import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb";
import {
    Button,
    Card, FormControl, Grid, Menu, MenuItem, Pagination, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField
} from "@mui/material";
import NoContent from "../../../../components/no-content";
import useDebounce from "../../../../utils/debounce";
import { TableHeader } from "../../../../model/elite";
import userStore from "../../../../stores/user";
import { AuthUserModel } from "../../../../model/auth";
import { IconContext } from "react-icons";
import { AiFillEdit, AiOutlineMore } from "react-icons/ai";
import { useNavigate } from "react-router";
import EliteButton from "../../../../components/elite-button";

const User: React.FC = () => {

    const TABLE_HEAD = [
        { id: 'id', label: 'Id', align: 'left' },
        { id: 'username', label: 'Username', align: 'left' },
        { id: 'email', label: 'Email', align: 'left' },
        { id: 'name', label: 'Name', align: 'left' },
        { id: 'gender', label: 'Gender', align: 'left' },
        { id: 'phone', label: 'Phone', align: 'left' },
        { id: 'country', label: 'Country', align: 'left' },
        { id: 'actions', label: 'Actions', align: 'right' }
    ] as TableHeader[];

    const { searchUser } = userStore;
    const [users, setUsers] = useState<AuthUserModel[]>([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [name, setName] = useState('');
    const debouncedSearchTerm = useDebounce(name, 500);

    const [menuAnchorEls, setMenuAnchorEls] = useState<{ [key: number]: HTMLElement | null }>({});
    const navigate = useNavigate();

    useEffect(() => {
        onInit(debouncedSearchTerm, currentPage);
    }, [debouncedSearchTerm, currentPage]);

    const onInit = async (searchTerm: string, page: number) => {
        const data = await searchUser(searchTerm, (page - 1), pageSize);
        setUsers(data.content);
        setTotalPages(data.totalPages);
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
        navigate(`/config/user/add-edit/${id}`);
    }

    return (
        <>
            <BreadCrumb heading="User" actions={[<AddUser />]} />
            <Card className='p-5 shadow-none'>
                <Grid container spacing={2}>
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
                                {users?.length > 0 && users.map((row, index) => {
                                    const menuOpen = Boolean(menuAnchorEls[row.id!]);
                                    return (
                                        <>
                                            <TableRow hover tabIndex={-1}>
                                                <TableCell align="left">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.username}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.email}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.first_name} {row.last_name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.gender?.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.phone}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.country?.niceName}
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
                                                        </Menu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}

                                {users?.length > 0 && <Pagination className="my-3"
                                    count={totalPages}
                                    page={currentPage}
                                    variant="outlined"
                                    onChange={(event, value) => setCurrentPage(value)}
                                />
                                }
                            </TableBody>
                        </Table>
                        {users?.length < 1 && <NoContent />}
                    </TableContainer>
                </Grid>
            </Card >
        </>
    );
}

export default User;

const AddUser: React.FC = () => {
    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate(`/config/user/add-edit`);
    };

    return (
        <>
            <EliteButton
                onClick={handleAdd}
            >
                Add User
            </EliteButton>
        </>
    );
};