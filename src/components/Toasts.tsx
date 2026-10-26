import React from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { AlertTriangle, CheckCircle2, Info, AlertOctagon, X } from 'lucide-react';

export const Toasts: React.FC = () => {
  const { toasts, removeToast } = useEmergency();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let border = 'border-cyan-500/40 bg-slate-900/95 text-cyan-200';
        let Icon = Info;

        if (toast.type === 'critical') {
          border = 'border-rose-500/60 bg-[#16060a]/95 text-rose-200 shadow-rose-950/50 shadow-lg';
          Icon = AlertOctagon;
        } else if (toast.type === 'warning') {
          border = 'border-amber-500/60 bg-[#170e04]/95 text-amber-200 shadow-amber-950/50 shadow-lg';
          Icon = AlertTriangle;
        } else if (toast.type === 'success') {
          border = 'border-emerald-500/60 bg-[#04160d]/95 text-emerald-200 shadow-emerald-950/50 shadow-lg';
          Icon = CheckCircle2;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-3 ${border}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">{toast.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{toast.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
