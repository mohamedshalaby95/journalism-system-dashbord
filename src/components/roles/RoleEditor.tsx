import React from 'react';

const RoleEditor = () => {
    const {role} = JSON.parse(`${localStorage.getItem("userInf")}`);
    if(role==="editor"){
     return true
    }
    else{
        return false
    }
   
};

export default RoleEditor;