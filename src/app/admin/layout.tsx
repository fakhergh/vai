'use client';
import * as React from 'react';
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { Vaccines as IconVaccines, Person as IconPerson } from '@mui/icons-material';
import { AppBar, Drawer, DrawerItem } from '@/components';
import { useLogout } from '@/hooks';
import { routes } from '@/constants';
import { useRouter } from 'next/navigation';

const drawerItems: Array<DrawerItem> = [
  { label: 'Doctors', icon: IconVaccines, path: routes.admin.doctors },
  {
    label: 'Patients',
    icon: IconPerson,
    path: routes.admin.patients,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();

  const { logout } = useLogout();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = React.useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar open={drawerOpen} onMenuClick={toggleDrawer} onLogoutClick={logout} title="Admin Panel" />
      <Drawer open={drawerOpen} items={drawerItems} onItemClick={push} />
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
