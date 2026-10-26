import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Radio,
  AlertTriangle,
  Ambulance,
  Flame,
  Shield,
  Clock,
  ArrowRight,
  Filter,
  CheckCircle2,
  Navigation,
  Activity,
  Users,
} from 'lucide-react';
import { SeverityLevel } from '../../types/emergency';

export const ResponderDashboardView: React.FC = () => {
  const { incidents, navigateTo, setActiveIncidentId } = useEmergency();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  // Compute metrics
  const activeEmergencies = incidents.filter((i) => i.status !== 'Resolved').length;
  const criticalCases = incidents.filter((i) => i.severity === 'CRITICAL' && i.status !== 'Resolved').length;
  
  // Aggregate responders across active incidents
  const allResponders = incidents.flatMap((i) => i.responders);
  const respondersEnRoute = allResponders.filter((r) => r.status === 'En Route' || r.status === 'Dispatched').length;
  const respondersAvailable = allResponders.filter((r) => r.status === 'Available').length + 5; // adding base reserve pool

  const filteredIncidents = incidents.filter((i) => {
    if (filterSeverity === 'ALL') return true;
    return i.severity === filterSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                RESPONDER OPERATIONS
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Tactical fleet coordination, CAD telemetry, and active incident dispatch status
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold">
              CAD LINK: ONLINE (0.02% DROP)
            </span>
          </div>
        </div>

        {/* Dashboard Stat Cards (Required by Prompt):
            - Active Emergencies
            - Critical Cases
            - Responders Available
            - Responders En Route
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Active Emergencies */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Active Emergencies</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-white">{activeEmergencies}</span>
              <span className="text-[10px] text-cyan-400 font-mono">Live Ingested</span>
            </div>
          </div>

          {/* Critical Cases */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-red-300">Critical Cases</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-red-300">{criticalCases}</span>
              <span className="text-[10px] text-red-400 font-mono">Requires Tier 1 Response</span>
            </div>
          </div>

          {/* Responders Available */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-300">Responders Available</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-emerald-300">{respondersAvailable}</span>
              <span className="text-[10px] text-emerald-400 font-mono">On Standby</span>
            </div>
          </div>

          {/* Responders En Route */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300">Responders En Route</span>
              <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-cyan-300">{respondersEnRoute}</span>
              <span className="text-[10px] text-cyan-400 font-mono">Under Siren / Transit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Table Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-mono tracking-wider text-white uppercase">
              ACTIVE INCIDENT DISPATCH ROSTER
            </h3>
            <p className="text-xs text-slate-400">Click any incident row to launch tactical tracking</p>
          </div>

          {/* Filter dropdown / tabs */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    filterSeverity === sev
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Incident ID</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Assigned Resources</th>
                <th className="py-3 px-3">ETA</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredIncidents.map((inc) => {
                const assignedCount = inc.responders.length;
                const minEta = inc.responders.length > 0 ? Math.min(...inc.responders.map((r) => r.etaMinutes)) : 0;

                return (
                  <tr
                    key={inc.id}
                    onClick={() => {
                      setActiveIncidentId(inc.id);
                      navigateTo('tracking', inc.id);
                    }}
                    className="hover:bg-slate-900/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-3 font-bold text-cyan-400 group-hover:underline">
                      #{inc.id}
                    </td>

                    <td className="py-3.5 px-3 text-slate-200 font-sans font-medium">
                      {inc.type}
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inc.severity === 'CRITICAL'
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : inc.severity === 'HIGH'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {inc.severity}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-300">
                      {inc.location}
                    </td>

                    <td className="py-3.5 px-3 text-slate-300">
                      {assignedCount > 0 ? (
                        <div className="flex items-center gap-1.5">
                          {inc.responders.map((r) => (
                            <span
                              key={r.id}
                              className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px]"
                            >
                              {r.id}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500">Unassigned</span>
                      )}
                    </td>

                    <td className="py-3.5 px-3 font-bold text-cyan-300">
                      {assignedCount > 0 ? `${minEta} min` : '—'}
                    </td>

                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[11px] font-bold ${
                          inc.status === 'Resolved'
                            ? 'text-emerald-400'
                            : inc.status === 'On Scene'
                            ? 'text-cyan-400'
                            : inc.status === 'Dispatched'
                            ? 'text-purple-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {inc.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIncidentId(inc.id);
                          navigateTo('tracking', inc.id);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/40 rounded-lg text-[11px] transition-all"
                      >
                        <span>Track</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
