import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(email, password); } 
    catch (err) { alert('Login failed. Check your email/password.'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 p-10 rounded-3xl shadow-xl shadow-slate-200/50">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Login.</h2>
        <p className="text-slate-500 mb-8 font-medium">Manage your team tasks efficiently.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">SIGN IN</button>
        </form>
        <p className="text-center mt-8 text-sm text-slate-500">New member? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Register now</Link></p>
      </div>
    </div>
  );
};

export default Login;