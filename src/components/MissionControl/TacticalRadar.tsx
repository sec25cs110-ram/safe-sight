import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { RADAR_LANDMARKS, CCTV_NODES } from '../../data/initialData';
import { Navigation, Radio, AlertTriangle, Shield, Flame, Ambulance, Hospital, MapPin, Eye } from 'lucide-react';

export const TacticalRadar: React.FC = () => {
  const { activeIncident, incidents } = useEmergency();
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const emergencyCoord = activeIncident?.coordinates || { x: 52, y: 48 };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl flex flex-col h-full">
      {/* Radar Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase">
              GIS TACTICAL DISPATCH RADAR
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Real-time geospatial mesh & multi-agency resource proximity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
            RADAR RANGE: 4.0 KM
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/50 text-amber-300">
            SIMULATED TACTICAL GIS
          </span>
        </div>
      </div>

      {/* Radar Screen & Visual Canvas */}
      <div className="relative w-full aspect-square sm:aspect-[4/3] max-h-[420px] rounded-xl bg-[#030712] border border-cyan-900/30 overflow-hidden flex items-center justify-center select-none shadow-inner">
        {/* Tactical Background Grid & Rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Radial concentric range rings */}
          <circle cx="50" cy="50" r="15" fill="none" stroke="#0e7490" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#0e7490" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.5" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#0e7490" strokeWidth="0.4" opacity="0.6" />

          {/* Coordinate axes */}
          <line x1="50" y1="0" x2="50" y2="100" stroke="#0e7490" strokeWidth="0.25" opacity="0.4" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#0e7490" strokeWidth="0.25" opacity="0.4" />

          {/* Diagonal guides */}
          <line x1="15" y1="15" x2="85" y2="85" stroke="#155e75" strokeWidth="0.15" strokeDasharray="0.5 1" opacity="0.3" />
          <line x1="85" y1="15" x2="15" y2="85" stroke="#155e75" strokeWidth="0.15" strokeDasharray="0.5 1" opacity="0.3" />

          {/* Simulated Street Corridors */}
          <path d="M 10 50 Q 40 46 52 48 T 90 52" fill="none" stroke="#334155" strokeWidth="1.2" opacity="0.6" />
          <path d="M 50 10 Q 52 35 52 48 T 50 90" fill="none" stroke="#334155" strokeWidth="1.2" opacity="0.6" />
          <path d="M 20 20 L 75 75" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.4" />

          {/* Dispatch Vector lines from responders to incident */}
          {activeIncident && (
            <>
              {/* PCR-04 line */}
              <line x1="42" y1="32" x2={emergencyCoord.x} y2={emergencyCoord.y} stroke="#c084fc" strokeWidth="0.4" strokeDasharray="1 1" />
              {/* AMB-07 line */}
              <line x1="28" y1="72" x2={emergencyCoord.x} y2={emergencyCoord.y} stroke="#38bdf8" strokeWidth="0.4" strokeDasharray="1 1" />
              {/* FIRE-03 line */}
              <line x1="74" y1="25" x2={emergencyCoord.x} y2={emergencyCoord.y} stroke="#fb923c" strokeWidth="0.4" strokeDasharray="1 1" />
            </>
          )}

          {/* Distance markers labels */}
          <text x="52" y="36" fill="#0891b2" fontSize="2" fontFamily="monospace">1.0 KM</text>
          <text x="52" y="21" fill="#0891b2" fontSize="2" fontFamily="monospace">2.0 KM</text>
          <text x="52" y="6" fill="#0891b2" fontSize="2" fontFamily="monospace">3.0 KM</text>
        </svg>

        {/* Radar Sweeping Beam (CSS animated conic sweep) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(6, 182, 212, 0.45) 0deg, transparent 65deg, transparent 360deg)',
            animation: 'spin 5s linear infinite',
          }}
        />

        {/* Landmarks (Hospital, Police Station) */}
        {RADAR_LANDMARKS.map((lm, idx) => (
          <div
            key={idx}
            style={{ left: `${lm.x}%`, top: `${lm.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
            onClick={() => setSelectedEntity(`${lm.name} — Distance: ${lm.distance}`)}
          >
            <div className="w-5 h-5 rounded-md bg-slate-900/90 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors shadow-sm">
              {lm.type === 'hospital' ? (
                <Hospital className="w-3 h-3 text-rose-400" />
              ) : lm.type === 'fire_station' ? (
                <Flame className="w-3 h-3 text-orange-400" />
              ) : (
                <Shield className="w-3 h-3 text-blue-400" />
              )}
            </div>
            <span className="hidden group-hover:block absolute top-6 bg-slate-900/95 border border-slate-700 px-2 py-0.5 rounded text-[9px] font-mono text-slate-200 whitespace-nowrap shadow-lg z-30">
              {lm.name} ({lm.distance})
            </span>
          </div>
        ))}

        {/* CCTV Camera locations */}
        {CCTV_NODES.map((cam) => (
          <div
            key={cam.id}
            style={{ left: `${cam.cameraCoords.x}%`, top: `${cam.cameraCoords.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
            onClick={() => setSelectedEntity(`CCTV Node: ${cam.name} (${cam.location})`)}
          >
            <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/80 flex items-center justify-center text-cyan-300 shadow-sm shadow-cyan-950">
              <Eye className="w-2.5 h-2.5" />
            </div>
            <span className="text-[8px] font-mono text-cyan-300/80 mt-0.5">{cam.id.toUpperCase()}</span>
          </div>
        ))}

        {/* Responders Units on Radar */}
        {/* AMB-07 */}
        <div
          style={{ left: '28%', top: '72%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
          onClick={() => setSelectedEntity('AMB-07 (Alpha Ambulance) — 2.3 km, ETA: 6 min')}
        >
          <div className="w-6 h-6 rounded-full bg-cyan-950/90 border border-cyan-400 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-900/50 group-hover:scale-110 transition-transform">
            <Ambulance className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <span className="text-[9px] font-mono text-cyan-300 bg-black/70 px-1 rounded mt-0.5 font-bold">
            AMB-07
          </span>
        </div>

        {/* FIRE-03 */}
        <div
          style={{ left: '74%', top: '25%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
          onClick={() => setSelectedEntity('FIRE-03 (Bravo Rescue Tender) — 3.1 km, ETA: 8 min')}
        >
          <div className="w-6 h-6 rounded-full bg-orange-950/90 border border-orange-400 flex items-center justify-center text-orange-300 shadow-md shadow-orange-900/50 group-hover:scale-110 transition-transform">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <span className="text-[9px] font-mono text-orange-300 bg-black/70 px-1 rounded mt-0.5 font-bold">
            FIRE-03
          </span>
        </div>

        {/* PCR-04 */}
        <div
          style={{ left: '42%', top: '32%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-20"
          onClick={() => setSelectedEntity('Police Beat PCR #4 — 1.2 km, ETA: 4 min')}
        >
          <div className="w-6 h-6 rounded-full bg-purple-950/90 border border-purple-400 flex items-center justify-center text-purple-300 shadow-md shadow-purple-900/50 group-hover:scale-110 transition-transform">
            <Shield className="w-3.5 h-3.5 text-purple-300" />
          </div>
          <span className="text-[9px] font-mono text-purple-300 bg-black/70 px-1 rounded mt-0.5 font-bold">
            PCR-04
          </span>
        </div>

        {/* EMERGENCY INCIDENT MARKER (Primary 🔴) */}
        {activeIncident && (
          <div
            style={{ left: `${emergencyCoord.x}%`, top: `${emergencyCoord.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-30 group"
            onClick={() => setSelectedEntity(`CRITICAL INCIDENT #${activeIncident.id}: ${activeIncident.type} (${activeIncident.location})`)}
          >
            <span className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-rose-600 border-2 border-white items-center justify-center shadow-lg shadow-rose-950">
                <AlertTriangle className="w-3 h-3 text-white" />
              </span>
            </span>
            <div className="bg-red-950/90 border border-red-500 text-red-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
              <span>{activeIncident.id} : {activeIncident.location}</span>
            </div>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-2 left-2 z-20 bg-black/80 backdrop-blur-xs p-2 rounded-lg border border-slate-800 text-[9px] font-mono text-slate-300 flex flex-col gap-1 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span>Emergency Epicenter</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>Police Unit (PCR)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Ambulance (ALS)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            <span>Fire & Rescue</span>
          </div>
        </div>

        {/* Compass Rose */}
        <div className="absolute top-2 right-2 z-20 bg-black/60 border border-slate-800 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold">
          N
        </div>
      </div>

      {/* Required Prominent Distance Badges per Section 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 text-xs">
        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-800/40 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-900/60 text-purple-300">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-purple-300/80 font-mono font-semibold">PATROL RADIUS</div>
            <div className="font-bold text-slate-100 text-xs">Police Beat PCR #4 — 1.2 km</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-900/60 text-blue-300">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-blue-300/80 font-mono font-semibold">HQ JURISDICTION</div>
            <div className="font-bold text-slate-100 text-xs">Nearest Police Station — 1.2 km</div>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-800/40 flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-rose-900/60 text-rose-300">
            <Hospital className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-rose-300/80 font-mono font-semibold">LEVEL 1 TRAUMA</div>
            <div className="font-bold text-slate-100 text-xs">Nearest Trauma Hospital — 2.1 km</div>
          </div>
        </div>
      </div>

      {/* Selected Entity Inspector Banner */}
      {selectedEntity && (
        <div className="mt-2 p-2 bg-slate-900/90 border border-cyan-500/40 rounded-lg text-xs font-mono text-cyan-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{selectedEntity}</span>
          </div>
          <button
            onClick={() => setSelectedEntity(null)}
            className="text-slate-400 hover:text-white text-[10px] underline ml-2"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
