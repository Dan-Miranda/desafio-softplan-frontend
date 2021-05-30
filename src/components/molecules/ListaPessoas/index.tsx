import { Card, Grid, Typography } from '@material-ui/core';
import React from 'react';
import PessoaInterface from '../../../service/PessoaService/interfaces/PessoaInterface';
import CardPessoa from '../../atoms/CardPessoa';

import styles from './ListaPessoas.module.scss';

interface Props {
  pessoas: Array<PessoaInterface>
}

const ListaPessoas: React.FC<Props> = (props) => {
  const { pessoas } = { ...props };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="row"
      className={styles.ListaPessoasContainer}
    >
      {pessoas.map((pessoa) => (
        <Grid item xs={12}>
          <CardPessoa key={pessoa.cpf} pessoa={pessoa} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListaPessoas;
