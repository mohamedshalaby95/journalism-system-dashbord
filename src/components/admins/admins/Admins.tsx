import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Admins = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
    {
      firstName: "Menna",
      lastName: "Omina",
      email: "Shefa@website.com",
      role: "Admin",
      id: 1,
    },
    {
      firstName: "Menna",
      lastName: "Omina",
      email: "Shefa@website.com",
      role: "Admin",
      id: 2,
    },
    {
      firstName: "Menna",
      lastName: "Omina",
      email: "Shefa@website.com",
      role: "Admin",
      id: 3,
    },
    {
      firstName: "Menna",
      lastName: "Omina",
      email: "Shefa@website.com",
      role: "Admin",
      id: 4,
    },
  ];

  return (
    <Paper sx={{ width: "80%", overflow: "hidden", margin: "20px auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" size="large">
                        <Delete color="error" />
                      </IconButton>
                      <IconButton aria-label="delete" size="large">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/admins/edit/22`}
                        >
                          <Edit color="secondary" />
                        </Link>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Admins;
