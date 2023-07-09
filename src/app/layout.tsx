'use client';
import { ThemeProvider } from '@mui/system';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { theme } from '@/theme';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={1} autoHideDuration={4000} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
              <CssBaseline />
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
