
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { Delete, Edit,RemoveRedEye } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {acceptPost, cancelPendingPost, getPendingPosts} from '../../../redux/actions/pendingPosts'
import CircularIndeterminate from "../../spinner/spinner";
import CancelIcon from '@mui/icons-material/Cancel';
import {io} from "socket.io-client"

const PendingPost = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

const pendingPosts=useSelector((state:any)=> state?.pendingPosts)
const [socket,setSocket]= useState(()=> io(`${process.env.REACT_APP_BACKEND}`))

const{loading}=useSelector((state:any)=> state?.status)
const dispatch:any=useDispatch()
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(()=>{

    dispatch(getPendingPosts())

  },[dispatch])

  const handelClickAccept=useCallback((id:string)=>{
    socket.emit("postAccept",id)
  dispatch(acceptPost(id))

  },[dispatch,acceptPost])
  const handelClickDeletePost=useCallback((id:string)=>{
    socket.emit("postCancell",id)
    dispatch(cancelPendingPost(id))
  
    },[dispatch,cancelPendingPost])

 


  return (
    <>
    {loading?<CircularIndeterminate/> :  <Paper sx={{ width: "80%", overflow: "hidden", margin: "20px auto" }}>
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
        <TableBody>
          {pendingPosts
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((pendingPosts:any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={pendingPosts._id}>
                  <TableCell>{pendingPosts.title}</TableCell>
                  <TableCell>{pendingPosts.category}</TableCell>
                  <TableCell>{pendingPosts.subCategory}</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" size="large">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/post/${pendingPosts._id}`}
                      >
                        <RemoveRedEye color="primary" />
                      </Link>
                    </IconButton>
                    <IconButton onClick={()=>handelClickAccept(pendingPosts._id)} aria-label="delete" size="large">
                      
                        < CheckIcon  color="secondary" />
                    
                    </IconButton>
                    <IconButton onClick={()=>handelClickDeletePost(pendingPosts._id)} aria-label="delete" size="large">
                      <CancelIcon color="error" />
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
      count={pendingPosts.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>}
  </>
  );
};

export default PendingPost;