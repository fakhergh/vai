'use client';
import { ThemeProvider } from '@mui/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/theme';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { queryClient } from '@/queryClient';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>VAI Platform</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider maxSnack={1} autoHideDuration={4000} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
                <CssBaseline />
                {children}
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
