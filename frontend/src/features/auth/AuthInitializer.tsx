import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { refreshSession } from './authSlice';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export default function AuthInitializer({ children }: AuthInitializerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return <>{children}</>;
}
