import { NextApiResponse } from 'next';
import PessoaService from '../../../service/PessoaService';

const buscarPessoasProxy = async (_, res: NextApiResponse) => {
  try {
    const response = await PessoaService.buscarPessoas();
    res.status(200).send(response);
  } catch (erro) {
    res.status(500).send(erro);
  }
};

export default buscarPessoasProxy;
