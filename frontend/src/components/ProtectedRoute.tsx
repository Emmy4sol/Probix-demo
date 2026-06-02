import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAppSelector((state) => state.auth);

  if (auth.status === 'idle' || auth.status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-xl">
          <p className="text-lg font-semibold">Checking authentication…</p>
        </div>
      </div>
    );
  }

  if (!auth.user || !auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
