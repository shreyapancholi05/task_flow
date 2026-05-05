import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  const fetchData = async () => {
    try {
      const projRes = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(projRes.data);
      const taskRes = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(taskRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/projects`, { name: projectName, description: projectDesc, admin: user.id });
      setProjectName(''); setProjectDesc(''); fetchData();
      alert('Project Created!');
    } catch (err) { alert('Failed.'); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project and all its tasks?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
      fetchData();
    } catch (err) { alert("Error deleting project"); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black tracking-tight mb-12">Dashboard</h1>

        {user?.role === 'Admin' && (
          <section className="bg-white border border-slate-200 p-8 rounded-3xl mb-12 shadow-sm">
            <h3 className="text-xs font-bold mb-6 text-slate-400 uppercase tracking-widest">Create Project</h3>
            <form onSubmit={handleCreateProject} className="flex flex-wrap gap-4">
              <input className="flex-1 min-w-[200px] bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Project Name" value={projectName} onChange={(e)=>setProjectName(e.target.value)} required />
              <input className="flex-[2] min-w-[300px] bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Project Description" value={projectDesc} onChange={(e)=>setProjectDesc(e.target.value)} required />
              <button className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Create</button>
            </form>
          </section>
        )}

        <h3 className="text-xl font-bold mb-8 text-slate-800">Active Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(p => (
            <div key={p._id} className="group bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-xl hover:border-blue-200 transition-all relative">
              <Link to={`/project/${p._id}`}>
                <h4 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{p.description}</p>
              </Link>
              {user?.role === 'Admin' && (
                <button onClick={() => handleDeleteProject(p._id)} className="text-xs text-red-500 font-bold hover:bg-red-50 p-2 rounded-lg transition-colors">Delete Project</button>
              )}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-8 mt-20 text-slate-800">Assigned Tasks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.filter(t => t.assignedTo?._id === user?.id || t.assignedTo === user?.id).map(t => (
            <TaskCard key={t._id} task={t} onUpdate={fetchData} isAdmin={user?.role === 'Admin'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;