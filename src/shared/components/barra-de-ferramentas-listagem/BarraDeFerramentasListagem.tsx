import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material'
import React from 'react';
import { GrAdd } from 'react-icons/gr';

import { Environment } from '../../environment';

interface BarraDeFerramentasListagemProps {
   textSearched?: string;
   showSearchFilder?: boolean;
   handleSearchChange?: (newtext: string) => void;

   textButtom?: string;
   showNewButton?: boolean;
   handleClickBtn?: () => void;
}

export const BarraDeFerramentasListagem: React.FC<BarraDeFerramentasListagemProps> = ({
   handleSearchChange,
   showSearchFilder = false,
   textSearched,

   textButtom = 'Novo',
   handleClickBtn,
   showNewButton = true
}) => {
   const theme = useTheme();

   return (
      <Box
         component={Paper}
         marginX={1}
         padding={1}
         paddingX={2}
         display='flex'
         gap={1}
         alignItems='center'
         height={theme.spacing(5)}
      >
         <Box flex='1'>
            {
               showSearchFilder && (
                  <TextField
                     value={textSearched}
                     size='small'
                     placeholder={Environment.INPUT_DE_BUSCA}
                     onChange={({ target }) => handleSearchChange?.(target.value)}
                  />
               )
            }
         </Box>

         {showNewButton && (
            <Button
               variant='contained'
               color='primary'
               disableElevation
               onClick={handleClickBtn}
               endIcon={<Icon> <GrAdd /> </Icon>}
            >
               {textButtom}
            </Button>

         )}
      </Box>
   )
}
