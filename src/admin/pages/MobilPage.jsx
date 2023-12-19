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
import { GetAllMobil } from "../../api/apiMobil";
import { Alert } from "react-bootstrap";
import "./home.css";

const tableHeader = [
  { id: "nama", label: "Nama", minWidth: 150 },
  {
    id: "tipe",
    label: "Tipe",
    minWidth: 100,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    id: "disewa",
    label: "Disewa",
    minWidth: 10,
    format: (value) => (value ? "Iya" : "Tidak"),
  },
  {
    id: "harga_sewa",
    label: "Harga Sewa",
    minWidth: 150,
    align: "right",
    format: (value) => `Rp. ${value.toLocaleString("id-ID")}`,
  },
  { id: "no_polisi", label: "No Polisi", minWidth: 100 },
  { id: "tahun", label: "Tahun", minWidth: 50, align: "right" },
  {
    id: "bahan_bakar",
    label: "Bahan Bakar",
    minWidth: 120,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  { id: "jml_tempat_duduk", label: "Kapasitas", minWidth: 100 },
  {
    id: "transmisi",
    label: "Transmisi",
    minWidth: 100,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
];

const Mobil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [mobil, setMobil] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMobil = () => {
    setIsLoading(true);
    GetAllMobil()
      .then((response) => {
        setMobil(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchMobil();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = mobil.filter((row) =>
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
      ) : mobil?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <Paper sx={{ width: "100vh", overflow: "hidden" }} className="p-3">
            <h1 className="text-center">Mobil</h1>
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
                                {header.format ? header.format(value) : value}
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
              count={mobil.length}
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
          Tidak Ada Mobil...
        </Alert>
      )}
    </Container>
  );
};

export default Mobil;
