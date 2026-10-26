import React, { useState, useEffect } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Navigation,
  Radio,
  Ambulance,
  Flame,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  ArrowLeft,
  Check,
  Building,
} from 'lucide-react';

export const LiveTrackingView: React.FC = () => {
  const {
    activeIncident,
    simulateRespondersArrival,
    resolveIncident,
    navigateTo,
    audioEnabled,
  } = useEmergency();

  const incident = activeIncident;

  // Real-time animated coordinate progress simulation
  const [simulationProgress, setSimulationProgress] = useState<number>(0);

  useEffect(() => {
    if (!incident || incident.status === 'Resolved') return;
    const interval = setInterval(() => {
      setSimulationProgress((p) => (p >= 100 ? 100 : p + 4));
    }, 400);
    return () => clearInterval(interval);
  }, [incident]);

  if (!incident) {
    return (
      <div className="text-center p-12 text-slate-400 font-mono">
        No incident selected. Please return to Mission Control.
      </div>
    );
  }

  const isArrived = incident.status === 'On Scene' || incident.responders.every((r) => r.status === 'Arrived');
  const isResolved = incident.status === 'Resolved';

  // Calculate animated responder coordinates towards incident
  const targetX = incident.coordinates.x;
  const targetY = incident.coordinates.y;

  const getInterpolatedPos = (origX: number, origY: number) => {
    if (isArrived || isResolved) {
      return {
        x: targetX + (origX > targetX ? 3 : -3),
        y: targetY + (origY > targetY ? 3 : -3),
      };
    }
    const factor = simulationProgress / 100;
    return {
      x: origX + (targetX - origX) * factor * 0.75,
      y: origY + (targetY - origY) * factor * 0.75,
    };
  };

  const ambPos = getInterpolatedPos(28, 72);
  const firePos = getInterpolatedPos(74, 25);
  const pcrPos = getInterpolatedPos(42, 32);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                LIVE RESPONSE TRACKING
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Geospatial responder telemetry & incident corridor monitoring
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 font-bold">
              DEMO / SIMULATED TRACKING
            </span>

            <button
              id="back-to-mc-btn"
              onClick={() => navigateTo('mission-control')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Mission Control</span>
            </button>
          </div>
        </div>

        {/* Display incident details: INCIDENT #RSQ-1042, Road Accident, Anna Salai Crossway, CRITICAL */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">INCIDENT #{incident.id}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono font-black text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                {incident.severity}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              {incident.type}
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">📍 {incident.location}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">INCIDENT STATUS</span>
              <span
                className={`font-bold ${
                  isResolved
                    ? 'text-emerald-400'
                    : isArrived
                    ? 'text-cyan-400'
                    : 'text-amber-400'
                }`}
              >
                {incident.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS RESOLVED BANNER (Section 14 Step 16: Show ✓ INCIDENT RESOLVED) */}
      {isResolved && (
        <div className="rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-emerald-950/90 p-6 shadow-2xl text-center space-y-3 animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black font-mono text-emerald-300 uppercase tracking-widest">
            ✓ INCIDENT RESOLVED
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto font-sans">
            Casualties safely stabilized and transferred to trauma care. Scene cleared by police and fire tenders. All telemetry and audio recordings archived under DPDP audit regulations.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('mission-control')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-emerald-950"
            >
              RETURN TO MISSION CONTROL
            </button>
          </div>
        </div>
      )}

      {/* Map Area: Tactical Response Grid with 🔴 Incident, 🔵 Ambulance, 🟠 Fire, 🟣 Police */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-bold uppercase">LIVE TACTICAL MAP AREA</span>
            <span className="text-cyan-400">FPS: 60 • GPS MESH ACTIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">GRID REF: ANNA-SALAI-SEC4</span>
          </div>
        </div>

        {/* Tactical Canvas Display */}
        <div className="relative w-full aspect-video sm:aspect-[16/9] max-h-[500px] rounded-xl bg-[#030611] border border-cyan-950 overflow-hidden flex items-center justify-center select-none shadow-inner">
          {/* Map Vector Grid & Streets */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid Lines */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0e233d" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Simulated Road Arteries */}
            <path d="M 5 50 Q 30 47 52 48 T 95 53" fill="none" stroke="#1e293b" strokeWidth="3" />
            <path d="M 5 50 Q 30 47 52 48 T 95 53" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.4" />

            <path d="M 50 5 Q 52 30 52 48 T 50 95" fill="none" stroke="#1e293b" strokeWidth="3" />
            <path d="M 50 5 Q 52 30 52 48 T 50 95" fill="none" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.4" />

            <path d="M 20 85 L 80 15" fill="none" stroke="#172554" strokeWidth="1.5" opacity="0.6" />

            {/* Dynamic Transit Trails to Epicenter */}
            <line x1={ambPos.x} y1={ambPos.y} x2={targetX} y2={targetY} stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" opacity="0.7" />
            <line x1={firePos.x} y1={firePos.y} x2={targetX} y2={targetY} stroke="#fb923c" strokeWidth="0.8" strokeDasharray="1 1" opacity="0.7" />
            <line x1={pcrPos.x} y1={pcrPos.y} x2={targetX} y2={targetY} stroke="#c084fc" strokeWidth="0.8" strokeDasharray="1 1" opacity="0.7" />
          </svg>

          {/* 🔴 Incident Epicenter */}
          <div
            style={{ left: `${targetX}%`, top: `${targetY}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30"
          >
            <span className="relative flex h-10 w-10 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-600 border-2 border-white items-center justify-center shadow-xl shadow-rose-950">
                <AlertTriangle className="w-3.5 h-3.5 text-white" />
              </span>
            </span>
            <div className="bg-red-950/95 border border-red-500 text-red-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap mt-1">
              🔴 Incident #{incident.id} ({incident.location})
            </div>
          </div>

          {/* 🔵 Ambulance (AMB-07) */}
          <div
            style={{ left: `${ambPos.x}%`, top: `${ambPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-950">
              <Ambulance className="w-4 h-4" />
            </div>
            <div className="bg-cyan-950/90 border border-cyan-700 text-cyan-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded mt-0.5 whitespace-nowrap">
              🔵 AMB-07 {isArrived ? 'ARRIVED' : 'EN ROUTE'}
            </div>
          </div>

          {/* 🟠 Fire (FIRE-03) */}
          <div
            style={{ left: `${firePos.x}%`, top: `${firePos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-orange-950 border-2 border-orange-400 flex items-center justify-center text-orange-300 shadow-lg shadow-orange-950">
              <Flame className="w-4 h-4" />
            </div>
            <div className="bg-orange-950/90 border border-orange-700 text-orange-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded mt-0.5 whitespace-nowrap">
              🟠 FIRE-03 {isArrived ? 'ARRIVED' : 'EN ROUTE'}
            </div>
          </div>

          {/* 🟣 Police (PCR-04) */}
          <div
            style={{ left: `${pcrPos.x}%`, top: `${pcrPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-300"
          >
            <div className="w-7 h-7 rounded-full bg-purple-950 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-950">
              <Shield className="w-4 h-4" />
            </div>
            <div className="bg-purple-950/90 border border-purple-700 text-purple-300 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded mt-0.5 whitespace-nowrap">
              🟣 PCR-04 {isArrived ? 'ARRIVED' : 'DISPATCHED'}
            </div>
          </div>

          {/* HUD Map Controls Legend */}
          <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-xs p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1">
            <div className="text-cyan-400 font-bold">TACTICAL VECTOR MESH</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>🔴 Incident Epicenter</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>🔵 Ambulance Unit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>🟠 Fire & Rescue Tender</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>🟣 Police Patrol PCR</span>
            </div>
          </div>
        </div>

        {/* Real-Time Telemetry Cards required by Prompt:
            AMB-07 EN ROUTE ETA 6 MIN
            FIRE-03 EN ROUTE ETA 8 MIN
            PCR-04 DISPATCHED ETA 4 MIN
        */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* AMB-07 */}
          <div className="p-3.5 rounded-xl border border-cyan-500/40 bg-cyan-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/60 text-cyan-300 flex items-center justify-center">
                <Ambulance className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono font-bold text-white text-xs block">AMB-07</span>
                <span className="text-[11px] font-mono text-cyan-300">
                  {isArrived ? 'ARRIVED (ON SCENE)' : 'EN ROUTE'}
                </span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block">ETA</span>
              <span className="text-xs font-bold text-cyan-400">{isArrived ? '0 MIN' : '6 MIN'}</span>
            </div>
          </div>

          {/* FIRE-03 */}
          <div className="p-3.5 rounded-xl border border-orange-500/40 bg-orange-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-900/60 text-orange-300 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono font-bold text-white text-xs block">FIRE-03</span>
                <span className="text-[11px] font-mono text-orange-300">
                  {isArrived ? 'ARRIVED (ON SCENE)' : 'EN ROUTE'}
                </span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block">ETA</span>
              <span className="text-xs font-bold text-orange-400">{isArrived ? '0 MIN' : '8 MIN'}</span>
            </div>
          </div>

          {/* PCR-04 */}
          <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-950/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-900/60 text-purple-300 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono font-bold text-white text-xs block">PCR-04</span>
                <span className="text-[11px] font-mono text-purple-300">
                  {isArrived ? 'ARRIVED (ON SCENE)' : 'DISPATCHED'}
                </span>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 block">ETA</span>
              <span className="text-xs font-bold text-purple-400">{isArrived ? '0 MIN' : '4 MIN'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons:
            SIMULATE ARRIVAL
            RESOLVE INCIDENT
        */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
          <button
            id="simulate-arrival-btn"
            onClick={() => simulateRespondersArrival(incident.id)}
            disabled={isArrived}
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-cyan-950 active:scale-95"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{isArrived ? 'UNITS ARRIVED ON SCENE' : 'SIMULATE ARRIVAL'}</span>
          </button>

          <button
            id="resolve-incident-btn"
            onClick={() => resolveIncident(incident.id)}
            disabled={isResolved}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-emerald-950 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isResolved ? 'INCIDENT RESOLVED' : 'RESOLVE INCIDENT'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
