import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CategoryTable from "../components/category-table/CategoryTable";
import { Container } from "@mui/material";
import AddSubCategoryPopup from "../components/add-subcategory-popup/AddSubCategoryPopup";
import SubCategoryTable from "../components/subCaregory-table/subCategoryTable";
import RoleAdmin from "../components/roles/RoleAdmin";
function SubCategory() {

  return (
    <Container>
      <Stack
        spacing={2}
        alignItems="flex-end"
      
      >

{RoleAdmin()?(   <AddSubCategoryPopup/>):""}  
      </Stack>
      {/* <CategoryTable /> */}
      <SubCategoryTable />
     
    </Container>
  );
}

export default SubCategory;
