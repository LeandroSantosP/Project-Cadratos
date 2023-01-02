import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCidades {
   id: number;
   name: string;
}

export interface IDetalheCidade {
   id: number;
   name: string;
}

type TCidadesComTotalCount = {
   data: IListagemCidades[];
   totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
   try {
      const urlRelative = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&name_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalheCidade | Error> => {
   try {
      const urlRelative = `/cidades/${id}`;
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

const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
   try {
      const urlRelative = `/cidades/`;
      const { data } = await Api.post<IDetalheCidade>(urlRelative, dados);

      if (data) {
         return data.id;
      }

      return new Error('Error consultar ao criar');
   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error consultar ao criar.');
   }
}

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
   try {
      await Api.put(`/cidades/${id}`, dados);
   } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
   }
};

const deleteById = async (id: number): Promise<void | Error> => {
   try {
      await Api.delete(`/cidades/${id}`);

   } catch (err) {
      console.error(err);
      return new Error((err as { message: string }).message || 'Error ao deletar o registro.');
   }
}

export const CidadesServices = {
   getAll,
   getById,
   create,
   updateById,
   deleteById
}