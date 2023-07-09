'use client';
import './globals.css';
import { ThemeProvider } from '@mui/system';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { theme } from '@/theme';

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
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
