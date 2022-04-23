import { useEffect, useState } from "react";
// packages
import axios from "axios";
// @mui
import {
  Grid,
  Box,
  Card,
  Table,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  CardContent,
  Typography,
} from "@mui/material";
// components
import notifyErrorHandler from "../../middlewares/notifyErrorHandler";
import useTable from "../../hooks/useTable";

// sections
import TableHeadCustom from "./TableHeadCustom";
import PlanetTableRow from "./TableRow";
// ----------------------------------------------------------------------

export default function NitaxTable() {
  const [tableData, setTableData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const {
    dense,
    page,
    order,
    rowsPerPage,
    selected,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const TABLE_HEAD = [
    { id: "name", label: "Name", align: "left" },
    { id: "climate", label: "Climate", align: "left" },
    { id: "diamete", label: "Diamete", align: "left" },
    { id: "orbital_period", label: "Orbital period", align: "left" },
    { id: "population", label: "Population", align: "left" },
    { id: "surface_water", label: "Surface water", align: "left" },
    { id: "terrain", label: "Terrain", align: "left" },
    { id: "date", label: "Date", align: "left" },
  ];

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${page + 1}`
        );
        if (response.status === 200) {
          const { results, count } = response.data;
          setTableData((prev) => [...prev, ...results]);
          setTotalPage(count);
        }
      } catch (error) {
        notifyErrorHandler({
          type: "error",
          title: "Error Fetching Accounts",
          msg: error,
          duration: 5000,
        });
      } finally {
      }
    };
    getPlanets();
  }, [page]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Current page {page + 1}
              </Typography>
            </CardContent>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              <Table size={dense ? "small" : "medium"}>
                <TableHeadCustom
                  order={order}
                  headLabel={TABLE_HEAD}
                  rowCount={totalPage}
                  numSelected={selected?.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row.id)
                    )
                  }
                />
                <TableBody>
                  {tableData
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <PlanetTableRow key={row?.id} row={row} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ position: "relative" }}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalPage}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />

              <FormControlLabel
                control={<Switch checked={dense} onChange={onChangeDense} />}
                label="Dense"
                sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
