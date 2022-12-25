import { Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";
import { Box } from "@mui/system";
import { FcMenu } from 'react-icons/fc'
import React from "react";

interface ILayoutDefaultProps {
   children: React.ReactNode;
   title: string;
   toolBar?: React.ReactNode;
}

export const LayoutDefault: React.FC<ILayoutDefaultProps> = ({ children, title, toolBar }) => {
   const theme = useTheme()
   const smDown = useMediaQuery(theme.breakpoints.down('sm'));

   const { toggleDrawerOpen } = useDrawerContext();

   return (
      <Box width='100%' height='100%' display='flex' flexDirection='column' gap='1rem'>
         <Box padding='1rem' display='flex' alignItems='center' gap='.5rem'>
            {
               smDown &&
               <IconButton onClick={toggleDrawerOpen}>
                  <Icon >
                     <FcMenu />
                  </Icon>
               </IconButton>

            }
            <Typography 
               component='h1' 
               fontSize={smDown ? '1.3rem' : '2rem'}
               overflow='hidden'
               whiteSpace='nowrap'
               textOverflow='ellipsis'
               variant="h1" 
            >
               {title}
            </Typography>
         </Box>

         {toolBar && (
            <Box>
               {toolBar}
            </Box>
         )}

         <Box overflow='auto' fontSize='2rem' flex={'1'}>
            {children}
         </Box>
      </Box>
   );
};