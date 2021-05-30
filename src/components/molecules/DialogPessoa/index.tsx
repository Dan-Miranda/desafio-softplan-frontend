import {
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';

import styles from './DialogPessoa.module.scss';

interface Props {
  abrir: boolean,
  fechar: (valor: boolean) => void,
  titulo: string,
  corpo: JSX.Element,
  telaCheia?: boolean,
  acoes?: JSX.Element,
  isLoading?: boolean,
}

const DialogPessoa: React.FC<Props> = (props) => {
  const {
    abrir, fechar, titulo, corpo, telaCheia, acoes, isLoading,
  } = { ...props };
  return (
    <Dialog
      open={abrir}
      aria-labelledby="dialog-pessoa"
      fullScreen={telaCheia}
    >
      <Grid
        container
        direction="column"
        className={styles.DialogPessoaContainer}
        alignItems="center"
      >
        <DialogTitle id="dialog-pessoa" className={styles.DialogPessoaTitulo}>
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Typography variant="h5">
              {titulo}
            </Typography>
            <IconButton onClick={() => fechar(false)}>
              <Close />
            </IconButton>
          </Grid>
        </DialogTitle>

        <Divider className={styles.DialogPessoaDivisor} />
        {isLoading ? (
          <Grid container alignItems="center" justify="center">
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <DialogContent className={styles.DialogPessoaCorpo}>
              {corpo}
            </DialogContent>

            {acoes && (
              <DialogActions className={styles.DialogPessoaAcoes}>
                {acoes}
              </DialogActions>
            )}
          </>
        )}
      </Grid>
    </Dialog>
  );
};

export default DialogPessoa;
