import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Briefcase, Building2, MapPin, ExternalLink, Activity, CheckCircle, Clock } from 'lucide-react';
import { applicationRepository } from '../storage/repositories/ApplicationRepository';
import type { Application } from '../types/application';

export default function DashboardApp() {
  const applications = useLiveQuery(() => applicationRepository.getAll()) || [];

  const totalApplied = applications.length;
  const interviewing = applications.filter(a => a.status === 'Interviewing').length;
  const todayApps = applications.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.appliedDate.startsWith(today);
  }).length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>JobFlow Dashboard</h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Briefcase size={24} /></div>
          <div className="stat-content">
            <h3>Total Applications</h3>
            <p>{totalApplied}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><Activity size={24} /></div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p>{interviewing}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><CheckCircle size={24} /></div>
          <div className="stat-content">
            <h3>Applied Today</h3>
            <p>{todayApps}</p>
          </div>
        </div>
      </div>

      <section className="applications-section">
        <h2>Recent Applications</h2>
        
        {applications.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} />
            <h3>No applications yet</h3>
            <p>Go apply for some jobs on LinkedIn and they will appear here automatically!</p>
          </div>
        ) : (
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="app-info">
                  <div className="app-info-primary">
                    <a href={app.jobUrl} target="_blank" rel="noreferrer" className="app-title">
                      {app.title} <ExternalLink size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                    </a>
                    <div className="app-company">{app.company}</div>
                  </div>
                  <div className="app-meta">
                    {app.location && (
                      <div className="app-meta-item">
                        <MapPin size={14} /> {app.location}
                      </div>
                    )}
                    <div className="app-meta-item">
                        <Clock size={14} /> {new Date(app.appliedDate).toLocaleDateString()}
                    </div>
                    {app.workMode && (
                      <div className="app-meta-item">
                        • {app.workMode}
                      </div>
                    )}
                  </div>
                </div>
                <div className="app-actions">
                  <span className={`app-status status-${app.status}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
