import React, { useEffect, useMemo, useState } from 'react'
import { PessoasServices } from '../../shared/services/api/pessoas/PessoasServises'
import { LayoutDefault } from '../../shared/layouts'
import { BarraDeFerramentasListagem } from '../../shared/components'
import { useSearchParams } from 'react-router-dom'
import { Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'

interface IListagemPessoas {
   id: number;
   completeName: string;
   email: string;
   cityId: number;
}

export const ListagemDePessoas: React.FC = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const [peaploInfos, setPeaploInfos ] = useState<IListagemPessoas[] | null>([]);

   const search = useMemo(() => {
      return searchParams.get('busca') || '';
   }, [searchParams]);

   const theme = useTheme()

   useEffect(() => {

      PessoasServices.getAll(1, search)
         .then(response => {
            if(response instanceof Error){
               alert(response.message);
               setPeaploInfos(null);
            } else {
               setPeaploInfos(response.data);
            }
         })

   }, [search])

   return (
      <LayoutDefault title='Listagem de Pessoas'
         toolBar={<BarraDeFerramentasListagem
            textSearched={search}
            handleSearchChange={text => setSearchParams({ busca: text }, { replace: true })}
            showSearchFilder
            textButtom='Nova'
         />}>
         <Box 
            bgcolor={theme.palette.background.paper}
            alignItems='flex-start'
            gap={1}
            display='flex'
            flexWrap={'wrap'}
            marginX={1}
            borderRadius={1}
            padding={2}
         >
            {peaploInfos?.map(peaplo => (
               <Box
                  key={peaplo.id}
                  bgcolor={theme.palette.background.default}
                  padding={3}
                  borderRadius={1}
               >
                  <Typography>NomeCompleto: <br /> {peaplo.completeName}</Typography>
               </Box>
            ))}
         </Box>
      </LayoutDefault>
   )
}
