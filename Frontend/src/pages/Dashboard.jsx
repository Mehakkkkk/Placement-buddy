import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  if (loading) return <div className="dashboard-container"><p>Loading dashboard...</p></div>;
  if (error) return <div className="dashboard-container"><p>{error}</p></div>;

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Welcome, {user?.name || 'User'}!</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Applications</h3>
            <p className="stat-number">{stats.totalApplications}</p>
          </div>
          <div className="stat-card">
            <h3>OA Stage</h3>
            <p className="stat-number">{stats.statusBreakdown.OA}</p>
          </div>
          <div className="stat-card">
            <h3>Interview Stage</h3>
            <p className="stat-number">{stats.statusBreakdown.Interview}</p>
          </div>
          <div className="stat-card">
            <h3>Selected</h3>
            <p className="stat-number stat-success">{stats.statusBreakdown.Selected}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <p className="stat-number stat-danger">{stats.statusBreakdown.Rejected}</p>
          </div>
          <div className="stat-card">
            <h3>DSA Solved</h3>
            <p className="stat-number">{stats.solvedDSA} / {stats.totalDSA}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;