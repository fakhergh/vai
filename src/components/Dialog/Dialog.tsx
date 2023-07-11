import { Button, ButtonProps, Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as React from 'react';

export type OnDialogActionClickEvent<ActionKey> = (key: ActionKey) => void;

export interface DialogAction<ActionKey> extends ButtonProps {
  itemKey: ActionKey;
  label: string;
}

export interface DialogProps<ActionKey> {
  title: string;
  description: string;
  loading?: boolean;
  open: boolean;
  onClose: () => void;
  actions: Array<DialogAction<ActionKey>>;
  onActionClick: OnDialogActionClickEvent<ActionKey>;
}

export function Dialog<ActionKey>({ title, loading, description, open, onClose, actions, onActionClick }: DialogProps<ActionKey>) {
  const handleClose = React.useCallback(() => {
    if (loading) return;
    onClose?.();
  }, [loading, onClose]);

  return (
    <MuiDialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map(({ itemKey, label, ...props }, index) => (
          <Button {...props} key={index} onClick={() => onActionClick(itemKey)} disabled={loading}>
            {label}
          </Button>
        ))}
      </DialogActions>
    </MuiDialog>
  );
}
