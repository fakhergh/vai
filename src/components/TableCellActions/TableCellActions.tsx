import { IconButton, TableCell, Tooltip } from '@mui/material';
import { TableAction } from '@/interfaces';

export type OnActionClickEvent<ActionKey> = (key: ActionKey) => void;

export interface TableCellActions<ActionKey> {
  actions?: Array<TableAction<ActionKey>>;
  onActionClick?: OnActionClickEvent<ActionKey>;
}

export function TableCellActions<ActionKey>({ actions, onActionClick }: TableCellActions<ActionKey>) {
  if (!actions?.length) return null;

  return (
    <TableCell align="left">
      {actions.map(({ itemKey, icon: Icon, label }, index) => (
        <Tooltip key={index} title={label}>
          <IconButton onClick={() => onActionClick?.(itemKey)}>
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
    </TableCell>
  );
}
