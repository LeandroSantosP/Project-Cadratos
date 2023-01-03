import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthServices } from "../services/api/Auth/AuthServices";

interface AuthProviderProps {
   children: React.ReactNode
}

interface AuthContextProps {
   logout: () => void;
   isAuthenticated: boolean;
   login: (email: string, password: string) => Promise<string | void>
}

export const useAuthContext = () => {
return useContext(AuthContext);
}

const AuthContext = createContext({} as AuthContextProps);
const LOCAL_STOREGE_TOKEN = 'ACCESS_TOKEN'

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const [accessToken, setAccessToken] = useState<string>();

   const handleLogin = useCallback( async (email: string, password: string) => {
      const result = await AuthServices.Auth(email, password);
      if(result instanceof Error) {
         return result.message;
      } else {
         localStorage.setItem(LOCAL_STOREGE_TOKEN, JSON.stringify(result.accessToken));
         setAccessToken(result.accessToken);
      }
   },[]);

   useEffect(() => {
      const accessTokens = localStorage.getItem(LOCAL_STOREGE_TOKEN);
      if(accessTokens) {
         setAccessToken(JSON.parse(accessTokens));
      } else {
         setAccessToken(undefined);
      }
   }, []);

   const handleLogout = useCallback(() => {
      localStorage.removeItem(LOCAL_STOREGE_TOKEN)
      setAccessToken(undefined);
   },[]);

   const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);
   
   return(
      <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
         {children}
      </AuthContext.Provider>
   );
}