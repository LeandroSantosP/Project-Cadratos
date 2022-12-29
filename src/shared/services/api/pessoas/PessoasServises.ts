import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemPessoas {
   id: number;
   completeName: string;
   email: string;
   cityId: number;
}

export interface IDetalhePessoa {
   id: number;
   completeName: string;
   email: string;
   cityId: number;
}

type TpessoasComTotalCount = {
   data: IListagemPessoas[];
   totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TpessoasComTotalCount | Error> => {
   try {
      const urlRelative = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&completeName_like=${filter}`;
      const { data, headers } = await Api.get(urlRelative);

      if (data) {
         return {
            data,
            totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
         };
      }

      return new Error('Error ao listar os registros.');
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error ao listar os registros.');
   }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
   try {
      const urlRelative = `/pessoas/${id}`;
      const { data } = await Api.get(urlRelative);

      if (data) {
         return data;
      }

      return new Error('Error consultar o registro..');
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error consultar o registro.');
   }
}

const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
   try {
      const urlRelative = `/pessoas/`;
      const { data } = await Api.post<IDetalhePessoa>(urlRelative, dados);

      if (data) {
         return data.id;
      }

      return new Error('Error consultar ao criar');
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error consultar ao criar.');
   }
}

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
   try {
      const urlRelative = `/pessoas/${id}`;
      await Api.put(urlRelative, dados);
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error ao atualizar o registro.');
   }
}

const deleteById = async (id: number): Promise<void | Error> => {
   try {
      const urlRelative = `/pessoas/${id}`;
      await Api.delete(urlRelative);

   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error ao deletar o registro.');
   }
}

export const PessoasServices = {
   getAll,
   getById,
   create,
   updateById,
   deleteById
}