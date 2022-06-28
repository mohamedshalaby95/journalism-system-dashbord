import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../../redux/actions/getPostAction";
import { Item } from "../../../utilities/sideNavbarStyle";
import CircularIndeterminate from "../../spinner/spinner";
import useMediaQuery from '@mui/material/useMediaQuery';
import { margin } from "@mui/system";

const PostDetails = () => {
    const matches = useMediaQuery('(min-width:600px)');
  const { id } = useParams();
  const dispatch: any = useDispatch();
  const post = useSelector((state: any) => state?.postById);
  const { loading } = useSelector((state: any) => state?.status);

  const navigate=useNavigate()
  console.log(post);
  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  return (
    <>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <>
          <Grid container spacing={2} sx={{marginTop:"70px"}}>
            <Grid item xs={matches?4:12}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="300"
                    image={post?.image}
                  />
                  
                </Card>
              </Item>
            </Grid>
            <Grid item xs={matches?8:12} sx={{display:"flex",justifyContent:"center"}}>
              <Item>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          Title
                        </TableCell>
                        <TableCell>{post?.title}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          Categrory
                        </TableCell>
                        <TableCell>{post?.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          Subcategory
                        </TableCell>
                        <TableCell>{post?.subCategory}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          Description
                        </TableCell>
                        <TableCell>{post?.description}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          created At
                        </TableCell>
                        <TableCell>{post?.createdAt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                        >
                          Status
                        </TableCell>
                        <TableCell>{post?.status}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button onClick={()=> navigate("/post/pending")} sx={{marginTop:"100px",marginLeft:"50px"}} variant="contained" disableElevation>
                 GO Back
                </Button>
              </Item>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default PostDetails;
