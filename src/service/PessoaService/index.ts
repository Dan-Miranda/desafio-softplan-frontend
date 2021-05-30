import axios, { AxiosResponse } from 'axios';
import api from '../../config/api';
import EditarPessoaInterface from './interfaces/EditarPessoaInterface';
import InserirPessoaInterface from './interfaces/InserirPessoaInterface';
import PessoaInterface from './interfaces/PessoaInterface';

const buscarPessoas = async () => {
  try {
    const resposta: AxiosResponse<Array<PessoaInterface>> = await api.get(
      '/buscar',
    );

    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar pessoas', erro);
    return null;
  }
};

const cadastrarPessoa = async (pessoa: PessoaInterface) => {
  try {
    const resposta: AxiosResponse<InserirPessoaInterface> = await api.post(
      '/cadastrar',
      pessoa,
    );

    return resposta.data;
  } catch (erro) {
    console.error('Erro ao buscar pessoas', erro);
    return null;
  }
};

const editarPessoa = async (pessoaEditavel: EditarPessoaInterface, cpf: string) => {
  try {
    await api.put(`atualizar/${cpf}`, pessoaEditavel);
    return true;
  } catch (erro) {
    console.error('Erro ao buscar pessoas', erro);
    return false;
  }
};

const deletarPessoa = async (cpf: string) => {
  try {
    await api.delete(`deletar/${cpf}`);
    return true;
  } catch (erro) {
    console.error('Erro ao buscar pessoas', erro);
    return false;
  }
};

const buscarPessoasProxy = async () => axios.get<Array<PessoaInterface>>('/api/pessoa/buscarPessoas');
const cadastrarPessoaProxy = async (pessoa: PessoaInterface) => axios.post<InserirPessoaInterface>(
  '/api/pessoa/cadastrarPessoa',
  pessoa,
);
const editarPessoaProxy = async (pessoaEditavel: EditarPessoaInterface,
  cpf: string) => axios.put<boolean>(
    '/api/pessoa/editarPessoa',
    pessoaEditavel,
    { params: { cpf } },
  );

const deletarPessoaProxy = async (cpf: string) => axios.delete<boolean>(
  '/api/pessoa/deletarPessoa', { params: { cpf } },
);

export default {
  buscarPessoas,
  buscarPessoasProxy,
  cadastrarPessoa,
  cadastrarPessoaProxy,
  editarPessoa,
  editarPessoaProxy,
  deletarPessoa,
  deletarPessoaProxy,
};
