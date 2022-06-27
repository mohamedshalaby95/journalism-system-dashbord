import { useState, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const useLoged = (initialState = false) => {
	const [userLogged, setUserLogged] = useState(initialState);

   function changeState (){
        setUserLogged((old:any)=>  true);
    }
    function changeStateTo (){
        setUserLogged((old:any)=>  false);
    }


    // const navigate=useNavigate()

	// const  UserIsLogin= useCallback(({children}:any) => {
    //     if (localStorage.getItem("userInf")) {
    //         setUserLogged((old) => true);
      
    //         return children;
    //       } else {
    //         return  navigate("/login")
    //       }
	// }, [ setUserLogged,navigate]);

	// const reset = useCallback(() => setCounter(initialCounter), [initialCounter]);

	return [userLogged, changeState, changeStateTo]as any;
};

export default  useLoged;