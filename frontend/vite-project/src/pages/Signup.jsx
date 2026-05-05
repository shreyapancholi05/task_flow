import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, password, role });
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) { alert('Registration failed. Try again.'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-slate-200 p-10 rounded-3xl shadow-xl shadow-slate-200/50">
        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Register.</h2>
        <p className="text-slate-500 mb-8 font-medium">Join TaskFlow and start collaborating.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin (Manager)</option>
            <option value="Member">Member (Team)</option>
          </select>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-4">CREATE ACCOUNT</button>
        </form>
        <p className="text-center mt-8 text-sm text-slate-500">Already a member? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;