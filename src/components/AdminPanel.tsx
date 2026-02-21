import React, { useState, useEffect } from 'react';
import { Shield, Key, Activity, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const AdminPanel = ({ darkMode }: { darkMode: boolean }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [keys, setKeys] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // In a real app, this would be a secure check.
    // For this prototype, we use a simple check or an API call.
    if (password === 'antigravity2025') {
      setAuthenticated(true);
      fetchData();
    } else {
      alert('Invalid Password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const keysRes = await fetch('/api/admin/keys');
      const keysData = await keysRes.json();
      setKeys(keysData.keys || []);

      const jobsRes = await fetch('/api/admin/jobs');
      const jobsData = await jobsRes.json();
      setJobs(jobsData.jobs || []);
    } catch (e) {
      console.error('Failed to fetch admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      const interval = setInterval(fetchData, 10000); // Refresh every 10s
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className={`min-h-[60vh] flex items-center justify-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white shadow-xl rounded-2xl'} p-8 max-w-md w-full border`}>
          <div className="flex flex-col items-center mb-6">
            <div className={`p-4 rounded-full mb-4 ${darkMode ? 'bg-accent-blue/10 text-accent-blue' : 'bg-blue-50 text-blue-600'}`}>
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-bold">Admin Authorization</h1>
            <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Enter password to access Antigravity Core</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg mb-4 ${darkMode ? 'input-glass-dark' : 'border border-gray-300'}`}
            placeholder="Admin Password"
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className={`w-full py-3 rounded-lg font-bold transition-all ${darkMode ? 'btn-industrial-primary' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            INITIALIZE_ACCESS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">SYSTEM_CONTROL_CENTER</h1>
          <p className={`font-mono text-sm uppercase ${darkMode ? 'text-accent-blue' : 'text-blue-600'}`}>Antigravity Autonomous Auditor v1.0</p>
        </div>
        <button
          onClick={fetchData}
          className={`p-2 rounded-lg ${darkMode ? 'btn-glass-dark' : 'bg-gray-100'}`}
          disabled={loading}
        >
          <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'surface-industrial' : 'bg-white border'} p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Key className="text-accent-blue" size={24} />
            <h3 className="font-bold">Key Pool Health</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{keys.length}</div>
          <p className="text-xs font-mono uppercase text-slate-500">Active API Nodes</p>
        </div>
        <div className={`${darkMode ? 'surface-industrial' : 'bg-white border'} p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-accent-blue" size={24} />
            <h3 className="font-bold">Current Load</h3>
          </div>
          <div className="text-3xl font-bold mb-1">
            {keys.reduce((acc, k) => acc + k.current_rpm, 0)} <span className="text-sm font-normal text-slate-500">RPM</span>
          </div>
          <p className="text-xs font-mono uppercase text-slate-500">Global Request Velocity</p>
        </div>
        <div className={`${darkMode ? 'surface-industrial' : 'bg-white border'} p-6 rounded-xl`}>
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-accent-blue" size={24} />
            <h3 className="font-bold">Active Jobs</h3>
          </div>
          <div className="text-3xl font-bold mb-1">{jobs.filter(j => j.is_running).length}</div>
          <p className="text-xs font-mono uppercase text-slate-500">Autonomous Processes</p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Key size={20} className="text-accent-blue" />
          API_KEY_REGISTRY
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {keys.map((key) => (
            <div key={key.id} className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border'} p-4 rounded-lg`}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-xs">{key.model}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  key.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                  key.status === 'CoolingDown' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {key.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-[10px] uppercase text-slate-500 mb-1">RPM Usage</p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold">{key.current_rpm}</span>
                    <span className="text-[10px] text-slate-500 mb-1">/ 14</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-1">
                    <div
                      className="h-full bg-accent-blue rounded-full"
                      style={{ width: `${(key.current_rpm / 14) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-500 mb-1">Daily Quota</p>
                  <div className="flex items-end gap-1">
                    <span className="text-lg font-bold">{key.daily_usage}</span>
                    <span className="text-[10px] text-slate-500 mb-1">/ 1500</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(key.daily_usage / 1500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-mono text-slate-600 break-all">ID: {key.id}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity size={20} className="text-accent-blue" />
          AUDIT_JOB_STREAM
        </h2>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border'} p-6 rounded-xl`}>
              <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold">{job.contract_name}</h3>
                  <p className="text-xs font-mono text-slate-500">{job.id}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-right">
                      <p className="text-[10px] uppercase text-slate-500">Progress</p>
                      <p className="font-bold">Phase {job.current_phase} / 6</p>
                   </div>
                   <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${job.is_running ? 'border-accent-blue animate-pulse' : 'border-slate-800'}`}>
                      <span className="text-[10px] font-bold">{Math.round((job.current_phase / 6) * 100)}%</span>
                   </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 block mb-1">Files</span>
                  <p className="font-mono">{job.total_files}</p>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Lines</span>
                  <p className="font-mono">{job.total_lines.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Est. Duration</span>
                  <p className="font-mono">{job.estimated_duration}m</p>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Status</span>
                  <p className={`font-bold ${job.is_running ? 'text-green-500' : 'text-slate-500'}`}>
                    {job.is_running ? 'RUNNING' : 'PAUSED'}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {jobs.length === 0 && (
            <div className={`p-12 text-center border-2 border-dashed rounded-xl ${darkMode ? 'border-white/5 text-slate-500' : 'border-gray-200 text-gray-400'}`}>
              No active audit jobs found in registry.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
