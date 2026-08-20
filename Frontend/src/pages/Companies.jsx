import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import RoundsList from '../components/RoundsList';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const { toast, showToast, clearToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    packageAmount: '',
    status: 'Applied',
    applicationDate: '',
    deadline: '',
    notes: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchCompanies();
  }, [navigate]);

  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (err) {
      showToast('Failed to load companies', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/companies/${editingId}`, formData);
        showToast('Company updated successfully');
      } else {
        await api.post('/companies', formData);
        showToast('Company added successfully');
      }
      resetForm();
      fetchCompanies();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save company', 'error');
    }
  };

  const handleEdit = (company) => {
    setFormData({
      companyName: company.companyName,
      role: company.role || '',
      packageAmount: company.packageAmount || '',
      status: company.status,
      applicationDate: company.applicationDate ? company.applicationDate.split('T')[0] : '',
      deadline: company.deadline ? company.deadline.split('T')[0] : '',
      notes: company.notes || ''
    });
    setEditingId(company.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.delete(`/companies/${id}`);
      showToast('Company deleted successfully');
      fetchCompanies();
    } catch (err) {
      showToast('Failed to delete company', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '', role: '', packageAmount: '', status: 'Applied',
      applicationDate: '', deadline: '', notes: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredCompanies = filterStatus === 'All'
    ? companies
    : companies.filter(c => c.status === filterStatus);

  if (loading) return <><Navbar /><div className="page-container"><p>Loading...</p></div></>;

  return (
    <>
      <Navbar />
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      <div className="page-container">
        <div className="page-header">
          <h1>Company Applications</h1>
          <button onClick={() => setShowForm(!showForm)} className="primary-btn">
            {showForm ? 'Cancel' : '+ Add Company'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="company-form">
            <div className="form-row">
              <div className="form-group">
                <label>Company Name *</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input name="role" value={formData.role} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Package</label>
                <input name="packageAmount" value={formData.packageAmount} onChange={handleChange} placeholder="e.g. 12 LPA" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Applied">Applied</option>
                  <option value="OA">OA</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Application Date</label>
                <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
            </div>

            <button type="submit" className="primary-btn">
              {editingId ? 'Update Company' : 'Add Company'}
            </button>
          </form>
        )}

        <div className="filter-bar">
          <label>Filter by status: </label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="OA">OA</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="companies-list">
          {filteredCompanies.length === 0 ? (
            <p className="empty-state">No companies found. Add your first application above!</p>
          ) : (
            filteredCompanies.map((company) => (
              <div key={company.id} className="company-card">
                <div className="company-card-header">
                  <h3>{company.companyName}</h3>
                  <span className={`status-badge status-${company.status.toLowerCase()}`}>
                    {company.status}
                  </span>
                </div>
                <p><strong>Role:</strong> {company.role || 'N/A'}</p>
                <p><strong>Package:</strong> {company.packageAmount || 'N/A'}</p>
                {company.notes && <p><strong>Notes:</strong> {company.notes}</p>}
                <div className="company-card-actions">
                  <button onClick={() => handleEdit(company)}>Edit</button>
                  <button onClick={() => handleDelete(company.id)} className="delete-btn">Delete</button>
                  <button onClick={() => setExpandedId(expandedId === company.id ? null : company.id)}>
                    {expandedId === company.id ? 'Hide Rounds' : 'View Rounds'}
                  </button>
                </div>
                {expandedId === company.id && <RoundsList companyId={company.id} />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Companies;