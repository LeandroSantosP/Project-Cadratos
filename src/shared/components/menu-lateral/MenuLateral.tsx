import { Home } from "@mui/icons-material";
import { Avatar, Button, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from "@mui/system";
import { useDrawerContext } from "../../contexts";


interface IDrawerProviderProps {
   children: React.ReactNode
}

export const MenuLateral: React.FC<IDrawerProviderProps> = ({ children }) => {
   const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

   console.log(isDrawerOpen)

   const theme = useTheme();
   const smDown = useMediaQuery(theme.breakpoints.down('sm'));

   return (
      <>
         <Drawer open={isDrawerOpen} onClose={toggleDrawerOpen} variant={smDown ? 'temporary' : 'permanent' }>
            <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >
               <Box width='100%' height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                  <Avatar
                     src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png"
                     sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
                  />
               </Box>
               <Divider />

               <Box flex={1}>
                  <List component="nav">
                     <ListItemButton>
                        <ListItemIcon>
                           <Home />
                        </ListItemIcon>
                        <ListItemText primary='Pagina inicial' />
                     </ListItemButton>

                     <ListItemButton>
                        <ListItemIcon>

                           <Home />
                        </ListItemIcon>
                        <ListItemText primary='Pagina inicial' />
                     </ListItemButton>
                  </List>
               </Box>
            </Box>
         </Drawer>

         <Box height="100vh" marginLeft={smDown ? theme.spacing(0) : theme.spacing(28)}>
            {children}
         </Box>
      </>
   );
};