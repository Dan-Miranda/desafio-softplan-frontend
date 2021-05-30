import {
  Button,
  Card, Grid, IconButton, Typography,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import React, { useState } from 'react';
import PessoaService from '../../../service/PessoaService';
import EditarPessoaInterface from '../../../service/PessoaService/interfaces/EditarPessoaInterface';
import PessoaInterface from '../../../service/PessoaService/interfaces/PessoaInterface';
import DialogAviso from '../../molecules/DialogAviso';
import DialogPessoa from '../../molecules/DialogPessoa';
import FormularioPessoa from '../../molecules/FormularioPessoa';

import styles from './CardPessoa.module.scss';

interface Props {
  pessoa: PessoaInterface
}

const CardPessoa: React.FC<Props> = (props) => {
  const { pessoa } = { ...props };

  const [dialogEditarPessoa, setDialogEditarPessoa] = useState(false);
  const [dialogAviso, setDialogAviso] = useState({
    isAberto: false,
    mensagem: '',
  });
  const [dialogAvisoDeletar, setDialogAvisoDeletar] = useState({
    isAberto: false,
    mensagem: '',
  });
  const [email, setEmail] = useState(pessoa.email);
  const [nacionalidade, setNacionalidade] = useState(pessoa.nacionalidade);
  const [nome, setNome] = useState(pessoa.nome);
  const [sexo, setSexo] = useState(pessoa.sexo);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErro, setEmailErro] = useState(false);

  const editar = () => {
    setIsLoading(true);
    const pessoaEditavel: EditarPessoaInterface = {
      nome,
      email,
      nacionalidade,
      sexo,
    };

    PessoaService.editarPessoaProxy(pessoaEditavel, pessoa.cpf)
      .then((resposta) => {
        if (resposta.data) {
          setDialogAviso({
            isAberto: true,
            mensagem: 'Pessoa editada com sucesso!',
          });
        }
      })
      .catch(() => setDialogAviso({
        isAberto: true,
        mensagem: 'Erro ao efetuar Cadastro!',
      }))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const excluir = () => {
    setIsLoading(true);
    if (!emailErro) {
      PessoaService.deletarPessoaProxy(pessoa.cpf)
        .then((resposta) => {
          if (resposta.data) {
            setDialogAviso({
              isAberto: true,
              mensagem: 'Pessoa excluída com sucesso!',
            });
          }
        })
        .catch(() => setDialogAviso({
          isAberto: true,
          mensagem: 'Erro ao efetuar Cadastro!',
        }))
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setDialogAviso({
        isAberto: true,
        mensagem: 'Impossível salvar! Há campos inválidos',
      });
    }
  };

  return (
    <>
      <Card className={styles.CardPessoaContainer}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <Grid item container direction="column" xs={6}>
            <Typography variant="h6" className={styles.CardPessoaNome}>
              {pessoa.nome}
            </Typography>
            <Typography variant="body1" className={styles.CardPessoaDocumento}>
              {pessoa.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
            </Typography>
          </Grid>
          <Grid item container direction="row" xs={6} justify="flex-end">
            <IconButton onClick={() => setDialogEditarPessoa(true)}>
              <Edit />
            </IconButton>

            <IconButton onClick={() => setDialogAvisoDeletar({
              isAberto: true,
              mensagem: 'Você realmente deseja deletar esta pessoa?',
            })}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Card>
      <DialogPessoa
        abrir={dialogEditarPessoa}
        fechar={setDialogEditarPessoa}
        titulo="Editar Pessoa"
        isLoading={isLoading}
        corpo={(
          <FormularioPessoa
            nomeState={[nome, setNome]}
            sexoState={[sexo, setSexo]}
            emailState={[email, setEmail]}
            emailErroState={[emailErro, setEmailErro]}
            nacionalidadeState={[nacionalidade, setNacionalidade]}
          />
        )}
        acoes={(
          <Button
            className={styles.HomeBotaoEditarPessoa}
            onClick={() => editar()}
          >
            Editar
          </Button>
        )}
        telaCheia
      />

      <DialogAviso dialogAvisoState={[dialogAviso, setDialogAviso]} />
      <DialogAviso
        dialogAvisoState={[dialogAvisoDeletar, setDialogAvisoDeletar]}
        acao={(
          <>
            <Button onClick={() => setDialogAvisoDeletar({
              isAberto: false,
              mensagem: '',
            })}
            >
              Cancelar
            </Button>
            <Button color="secondary" onClick={() => excluir()}>
              Excluir
            </Button>
          </>
        )}
      />
    </>
  );
};

export default CardPessoa;
