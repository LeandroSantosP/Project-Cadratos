import { Api } from "../axios-config";


interface AuthProps {
   accessToken: string;
}

const Auth = async (email: string, password: string): Promise<AuthProps | Error> => {
   try {
      const { data } = await Api.get('/auth/', { data: { email, password } });

      if (data) {
         return data;
      }

      return new Error('Error consultar o login..');
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error consultar o login.');
   }
}


export const AuthServices = {
   Auth
}