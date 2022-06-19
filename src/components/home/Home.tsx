import { Paper } from "@mui/material";
import { useState } from "react";
import { UserData } from "./Data";
import PieChart from "./PieChart";

const Home = () => {
  const [userData, setUserData] = useState({
    labels: ["Active","Pending","Canceled"],
    datasets: [
      {
        label: "Posts",
        data: [10,5,2],
        backgroundColor: [
          "red",
          "green",
          "blue",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <Paper sx={{ width: "80%", overflow: "hidden", margin: "20px auto" }}>
        <div style={{ width: 700 }}>
          <PieChart chartData={userData} />
        </div>
      </Paper>
    </>
  );
};

export default Home;
