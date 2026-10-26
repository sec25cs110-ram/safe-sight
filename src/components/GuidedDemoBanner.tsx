import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { Sparkles, ChevronRight, X, Play, RotateCcw } from 'lucide-react';

const STEP_DESCRIPTIONS = [
  { step: 1, title: 'Step 1: CCTV Collision Detection', desc: 'Edge YOLOv8 model flags collision on Anna Salai Crossway.', route: 'mission-control' },
  { step: 2, title: 'Step 2: Emergency Triage Feed', desc: 'Incident appears in Mission Control Triage Feed.', route: 'mission-control' },
  { step: 3, title: 'Step 3: Open AI Triage', desc: 'Click "REVIEW EVIDENCE & TRIAGE" to enter automated interview.', route: 'triage' },
  { step: 4, title: 'Step 4: AI Extracted Data', desc: 'Review extracted metrics: 3 Victims, 1 Unconscious, Road Collision.', route: 'triage' },
  { step: 5, title: 'Step 5: Question 1: Trapped?', desc: 'AI queries: "Is anyone trapped inside the vehicle?"', route: 'triage' },
  { step: 6, title: 'Step 6: User Confirms Entrapment', desc: 'Select: "YES — SOMEONE IS TRAPPED" (or use voice).', route: 'triage' },
  { step: 7, title: 'Step 7: Question 2: Smoke/Fire?', desc: 'AI queries: "Is there any fire, smoke, or fuel leakage?"', route: 'triage' },
  { step: 8, title: 'Step 8: User Confirms Smoke', desc: 'Select: "SMOKE DETECTED".', route: 'triage' },
  { step: 9, title: 'Step 9: Escalated to CRITICAL', desc: 'Triage complete. Severity upgraded to CRITICAL with hazards.', route: 'triage' },
  { step: 10, title: 'Step 10: AI Resource Matrix', desc: 'AI recommends: 2 Ambulances, 1 Fire Tender, 1 Police PCR, Trauma Hospital Alert.', route: 'dispatch' },
  { step: 11, title: 'Step 11: Dispatch All', desc: 'Click "DISPATCH ALL" to alert responder fleet simultaneously.', route: 'dispatch' },
  { step: 12, title: 'Step 12: Responders En Route', desc: 'Units transition to EN ROUTE status with real-time ETAs.', route: 'dispatch' },
  { step: 13, title: 'Step 13: Live Radar Tracking', desc: 'Open Live Response Tracking tactical view.', route: 'tracking' },
  { step: 14, title: 'Step 14: Simulate Arrival', desc: 'Click "SIMULATE ARRIVAL" to advance responder units to the scene.', route: 'tracking' },
  { step: 15, title: 'Step 15: Resolve Incident', desc: 'Click "RESOLVE INCIDENT" once scene is safe and evacuated.', route: 'tracking' },
  { step: 16, title: 'Step 16: ✓ Incident Resolved', desc: 'Mission closed, audit logged for DPDP compliance.', route: 'tracking' },
];

export const GuidedDemoBanner: React.FC = () => {
  const {
    isDemoRunning,
    demoStep,
    nextDemoStep,
    cancelDemo,
    navigateTo,
    startFullDemo,
    answerTriageQuestion,
    dispatchAllResponders,
    simulateRespondersArrival,
    resolveIncident,
    activeIncidentId,
  } = useEmergency();

  if (!isDemoRunning) return null;

  const currentStepInfo = STEP_DESCRIPTIONS.find((s) => s.step === demoStep) || STEP_DESCRIPTIONS[0];

  const handleExecuteNextStep = () => {
    // Automatically trigger the action for this step if user clicks "Auto Advance"
    switch (demoStep) {
      case 1:
      case 2:
        navigateTo('triage', activeIncidentId);
        nextDemoStep();
        break;
      case 3:
      case 4:
      case 5:
        // Trapped question
        answerTriageQuestion(activeIncidentId, 'trapped', 'Yes, someone is trapped');
        nextDemoStep();
        break;
      case 6:
      case 7:
        // Smoke question
        answerTriageQuestion(activeIncidentId, 'fireSmoke', 'Smoke detected');
        nextDemoStep();
        break;
      case 8:
      case 9:
        navigateTo('dispatch', activeIncidentId);
        nextDemoStep();
        break;
      case 10:
      case 11:
        dispatchAllResponders(activeIncidentId);
        nextDemoStep();
        break;
      case 12:
        navigateTo('tracking', activeIncidentId);
        nextDemoStep();
        break;
      case 13:
      case 14:
        simulateRespondersArrival(activeIncidentId);
        nextDemoStep();
        break;
      case 15:
        resolveIncident(activeIncidentId);
        nextDemoStep();
        break;
      case 16:
        navigateTo('mission-control');
        cancelDemo();
        break;
      default:
        nextDemoStep();
    }
  };

  return (
    <aside aria-label="Guided Walkthrough" className="sticky top-[86px] z-40 bg-gradient-to-r from-red-950/90 via-slate-900/95 to-cyan-950/90 border-b border-red-500/40 backdrop-blur-md px-4 py-2.5 shadow-xl shadow-black/60">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600/30 border border-red-500 text-red-300 font-bold text-xs font-mono shrink-0 animate-pulse">
            {demoStep}/16
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-300 font-mono flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {currentStepInfo.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Guided Flow
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans mt-0.5">{currentStepInfo.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="demo-advance-btn"
            onClick={handleExecuteNextStep}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold font-mono tracking-wide shadow-md shadow-red-950 transition-all active:scale-95"
          >
            {demoStep >= 16 ? (
              <>Finish Demo</>
            ) : (
              <>
                <span>Auto-Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

          <button
            id="demo-restart-btn"
            onClick={startFullDemo}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            title="Restart demo from Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            id="demo-close-btn"
            onClick={cancelDemo}
            className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
            title="Exit guided tour"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
