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
import { useDispatch, useSelector } from "react-redux";
import SnackBarCustom from "../snackbar/SnackBarCustom";
import { deleteSubCategory, fetchSubCategory } from "../../redux/actions/subCategoryAction";
import DeleteProp from "../../utilities/delete-popup/DeletePop";
import UpdateSubCategoryPopus from "../update-sub-category-popup/updateSubCategoryPopup";
export default function SubCategoryTable() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hasError } = useSelector((state: any) => state.status);
  const dispatch: any = useDispatch();
  useEffect(() => {
    // dispatch(FetchCategories());
    dispatch(fetchSubCategory());
  }, []);

  const data = useSelector((data) => data);

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


  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>Number</TableCell>
              <TableCell align={"center"}>Title</TableCell>
              <TableCell align={"center"}>Update</TableCell>
              <TableCell align={"center"}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data as any).subCategory.data.length
              ? (data as any).subCategory.data.map(
                  (category: any, index: number) => (
                    <TableRow hover tabIndex={-1} key={category._id}>
                      <TableCell align={"center"}>{index + 1}</TableCell>
                      <TableCell align={"center"}>{category.title}</TableCell>
                      <TableCell align={"center"}>
                        {/* <UpdateCategoryPopus category={category} /> */}
                        <UpdateSubCategoryPopus subCategory={category} />
                      </TableCell>
                      <TableCell align={"center"}>
                        {/* <DeleteCategoryPopup
                          // handelechange={handelechange}
                          id={category._id}
                        /> */}
                        <DeleteProp id={category._id} dispatchFunction={deleteSubCategory} />
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
