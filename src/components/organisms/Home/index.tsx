import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PessoaService from '../../../service/PessoaService';
import PessoaInterface from '../../../service/PessoaService/interfaces/PessoaInterface';
import { converterData } from '../../../utils/converterData';
import DialogAviso from '../../molecules/DialogAviso';
import DialogPessoa from '../../molecules/DialogPessoa';
import FormularioPessoa from '../../molecules/FormularioPessoa';
import ListaPessoas from '../../molecules/ListaPessoas';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const [pessoas, setPessoas] = useState<Array<PessoaInterface>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isErro, setIsErro] = useState(false);
  const [dialogAddPessoa, setDialogAddPessoa] = useState(false);
  const [dialogAviso, setDialogAviso] = useState({
    isAberto: false,
    mensagem: '',
  });
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [naturalidade, setNaturalidade] = useState('');
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');

  const carregarPessoas = async () => {
    PessoaService.buscarPessoasProxy()
      .then((resposta) => {
        if (resposta) {
          setPessoas(resposta.data);
        }
      })
      .catch(() => setIsErro(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  const cadastrar = () => {
    setIsLoading(true);
    const pessoa: PessoaInterface = {
      cpf,
      nome,
      sexo,
      email,
      dataNascimento: converterData(dataNascimento),
      nacionalidade,
      naturalidade,
      dataAtualizacao: new Date(),
      dataCadastro: new Date(),
    };
    PessoaService.cadastrarPessoaProxy(pessoa)
      .then((resposta) => {
        if (resposta) {
          setDialogAviso({
            isAberto: true,
            mensagem: 'Cadastro efetuado com sucesso !',
          });
        }
      })
      .catch(() => {
        setDialogAviso({
          isAberto: true,
          mensagem: 'Erro ao efetuar Cadastro!',
        });
      })
      .finally(async () => {
        setDialogAddPessoa(false);
        await carregarPessoas();
      });
  };

  const renderCorpo = () => {
    if (isLoading) {
      return (
        <CircularProgress />
      );
    }

    if (isErro) {
      return (
        <Typography>
          Erro
        </Typography>
      );
    }

    return (
      <>
        <Typography variant="h5" className={styles.HomeTitulo}>
          Pessoas
        </Typography>
        <ListaPessoas pessoas={pessoas} />
        <Button onClick={() => setDialogAddPessoa(true)} className={styles.HomeBotaoAddPessoa}>
          Cadastrar
        </Button>
      </>
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={styles.HomeContainer}
      justify="space-between"
    >
      { renderCorpo() }
      <DialogPessoa
        abrir={dialogAddPessoa}
        fechar={setDialogAddPessoa}
        titulo="Cadastrar Pessoa"
        corpo={isLoading
          ? (
            <Grid container alignItems="center" justify="center">
              <CircularProgress />
            </Grid>
          ) : (
            <FormularioPessoa
              nomeState={[nome, setNome]}
              sexoState={[sexo, setSexo]}
              cpfState={[cpf, setCpf]}
              dataNascimentoState={[dataNascimento, setDataNascimento]}
              emailState={[email, setEmail]}
              nacionalidadeState={[nacionalidade, setNacionalidade]}
              naturalidadeState={[naturalidade, setNaturalidade]}
            />
          )}
        acoes={(
          <Button
            className={styles.HomeBotaoAddPessoa}
            onClick={() => cadastrar()}
          >
            Cadastrar
          </Button>
        )}
        telaCheia
      />

      <DialogAviso dialogAvisoState={[dialogAviso, setDialogAviso]} />
    </Grid>
  );
};

export default Home;
