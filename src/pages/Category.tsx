import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CategoryTable from "../components/category-table/CategoryTable";
import { Container } from "@mui/material";
import AddCategoryPopup from "../components/add-category-popup/AddCategoryPopup";
import RoleAdmin from "../components/roles/RoleAdmin";
function Category() {
  const [addCategoryPopupState,setAddCategoryPopupState] = useState(false);
const handleAddCategoryPopupState=()=>{
  setAddCategoryPopupState((prvState:boolean)=>!prvState)
}
  return (
    <Container>
      <Stack
        spacing={2}
        alignItems="flex-end"
        //  sx={{background:"red"}}
      >
        {/* <Button variant="outlined" onClick={handleAddCategoryPopupState}>Add Category</Button> */}
        {RoleAdmin()?(    <AddCategoryPopup state={addCategoryPopupState}  />):""}  
      </Stack>
      <CategoryTable />
     
    </Container>
  );
}

export default Category;
