import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { formatarCPF, formatarData } from '../../../utils/formatarCampos';

import styles from './FormularioPessoa.module.scss';

interface Props {
  nomeState: [nome: string, setNome: (valor: string) => void];
  sexoState: [sexo: string, setSexo: (valor: string) => void];
  cpfState?: [cpf: string, setCpf: (valor: string) => void];
  dataNascimentoState?: [dataNascimento: string, setDataNascimento: (valor: string) => void];
  emailState: [email: string, setEmail: (valor: string) => void];
  nacionalidadeState: [nacionalidade: string, setNacionalidade: (valor: string) => void];
  naturalidadeState?: [naturalidade: string, setNaturalidade: (valor: string) => void];
}

const FormularioPessoa: React.FC<Props> = (props) => {
  const {
    nomeState, sexoState, cpfState, dataNascimentoState,
    emailState, nacionalidadeState, naturalidadeState,
  } = { ...props };

  const [nome, setNome] = nomeState;
  const [sexo, setSexo] = sexoState;
  const [email, setEmail] = emailState;
  const [nacionalidade, setNacionalidade] = nacionalidadeState;
  const [cpf, setCpf] = cpfState || useState('');
  const [dataNascimento, setDataNascimento] = dataNascimentoState || useState('');
  const [naturalidade, setNaturalidade] = naturalidadeState || useState('');

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      className={styles.FormularioPessoaContainer}
    >
      <TextField
        label="Nome"
        variant="outlined"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />
      <TextField
        label="Sexo"
        variant="outlined"
        value={sexo}
        onChange={(event) => setSexo(event.target.value)}
      />
      {cpfState && (
        <TextField
          label="CPF"
          variant="outlined"
          placeholder="000.000.000-00"
          value={formatarCPF(cpf)}
          onChange={(event) => setCpf(event.target.value)}
        />
      )}

      {dataNascimentoState && (
        <TextField
          label="Data de Nascimento"
          placeholder="00/00/0000"
          variant="outlined"
          value={formatarData(dataNascimento)}
          onChange={(event) => setDataNascimento(event.target.value)}
        />
      )}

      <TextField
        label="Email"
        placeholder="teste@teste.com"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Nacionalidade"
        placeholder="Brasil"
        variant="outlined"
        value={nacionalidade}
        onChange={(event) => setNacionalidade(event.target.value)}
      />

      {naturalidadeState && (
        <TextField
          label="Naturalidade"
          placeholder="São Paulo - SP"
          variant="outlined"
          value={naturalidade}
          onChange={(event) => setNaturalidade(event.target.value)}
        />
      )}
    </Grid>
  );
};

export default FormularioPessoa;
