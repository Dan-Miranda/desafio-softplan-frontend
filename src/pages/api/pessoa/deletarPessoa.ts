import { NextApiRequest, NextApiResponse } from 'next';
import PessoaService from '../../../service/PessoaService';

const deletarPessoaProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cpf } = req.query;

    const response = await PessoaService.deletarPessoa(retornarString(cpf));
    res.status(200).send(response);
  } catch (erro) {
    res.status(500).send(erro);
  }
};

const retornarString = (valor: Array<string> | string) => (Array.isArray(valor) ? valor[0] : valor);

export default deletarPessoaProxy;
