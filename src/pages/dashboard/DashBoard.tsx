import { Typography } from "@mui/material";
import { useState } from "react";
import { BarraDeFerramentas } from "../../shared/components";
import { LayoutDefault } from "../../shared/layouts/";

export const DashBoard = () => {
   
   return(
      <LayoutDefault title="Pagina inicial" toolBar={<BarraDeFerramentas 
         showSearchFilder 
      />}>
         <Typography>
            tets
         </Typography>
      </LayoutDefault>
   );
}