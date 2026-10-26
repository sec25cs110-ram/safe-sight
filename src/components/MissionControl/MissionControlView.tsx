import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { CCTV_NODES } from '../../data/initialData';
import { CctvFeedCard } from './CctvFeedCard';
import { TacticalRadar } from './TacticalRadar';
import { Incident } from '../../types/emergency';
import {
  Flame,
  AlertOctagon,
  Shield,
  Activity,
  Cpu,
  Clock,
  Sparkles,
  ArrowRight,
  Building2,
  Mic,
  Sliders,
  CheckCircle2,
  Eye,
  X,
  MapPin,
  Ambulance,
  Hospital,
  AlertTriangle,
  Radio,
  FileText,
  History,
  Layers,
  Check,
} from 'lucide-react';

export const MissionControlView: React.FC = () => {
  const {
    incidents,
    activeIncidentId,
    setActiveIncidentId,
    startFullDemo,
    navigateTo,
    selectedCctvId,
    setSelectedCctvId,
  } = useEmergency();

  const [dossierIncident, setDossierIncident] = useState<Incident | null>(null);

  const activeIncident = incidents.find((i) => i.id === activeIncidentId) || incidents[0];

  return (
    <div className="space-y-6">
      {/* Top Card: UNIFIED TRIAGE CONSOLE */}
      <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/40 p-5 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-center gap-3">
                  UNIFIED TRIAGE CONSOLE
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-sans font-semibold">
                    Live Operational
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">
                  Autonomous Multi-Modal Incident Ingestion & Edge Triage Dispatch Matrix
                </p>
              </div>
            </div>

            {/* Sub Metrics */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-3 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Edge Model Latency: <strong className="text-cyan-300">42ms</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Mesh Triage Precision: <strong className="text-emerald-300">98.4%</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Active Edge Nodes: <strong className="text-cyan-300">3 Municipal CCTV Sensors</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Quick Action & Primary Simulation Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* View Details Quick Button for Active Case */}
            {activeIncident && (
              <button
                id="view-active-details-btn"
                onClick={() => setDossierIncident(activeIncident)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-cyan-800/60 rounded-xl font-mono text-xs font-bold tracking-wide transition-all shadow-sm active:scale-95"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>INCIDENT DOSSIER ({activeIncident.id})</span>
              </button>
            )}

            {/* Large Red Button: SIMULATE NEW INCIDENT */}
            <button
              id="simulate-incident-main-btn"
              onClick={startFullDemo}
              className="relative group overflow-hidden flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl font-mono text-sm font-extrabold tracking-wide uppercase shadow-lg shadow-red-950/70 border border-red-400/50 transition-all active:scale-95"
            >
              <span className="absolute inset-0 w-full h-full bg-white/15 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <AlertOctagon className="w-5 h-5 text-white animate-bounce" />
              <span>SIMULATE NEW INCIDENT</span>
            </button>
          </div>
        </div>
      </div>

      {/* CCTV SECTION & Emergency Triage Feed Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left 7 Cols: Active CCTV Feeds */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                ACTIVE CCTV EDGE FEED SIMULATOR (3 NODES)
              </h2>
              <p className="text-xs text-slate-400">
                Live simulated neural video feeds with on-chip YOLOv8 telemetry
              </p>
            </div>
            <button
              onClick={() => navigateTo('voice-report')}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/80 px-3 py-1.5 rounded-lg border border-cyan-800/50 font-mono transition-all"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Report Mode</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CCTV_NODES.map((feed) => (
              <CctvFeedCard
                key={feed.id}
                feed={feed}
                isActiveSelection={selectedCctvId === feed.id}
                onSelect={() => setSelectedCctvId(feed.id)}
              />
            ))}
          </div>

          {/* GIS Radar Embedded Directly in Left Layout for Tactical Awareness */}
          <div className="pt-2">
            <TacticalRadar />
          </div>
        </div>

        {/* Right 5 Cols: Emergency Triage Feed */}
        <div className="xl:col-span-5 flex flex-col space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-2xl flex flex-col flex-1">
            {/* Feed Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  EMERGENCY TRIAGE FEED
                </h3>
                <p className="text-xs text-slate-400 font-sans">Edge Real-Time Incident Stream</p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300 font-semibold">
                {incidents.filter((i) => i.status !== 'Resolved').length} Active Cases
              </span>
            </div>

            {/* Incidents Stream Cards */}
            <div className="space-y-3.5 overflow-y-auto max-h-[820px] pr-1">
              {incidents.map((incident) => {
                const isSelected = incident.id === activeIncidentId;
                const isCritical = incident.severity === 'CRITICAL';
                const isHigh = incident.severity === 'HIGH';

                return (
                  <div
                    key={incident.id}
                    id={`triage-card-${incident.id}`}
                    onClick={() => setActiveIncidentId(incident.id)}
                    className={`rounded-xl border p-4 transition-all duration-300 relative cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500/80 bg-slate-900/90 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                        : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700'
                    }`}
                  >
                    {/* Top status & confidence */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-black px-2 py-0.5 rounded tracking-wider uppercase ${
                            isCritical
                              ? 'bg-red-950 text-red-300 border border-red-700/60 animate-pulse'
                              : isHigh
                              ? 'bg-amber-950 text-amber-300 border border-amber-700/60'
                              : 'bg-blue-950 text-blue-300 border border-blue-700/60'
                          }`}
                        >
                          {incident.severity}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-200">
                          {incident.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="text-cyan-400 font-bold">{incident.confidence}% Confidence</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">{incident.detectedAt}</span>
                      </div>
                    </div>

                    {/* Incident Title & Location */}
                    <h4 className="text-sm font-bold text-white tracking-wide">
                      {incident.type}
                    </h4>

                    <p className="text-xs text-cyan-300/90 font-mono mt-0.5">
                      📍 {incident.location}, {incident.sector}
                    </p>

                    {/* Summary snippet */}
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2 italic bg-black/40 p-2 rounded-lg border border-slate-800/60 font-sans">
                      "{incident.summary}"
                    </p>

                    {/* Key Extracted Variables */}
                    <div className="grid grid-cols-4 gap-1.5 mt-3 text-center text-[10px] font-mono">
                      <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block">Victims</span>
                        <span className="text-slate-100 font-bold">{incident.victims}</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block">Unconscious</span>
                        <span className={`font-bold ${incident.unconscious > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                          {incident.unconscious}
                        </span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block">Trapped</span>
                        <span className="font-bold text-amber-300">
                          {incident.trapped === 'Unknown' ? '?' : incident.trapped}
                        </span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                        <span className="text-slate-400 block">Smoke/Fire</span>
                        <span className="font-bold text-slate-300 truncate">
                          {incident.fireSmoke === 'Unknown' ? '?' : incident.fireSmoke === 'Smoke detected' ? 'Smoke' : 'Clear'}
                        </span>
                      </div>
                    </div>

                    {/* Status & CTA Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span className="text-slate-400">Status:</span>
                        <span
                          className={`font-semibold ${
                            incident.status === 'Resolved'
                              ? 'text-emerald-400'
                              : incident.status === 'Dispatched'
                              ? 'text-purple-400'
                              : incident.status === 'On Scene'
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {incident.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Dossier inspect button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDossierIncident(incident);
                          }}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono transition-colors"
                          title="View Full Details Dossier"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Details</span>
                        </button>

                        {incident.status === 'Resolved' ? (
                          <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono px-3 py-1 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Resolved
                          </span>
                        ) : (
                          <button
                            id={`review-btn-${incident.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIncidentId(incident.id);
                              navigateTo('triage', incident.id);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-red-950 active:scale-95"
                          >
                            <span>REVIEW & TRIAGE</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE INCIDENT DETAILS DOSSIER MODAL */}
      {dossierIncident && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl border border-cyan-500/50 bg-slate-950 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    COMPREHENSIVE INCIDENT DOSSIER • #{dossierIncident.id}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-sans text-white mt-1">
                  {dossierIncident.type}
                </h2>
                <p className="text-xs font-mono text-cyan-300 mt-0.5">
                  📍 {dossierIncident.location} ({dossierIncident.sector}) • Grid X: {dossierIncident.coordinates.x}%, Y: {dossierIncident.coordinates.y}%
                </p>
              </div>

              <button
                onClick={() => setDossierIncident(null)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Status Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Severity Grade</span>
                <span className="text-sm font-bold text-red-400 mt-0.5 block">{dossierIncident.severity}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">AI Confidence</span>
                <span className="text-sm font-bold text-cyan-300 mt-0.5 block">{dossierIncident.confidence}% Match</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Incident Status</span>
                <span className="text-sm font-bold text-amber-300 mt-0.5 block">{dossierIncident.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Detection Node</span>
                <span className="text-sm font-bold text-slate-200 mt-0.5 block truncate">{dossierIncident.source}</span>
              </div>
            </div>

            {/* Incident Summary & Narrative Analysis */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Detection Summary & Edge Hazard Analysis</span>
              </div>
              <p className="text-sm text-slate-200 font-sans leading-relaxed">
                "{dossierIncident.summary}"
              </p>
              <p className="text-xs text-slate-400 font-sans border-t border-slate-800/80 pt-2">
                <strong className="text-slate-300">Detailed Diagnostic:</strong> {dossierIncident.detailedAnalysis}
              </p>
            </div>

            {/* Casualty & Atmospheric Assessment Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                <span>Casualty & Safety Assessment Parameters</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">TOTAL VICTIMS</span>
                  <span className="text-base font-black text-white">{dossierIncident.victims}</span>
                  <span className="text-[10px] text-slate-500 block">Occupants involved</span>
                </div>

                <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/50">
                  <span className="text-red-300 block text-[10px]">UNCONSCIOUS</span>
                  <span className="text-base font-black text-red-400">{dossierIncident.unconscious}</span>
                  <span className="text-[10px] text-red-400/80 block">ALS Hemodynamic req</span>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/50">
                  <span className="text-amber-300 block text-[10px]">ENTRAPMENT</span>
                  <span className="text-base font-black text-amber-300">
                    {dossierIncident.trapped === 'Unknown' ? 'Pending Triage' : dossierIncident.trapped === 1 ? '1 Trapped' : 'None'}
                  </span>
                  <span className="text-[10px] text-amber-400/80 block">Extrication cutters</span>
                </div>

                <div className="p-3 rounded-xl bg-orange-950/30 border border-orange-900/50">
                  <span className="text-orange-300 block text-[10px]">FIRE / SMOKE</span>
                  <span className="text-base font-black text-orange-300">
                    {dossierIncident.fireSmoke === 'Unknown' ? 'Pending Triage' : dossierIncident.fireSmoke}
                  </span>
                  <span className="text-[10px] text-orange-400/80 block">Atmospheric hazard</span>
                </div>
              </div>
            </div>

            {/* AI Recommended Force Multiplier Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Recommended Multi-Agency Resource Matrix</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {dossierIncident.recommendedResources.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                      {rec.type === 'Ambulance' && <Ambulance className="w-4 h-4" />}
                      {rec.type === 'Fire & Rescue' && <Flame className="w-4 h-4" />}
                      {rec.type === 'Police' && <Shield className="w-4 h-4" />}
                      {rec.type === 'Trauma Hospital Alert' && <Hospital className="w-4 h-4" />}
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-white">
                          {rec.name} × {rec.count}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase">{rec.type}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] font-sans mt-0.5 leading-snug">
                        {rec.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Fleet Units & Live Status */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Radio className="w-4 h-4 text-purple-400" />
                <span>Assigned First Responder Fleet Units ({dossierIncident.responders.length})</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {dossierIncident.responders.map((resp) => (
                  <div
                    key={resp.id}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="font-bold text-white block">{resp.id}</span>
                      <span className="text-[10px] text-slate-400">{resp.unitType}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-cyan-300 font-bold block">{resp.distance}</span>
                      <span className="text-[10px] text-slate-400">ETA: {resp.etaMinutes} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Log Trail */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <History className="w-3.5 h-3.5" />
                <span>DPDP-Compliant Cryptographic Audit Ledger</span>
              </h4>

              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-1.5 text-xs font-mono max-h-28 overflow-y-auto">
                {dossierIncident.auditLog.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="text-cyan-400">{log.time}</span>
                    <span className="truncate mx-2 text-slate-400">{log.event}</span>
                    <span className="text-slate-500 font-bold shrink-0">[{log.user}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setDossierIncident(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                Close Dossier
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const id = dossierIncident.id;
                    setDossierIncident(null);
                    setActiveIncidentId(id);
                    navigateTo('triage', id);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
                >
                  <span>Launch Adaptive Triage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    const id = dossierIncident.id;
                    setDossierIncident(null);
                    setActiveIncidentId(id);
                    navigateTo('dispatch', id);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95"
                >
                  <span>Response Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
