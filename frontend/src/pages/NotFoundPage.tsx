import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-400">404</h1>
        <p className="text-3xl font-semibold mt-4">Page Not Found</p>
        <p className="text-slate-400 mt-2 mb-8">The page you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
