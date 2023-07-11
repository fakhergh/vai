import { SvgIconComponent } from '@mui/icons-material';

export interface TableAction<ActionKey> {
  itemKey: ActionKey;
  label?: string;
  icon: SvgIconComponent;
}
