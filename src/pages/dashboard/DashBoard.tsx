import {
   Card,
   CardContent,
   Grid,
   LinearProgress,
   Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDebounce } from "../../shared/hooks";
import { LayoutDefault } from "../../shared/layouts/";
import { BarraDeFerramentasDeDetalhes } from "../../shared/components";
import { CidadesServices } from "../../shared/services/api/Cidades/CidadesServices";
import { PessoasServices } from "../../shared/services/api/pessoas/PessoasServises";


export const DashBoard = () => {
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [totalCount, setTotalCount] = useState(0);
   const [totalCountPessoas, setTotalCountPessoas] = useState(0);
   const { debounce } = useDebounce();

   useEffect(() => {
      setIsLoading(true);
      CidadesServices.getAll(1).then((response) => {
         setIsLoading(false);
         if (response instanceof Error) {
            alert(response.message);
         } else {
            setTotalCount(response.totalCount);
         }
      });
   }, []);


   useEffect(() => {
      setIsLoading(true);

      debounce(() => {
         PessoasServices.getAll(1).then((response) => {
            setIsLoading(false);
            if (response instanceof Error) {
               alert(response.message);
            } else {
               setTotalCountPessoas(response.totalCount);
            }
         });
      });
   }, []);

   return (
      <LayoutDefault
         title="Pagina inicial"
         toolBar={
            <BarraDeFerramentasDeDetalhes
               showSkeletons={false}
               showBtnAll={false}
            />
         }
      >
         <Box width="100%" display="flex">
            <Grid container margin={1}>
               <Grid item width={"100%"} marginBottom={2}>
                  {isLoading && <LinearProgress variant="indeterminate" />}
               </Grid>

               <Grid container item spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                     <Card>
                        <CardContent>
                           <Typography variant="h5" align="center">
                              Total de Pessoas
                           </Typography>

                           <Box padding={5}>
                              <Typography variant="h1" align="center">
                                 {totalCountPessoas}
                              </Typography>
                           </Box>
                        </CardContent>
                     </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                     <Card>
                        <CardContent>
                           <Typography variant="h5" align="center">
                              Total de Cidades
                           </Typography>

                           <Box padding={5}>
                              <Typography variant="h1" align="center">
                                 {totalCount}
                              </Typography>
                           </Box>
                        </CardContent>
                     </Card>
                  </Grid>
               </Grid>
            </Grid>
         </Box>
      </LayoutDefault>
   );
};
