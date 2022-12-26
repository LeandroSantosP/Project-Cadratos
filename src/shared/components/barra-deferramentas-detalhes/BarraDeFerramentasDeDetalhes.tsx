import { Button, Icon, Paper, Skeleton, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { AiFillSave, AiFillDelete, AiFillFileAdd, AiOutlineArrowLeft } from 'react-icons/ai';
import {IoIosAdd} from 'react-icons/io'
import { BsFillBackspaceFill } from 'react-icons/bs';


interface BarraDeFerramentasDeDetalhesProps {
   textNewBtn?: string;
   showBtnNew?: boolean;
   showBtnDelete?: boolean;
   showBtnSaveAndBack?: boolean;
   showSave?: boolean;
   showBtnBack?: boolean;
   showBtnAll?: boolean;

   showSkeletons: boolean;

   onClickNew?: () => void;
   onClickSave?: () => void;
   onClickSaveAndBack?: () => void;
   onClickDelete?: () => void;
   onClickBack?: () => void;

}

export const BarraDeFerramentasDeDetalhes: React.FC<BarraDeFerramentasDeDetalhesProps> = ({
   textNewBtn = 'Novo',
   showBtnNew = true,
   showBtnDelete = true,
   showSave = true,
   showBtnBack = true,
   showBtnSaveAndBack = false,
   showBtnAll = true,

   showSkeletons = false,

   onClickNew,
   onClickSave,
   onClickSaveAndBack,
   onClickDelete,
   onClickBack
}) => {
   const theme = useTheme();

   return (
      <div>
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
            {!showBtnAll ? (
               <>
                  {showSkeletons && (
                     <>
                        <Skeleton width={180} height={60} />
                        <Skeleton width={84} height={60} />
                        <Skeleton width={109} height={60} />
                        <Skeleton width={112} height={60} />
                        <Skeleton width={111} height={60} />
                     </>
                  )}
               </>
            ) : (
               <>
                  {showBtnNew && (

                     <Button
                        variant='outlined'
                        color='primary'
                        disableElevation
                        endIcon={<Icon> <IoIosAdd /> </Icon>}
                        onClick={onClickNew}
                     >
                        <Typography
                           variant='button'
                           overflow='hidden'
                           whiteSpace='nowrap'
                           textOverflow='ellipsis'
                        >
                           {textNewBtn}
                        </Typography>
                     </Button>
                  )}

                  {showSave && (
                     <Button
                        variant='contained'
                        color='primary'
                        disableElevation
                        endIcon={<Icon> <AiFillFileAdd /> </Icon>}
                        onClick={onClickSave}
                     >
                        <Typography
                           variant='button'
                           overflow='hidden'
                           whiteSpace='nowrap'
                           textOverflow='ellipsis'
                        >
                           Salvar
                        </Typography>
                     </Button>
                  )}

                  {showBtnSaveAndBack && (
                     <Button
                        variant='outlined'
                        color='primary'
                        disableElevation
                        endIcon={<Icon> <BsFillBackspaceFill /> </Icon>}
                        onClick={onClickSaveAndBack}
                     >
                        <Typography
                           variant='button'
                           overflow='hidden'
                           whiteSpace='nowrap'
                           textOverflow='ellipsis'
                        >
                           Salvar e voltar
                        </Typography>
                     </Button>
                  )}
                  {showBtnDelete && (
                     <Button
                        variant='outlined'
                        color='primary'
                        disableElevation
                        endIcon={<Icon> <AiFillDelete /> </Icon>}
                        onClick={onClickDelete}
                     >
                        <Typography
                           variant='button'
                           overflow='hidden'
                           whiteSpace='nowrap'
                           textOverflow='ellipsis'
                        >
                           apagar
                        </Typography>
                     </Button>
                  )}


                  <Box flex={'1'} display='flex' justifyContent='flex-end'>
                     {showBtnBack && (
                        <Button
                           variant='outlined'
                           color='primary'
                           disableElevation
                           endIcon={<Icon> <AiOutlineArrowLeft /> </Icon>}
                           onClick={onClickBack}
                        >
                           <Typography
                              variant='button'
                              overflow='hidden'
                              whiteSpace='nowrap'
                              textOverflow='ellipsis'
                           >
                              voltar
                           </Typography>
                        </Button>
                     )}

                  </Box>
               </>
            )}
         </Box>

      </div>
   )
}
