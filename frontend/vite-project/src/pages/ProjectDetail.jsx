import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { AuthContext } from '../context/AuthContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignee, setAssignee] = useState('');

  const fetchData = async () => {
    try {
      const taskRes = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(taskRes.data.filter(t => t.project === id || t.project?._id === id));
      if (user?.role === 'Admin') {
        const memRes = await axios.get(`${import.meta.env.VITE_API_URL}/auth/members`);
        setMembers(memRes.data);
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, {
        title: taskTitle, description: taskDesc, dueDate, project: id, assignedTo: assignee
      });
      setTaskTitle(''); setTaskDesc(''); setDueDate(''); setAssignee('');
      fetchData();
    } catch (err) { alert('Error assigning task.'); }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition shadow-sm text-slate-500">← Back</Link>
          <h2 className="text-4xl font-black tracking-tight uppercase">Project_Files</h2>
        </div>

        {user?.role === 'Admin' && (
          <div className="bg-blue-600 p-8 rounded-[2rem] mb-12 flex flex-col lg:flex-row gap-8 items-center shadow-2xl shadow-blue-600/30">
            <div className="flex-1 text-white">
              <h3 className="text-2xl font-black mb-1 leading-none uppercase">New Task</h3>
              <p className="text-blue-100 text-xs font-bold tracking-widest opacity-80">Assign to team member</p>
            </div>
            <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 flex-[3] w-full">
              <input className="bg-white/20 border-none p-4 rounded-xl text-white placeholder:text-blue-100 text-sm focus:bg-white/30 outline-none" placeholder="Task Title" value={taskTitle} onChange={(e)=>setTaskTitle(e.target.value)} required />
              <select className="bg-white/20 border-none p-4 rounded-xl text-blue-100 text-sm focus:bg-white/30 outline-none" value={assignee} onChange={(e)=>setAssignee(e.target.value)} required>
                <option value="" className="text-slate-900">Assign To...</option>
                {members.map(m => <option key={m._id} value={m._id} className="text-slate-900">{m.name}</option>)}
              </select>
              <input type="date" className="bg-white/20 border-none p-4 rounded-xl text-blue-100 text-sm focus:bg-white/30 outline-none" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} required />
              <button className="bg-white text-blue-600 font-black p-4 rounded-xl hover:scale-105 transition active:scale-95 text-xs uppercase shadow-lg shadow-white/10">Deploy</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map(t => <TaskCard key={t._id} task={t} onUpdate={fetchData} isAdmin={user?.role === 'Admin'} />)}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;