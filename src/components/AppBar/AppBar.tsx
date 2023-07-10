import { IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { Menu as IconMenu, Logout as IconLogout } from '@mui/icons-material';

interface AppBarProps extends MuiAppBarProps {
  title?: string;
  onMenuClick?: () => void;
  onLogoutClick?: () => void;
}

export function AppBar({ title, onMenuClick, onLogoutClick }: AppBarProps) {
  return (
    <MuiAppBar position="absolute">
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
    </MuiAppBar>
  );
}
