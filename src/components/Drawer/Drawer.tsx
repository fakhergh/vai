import { styled, ListItemButton, ListItemText, ListItemIcon, Drawer as MuiDrawer, Toolbar, Divider, List } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

export interface DrawerItem {
  label: string;
  path: string;
  icon: SvgIconComponent;
}

export interface DrawerProps {
  open: boolean;
  items: Array<DrawerItem>;
  onItemClick: (path: string) => void;
}

const drawerWidth: number = 240;

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export function Drawer({ open, items, onItemClick }: DrawerProps) {
  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      ></Toolbar>
      <Divider />
      <List component="nav">
        {items.map(({ label, path, icon: Icon }, index: number) => (
          <ListItemButton key={index} onClick={() => onItemClick(path)}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
}
