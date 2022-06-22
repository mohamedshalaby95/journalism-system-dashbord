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
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchPosts } from "../../../redux/actions/postsAction";
import { IPost } from "../../../types/posts";
import DeletePopup from "../../../utilities/delete-popup/DeletePop";
import { fetchSubCategory } from "../../../redux/actions/subCategoryAction";
const Posts = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { posts } = useSelector((state: any) => state);
  const dispatch: any = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "80%", overflow: "hidden", margin: "20px auto" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          {posts.data.length === 0 ? (
            <div>looding</div>
          ) : (
            <TableBody>
              {posts.data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: IPost) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.category}</TableCell>
                      <TableCell>{row.subCategory}</TableCell>
                      <TableCell>
                        <IconButton aria-label="delete" size="large">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/post/22`}
                          >
                            <RemoveRedEye color="primary" />
                          </Link>
                        </IconButton>
                        <IconButton aria-label="delete" size="large">
                          {/* <Delete color="error" /> */}
                          <DeletePopup
                            id={row._id}
                            dispatchFunction={deletePost}
                          />
                        </IconButton>
                        <IconButton aria-label="delete" size="large">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/post/edit/${row._id}`}
                          >
                            <Edit color="secondary" />
                          </Link>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={posts.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Posts;
