import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="text-slate-400 mt-2">Enter your email and we’ll send reset instructions.</p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <p className="text-xl font-semibold text-white mb-4">Check your inbox</p>
            <p className="text-slate-400 mb-6">If we have an account with that email, you’ll receive instructions shortly.</p>
            <Link to="/login" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition">
              Send reset link
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-slate-400">Remembered your password?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
