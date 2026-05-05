import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-black tracking-tight text-slate-900">
        TASKFLOW <span className="text-blue-600 font-medium text-sm">(Team Task Manager)</span>
      </Link>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">{user?.role}</p>
          <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
        </div>
        <button 
          onClick={logout} 
          className="bg-slate-900 hover:bg-red-600 text-white text-xs font-bold px-5 py-2 rounded-lg transition-all active:scale-95 shadow-md"
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;