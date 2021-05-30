import { NextApiRequest, NextApiResponse } from 'next';
import PessoaService from '../../../service/PessoaService';

const cadastrarPessoaProxy = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await PessoaService.cadastrarPessoa(req.body);
    res.status(200).send(response);
  } catch (erro) {
    res.status(500).send(erro);
  }
};

export default cadastrarPessoaProxy;
