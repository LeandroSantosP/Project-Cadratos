import { Theme, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { BarraDeFerramentasDeDetalhes } from "../../shared/components";
import { LayoutDefault } from "../../shared/layouts/";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServises";

export const DashBoard = () => {
   const sdDown = useMediaQuery((theme: Theme)  => theme.breakpoints.down('sm'));
   const mdDown = useMediaQuery((theme: Theme)  => theme.breakpoints.down('md'));


   
   // useEffect(() => {
   //    const request = async () => {
   //       const response = await PessoasServices.create(newpeaple);
   //       console.log(response)
   //    }
   //    request();
   // }, [])

   const handleClick = () => {
      console.log("ok")
   };

   
   return(
      <LayoutDefault title="Pagina inicial" toolBar={
         <BarraDeFerramentasDeDetalhes 
            /* Skeletons showing is needed to put 'showBtnAll: false' */
            showBtnAll={true}
            showSkeletons={true}
            showBtnNew={sdDown ? false : true}
            showBtnSaveAndBack={mdDown ? false : true} 
            onClickNew={handleClick}
         /> }>
         <Typography>
            tets
         </Typography>
      </LayoutDefault>
   );
}