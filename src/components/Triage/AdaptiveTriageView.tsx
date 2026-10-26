import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  HelpCircle,
  Mic,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Volume2,
  Cpu,
  UserX,
  Sparkles,
  Info,
} from 'lucide-react';
import { speakPrompt, playClickBeep } from '../../utils/audio';

export const AdaptiveTriageView: React.FC = () => {
  const {
    activeIncident,
    answerTriageQuestion,
    navigateTo,
    audioEnabled,
    addToast,
  } = useEmergency();

  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [currentActiveQuestion, setCurrentActiveQuestion] = useState<1 | 2>(
    activeIncident?.trapped !== 'Unknown' ? 2 : 1
  );

  const incident = activeIncident;

  if (!incident) {
    return (
      <div className="text-center p-12 text-slate-400 font-mono">
        No incident selected. Please return to Mission Control.
      </div>
    );
  }

  const isQuestion1Answered = incident.trapped !== 'Unknown';
  const isQuestion2Answered = incident.fireSmoke !== 'Unknown';
  const isTriageComplete = isQuestion1Answered && isQuestion2Answered;

  const handleVoiceAnswer = (qIndex: 1 | 2) => {
    setIsVoiceListening(true);
    playClickBeep(audioEnabled);
    addToast('Listening for Voice Answer', 'Speak your answer or click a quick-response option.', 'info');

    // Simulate voice answering after brief pause if real speech is not spoken
    setTimeout(() => {
      setIsVoiceListening(false);
      if (qIndex === 1) {
        answerTriageQuestion(incident.id, 'trapped', 'Yes, someone is trapped inside');
        setCurrentActiveQuestion(2);
      } else {
        answerTriageQuestion(incident.id, 'fireSmoke', 'Smoke detected near vehicle');
      }
    }, 1200);
  };

  const handleReadQuestion = (text: string) => {
    speakPrompt(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
                <ShieldAlert className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                AI EMERGENCY TRIAGE
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Adaptive questioning engine • Pinpoints missing critical safety parameters in seconds
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
              INCIDENT: <strong className="text-cyan-400">{incident.id}</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-red-950 border border-red-800 text-red-300 font-bold">
              {incident.severity}
            </span>
          </div>
        </div>

        {/* Live Extracted Baseline Banner */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">Type</span>
            <span className="font-bold text-white">{incident.type}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Location</span>
            <span className="font-bold text-cyan-300">{incident.location}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Victims Reported</span>
            <span className="font-bold text-white">{incident.victims} (Unconscious: {incident.unconscious})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Triage Completeness</span>
            <span className={`font-bold ${isTriageComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isTriageComplete ? '100% Complete' : isQuestion1Answered ? '50% In Progress' : 'Initial Phase'}
            </span>
          </div>
        </div>
      </div>

      {/* Adaptive Questions Flow Container */}
      <div className="space-y-4">
        {/* QUESTION 1 */}
        <div
          id="triage-question-1"
          className={`rounded-2xl border transition-all duration-300 p-6 ${
            !isQuestion1Answered
              ? 'border-cyan-500/70 bg-gradient-to-b from-slate-950 to-slate-900 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
              : 'border-slate-800 bg-slate-950/60 opacity-90'
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-700/80 text-cyan-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                Q1
              </span>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase block">
                  CRITICAL ENTRAPMENT VERIFICATION
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  "Is anyone trapped inside the vehicle?"
                </h3>
              </div>
            </div>

            <button
              onClick={() => handleReadQuestion('Is anyone trapped inside the vehicle?')}
              className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
              title="Listen to question"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          {!isQuestion1Answered ? (
            <div className="space-y-4 pt-2">
              {/* Voice Answer button */}
              <div className="flex items-center gap-3">
                <button
                  id="voice-answer-q1-btn"
                  onClick={() => handleVoiceAnswer(1)}
                  disabled={isVoiceListening}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-md transition-all active:scale-95"
                >
                  <Mic className="w-4 h-4" />
                  <span>{isVoiceListening ? 'LISTENING TO ANSWER...' : 'ANSWER USING VOICE'}</span>
                </button>
                <span className="text-xs text-slate-500 font-mono hidden sm:inline">OR SELECT DEMO BUTTONS:</span>
              </div>

              {/* Demo Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="btn-trapped-yes"
                  onClick={() => {
                    answerTriageQuestion(incident.id, 'trapped', 'Yes, someone is trapped');
                    setCurrentActiveQuestion(2);
                  }}
                  className="p-4 rounded-xl border border-red-500/60 bg-red-950/30 hover:bg-red-950/60 text-red-200 text-left transition-all group active:scale-[0.98] shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wide group-hover:text-white">
                      YES — SOMEONE IS TRAPPED
                    </span>
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    Victim pinned by compressed dashboard/chassis. Heavy rescue extrication required.
                  </p>
                </button>

                <button
                  id="btn-trapped-no"
                  onClick={() => {
                    answerTriageQuestion(incident.id, 'trapped', 'No one is trapped');
                    setCurrentActiveQuestion(2);
                  }}
                  className="p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-left transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wide">
                      NO ONE IS TRAPPED
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    All occupants are outside vehicle or easily accessible.
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Response Logged:</span>
              <span className="font-bold text-red-400">
                Trapped: {incident.trapped} {incident.trapped === 1 ? '(Extrication Required)' : '(None)'}
              </span>
            </div>
          )}
        </div>

        {/* QUESTION 2 */}
        {(isQuestion1Answered || currentActiveQuestion === 2) && (
          <div
            id="triage-question-2"
            className={`rounded-2xl border transition-all duration-300 p-6 ${
              !isQuestion2Answered
                ? 'border-red-500/70 bg-gradient-to-b from-slate-950 to-slate-900 shadow-xl shadow-red-950/40 ring-1 ring-red-500/30'
                : 'border-slate-800 bg-slate-950/60 opacity-90'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-red-950 border border-red-700/80 text-red-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  Q2
                </span>
                <div>
                  <span className="text-[11px] font-mono text-amber-400 tracking-wider uppercase block">
                    FIRE & HAZARDOUS VAPOR DETECTION
                  </span>
                  <h3 className="text-lg font-bold text-white font-sans">
                    "Is there any fire, smoke, or fuel leakage?"
                  </h3>
                </div>
              </div>

              <button
                onClick={() => handleReadQuestion('Is there any fire, smoke, or fuel leakage?')}
                className="p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Listen to question"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {!isQuestion2Answered ? (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    id="voice-answer-q2-btn"
                    onClick={() => handleVoiceAnswer(2)}
                    disabled={isVoiceListening}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white rounded-xl text-xs font-mono font-bold tracking-wider uppercase shadow-md transition-all active:scale-95"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isVoiceListening ? 'LISTENING TO ANSWER...' : 'ANSWER USING VOICE'}</span>
                  </button>
                  <span className="text-xs text-slate-500 font-mono hidden sm:inline">OR SELECT DEMO BUTTONS:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    id="btn-smoke-detected"
                    onClick={() => answerTriageQuestion(incident.id, 'fireSmoke', 'Smoke detected')}
                    className="p-4 rounded-xl border border-amber-500/60 bg-amber-950/30 hover:bg-amber-950/60 text-amber-200 text-left transition-all group active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wide group-hover:text-white">
                        SMOKE DETECTED
                      </span>
                      <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      Visible plume or pungent vapor from engine bay. Immediate flame tender needed.
                    </p>
                  </button>

                  <button
                    id="btn-no-smoke"
                    onClick={() => answerTriageQuestion(incident.id, 'fireSmoke', 'No fire or smoke')}
                    className="p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-left transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wide">
                        NO FIRE OR SMOKE
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      No thermal ignition signs, dry asphalt around fuel cells.
                    </p>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Response Logged:</span>
                <span className="font-bold text-amber-400">
                  Fire/Smoke: {incident.fireSmoke}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TRIAGE COMPLETE SECTION */}
      {isTriageComplete && (
        <div className="rounded-2xl border border-emerald-500/60 bg-slate-950/95 p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold font-mono text-white tracking-wide uppercase">
                  TRIAGE COMPLETE
                </h3>
                <p className="text-xs text-slate-400">Parameter vector finalized • Optimal agency units calculated</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-red-950 border border-red-600 text-red-300 font-mono text-xs font-bold">
              SEVERITY: CRITICAL
            </span>
          </div>

          {/* Prompt specified checklist:
              Road Accident
              3 Victims
              1 Unconscious
              1 Trapped
              Smoke Detected
              Severity: CRITICAL
          */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Classification</span>
              <span className="font-bold text-slate-100 text-xs mt-0.5 block">{incident.type}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Total Victims</span>
              <span className="font-bold text-slate-100 text-xs mt-0.5 block">{incident.victims} Victims</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Unconscious</span>
              <span className="font-bold text-rose-400 text-xs mt-0.5 block">{incident.unconscious} Unconscious</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Entrapment</span>
              <span className="font-bold text-amber-300 text-xs mt-0.5 block">{incident.trapped} Trapped</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Atmospheric</span>
              <span className="font-bold text-orange-400 text-xs mt-0.5 block">{incident.fireSmoke}</span>
            </div>
          </div>

          {/* Action Button to Response Plan */}
          <div className="flex justify-end pt-2">
            <button
              id="generate-response-plan-btn"
              onClick={() => navigateTo('dispatch', incident.id)}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-red-950 active:scale-95"
            >
              <span>GENERATE RESPONSE PLAN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
