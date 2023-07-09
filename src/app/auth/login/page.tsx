'use client';
import * as React from 'react';
import { Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoginForm, LoginFormValues } from '@/components/LoginForm/LoginForm';
import { useLoginMutation } from '@/services/authService';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';
import { UserRole } from '@/interfaces';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';

export default function Login() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: loginMutation, data, error, status } = useLoginMutation();

  const onSubmit = React.useCallback(
    (values: LoginFormValues) => {
      loginMutation({ email: values.email, password: values.password });
    },
    [loginMutation],
  );

  const redirect = React.useCallback(
    (role: UserRole) => {
      let nextRoute: string;

      switch (role) {
        case UserRole.ADMIN:
          nextRoute = routes.admin.home;
          break;
        case UserRole.DOCTOR:
          nextRoute = routes.doctor.home;
          break;
        case UserRole.PATIENT:
          nextRoute = routes.patient.home;
          break;
      }

      push(nextRoute);
    },
    [push],
  );

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      redirect(role as UserRole);
    }
  }, [redirect]);

  React.useEffect(() => {
    if (data?.data.token) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('role', data.data.user.role);
      redirect(data.data.user.role);
    }
  }, [data, redirect]);

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.NotFound:
        enqueueSnackbar('Invalid email or password', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [error, enqueueSnackbar]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <LoginForm onSubmit={onSubmit} loading={status === 'loading'} />
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href={routes.auth.register} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
