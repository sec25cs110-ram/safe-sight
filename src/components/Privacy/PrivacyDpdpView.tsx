import React from 'react';
import {
  Lock,
  ShieldCheck,
  EyeOff,
  Cpu,
  FileText,
  UserCheck,
  KeyRound,
  AlertCircle,
  Database,
  History,
  CheckCircle2,
} from 'lucide-react';

export const PrivacyDpdpView: React.FC = () => {
  const principles = [
    {
      title: 'Data Minimization',
      icon: EyeOff,
      desc: 'Only telemetry strictly essential for dispatch triage (casualty count, entrapment status, vehicle hazard, road coordinate) is extracted. No irrelevant background audio or extraneous personal characteristics are captured or retained.',
    },
    {
      title: 'Edge Processing Concept',
      icon: Cpu,
      desc: 'Raw video stream feeds are processed locally on-device / edge node hardware (YOLOv8 micro-models). Raw high-resolution video frames never leave the edge camera; only lightweight anonymized vector events are transmitted.',
    },
    {
      title: 'Privacy-Aware CCTV Processing',
      icon: ShieldCheck,
      desc: 'Face blurring and license plate obfuscation filters run in silicon before neural inference is executed. Pedestrian privacy in public squares is preserved under automated zero-knowledge classification.',
    },
    {
      title: 'Role-Based Access Control (RBAC)',
      icon: KeyRound,
      desc: 'Strict multi-tier privilege separation ensures call dispatchers only view triage summaries, tactical paramedics receive patient stabilization directives, and forensic supervisors access unredacted incident replays solely via warrant authorization.',
    },
    {
      title: 'Immutable Audit Logs',
      icon: History,
      desc: 'Every parameter alteration, dispatcher override, voice playback, and unit redeployment is stamped with a cryptographically verifiable SHA-256 audit ledger to prevent tampering and ensure full institutional accountability.',
    },
    {
      title: 'No Unnecessary Personal Data',
      icon: UserCheck,
      desc: 'Caller phone metadata and geographic positioning are dissociated from long-term civic identities, mitigating correlation attacks and preventing pervasive citizen surveillance profiling.',
    },
    {
      title: 'Incident Data Retention & Erasure',
      icon: Database,
      desc: 'Automated 72-hour ephemeral purging cycles discard raw voice audio once dispatch confirmation and medical transfer handoffs are signed off, aligning with strict right-to-be-forgotten doctrines.',
    },
    {
      title: 'Consent & Distress Telemetry Standards',
      icon: FileText,
      desc: 'Emergency reports leverage standardized distress processing exemptions under global safety mandates, paired with transparent opt-in sensor protocols for municipal public infrastructure and distress telemetry.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Lock className="w-5 h-5 text-cyan-400" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                PRIVACY & DPDP COMPLIANCE ARCHITECTURE
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Ethical AI safeguards, edge anonymization, and Digital Personal Data Protection principles
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
              PRIVACY-FIRST DESIGN
            </span>
          </div>
        </div>

        {/* Prototype & Legal Notice (Required strictly by prompt Section 12) */}
        <div className="mt-5 p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-xs text-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold font-mono text-amber-300 uppercase tracking-wide">
              PROTOTYPE NOTICE & STATUTORY CLARIFICATION
            </p>
            <p className="text-slate-300 leading-relaxed font-sans">
              "Designed with privacy-aware principles and intended to support DPDP-aligned implementation."
            </p>
            <p className="text-slate-400 leading-relaxed font-sans text-[11px]">
              This software demonstration is a technology hackathon prototype. It does not represent an officially certified or legally audited production deployment under the Digital Personal Data Protection (DPDP) Act or GDPR. All synthetic data, surveillance feeds, and responder dispatches operate in sandboxed local memory.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Core Privacy Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 shadow-xl space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold font-mono text-white tracking-wide">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Edge vs Cloud Zero-Knowledge Architecture Diagram */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4">
        <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          EDGE SANITIZATION DATA FLOW PIPELINE
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] text-cyan-400 font-bold block uppercase">PHASE 1: ON-DEVICE INGESTION</span>
            <h4 className="font-bold text-white text-sm">Edge Sensor / CCTV Node</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              Camera optics capture 1080p stream. Neural chip executes bounding box tracking with zero cloud stream uplink.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] text-amber-400 font-bold block uppercase">PHASE 2: PRIVACY SANITIZATION</span>
            <h4 className="font-bold text-white text-sm">Face & Plate Masking</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              Facial landmarks and vehicle registration tags are mathematically blurred at chip level before classification metadata leaves RAM.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[10px] text-emerald-400 font-bold block uppercase">PHASE 3: DISPATCH MATRIX</span>
            <h4 className="font-bold text-white text-sm">Sanitized Vector Payload</h4>
            <p className="text-slate-400 text-[11px] font-sans">
              SafeSight command center receives only structured JSON payload: incident type, severity score, and unit recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
