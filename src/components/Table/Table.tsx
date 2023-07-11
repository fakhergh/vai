import { Paper, TableContainer, TableBody, Table as MuiTable, TableHead, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { TableAction } from '@/interfaces';

export type TableRenderItem<T, ActionKey> = (item: T, index: number, actions?: Array<TableAction<ActionKey>>) => React.ReactNode;

export interface TableColumn {
  label: string;
}

export interface TableProps<T, ActionKey> {
  columns: Array<TableColumn>;
  items: Array<T>;
  actions?: Array<TableAction<ActionKey>>;
  renderItem: TableRenderItem<T, ActionKey>;
  keyExtractor: (item: T, index: number) => string | number;
}

export function Table<T, ActionKey>({ items, columns, actions, renderItem, keyExtractor }: TableProps<T, ActionKey>) {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((column, index: number) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
            {!!actions?.length && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <React.Fragment key={keyExtractor(item, index)}>{renderItem(item, index, actions)}</React.Fragment>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
