import axios from 'axios';
import { useState } from 'react';

const TaskCard = ({ task, onUpdate, isAdmin }) => {
  const [status, setStatus] = useState(task.status);

  // ✅ Check if task is Overdue (Late)
  const isOverdue = new Date(task.dueDate) < new Date() && status !== 'Done';

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, { status: newStatus });
      onUpdate();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`);
      onUpdate();
    } catch (err) { alert("Error deleting task"); }
  };

  const statusThemes = {
    'Todo': 'bg-slate-100 text-slate-600 border-slate-200',
    'In Progress': 'bg-blue-50 text-blue-600 border-blue-100',
    'Done': 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  return (
    <div className={`bg-white border-2 p-8 rounded-[2rem] hover:shadow-xl transition-all group relative ${isOverdue ? 'border-red-500 shadow-lg shadow-red-100' : 'border-slate-100'}`}>
      
      {/* ✅ OVERDUE BADGE */}
      {isOverdue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1 rounded-full shadow-lg animate-bounce">
          OVERDUE ⚠️
        </div>
      )}

      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusThemes[status] || statusThemes['Todo']}`}>
          {status}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">Operator</span>
          <span className="text-xs text-slate-700 font-black italic">@{task.assignedTo?.name || 'Guest'}</span>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{task.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between border-t border-slate-50 pt-6">
        <div className="flex flex-col">
          <span className="text-[9px] text-slate-400 font-bold uppercase mb-1 tracking-widest">Deadline</span>
          <span className={`text-xs font-mono font-bold italic ${isOverdue ? 'text-red-600' : 'text-slate-600'}`}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2">
          <select 
            value={status} 
            onChange={handleStatusChange} 
            className="bg-slate-50 text-[10px] text-slate-900 font-bold p-2 rounded-xl border-none outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="Todo">TODO</option>
            <option value="In Progress">WORKING</option>
            <option value="Done">FINISHED</option>
          </select>

          {isAdmin && (
            <button onClick={handleDeleteTask} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;