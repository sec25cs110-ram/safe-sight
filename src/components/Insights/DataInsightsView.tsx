import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  Car,
  Users,
  Shield,
  Zap,
} from 'lucide-react';

export const DataInsightsView: React.FC = () => {
  const incidentCategories = [
    { name: 'Road Accidents', count: 11, pct: 45, color: '#ef4444', icon: Car },
    { name: 'Medical', count: 6, pct: 25, color: '#06b6d4', icon: Activity },
    { name: 'Fire', count: 4, pct: 15, color: '#f97316', icon: Flame },
    { name: 'Altercation', count: 2, pct: 10, color: '#a855f7', icon: Shield },
    { name: 'Other', count: 1, pct: 5, color: '#64748b', icon: AlertTriangle },
  ];

  const hourlyTrends = [
    { hour: '00:00', count: 1 },
    { hour: '03:00', count: 0 },
    { hour: '06:00', count: 2 },
    { hour: '09:00', count: 5 },
    { hour: '12:00', count: 6 },
    { hour: '15:00', count: 4 },
    { hour: '18:00', count: 7 },
    { hour: '21:00', count: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <BarChart3 className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                DATA INSIGHTS & ANALYTICS
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              City-wide incident telemetry, triage duration benchmarks, and resource utilization metrics
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
              METRICS PERIOD: TODAY (SIMULATED)
            </span>
          </div>
        </div>

        {/* Dashboard Statistics (Required by Prompt):
            Today's Incidents: 24
            Critical: 5
            High: 9
            Resolved: 18
            Average Triage Time: 42 sec
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-6 font-mono">
          {/* Today's Incidents */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <span className="text-slate-400 block text-xs">Today's Incidents</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-white">24</span>
              <span className="text-[10px] text-cyan-400">+12% vs avg</span>
            </div>
          </div>

          {/* Critical */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50">
            <span className="text-red-300 block text-xs">Critical Cases</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-red-400">5</span>
              <span className="text-[10px] text-red-300">Immediate tier</span>
            </div>
          </div>

          {/* High */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/50">
            <span className="text-amber-300 block text-xs">High Severity</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-amber-400">9</span>
              <span className="text-[10px] text-amber-300">Escalated</span>
            </div>
          </div>

          {/* Resolved */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50">
            <span className="text-emerald-300 block text-xs">Resolved</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-emerald-400">18</span>
              <span className="text-[10px] text-emerald-300">75% Closure</span>
            </div>
          </div>

          {/* Average Triage Time */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-900/50 col-span-2 sm:col-span-1">
            <span className="text-cyan-300 block text-xs">Avg Triage Time</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-black text-cyan-300">42 sec</span>
              <span className="text-[10px] text-emerald-400">-84% vs manual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Response Overview & Innovation Benchmark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Overview breakdown (Prompt requirement) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              RESPONSE OVERVIEW BY CATEGORY
            </h3>
            <span className="text-xs font-mono text-slate-400">Total: 24 Incidents</span>
          </div>

          {/* Category Progress Bars */}
          <div className="space-y-3.5">
            {incidentCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                      <span className="text-slate-200 font-bold">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{cat.count} cases</span>
                      <span className="font-bold text-white w-10 text-right">{cat.pct}%</span>
                    </div>
                  </div>

                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${cat.pct}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
            💡 Road accidents account for highest resource load (45%), triggering multi-unit dual ambulance & hydraulic tender dispatches.
          </div>
        </div>

        {/* SafeSight Voice vs Manual Legacy Benchmark */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                TRIAGE EFFICIENCY BENCHMARK
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold">84% TIME SAVED</span>
            </div>

            <div className="space-y-4 mt-4">
              {/* Legacy manual form */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Legacy Form-Fill Emergency Dispatch</span>
                  <span className="text-rose-400 font-bold">270 seconds (4.5 min)</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-rose-500/80 w-[100%] rounded-full"></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 font-sans">
                  Victim panic, tedious field dropdowns, missed critical entrapment data.
                </p>
              </div>

              {/* SafeSight Voice AI */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-xs font-mono">
                <div className="flex items-center justify-between text-cyan-300 mb-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    SafeSight AI Speech & Adaptive Query
                  </span>
                  <span className="text-emerald-400 font-black">42 seconds</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[16%] rounded-full animate-pulse"></div>
                </div>
                <p className="text-[11px] text-cyan-300/80 mt-1 font-sans">
                  Just speak naturally: AI automatically extracts facts and only asks the 1-2 missing questions!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Golden Hour Survival Rate Uplift:</span>
            <span className="text-emerald-400 font-bold">+34.2% Estimated</span>
          </div>
        </div>
      </div>

      {/* Hourly Incident Ingestion Timeline */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">
            24-HOUR INCIDENT INGESTION CURVE
          </h3>
          <span className="text-xs font-mono text-slate-400">Peak Traffic Window: 17:00 - 20:00</span>
        </div>

        <div className="grid grid-cols-8 gap-2 items-end h-36 pt-4 px-2">
          {hourlyTrends.map((point) => (
            <div key={point.hour} className="flex flex-col items-center h-full justify-end group">
              <span className="text-[10px] font-mono text-cyan-400 font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {point.count}
              </span>
              <div
                style={{ height: `${Math.max(point.count * 14, 8)}%` }}
                className="w-full max-w-[40px] bg-gradient-to-t from-cyan-900 to-cyan-500 rounded-t-lg group-hover:from-cyan-700 group-hover:to-cyan-400 transition-all"
              />
              <span className="text-[10px] font-mono text-slate-400 mt-2">{point.hour}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
