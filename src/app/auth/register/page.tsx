'use client';
import * as React from 'react';
import { Avatar, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from 'next/link';
import { routes } from '@/constants';
import { RegisterForm, RegisterFormValues } from '@/components';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';
import { UserRole } from '@/interfaces';

export default function Register() {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: registerMutation, data, error, status } = useRegisterMutation();

  const onSubmit = React.useCallback(
    (values: RegisterFormValues) => {
      registerMutation({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        gender: values.gender!,
        birthdate: values.birthdate!,
      });
    },
    [registerMutation],
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
      case HttpStatusCode.Conflict:
        enqueueSnackbar('Email in use, please try another one', { variant: 'error' });
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
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <RegisterForm onSubmit={onSubmit} loading={status === 'loading'} />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={routes.auth.login}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
