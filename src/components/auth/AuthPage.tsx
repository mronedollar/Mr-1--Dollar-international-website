import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { BoltIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        const user = await login(email, password, remember);
        toast.success(`Welcome back, ${user.fullName}!`);
        const target = (location.state as any)?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard');
        navigate(target, { replace: true });
      } else {
        const user = await signup({ fullName, email, username, password, phone, experienceLevel: experience, remember });
        toast.success('Account created successfully 🎉');
        const target = user.role === 'admin' ? '/admin' : '/dashboard';
        navigate(target, { replace: true });
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
      toast.error(err?.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://i.postimg.cc/sgWBJqvz/Vertical_Wordmark_White.png" 
              alt="Mr.$1 Logo" 
              className="h-16 w-auto mb-6" 
            />
          </div>
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="https://i.postimg.cc/Gh5YKvKT/Badge_White.png" 
              alt="M1dollar Logo" 
              className="h-12 w-auto" 
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {isLogin ? 'Welcome Back' : 'Join the 1%'}
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            {isLogin
              ? 'Access your trading portal and stay ahead of the market'
              : 'Start your journey to consistent profitability'}
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                isLogin
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                !isLogin
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    placeholder="JohnD_Fx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="phone">
                    Phone (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                    placeholder="+27 82 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="experience">
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  error?.toLowerCase().includes('email')
                    ? 'border-red-500/70 focus:border-red-500/50 focus:ring-red-500/30'
                    : 'border-slate-700/50 focus:border-amber-400/50 focus:ring-amber-400/30'
                }`}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wide" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full bg-slate-800/50 border rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 transition-all ${
                  error?.toLowerCase().includes('password')
                    ? 'border-red-500/70 focus:border-red-500/50 focus:ring-red-500/30'
                    : 'border-slate-700/50 focus:border-amber-400/50 focus:ring-amber-400/30'
                }`}
                placeholder="••••••••"
              />
              {!isLogin && (
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Min 8 characters with at least one symbol. Keep it secure.
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:bg-amber-300/60 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-amber-400/20 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-black"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-black/40 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-400 cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => toast('Password reset coming soon')}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot password?
                </button>
              )}
            </div>

            <div className="text-center text-xs text-slate-400 pt-2">
              {isLogin ? "Don't have an account? " : 'Already a member? '}
              <button
                type="button"
                onClick={() => setMode(isLogin ? 'signup' : 'login')}
                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </div>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-400 text-center mb-4">Quick login with demo accounts:</p>
            
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@mr1dollar.com');
                  setPassword('AdminSecure123!');
                  // Auto-submit after a small delay to ensure state updates
                  setTimeout(() => {
                    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
                    if (submitButton) submitButton.click();
                  }, 50);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-amber-600/20 to-amber-500/20 border border-amber-500/30 hover:from-amber-600/30 hover:to-amber-500/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <BoltIcon className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Admin Account</p>
                    <p className="text-xs text-slate-400">Full access to admin panel</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('trader@example.com');
                  setPassword('CustomerPass123!');
                  // Auto-submit after a small delay to ensure state updates
                  setTimeout(() => {
                    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
                    if (submitButton) submitButton.click();
                  }, 50);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 hover:from-blue-600/30 hover:to-blue-500/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">Customer Account</p>
                    <p className="text-xs text-slate-400">Access to trading dashboard</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-4">
              Note: These are demo accounts. In production, implement proper authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
export { AuthPage };
