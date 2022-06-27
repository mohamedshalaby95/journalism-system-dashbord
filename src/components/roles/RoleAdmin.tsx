import React from 'react';

const RoleAdmin = () => {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`)||{role:""};
    if(role==="administrator"){
     return true
    }
    else{
        return false
    }
   
};

export default RoleAdmin;