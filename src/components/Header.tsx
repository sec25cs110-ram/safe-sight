import React from 'react';
import {
  ShieldAlert,
  Radio,
  Mic,
  Activity,
  BarChart3,
  Lock,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Cpu,
} from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { ViewRoute } from '../types/emergency';

export const Header: React.FC = () => {
  const {
    currentView,
    navigateTo,
    audioEnabled,
    setAudioEnabled,
    resetAllData,
    startFullDemo,
    isDemoRunning,
  } = useEmergency();

  const navItems: Array<{ id: ViewRoute; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'mission-control', label: 'Mission Control', icon: Activity },
    { id: 'voice-report', label: 'Voice Emergency', icon: Mic },
    { id: 'responder', label: 'Responder Dashboard', icon: Radio },
    { id: 'insights', label: 'Data Insights', icon: BarChart3 },
    { id: 'privacy', label: 'Privacy & DPDP', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#060a12]/95 backdrop-blur-md">
      {/* Top Status Ticker Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 text-[11px] font-mono tracking-wider border-b border-slate-800/50 bg-[#04070d]">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SAFESIGHT AI EDGE MESH
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">
            NODE STATUS: <span className="text-emerald-400 font-medium">OPTIMAL</span>
          </span>
          <span className="text-slate-600 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">
            INFERENCE: <span className="text-cyan-400 font-medium">SUB-10S TRIAGE ACTIVE</span>
          </span>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <span className="text-cyan-400/80 hidden lg:flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            YOLOv8 & WHISPER-TINY ON-DEVICE
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs shrink-0 pl-2">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <span>City Emergency Dispatcher</span>
            <span className="text-emerald-400 font-medium">• Online & Secure</span>
          </div>

          <span className="px-2 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 font-mono text-[10px] uppercase font-bold tracking-widest">
            DEMO MODE
          </span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div
          id="header-brand"
          onClick={() => navigateTo('mission-control')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-800 border border-cyan-400/40 shadow-lg shadow-cyan-950/40 transition-transform group-hover:scale-105">
            <ShieldAlert className="w-5 h-5 text-cyan-200 animate-pulse" />
            <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/20 blur-sm -z-10 group-hover:bg-cyan-400/30 transition-all"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white font-mono">
                SAFE SIGHT <span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950/80 border border-blue-700/60 text-blue-300 font-mono">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide">
              Unified Intelligent Emergency Response <span className="text-slate-600">|</span> <span className="text-cyan-300/80 italic font-mono text-[10px]">Detect. Understand. Respond.</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Main Nav Tabs */}
          <nav className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => navigateTo(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-900/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Guided Demo Button */}
          <button
            id="start-demo-header-btn"
            onClick={startFullDemo}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              isDemoRunning
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                : 'bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/40 hover:to-amber-600/40 border-red-500/40 text-red-200 hover:text-white shadow-sm'
            }`}
            title="Start full 16-step simulated emergency walkthrough"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Interactive Demo</span>
          </button>

          {/* Sound Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-2 rounded-xl border transition-all ${
              audioEnabled
                ? 'bg-slate-900 border-slate-700 text-cyan-400 hover:bg-slate-800'
                : 'bg-slate-950 border-slate-800 text-slate-500 hover:bg-slate-900'
            }`}
            title={audioEnabled ? 'Audio Effects Enabled' : 'Audio Effects Muted'}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reset State */}
          <button
            id="reset-data-btn"
            onClick={resetAllData}
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-rose-400 hover:border-rose-800/60 transition-all"
            title="Reset to default incident scenarios"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
