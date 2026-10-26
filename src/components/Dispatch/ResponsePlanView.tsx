import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  ShieldAlert,
  Ambulance,
  Flame,
  Shield,
  Hospital,
  Send,
  ArrowRight,
  Clock,
  Radio,
  MapPin,
  CheckCircle2,
  AlertOctagon,
  Sparkles,
} from 'lucide-react';

export const ResponsePlanView: React.FC = () => {
  const {
    activeIncident,
    dispatchAllResponders,
    navigateTo,
  } = useEmergency();

  const [showDispatchModal, setShowDispatchModal] = useState<boolean>(true);
  const incident = activeIncident;

  if (!incident) {
    return (
      <div className="text-center p-12 text-slate-400 font-mono">
        No incident selected. Please return to Mission Control.
      </div>
    );
  }

  const isDispatched = incident.status === 'Dispatched' || incident.status === 'On Scene' || incident.status === 'Resolved';

  const handleDispatchAll = () => {
    dispatchAllResponders(incident.id);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* SECTION 7: AI RESPONSE PLAN HEADER */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                AI RESPONSE PLAN
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Algorithmic multi-agency force multiplier • Calibrated to incident severity parameters
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-700/60 text-amber-300 font-bold">
              DEMO / SIMULATED RESPONSE
            </span>
          </div>
        </div>

        {/* Display incident: RSQ-1042, Road Accident, Anna Salai Crossway, CRITICAL, 3 Victims, 1 Unconscious, 1 Trapped, Smoke Detected */}
        <div className="mt-5 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">INCIDENT #{incident.id}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono font-black text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                {incident.severity}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">{incident.type}</h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">📍 {incident.location}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-slate-300">
              {incident.victims} Victims
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-rose-300">
              {incident.unconscious} Unconscious
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-amber-300">
              {incident.trapped === 'Unknown' ? '1 Trapped' : `${incident.trapped} Trapped`}
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-orange-300">
              {incident.fireSmoke === 'Unknown' ? 'Smoke Detected' : incident.fireSmoke}
            </span>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDED RESOURCES SECTION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold font-mono tracking-wider text-slate-100 uppercase flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            AI RECOMMENDED RESOURCES
          </h3>
          <span className="text-xs font-mono text-cyan-400">Precision Match Index: 98.7%</span>
        </div>

        {/* 4 Cards strictly matching requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* AMBULANCE X 2 */}
          <div className="p-4 rounded-xl border border-cyan-500/40 bg-cyan-950/20 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-900/60 border border-cyan-500/60 text-cyan-300 flex items-center justify-center shrink-0">
              <Ambulance className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono">🚑 AMBULANCE × 2</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
                  ALS UNITS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                <strong className="text-cyan-300 font-mono">Reason:</strong> Multiple injured victims + unconscious victim requiring advanced hemodynamic life support.
              </p>
            </div>
          </div>

          {/* FIRE & RESCUE X 1 */}
          <div className="p-4 rounded-xl border border-orange-500/40 bg-orange-950/20 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-900/60 border border-orange-500/60 text-orange-300 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono">🚒 FIRE & RESCUE × 1</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950 border border-orange-700 text-orange-300 font-bold">
                  HEAVY RESCUE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                <strong className="text-orange-300 font-mono">Reason:</strong> Vehicle entrapment + smoke mitigation; hydraulic cutters & vapor suppressants required.
              </p>
            </div>
          </div>

          {/* POLICE X 1 */}
          <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/60 text-purple-300 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono">👮 POLICE × 1</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 font-bold">
                  PATROL PCR
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                <strong className="text-purple-300 font-mono">Reason:</strong> Traffic control, green corridor creation, and scene safety perimeter.
              </p>
            </div>
          </div>

          {/* TRAUMA HOSPITAL ALERT */}
          <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-950/20 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-900/60 border border-rose-500/60 text-rose-300 flex items-center justify-center shrink-0">
              <Hospital className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-mono">🏥 TRAUMA HOSPITAL ALERT</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                  CODE RED READY
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                <strong className="text-rose-300 font-mono">Reason:</strong> Critical trauma case alert sent to Central Medical Center Trauma Resuscitation Bay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 8: DISPATCH SCREEN / DISPATCH COMMAND */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              DISPATCH COMMAND
            </h3>
            <p className="text-xs text-slate-400">
              Target Incident: <span className="font-mono text-cyan-300 font-bold">#{incident.id}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              STATUS: <strong className={isDispatched ? 'text-emerald-400' : 'text-amber-400'}>{incident.status}</strong>
            </span>
          </div>
        </div>

        {/* Responders Units List:
            AMB-07 Ambulance 2.3 km ETA: 6 min Available
            FIRE-03 Fire & Rescue 3.1 km ETA: 8 min Available
            PCR-04 Police 1.2 km ETA: 4 min Available
        */}
        <div className="space-y-3">
          {incident.responders.map((resp) => {
            const isRespDispatched = resp.status !== 'Available';
            return (
              <div
                key={resp.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      borderColor: resp.color,
                      backgroundColor: `${resp.color}15`,
                      color: resp.color,
                    }}
                  >
                    {resp.unitType === 'Ambulance' && <Ambulance className="w-5 h-5" />}
                    {resp.unitType === 'Fire & Rescue' && <Flame className="w-5 h-5" />}
                    {resp.unitType === 'Police' && <Shield className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{resp.id}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-300 font-medium">{resp.unitType}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
                      <span>Proximity: <strong className="text-slate-200">{resp.distance}</strong></span>
                      <span>•</span>
                      <span>ETA: <strong className="text-cyan-400">{resp.etaMinutes} min</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-lg font-bold uppercase ${
                      resp.status === 'En Route'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                        : resp.status === 'Dispatched'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : resp.status === 'Arrived' || resp.status === 'On Scene'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {resp.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: DISPATCH ALL */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            <span className="text-amber-400">⚠️ DEMO / SIMULATED RESPONSE:</span> No live municipal sirens or 911/112 channels contacted.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isDispatched ? (
              <button
                id="dispatch-all-btn"
                onClick={handleDispatchAll}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-sm font-mono font-black tracking-wider uppercase transition-all shadow-xl shadow-red-950 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>DISPATCH ALL</span>
              </button>
            ) : (
              <button
                id="open-live-tracking-btn"
                onClick={() => navigateTo('tracking', incident.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-mono font-black tracking-wider uppercase transition-all shadow-xl shadow-cyan-950 active:scale-95"
              >
                <span>OPEN LIVE TRACKING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
