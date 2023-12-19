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
import { GetAllTransaksi } from "../../api/apiTransaksi";
import { Alert } from "react-bootstrap";
import "./home.css";

const tableHeader = [
  { id: "id", label: "ID", minWidth: 50 },
  {
    id: "mobil",
    label: "Mobil",
    minWidth: 150
  },
  {
    id: "peminjam",
    label: "User",
    minWidth: 150
  },
  {
    id: "pickup",
    label: "Pickup Lokasi",
    minWidth: 130
  },
  {
    id: "dropoff",
    label: "Dropoff Lokasi",
    minWidth: 130
  },
  {
    id: "waktu_pickup",
    label: "Pickup",
    minWidth: 100,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  {
    id: "waktu_dropoff",
    label: "Dropoff",
    minWidth: 100,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
  {
    id: "status",
    label: "Status",
    minWidth: 50,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    id: "metode_pembayaran",
    label: "Pembayaran",
    minWidth: 50,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    id: "details",
    label: "Tambahan",
    minWidth: 130,
    format: (value) => value.charAt(0).toUpperCase() + value.slice(1),
  },
  {
    id: "created_at",
    label: "Tanggal Transaksi",
    minWidth: 150,
    format: (value) => {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  },
];

const Transaksi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [transaksi, setTransaksi] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransaksi = () => {
    setIsLoading(true);
    GetAllTransaksi()
      .then((response) => {
        setTransaksi(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchTransaksi();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = transaksi.filter((row) =>
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
      ) : transaksi?.length > 0 ? (
        <Row className="justify-content-center align-items-center">
          <Paper sx={{ width: "100vh", overflow: "hidden" }} className="p-3">
            <h1 className="text-center">Transaksi</h1>
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
              count={transaksi.length}
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
          Tidak Ada Transaksi...
        </Alert>
      )}
    </Container>
  );
};

export default Transaksi;
