import { AuthServices } from "../../shared/services/api/Auth/AuthServices";
import { useVForm, VForm, VTextField } from "../../shared/forms";
import { Button, Link, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LayoutDefault } from "../../shared/layouts";
import { Box } from "@mui/system";
import * as yup from 'yup';
import { useAuthContext } from "../../shared/contexts";
import React from "react";


interface LoginDataProps {
   email: string;
   password: string
}

interface validarionErrorsProps {
   [key: string]: string
}

const ValidationsLoginFormSchema = yup.object().shape({
   email: yup.string().email('Percha um email valido!').required(),
   password: yup.string()
      .required('No password provided.')
      .min(8, 'A senha e muito curta - Deve contar no minimo 8 caracteres.')
      .matches(/[a-zA-Z]/, 'A senha somente pode conter letras A/Z.')
});

interface LoginAuthProps {
   children?: React.ReactNode
}

export const LoginAuth: React.FC<LoginAuthProps> = ({ children }) => {
   const { FormRef } = useVForm();
   const { login, isAuthenticated, } = useAuthContext();
   const theme = useTheme();
   const smDown = useMediaQuery(theme.breakpoints.down('sm'));
   
   const handleLogin = (dados: LoginDataProps) => {
      ValidationsLoginFormSchema.validate(dados, { abortEarly: false })
         .then((validateData) => {
            login(validateData.email, validateData.password).catch(err => alert(err.message));
         }).catch((err: yup.ValidationError) => {
            const validarionErrors: validarionErrorsProps = {};

            err.inner.forEach(error => {
               if (!error.path) return;
               validarionErrors[error.path] = error.message;
            });
            FormRef.current?.setErrors(validarionErrors);
         })
   };

   if (isAuthenticated) return (<>{children}</>);

   return (
      <LayoutDefault
         title="">
         <Box justifyContent="center" width='100%' display="flex" marginTop={11}>
            <VForm
               ref={FormRef}
               onSubmit={handleLogin}
            >
               <Box display="flex" flexDirection="column" component={Paper} width={smDown ? '250px' : '450px'} padding={2} gap={2}>
                  <VTextField
                     name="email"
                     label="E-mail"
                     fullWidth
                  />
                  <VTextField
                     name="password"
                     label="Senha"
                     type='password'
                     fullWidth
                  />
                  <Typography
                     fontSize={15}
                  >Ainda nao tem conta? <Link href="/reguster">Register-se</Link></Typography>
                  <Button
                     type="submit"
                     variant="contained"
                     sx={{
                        width: "200px",
                        alignSelf: "center"
                     }}
                  >Logar</Button>
               </Box>
            </VForm>
         </Box>
      </LayoutDefault>
   );
}