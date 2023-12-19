import React from "react";
import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { Row } from "react-bootstrap";
import { GetAllCabang } from "../../api/apiCabang";
import { Alert } from "react-bootstrap";
import "./home.css";

const tableHeader = [
  { id: "nama", label: "Nama", minWidth: 100 },
  { id: "kota", label: "Kota", minWidth: 100 },
  { id: "alamat", label: "Alamat", minWidth: 200 },
];

const Cabang = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [cabang, setCabang] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCabang = () => {
    setIsLoading(true);
    GetAllCabang()
      .then((response) => {
        setCabang(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchCabang();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = cabang.filter((row) =>
    Object.values(row).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <div className="text-center">
          <Spinner
            as="span"
            animation="border"
            variant="primary"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <h6 className="mt-2 mb-0">Loading...</h6>
        </div>
      ) : cabang?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <Paper sx={{ width: "100vh", overflow: "hidden" }} className="p-3">
            <h1 className="text-center">Cabang</h1>
            <div className="mt-3">
              <TextField
                label="Search"
                variant="outlined"
                color="primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "20px", width: "100%" }}
              />
            </div>
            <TableContainer sx={{ height: 330 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {tableHeader.map((header) => (
                      <TableCell
                        key={header.id}
                        align={header.align}
                        style={{ minWidth: header.minWidth }}
                      >
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {tableHeader.map((header) => {
                            const value = row[header.id];
                            return (
                              <TableCell key={header.id} align={header.align}>
                                {header.format && typeof value === "number"
                                  ? header.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={cabang.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel":
                  {
                    margin: 0,
                  },
              }}
            />
          </Paper>
        </Row>
      ) : (
        <Alert variant="dark" className="mt-3 text-center">
          Tidak Ada Cabang...
        </Alert>
      )}
    </Container>
  );
};

export default Cabang;
