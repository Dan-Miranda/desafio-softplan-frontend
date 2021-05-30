import React from 'react';
import {
  Button, Dialog, DialogActions, DialogTitle,
} from '@material-ui/core';

export interface DialogAvisoInterface {
  isAberto: boolean,
  mensagem: string,
}

interface Props {
  dialogAvisoState: [dialogAviso: DialogAvisoInterface,
    setDialogAviso: (valor: DialogAvisoInterface) => void];
  acao?: JSX.Element,
}

const DialogAviso: React.FC<Props> = (props) => {
  const { dialogAvisoState, acao } = { ...props };
  const [dialog, setDialog] = dialogAvisoState;
  return (
    <Dialog
      open={dialog.isAberto}
      onClose={() => setDialog({
        isAberto: false,
        mensagem: '',
      })}
    >
      <DialogTitle>
        {dialog.mensagem}
      </DialogTitle>
      <DialogActions>
        {acao || (
          <Button onClick={() => {
            window.location.href = '/';
          }}
          >
            OK
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogAviso;
