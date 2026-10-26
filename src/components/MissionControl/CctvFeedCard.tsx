import React, { useState, useEffect } from 'react';
import { CCTVFeed } from '../../data/initialData';
import { useEmergency } from '../../context/EmergencyContext';
import { Video, ShieldAlert, Cpu, Maximize2, AlertCircle } from 'lucide-react';

interface CctvFeedCardProps {
  feed: CCTVFeed;
  isActiveSelection: boolean;
  onSelect: () => void;
}

export const CctvFeedCard: React.FC<CctvFeedCardProps> = ({ feed, isActiveSelection, onSelect }) => {
  const { triggerCctvDetection, activeIncident } = useEmergency();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeString(now.toISOString().replace('T', ' ').substring(0, 19));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDetectingOnThisCam = feed.id === 'cam-1' || feed.status === 'ACTIVE_DETECTION';

  return (
    <div
      id={`cctv-card-${feed.id}`}
      onClick={onSelect}
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
        isActiveSelection
          ? 'border-cyan-500/70 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/40'
          : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
      }`}
    >
      {/* Top Header info */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          <span className="font-bold text-slate-200 font-mono tracking-wide text-[11px]">{feed.name}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span className="text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/50">
            {feed.model}
          </span>
          <span>{feed.fps} FPS</span>
        </div>
      </div>

      {/* Simulated Surveillance Feed Viewport */}
      <div className="relative aspect-video w-full bg-[#02050b] overflow-hidden select-none">
        {/* Animated Scanlines / Noise simulation */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none z-10"></div>
        <div className="absolute inset-0 bg-radial from-transparent via-[#020610]/40 to-[#020610]/90 pointer-events-none z-10"></div>

        {/* Video simulation graphic using SVG */}
        <svg className="w-full h-full" viewBox="0 0 320 180" preserveAspectRatio="none">
          {/* Road / Urban backdrop wireframe */}
          <rect width="320" height="180" fill="#070d18" />
          <path d="M 0 140 L 320 140" stroke="#172554" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 160 0 L 160 180" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
          <path d="M 0 110 L 320 110" stroke="#0f172a" strokeWidth="1" />
          <path d="M 40 180 L 120 110 L 200 110 L 280 180" stroke="#1e293b" strokeWidth="1.5" fill="none" />

          {/* Feed Specific Simulation details */}
          {feed.id === 'cam-1' && (
            <g className="animate-pulse">
              {/* Collision scene */}
              <rect x="110" y="85" width="70" height="42" rx="4" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="112" y="80" fill="#ef4444" fontSize="8" fontFamily="monospace" fontWeight="bold">
                [COLLISION 94.2%]
              </text>

              {/* Stalled bike */}
              <circle cx="125" cy="115" r="8" fill="none" stroke="#f87171" strokeWidth="1.5" />
              <circle cx="150" cy="115" r="8" fill="none" stroke="#f87171" strokeWidth="1.5" />
              <line x1="125" y1="115" x2="150" y2="115" stroke="#f87171" strokeWidth="2" />

              {/* Unconscious rider bounding box */}
              <rect x="165" y="105" width="35" height="18" fill="#e11d48" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="1.2" />
              <text x="167" y="102" fill="#f43f5e" fontSize="7" fontFamily="monospace">
                person_prone 0.91
              </text>

              {/* Smoke simulation ring */}
              <circle cx="138" cy="98" r="14" fill="#64748b" fillOpacity="0.2" className="animate-ping" />
            </g>
          )}

          {feed.id === 'cam-2' && (
            <g>
              {/* Flyover pedestrians */}
              <rect x="60" y="80" width="35" height="45" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" />
              <text x="62" y="76" fill="#60a5fa" fontSize="7" fontFamily="monospace">
                pedestrian 0.92
              </text>
              <rect x="180" y="82" width="48" height="45" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.2" />
              <text x="182" y="78" fill="#fbbf24" fontSize="7" fontFamily="monospace">
                altercation 0.88
              </text>
            </g>
          )}

          {feed.id === 'cam-3' && (
            <g>
              {/* Metro Concourse */}
              <rect x="130" y="70" width="60" height="60" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
              <text x="132" y="66" fill="#34d399" fontSize="7" fontFamily="monospace">
                routine_flow 0.96
              </text>
              <circle cx="160" cy="100" r="5" fill="#10b981" opacity="0.6" />
            </g>
          )}

          {/* Crosshairs & HUD elements */}
          <line x1="15" y1="90" x2="35" y2="90" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          <line x1="285" y1="90" x2="305" y2="90" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          <line x1="160" y1="15" x2="160" y2="35" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
          <line x1="160" y1="145" x2="160" y2="165" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
        </svg>

        {/* HUD Overlay Elements */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-white">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span className="font-bold text-red-400">REC</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300 font-semibold">{feed.resolution}</span>
        </div>

        <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
          {timeString || '2026-09-16 10:42:00'}
        </div>

        <div className="absolute bottom-2 left-2 z-20 text-[10px] font-mono text-slate-300 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded flex items-center gap-1.5">
          <Cpu className="w-3 h-3 text-cyan-400" />
          <span>EDGE YOLOv8-NANO: 14.8ms</span>
        </div>

        {isDetectingOnThisCam && (
          <div className="absolute bottom-2 right-2 z-20 bg-red-600/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded animate-pulse flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            INCIDENT FLAGGED
          </div>
        )}
      </div>

      {/* Footer Details & Action Button */}
      <div className="p-3 bg-slate-900/60 flex items-center justify-between gap-2 border-t border-slate-800/80">
        <div className="min-w-0">
          <p className="text-xs text-slate-300 truncate font-medium">{feed.location}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                feed.status === 'ACTIVE_DETECTION'
                  ? 'bg-red-950 text-red-300 border border-red-800/60'
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
              }`}
            >
              {feed.status === 'ACTIVE_DETECTION' ? 'ACTIVE ANOMALY' : 'NORMAL MONITORING'}
            </span>
            {feed.confidence && (
              <span className="text-[10px] font-mono text-cyan-400">{feed.confidence}% Match</span>
            )}
          </div>
        </div>

        {/* "Detect Here" Button required by prompt */}
        <button
          id={`detect-here-${feed.id}`}
          onClick={(e) => {
            e.stopPropagation();
            triggerCctvDetection(feed.id);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-300 hover:text-white border border-red-500/50 hover:border-red-400 rounded-lg text-xs font-mono font-bold tracking-wide transition-all shrink-0 active:scale-95 shadow-xs"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
          <span>Detect Here</span>
        </button>
      </div>
    </div>
  );
};
