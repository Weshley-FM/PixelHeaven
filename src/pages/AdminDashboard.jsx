import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    year: '',
    image: ''
  });

  useEffect(() => {
    // Check authentication on mount
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          fetchProjects();
        } else {
          localStorage.removeItem('adminToken');
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const url = isEditing 
      ? `http://localhost:5000/api/projects/${editId}` 
      : 'http://localhost:5000/api/projects';
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setFormData({ title: '', category: '', year: '', image: '' });
        setIsEditing(false);
        setEditId(null);
        fetchProjects(); // Refresh list
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setEditId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      year: project.year,
      image: project.image
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AdminLogin onLogin={(user) => { setUser(user); fetchProjects(); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-500 mt-1">Logged in as {user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">
              View Site &rarr;
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Menu</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === 'projects' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${
                    activeTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  Settings
                </button>
              </li>
            </ul>
          </div>
          
          {/* Main Content Area */}
          <div className="space-y-8">
            
            {activeTab === 'projects' && (
              <>
                {/* Form Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    {isEditing ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                      <input type="text" name="category" value={formData.category} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
                      <input type="text" name="year" value={formData.year} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                      <input type="url" name="image" value={formData.image} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900" />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                      {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(false); setFormData({title:'',category:'',year:'',image:''}); }} className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors">
                          Cancel
                        </button>
                      )}
                      <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                        {isEditing ? 'Save Changes' : 'Create Project'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* List Card */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Manage Projects</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="py-4 font-semibold text-slate-500">Project</th>
                          <th className="py-4 font-semibold text-slate-500">Category</th>
                          <th className="py-4 font-semibold text-slate-500">Year</th>
                          <th className="py-4 font-semibold text-slate-500 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((p) => (
                          <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                            <td className="py-4 py-4 font-medium text-slate-900 flex items-center gap-4">
                              <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded-lg" />
                              {p.title}
                            </td>
                            <td className="py-4 text-slate-500">{p.category}</td>
                            <td className="py-4 text-slate-500">{p.year}</td>
                            <td className="py-4 text-right">
                              <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700 font-medium mr-4">Edit</button>
                              <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                            </td>
                          </tr>
                        ))}
                        {projects.length === 0 && (
                          <tr>
                            <td colSpan="4" className="py-8 text-center text-slate-500">No projects found. Create one above!</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Settings</h3>
                <p className="text-slate-500">System settings coming soon.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
