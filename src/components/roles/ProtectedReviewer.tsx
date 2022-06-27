import { Navigate } from "react-router-dom";

function ProtectedReviewerRouting({ children }: any) {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`);
    if(role==="reviewer"){
     return children
    }
    else{
        return <Navigate to="/home" />;
    }
   


  }

  export default ProtectedReviewerRouting