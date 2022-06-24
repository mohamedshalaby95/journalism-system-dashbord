import { Navigate } from "react-router-dom";

function ProtectedAdminRouting({ children }: any) {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`);
    if(role==="administrator"){
     return children
    }
    else{
        return <Navigate to="/home" />;
    }
   


  }

  export default ProtectedAdminRouting