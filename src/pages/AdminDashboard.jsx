import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import pb from '../pb';

const tabs = [
  { id: 'projects', label: 'Projects', type: 'list' },
  { id: 'services', label: 'Services', type: 'list' },
  { id: 'testimonials', label: 'Testimonials', type: 'list' },
  { id: 'faqs', label: 'FAQs', type: 'list' },
  { id: 'engagement_models', label: 'Engagement', type: 'list' },
  { id: 'section_navbar', label: 'Navbar (Single)', type: 'single' },
  { id: 'section_hero', label: 'Hero (Single)', type: 'single' },
  { id: 'section_about', label: 'About (Single)', type: 'single' },
  { id: 'section_cta', label: 'CTA (Single)', type: 'single' },
  { id: 'section_footer', label: 'Footer (Single)', type: 'single' },
  { id: 'page_about_team', label: 'About Team (List)', type: 'list' },
];

const schemaDefs = {
  projects: ['title', 'category', 'year', 'image'],
  services: ['number', 'title', 'description'],
  testimonials: ['text', 'author', 'role'],
  faqs: ['question', 'answer'],
  engagement_models: ['title', 'price', 'timeline', 'description'],
  section_navbar: ['brand_name', 'link_home', 'link_about', 'link_service', 'button_contact'],
  section_hero: ['brand_name', 'founders_text', 'subtitle', 'draw_phrases'],
  section_about: ['section_label', 'slide1_title', 'slide1_text', 'slide2_title', 'slide2_text', 'slide3_title', 'stat1_number', 'stat1_label', 'stat2_number', 'stat2_label', 'stat3_number', 'stat3_label', 'stat4_number', 'stat4_label', 'slide4_title', 'slide4_button'],
  section_cta: ['section_label', 'title', 'description', 'placeholder_text'],
  section_footer: ['brand_name', 'description', 'col1_title', 'col2_title', 'location_title', 'location_text', 'copyright_text'],
  page_about_hero: ['title', 'subtitle', 'image_url', 'stat_number', 'stat_label', 'image_text'],
  page_about_vision: ['section_label', 'title', 'paragraph_1', 'paragraph_2', 'team_text', 'visual_url', 'badge_number', 'badge_label'],
  page_about_timeline: ['year', 'title', 'description', 'sort_order'],
  page_about_why_reasons: ['number', 'title', 'description', 'sort_order'],
  page_about_team: ['name', 'role', 'image_url', 'description', 'sort_order'],
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  // Data States
  const [listData, setListData] = useState([]);
  const [singleData, setSingleData] = useState(null);

  // Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (pb.authStore.isValid && pb.authStore.isAdmin) {
      setUser(pb.authStore.model);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchTabData();
    }
  }, [activeTab, user]);

  const fetchTabData = async () => {
    const tabObj = tabs.find(t => t.id === activeTab);
    resetForm();
    if (!tabObj) return;

    try {
      if (tabObj.type === 'list') {
        const records = await pb.collection(activeTab).getFullList({ sort: '-created' });
        setListData(records);
      } else {
        try {
          const record = await pb.collection(activeTab).getFirstListItem('');
          setSingleData(record);
          setFormData(record);
        } catch (err) {
          // If no record exists yet, it's fine, start with empty form
          setSingleData(null);
          setFormData({});
        }
      }
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  const handleLogout = () => {
    pb.authStore.clear();
    setUser(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({});
  };

  const handleSubmitList = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await pb.collection(activeTab).update(editId, formData);
      } else {
        await pb.collection(activeTab).create(formData);
      }
      resetForm();
      fetchTabData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item forever?')) return;
    try {
      await pb.collection(activeTab).delete(id);
      fetchTabData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitSingle = async (e) => {
    e.preventDefault();
    try {
      if (singleData && singleData.id) {
        await pb.collection(activeTab).update(singleData.id, formData);
      } else {
        await pb.collection(activeTab).create(formData);
      }
      alert('Saved successfully!');
      fetchTabData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading CMS...</div>;
  if (!user) return <AdminLogin onLogin={(user) => { setUser(user); }} />;

  const currentTabObj = tabs.find(t => t.id === activeTab);
  const fields = schemaDefs[activeTab] || [];

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
            <Link to="/" className="text-slate-500 hover:text-slate-900 font-medium">View Site &rarr;</Link>
            <button onClick={handleLogout} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium">Sign Out</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          
          {/* Sidebar */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Collections</h3>
            <ul className="space-y-2">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button 
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium ${
                      activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Main Area */}
          <div className="space-y-8">
            
            {currentTabObj?.type === 'list' && (
              <>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{isEditing ? `Edit ${currentTabObj.label}` : `Add ${currentTabObj.label}`}</h3>
                  <form onSubmit={handleSubmitList} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fields.map(field => (
                        <div key={field} className={field.includes('text') || field.includes('description') || field.includes('answer') ? 'col-span-1 md:col-span-2' : ''}>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{field.replace(/_/g, ' ')}</label>
                          {field.includes('text') || field.includes('description') || field.includes('answer') ? (
                            <textarea name={field} value={formData[field] || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" rows="3" />
                          ) : (
                            <input type="text" name={field} value={formData[field] || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      {isEditing && <button type="button" onClick={resetForm} className="px-6 py-3 bg-slate-100 rounded-xl">Cancel</button>}
                      <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl">Save</button>
                    </div>
                  </form>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Manage {currentTabObj.label}</h3>
                  {listData.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b">
                      <div>
                        {fields.slice(0, 2).map((f, i) => (
                          <span key={f} className={i === 0 ? "font-medium mr-4" : "text-sm text-slate-500"}>
                            {String(item[f] || '').substring(0, 50)}
                          </span>
                        ))}
                      </div>
                      <div>
                        <button onClick={() => {setIsEditing(true); setEditId(item.id); setFormData(item);}} className="text-blue-500 mr-4">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
                      </div>
                    </div>
                  ))}
                  {listData.length === 0 && <p className="text-slate-400">No items found.</p>}
                </div>
              </>
            )}

            {currentTabObj?.type === 'single' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Manage {currentTabObj.label}</h3>
                <form onSubmit={handleSubmitSingle} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {fields.map(field => (
                      <div key={field} className={field.includes('text') || field.includes('description') ? 'col-span-1 md:col-span-2' : ''}>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{field.replace(/_/g, ' ')}</label>
                        {field.includes('text') || field.includes('description') || field.includes('phrases') ? (
                          <textarea name={field} value={formData[field] || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" rows="3" />
                        ) : (
                          <input type="text" name={field} value={formData[field] || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="px-8 py-3 bg-slate-900 text-white rounded-xl">Save Changes</button>
                  </div>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
