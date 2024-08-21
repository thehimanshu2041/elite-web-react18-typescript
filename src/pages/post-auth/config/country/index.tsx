import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadcrumb";
import countryStore from "../../../../stores/config/country";
import { CountryModel } from "../../../../model/config/country";
import { Card, FormControl, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import NoContent from "../../../../components/no-content";
import useDebounce from "../../../../utils/debounce-utils";

export interface TableHeader {
    id: string;
    label: string;
    align: 'left' | 'right' | 'center';
}

const Country: React.FC = () => {

    const TABLE_HEAD = [
        {
            id: 'id',
            label: 'Id',
            align: 'left'
        },
        {
            id: 'name',
            label: 'Name',
            align: 'left'
        },
        {
            id: 'isp',
            label: 'Isp',
            align: 'left'
        },
        {
            id: 'numCode',
            label: 'Num code',
            align: 'left'
        },
        {
            id: 'phoneCode',
            label: 'Phone Code',
            align: 'left'
        }
    ] as TableHeader[];

    const { getCountriesBySearch } = countryStore;
    const [country, setCountry] = useState<CountryModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(10);
    const [name, setName] = useState('');
    const debouncedSearchTerm = useDebounce(name, 500);


    const loadData = async () => {
        const data = await getCountriesBySearch(name, currentPage - 1, pageSize);
        setCountry(data.content);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
        loadData();
    }, [debouncedSearchTerm]);

    return (
        <>
            <BreadCrumb heading="Country" />
            <Card className='p-5 shadow-none'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl style={{ width: "100%" }}>
                            <TextField
                                fullWidth
                                type="text"
                                label="Search"
                                placeholder="Search"
                                onChange={(e) => setName(e.target.value)}
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
                                {country?.length > 0 && country.map((row, index) => {
                                    return (
                                        <>
                                            <TableRow hover tabIndex={-1}>
                                                <TableCell align="left">
                                                    {row.id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.isp}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.numCode}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.phoneCode}
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    );
                                })}

                                {country?.length > 0 && <Pagination className="my-3"
                                    count={totalPages}
                                    page={currentPage}
                                    variant="outlined"
                                    onChange={(event, value) => setCurrentPage(value)}
                                />
                                }
                            </TableBody>
                        </Table>
                        {country?.length < 1 && <NoContent />}
                    </TableContainer>
                </Grid>
            </Card >
        </>
    );
}

export default Country;
