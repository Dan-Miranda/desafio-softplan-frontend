import {
  Button, CircularProgress, Grid, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PessoaService from '../../../service/PessoaService';
import PessoaInterface from '../../../service/PessoaService/interfaces/PessoaInterface';
import { converterData } from '../../../utils/converterData';
import DialogAviso from '../../molecules/DialogAviso';
import DialogPessoa from '../../molecules/DialogPessoa';
import FormularioPessoa from '../../molecules/FormularioPessoa';
import Header from '../../molecules/Header';
import ListaPessoas from '../../molecules/ListaPessoas';
import Titulo from '../../molecules/Titulo';

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
  const [cpfErro, setCpfErro] = useState(false);
  const [dataNascimento, setDataNascimento] = useState('');
  const [dataNascimentoErro, setDataNascimentoErro] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErro, setEmailErro] = useState(false);
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

    if (!cpfErro && !dataNascimentoErro && !emailErro) {
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
        });
    } else {
      setDialogAviso({
        isAberto: true,
        mensagem: 'Impossível salvar! Há campos inválidos',
      });
    }
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
        <Titulo />

        <ListaPessoas pessoas={pessoas} />
        <Button onClick={() => setDialogAddPessoa(true)} className={styles.HomeBotaoAddPessoa}>
          Cadastrar
        </Button>
      </>
    );
  };

  return (
    <div className={styles.HomeBackground}>
      <Header />
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        className={styles.HomeContainer}
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
                cpfErroState={[cpfErro, setCpfErro]}
                dataNascimentoState={[dataNascimento, setDataNascimento]}
                dataNascimentoErroState={[dataNascimentoErro, setDataNascimentoErro]}
                emailState={[email, setEmail]}
                emailErroState={[emailErro, setEmailErro]}
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
    </div>
  );
};

export default Home;
