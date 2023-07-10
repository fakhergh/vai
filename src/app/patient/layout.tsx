'use client';
import * as React from 'react';
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { AppBar } from '@/components';
import { useLogout } from '@/hooks';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useLogout();

  const [, /*sideBarVisible*/ setSideBarVisible] = React.useState(false);

  const onMenuClick = React.useCallback(() => {
    setSideBarVisible(prev => !prev);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar onMenuClick={onMenuClick} onLogoutClick={logout} title="Patient Space" />
      <Box
        component="main"
        sx={{
          backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
