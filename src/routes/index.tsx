import { ReactText, useEffect } from "react";
import { DashBoard, ListagemDePessoas, DetalhesDePessoas, DetalhesDeCidades, ListagemDeCidades } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext, useDrawerContext } from "../shared/contexts";

import { BsFillPeopleFill } from 'react-icons/bs'
import { FaCity } from 'react-icons/fa'
import {
   AiFillHome
} from 'react-icons/ai'
import { LoginAuth } from "../pages/Login/LoginAuth";

export const AppRoutes = () => {
   const { setDrawerOptions } = useDrawerContext();
   
   const PrivateRoute = (Item: React.FC) => {
      const { isAuthenticated } = useAuthContext();
      
      return isAuthenticated ? (<Item/>) : (<LoginAuth />)
   }

   useEffect(() => {
      setDrawerOptions([
         {
            label: 'Pagina inicial',
            path: '/pagina-inicial',
            icon: <AiFillHome />,
         },
         {
            label: 'Pessoas',
            path: '/pessoas',
            icon: <BsFillPeopleFill />,
         },
         {
            label: 'Cidade',
            path: '/cidades',
            icon: <FaCity />,
         },
      ]);
   }, []);

   return (
      <Routes>
         <Route path="/pagina-inicial" element={PrivateRoute(DashBoard)} />
         <Route path="/pessoas" element={PrivateRoute(ListagemDePessoas)} />
         <Route path="/pessoas/detalhe/:id" element={PrivateRoute(DetalhesDePessoas)} />

         <Route path="/cidades/detalhe/:id" element={PrivateRoute(DetalhesDeCidades)} />
         <Route path="/cidades" element={PrivateRoute(ListagemDeCidades)} />

         <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      </Routes>
   );
};