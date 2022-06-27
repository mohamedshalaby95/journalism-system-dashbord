import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/actions/postsAction";
import { UserData } from "./Data";
import PieChart from "./PieChart";

const Home = () => {
  const [activePosts, setActivePosts] = useState(0);
  const [pendingPosts, setPendingPosts] = useState(0);
  const [canceledPosts, setCanceledPosts] = useState(0);
  const { posts } = useSelector((state: any) => state);
  const dispatch: any = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    posts.data.filter((post: any) => {
      if (post.status === "pending") {
        setPendingPosts((oldState) => oldState + 1);
      } else if (post.status === "accepted") {
        setActivePosts((oldState) => oldState + 1);
      } else if (post.status === "canceled") {
        setCanceledPosts((oldState) => oldState + 1);
      }
    });

    setPostsData({
      labels: ["pending", "accepted", "Canceled"],
      datasets: [
        {
          label: "Posts",
          data: [+pendingPosts, +activePosts, +canceledPosts],
          backgroundColor: ["red", "green", "blue"],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });

    return () => {
      setActivePosts(0);
      setCanceledPosts(0);
      setPendingPosts(0);
    };
  }, [posts]);

  const [postData, setPostsData] = useState({
    labels: ["accepted", "Pending", "Canceled"],
    datasets: [
      {
        label: "Posts",

       

    

        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <Paper sx={{ width: "80%", overflow: "hidden", margin: "20px auto" }}>
        <div style={{ width: 700 }}>
          <PieChart chartData={postData} />
        </div>
      </Paper>
    </>
  );
};

export default Home;
