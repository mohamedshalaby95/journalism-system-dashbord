import * as React from "react";
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import UpdateCategoryPopus from "../update-category-popup/UpdateCategoryPopup";
import DeleteCategoryPopup from "../delete-category-popup/DeleteCategoryPopup";
import { FetchCategories } from "../../redux/actions/CategoryActions";
import { useDispatch, useSelector } from "react-redux";
import SnackBarCustom from "../snackbar/SnackBarCustom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hasError } = useSelector((state: any) => state.status);
  const dispatch: any = useDispatch();
  const [sw, setSw] = useState({ status: false });
  useEffect(() => {
    dispatch(FetchCategories());
  }, [dispatch]);

  // const data= useSelector((data) => {
  //back
  // console.log((data as any).category.data.data)
  //  setCategories((data as any).category.data.data)
  // });
  const data = useSelector((data) => data);
  // useEffect(()=>{
  //   setSw((old)=>true)

  // },[data, setSw])

  // const handelechange = () => {
  //   setSw((old) => ({ status: true }));
  // };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const changeSW = () => {
    // setSw((old)=>!old)
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align={"center"}
                // style={{ minWidth: column.minWidth }}
              >
                Number
              </TableCell>
              <TableCell
                align={"center"}
                // style={{ minWidth: column.minWidth }}
              >
                Category
              </TableCell>
              <TableCell
                align={"center"}
                // style={{ minWidth: column.minWidth }}
              >
                Update
              </TableCell>
              <TableCell
                align={"center"}
                // style={{ minWidth: column.minWidth }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data as any).category.data.length
              ? (data as any).category.data.map(
                  (category: any, index: number) => (
                    <TableRow hover tabIndex={-1} key={category._id}>
                      <TableCell align={"center"}>{index + 1}</TableCell>
                      <TableCell align={"center"}>{category.title}</TableCell>
                      <TableCell align={"center"}>
                        <UpdateCategoryPopus category={category} />
                      </TableCell>
                      <TableCell align={"center"}>
                        <DeleteCategoryPopup
                          // handelechange={handelechange}
                          id={category._id}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )
              : ""}
          </TableBody>
        </Table>
      </TableContainer>

      {(data as any).category.data.length ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ""
      )}

      {/* {!sw?.status ? "fdsfsdfd" : <SnackBarCustom hasError={sw} />} */}
    </Paper>
  );
}
