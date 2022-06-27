import { Navigate } from "react-router-dom";

function ProtectedEditorRouting({ children }: any) {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`);
    if(role==="editor"){
     return children
    }
    else{
        return <Navigate to="/home" />;
    }
   


  }

  export default ProtectedEditorRouting