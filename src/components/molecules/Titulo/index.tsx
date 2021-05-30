import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import styles from './Titulo.module.scss';

const Titulo: React.FC = () => {
  console.log();
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h3" className={styles.TituloTexto}>
          CRUD de Pessoas
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" className={styles.TituloTextoDescricao}>
          Este projeto é um desafio técnico voltado para o porcesso seletivo da SoftPlan®
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Titulo;
