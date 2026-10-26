import React, { useEffect } from 'react';
import { EmergencyProvider, useEmergency } from './context/EmergencyContext';
import { Header } from './components/Header';
import { GuidedDemoBanner } from './components/GuidedDemoBanner';
import { Toasts } from './components/Toasts';
import { MissionControlView } from './components/MissionControl/MissionControlView';
import { VoiceEmergencyView } from './components/VoiceEmergency/VoiceEmergencyView';
import { AdaptiveTriageView } from './components/Triage/AdaptiveTriageView';
import { ResponsePlanView } from './components/Dispatch/ResponsePlanView';
import { LiveTrackingView } from './components/Tracking/LiveTrackingView';
import { ResponderDashboardView } from './components/Responder/ResponderDashboardView';
import { DataInsightsView } from './components/Insights/DataInsightsView';
import { PrivacyDpdpView } from './components/Privacy/PrivacyDpdpView';
import { ViewRoute } from './types/emergency';
import { Shield, Radio, Activity, Cpu, AlertTriangle, HeartHandshake } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, setCurrentView, setActiveIncidentId } = useEmergency();

  // Sync hash with view for browser history/direct navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const parts = hash.split('/');
      const route = parts[0] as ViewRoute;
      const id = parts[1];

      const validRoutes: ViewRoute[] = [
        'mission-control',
        'voice-report',
        'triage',
        'dispatch',
        'tracking',
        'responder',
        'insights',
        'privacy',
      ];

      if (validRoutes.includes(route)) {
        setCurrentView(route);
        if (id) {
          setActiveIncidentId(id);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentView, setActiveIncidentId]);

  // Update hash when currentView changes
  useEffect(() => {
    if (window.location.hash !== `#/${currentView}`) {
      window.location.hash = `#/${currentView}`;
    }
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Tactical Top Bar & Navigation */}
      <Header />

      {/* 16-Step Guided Interactive Banner */}
      <GuidedDemoBanner />

      {/* Toast Notification Container */}
      <Toasts />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentView === 'mission-control' && <MissionControlView />}
        {currentView === 'voice-report' && <VoiceEmergencyView />}
        {currentView === 'triage' && <AdaptiveTriageView />}
        {currentView === 'dispatch' && <ResponsePlanView />}
        {currentView === 'tracking' && <LiveTrackingView />}
        {currentView === 'responder' && <ResponderDashboardView />}
        {currentView === 'insights' && <DataInsightsView />}
        {currentView === 'privacy' && <PrivacyDpdpView />}
      </main>

      {/* Tactical Footer */}
      <footer className="border-t border-slate-900 bg-[#03060c] py-6 px-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-bold">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>SAFESIGHT AI • Unified Intelligent Emergency Response</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xl">
              "Detect. Understand. Respond." — Edge AI Incident Triage, Voice Extraction & Adaptive CAD Optimization.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-[11px]">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>HACKATHON DEMONSTRATION PROTOTYPE</span>
            </div>
            <p className="text-slate-500">
              Not connected to real 911 / 112 services • All telemetry is simulated in local browser state.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <EmergencyProvider>
      <MainLayout />
    </EmergencyProvider>
  );
}
