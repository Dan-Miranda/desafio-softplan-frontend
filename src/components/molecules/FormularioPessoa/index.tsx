import React, { useState } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { formatarCPF, formatarData } from '../../../utils/formatarCampos';

import styles from './FormularioPessoa.module.scss';
import { validarCpf, validarDataNascimento, validarEmail } from '../../../utils/validacaoDeCampos';

interface Props {
  nomeState: [nome: string, setNome: (valor: string) => void];
  sexoState: [sexo: string, setSexo: (valor: string) => void];
  cpfState?: [cpf: string, setCpf: (valor: string) => void];
  cpfErroState?: [cpfErro: boolean, setCpfErro: (valor: boolean) => void];
  dataNascimentoState?: [dataNascimento: string, setDataNascimento: (valor: string) => void];
  dataNascimentoErroState?: [dataNascimentoErro: boolean,
    setDataNascimentoErro: (valor: boolean) => void];
  emailState: [email: string, setEmail: (valor: string) => void];
  emailErroState: [emailErro: boolean, setEmailErro: (valor: boolean) => void];
  nacionalidadeState: [nacionalidade: string, setNacionalidade: (valor: string) => void];
  naturalidadeState?: [naturalidade: string, setNaturalidade: (valor: string) => void];
}

const FormularioPessoa: React.FC<Props> = (props) => {
  const {
    nomeState, sexoState, cpfState, dataNascimentoState,
    emailState, nacionalidadeState, naturalidadeState,
    emailErroState, cpfErroState, dataNascimentoErroState,
  } = { ...props };

  const [nome, setNome] = nomeState;
  const [sexo, setSexo] = sexoState;
  const [email, setEmail] = emailState;
  const [emailErro, setEmailErro] = emailErroState || useState(false);
  const [nacionalidade, setNacionalidade] = nacionalidadeState;
  const [cpf, setCpf] = cpfState || useState('');
  const [cpfErro, setCpfErro] = cpfErroState || useState(false);
  const [dataNascimento, setDataNascimento] = dataNascimentoState || useState('');
  const [dataNascimentoErro, setDataNascimentoErro] = dataNascimentoErroState || useState(false);
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
          error={cpfErro}
          helperText={cpfErro && 'CPF inválido'}
          onBlur={() => {
            if (!validarCpf(cpf)) {
              setCpfErro(true);
            } else {
              setCpfErro(false);
            }
          }}
          value={formatarCPF(cpf)}
          onChange={(event) => setCpf(event.target.value)}
        />
      )}

      {dataNascimentoState && (
        <TextField
          label="Data de Nascimento"
          placeholder="00/00/0000"
          error={dataNascimentoErro}
          helperText={dataNascimentoErro && 'Data de nascimento inválida'}
          onBlur={() => {
            if (validarDataNascimento(dataNascimento)) {
              setDataNascimentoErro(true);
            } else {
              setDataNascimentoErro(false);
            }
          }}
          variant="outlined"
          value={formatarData(dataNascimento)}
          onChange={(event) => setDataNascimento(event.target.value)}
        />
      )}

      <TextField
        label="Email"
        placeholder="teste@teste.com"
        error={emailErro}
        helperText={emailErro && 'email inválido'}
        onBlur={() => {
          if (!validarEmail(email)) {
            setEmailErro(true);
          } else {
            setEmailErro(false);
          }
        }}
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
