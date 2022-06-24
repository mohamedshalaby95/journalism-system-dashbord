import React from 'react';

const RoleReviewer = () => {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`);
    if(role==="reviewer"){
     return true
    }
    else{
        return false
    }
   
};



export default RoleReviewer;