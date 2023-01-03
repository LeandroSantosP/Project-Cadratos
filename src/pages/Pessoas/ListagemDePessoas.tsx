import { Box } from '@mui/system';
import { Alert, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '../../shared/hooks'
import { LayoutDefault } from '../../shared/layouts'
import { Environment } from '../../shared/environment';
import { BarraDeFerramentasListagem } from '../../shared/components'
import { IListagemPessoas, PessoasServices } from '../../shared/services/api/pessoas/PessoasServises'

export const ListagemDePessoas: React.FC = () => {
   const [peaploInfos, setPeaploInfos] = useState<IListagemPessoas[] | null>([]);
   const [searchParams, setSearchParams] = useSearchParams();
   const [totalCount, setTotalCount] = useState<number>(0);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const { debounce } = useDebounce();
   const navigate = useNavigate();
   console.log(peaploInfos)
   const search = useMemo(() => {
      return searchParams.get('search') || '';
   }, [searchParams]);


   const page = useMemo(() => {
      return Number(searchParams.get('page') || '1');
   }, [searchParams]);


   useEffect(() => {
      setIsLoading(true);

      debounce(() => {
         PessoasServices.getAll(page, search)
            .then(response => {
               setIsLoading(false);
               if (response instanceof Error) {
                  alert(response.message);
                  setPeaploInfos(null);
               } else {
                  setPeaploInfos(response.data);
                  setTotalCount(response.totalCount);
               }
            })
      });

   }, [search, page]);

   const handleDelete = (id: number) => {

      if (confirm('Realmente deseja apagar?')) {
         PessoasServices.deleteById(id)
            .then(result => {
               if (result instanceof Error) {
                  alert(result.message)
               } else {
                     setPeaploInfos(oldinfos => [ ...oldinfos!.filter(oldinfo => oldinfo.id !== id) ]);
                  alert('Registro apagado com sucesso!');
               }
            });
      }
   };

   return (
      <>
         <LayoutDefault title='Listagem de Pessoas'
            toolBar={
               <BarraDeFerramentasListagem
               textSearched={search}
               handleSearchChange={text => setSearchParams({ search: text, page: '1' }, { replace: true })}
               showSearchFilder
               textButtom='Nova'
               handleClickBtn={(() => navigate(`/pessoas/detalhe/nova`))}
            />}>
            {isLoading ? (
               <Box sx={{ width: '100%' }}>
                  <LinearProgress color='primary' />
               </Box>
            ) : (

               <TableContainer
                  component={Paper}
                  variant='outlined'
                  sx={{
                     margin: 1,
                     width: 'auto',
                  }}
               >
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell width={100}>Ações</TableCell>
                           <TableCell>Nome completo</TableCell>
                           <TableCell>E-mail</TableCell>
                        </TableRow>
                     </TableHead>

                     <TableBody>
                        {peaploInfos && peaploInfos?.map(info => (
                           <TableRow key={info.id}>
                              <TableCell>
                                 <IconButton size='small' onClick={() => handleDelete(info.id)}>
                                    <Icon><AiFillDelete /></Icon>
                                 </IconButton>
                                 <IconButton size='small' onClick={() => navigate(`/pessoas/detalhe/${info.id}`)}>
                                    <Icon><AiFillEdit /></Icon>
                                 </IconButton>
                              </TableCell>
                              <TableCell>{info.completeName}</TableCell>
                              <TableCell>{info.email}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                     <TableFooter>
                        {peaploInfos?.length === 0 && !isLoading && (
                           <TableRow>
                              <TableCell colSpan={3}>
                                 <Alert severity="warning">
                                    {Environment.LISTAGEM_VAZIA}
                                 </Alert>
                              </TableCell>
                           </TableRow>
                        )}
                        {(!isLoading && totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                           <TableRow>
                              <TableCell colSpan={3}>
                                 <Pagination
                                    page={page}
                                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                    onChange={(_, newPage) =>
                                       setSearchParams({ search, page: newPage.toString() }, { replace: true })}
                                 />
                              </TableCell>
                           </TableRow>
                        )}
                     </TableFooter>
                  </Table>
               </TableContainer>
            )}

         </LayoutDefault>

      </>
   )
}
