import React, { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';
import { Briefcase, ExternalLink } from 'lucide-react';
import { applicationRepository } from '~/storage/repositories/ApplicationRepository';
import './style.css';

function App() {
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const apps = await applicationRepository.getAll();
      const today = new Date().toISOString().split('T')[0];
      const todayApps = apps.filter(a => a.appliedDate.startsWith(today)).length;
      setTodayCount(todayApps);
    }
    fetchStats();
  }, []);

  const openDashboard = () => {
    browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') });
  };

  return (
    <div className="popup-container">
      <div className="popup-logo">JobFlow</div>
      
      <div className="stats">
        <p>Applications Today</p>
        <h2>{todayCount}</h2>
      </div>

      <button className="dashboard-btn" onClick={openDashboard}>
        <Briefcase size={18} /> Open Dashboard <ExternalLink size={16} />
      </button>
    </div>
  );
}

export default App;
