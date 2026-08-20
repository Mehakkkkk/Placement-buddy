import { useState, useEffect } from 'react';
import api from '../api/axios';

function RoundsList({ companyId }) {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    roundType: 'OA',
    questionsAsked: '',
    notes: '',
    roundDate: ''
  });

  useEffect(() => {
    fetchRounds();
  }, [companyId]);

  const fetchRounds = async () => {
    try {
      const response = await api.get(`/interviews/company/${companyId}`);
      setRounds(response.data);
    } catch (err) {
      console.error('Failed to load rounds', err);
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
        await api.put(`/interviews/${editingId}`, formData);
      } else {
        await api.post('/interviews', { ...formData, companyId: companyId });
      }
      resetForm();
      fetchRounds();
    } catch (err) {
      console.error('Failed to save round', err);
    }
  };

  const handleEdit = (round) => {
    setFormData({
      roundType: round.roundType,
      questionsAsked: round.questionsAsked || '',
      notes: round.notes || '',
      roundDate: round.roundDate ? round.roundDate.split('T')[0] : ''
    });
    setEditingId(round.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this round?')) return;
    try {
      await api.delete(`/interviews/${id}`);
      fetchRounds();
    } catch (err) {
      console.error('Failed to delete round', err);
    }
  };

  const resetForm = () => {
    setFormData({ roundType: 'OA', questionsAsked: '', notes: '', roundDate: '' });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <p className="rounds-loading">Loading rounds...</p>;

  return (
    <div className="rounds-section">
      <div className="rounds-header">
        <h4>Interview Rounds</h4>
        <button onClick={() => setShowForm(!showForm)} className="small-btn">
          {showForm ? 'Cancel' : '+ Add Round'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="round-form">
          <div className="form-row">
            <div className="form-group">
              <label>Round Type</label>
              <select name="roundType" value={formData.roundType} onChange={handleChange}>
                <option value="OA">OA</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Managerial">Managerial</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="roundDate" value={formData.roundDate} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Questions Asked</label>
            <textarea name="questionsAsked" value={formData.questionsAsked} onChange={handleChange} rows="2" />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2" />
          </div>
          <button type="submit" className="small-btn primary">
            {editingId ? 'Update Round' : 'Add Round'}
          </button>
        </form>
      )}

      {rounds.length === 0 ? (
        <p className="empty-state-small">No rounds recorded yet.</p>
      ) : (
        rounds.map((round) => (
          <div key={round.id} className="round-item">
            <div className="round-item-header">
              <strong>{round.roundType}</strong>
              {round.roundDate && <span>{round.roundDate.split('T')[0]}</span>}
            </div>
            {round.questionsAsked && <p><strong>Questions:</strong> {round.questionsAsked}</p>}
            {round.notes && <p><strong>Notes:</strong> {round.notes}</p>}
            <div className="round-item-actions">
              <button onClick={() => handleEdit(round)}>Edit</button>
              <button onClick={() => handleDelete(round.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RoundsList;