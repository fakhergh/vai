'use client';
import { Button } from '@mui/material';
import { useLogout } from '@/hooks';

export default function Appointments() {
  const { logout } = useLogout();

  return (
    <div>
      <div>Doctor appointments list is pending..</div>
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
