import { IconButton, styled, Toolbar, Typography, AppBar as MuiAppBar, AppBarProps as MuiAppBarProps } from '@mui/material';
import { Menu as IconMenu, Logout as IconLogout } from '@mui/icons-material';

interface AppBarProps extends MuiAppBarProps {
  title?: string;
  open: boolean;
  onMenuClick?: () => void;
  onLogoutClick?: () => void;
}

const drawerWidth: number = 240;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function AppBar({ title, onMenuClick, onLogoutClick, open }: AppBarProps) {
  return (
    <StyledAppBar position="fixed" open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={onMenuClick} sx={{ marginRight: '36px' }}>
          <IconMenu />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton color="inherit" onClick={onLogoutClick}>
          <IconLogout />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
}
