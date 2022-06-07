// import * as React from "react";
import {useEffect, useState}from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useDispatch, useSelector } from 'react-redux';
import { deleteAdmin, getAllAdmin } from '../../../redux/actions/adminAction';
import DeleteCategoryPopus from '../../../utilities/delete-popup/DeletePop'

import CircularIndeterminate from '../../spinner/spinner'



const Admins = () => {
 
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch:any=useDispatch();
  const admins=useSelector((state:any)=> state.admins)

 const{loading}=useSelector((state:any)=> state?.status)
 

 


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
  dispatch(getAllAdmin())

},[dispatch])



  return (
<>
    {loading?
      <CircularIndeterminate /> :
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
          {admins
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row:any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                  
                      <DeleteCategoryPopus 
                      id={row._id} dispatchFunction={deleteAdmin} />
                
                   
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
      count={admins.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    
  </Paper>
  }
  </>
   
  );
};

export default Admins;
