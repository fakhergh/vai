import * as React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { routes } from '@/constants';

export function useLogout() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const logout = React.useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    queryClient.clear();
    push(routes.auth.login);
  }, [push, queryClient]);

  return { logout };
}
