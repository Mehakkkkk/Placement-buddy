import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import Toast from '../components/Toast';
import useToast from '../hooks/useToast';

function DsaTracker() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ topic: '', difficulty: '', status: '' });
  const navigate = useNavigate();
  const { toast, showToast, clearToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    difficulty: 'Medium',
    status: 'Not Started',
    link: '',
    notes: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchQuestions();
  }, [navigate, filters]);

  const fetchQuestions = async () => {
    try {
      const params = {};
      if (filters.topic) params.topic = filters.topic;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.status) params.status = filters.status;

      const response = await api.get('/dsa', { params });
      setQuestions(response.data);
    } catch (err) {
      showToast('Failed to load questions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/dsa/${editingId}`, formData);
        showToast('Question updated successfully');
      } else {
        await api.post('/dsa', formData);
        showToast('Question added successfully');
      }
      resetForm();
      fetchQuestions();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save question', 'error');
    }
  };

  const handleEdit = (question) => {
    setFormData({
      title: question.title,
      topic: question.topic || '',
      difficulty: question.difficulty,
      status: question.status,
      link: question.link || '',
      notes: question.notes || ''
    });
    setEditingId(question.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      await api.delete(`/dsa/${id}`);
      showToast('Question deleted successfully');
      fetchQuestions();
    } catch (err) {
      showToast('Failed to delete question', 'error');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', topic: '', difficulty: 'Medium', status: 'Not Started', link: '', notes: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <><Navbar /><div className="page-container"><p>Loading...</p></div></>;

  return (
    <>
      <Navbar />
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />
      <div className="page-container">
        <div className="page-header">
          <h1>DSA Preparation Tracker</h1>
          <button onClick={() => setShowForm(!showForm)} className="primary-btn">
            {showForm ? 'Cancel' : '+ Add Question'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="company-form">
            <div className="form-group">
              <label>Question Title *</label>
              <input name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Topic</label>
                <input name="topic" value={formData.topic} onChange={handleChange} placeholder="e.g. Arrays, DP" />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Solved">Solved</option>
                </select>
              </div>
              <div className="form-group">
                <label>Link</label>
                <input name="link" value={formData.link} onChange={handleChange} placeholder="https://leetcode.com/..." />
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" />
            </div>

            <button type="submit" className="primary-btn">
              {editingId ? 'Update Question' : 'Add Question'}
            </button>
          </form>
        )}

        <div className="filter-bar">
          <label>Topic: </label>
          <input
            name="topic"
            value={filters.topic}
            onChange={handleFilterChange}
            placeholder="Filter by topic"
            style={{ marginRight: '16px' }}
          />

          <label>Difficulty: </label>
          <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange} style={{ marginRight: '16px' }}>
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label>Status: </label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Solved">Solved</option>
          </select>
        </div>

        <div className="companies-list">
          {questions.length === 0 ? (
            <p className="empty-state">No questions found. Add your first question above!</p>
          ) : (
            questions.map((q) => (
              <div key={q.id} className="company-card">
                <div className="company-card-header">
                  <h3>{q.title}</h3>
                  <span className={`status-badge difficulty-${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
                  </span>
                </div>
                <p><strong>Topic:</strong> {q.topic || 'N/A'}</p>
                <p><strong>Status:</strong> {q.status}</p>
                {q.link && (
                  <p>
                    <strong>Link:</strong>{' '}
                    <a href={q.link} target="_blank" rel="noopener noreferrer">{q.link}</a>
                  </p>
                )}
                {q.notes && <p><strong>Notes:</strong> {q.notes}</p>}
                <div className="company-card-actions">
                  <button onClick={() => handleEdit(q)}>Edit</button>
                  <button onClick={() => handleDelete(q.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default DsaTracker;