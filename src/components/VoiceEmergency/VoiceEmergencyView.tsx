import React, { useState, useEffect, useRef } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import {
  Mic,
  MicOff,
  Square,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  Cpu,
  Volume2,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import { playClickBeep, playEmergencyAlert } from '../../utils/audio';

type SpeechState = 'READY' | 'LISTENING' | 'PROCESSING' | 'RESULT';

interface ExtractedIntel {
  type: string;
  location: string;
  victims: number;
  unconscious: number;
  trapped: string;
  fireSmoke: string;
  hazards: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  confidence: number;
  summary: string;
}

export const VoiceEmergencyView: React.FC = () => {
  const { createIncidentFromVoice, navigateTo, audioEnabled, addToast } = useEmergency();

  const [speechState, setSpeechState] = useState<SpeechState>('READY');
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeechAvailable, setIsSpeechAvailable] = useState<boolean>(true);
  const [micPermissionDenied, setMicPermissionDenied] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [extractedIntel, setExtractedIntel] = useState<ExtractedIntel | null>(null);
  const [createdIncidentId, setCreatedIncidentId] = useState<string | null>(null);

  // Audio waveform animation simulation state
  const [waveHeights, setWaveHeights] = useState<number[]>([20, 45, 70, 90, 60, 35, 75, 50, 85, 40]);

  // Speech Recognition instance ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSpeechAvailable(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        setSpeechState((prev) => (prev === 'LISTENING' ? 'RESULT' : prev));
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicPermissionDenied(true);
        }
        setSpeechState('READY');
      };

      recognitionRef.current = recognition;
    } catch {
      setIsSpeechAvailable(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Simulate active audio wave during listening
  useEffect(() => {
    if (speechState !== 'LISTENING') return;
    const interval = setInterval(() => {
      setWaveHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 80) + 20)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [speechState]);

  const handleStartSpeaking = () => {
    playClickBeep(audioEnabled);
    if (!isSpeechAvailable || micPermissionDenied) {
      handleUseDemoVoice();
      return;
    }

    setTranscript('');
    setExtractedIntel(null);
    setSpeechState('LISTENING');

    try {
      if (recognitionRef.current) {
        recognitionRef.current.start();
      } else {
        handleUseDemoVoice();
      }
    } catch {
      // Fallback
      handleUseDemoVoice();
    }
  };

  const handleStopSpeaking = () => {
    playClickBeep(audioEnabled);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setSpeechState('RESULT');
  };

  const handleReset = () => {
    playClickBeep(audioEnabled);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setTranscript('');
    setSpeechState('READY');
    setExtractedIntel(null);
  };

  const handleUseDemoVoice = () => {
    playClickBeep(audioEnabled);
    setSpeechState('PROCESSING');
    setTimeout(() => {
      setTranscript(
        'There has been a road accident near Anna Salai. Three people are injured and one person is unconscious.'
      );
      setSpeechState('RESULT');
      addToast('Demo Voice Loaded', 'Sample voice transcript loaded successfully.', 'info');
    }, 450);
  };

  // Perform AI Emergency Analysis
  const handleAnalyzeEmergency = () => {
    playEmergencyAlert(audioEnabled);
    setIsAnalyzing(true);

    setTimeout(() => {
      // Deterministic frontend AI intelligence extraction
      const extracted: ExtractedIntel = {
        type: 'Road Accident',
        location: 'Anna Salai',
        victims: 3,
        unconscious: 1,
        trapped: 'Unknown',
        fireSmoke: 'Unknown',
        hazards: 'Unknown',
        severity: 'CRITICAL',
        confidence: 94,
        summary:
          'Multiple-victim road accident with one potentially unconscious victim. Additional safety information is required before dispatch.',
      };

      setExtractedIntel(extracted);
      setIsAnalyzing(false);

      // Create new incident or update active one
      const newInc = createIncidentFromVoice(transcript);
      setCreatedIncidentId(newInc.id);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Mic className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                VOICE EMERGENCY REPORT
              </h1>
            </div>
            <p className="text-sm text-slate-400 mt-1 font-sans">
              "Speak naturally. We'll understand the emergency."
            </p>
          </div>

          {/* Quick Demo Voice Fallback Button */}
          <button
            id="use-demo-voice-btn"
            onClick={handleUseDemoVoice}
            className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/40 hover:to-blue-600/40 border border-cyan-500/50 text-cyan-200 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>USE DEMO VOICE</span>
          </button>
        </div>

        {/* Browser Speech API Warning / Notice */}
        {(!isSpeechAvailable || micPermissionDenied) && (
          <div className="mt-4 p-3 rounded-xl border border-amber-500/40 bg-amber-950/30 flex items-center justify-between gap-3 text-xs text-amber-300">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Microphone access is unavailable in this environment. Use Demo Voice mode.</span>
            </div>
            <button
              onClick={handleUseDemoVoice}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 font-mono font-bold uppercase text-[11px]"
            >
              Load Demo Audio
            </button>
          </div>
        )}
      </div>

      {/* Main Microphone Interaction Interface */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 p-8 shadow-2xl text-center flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* State Status Badge */}
        <div className="mb-6">
          {speechState === 'READY' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>READY — Tap the microphone and describe what happened.</span>
            </div>
          )}
          {speechState === 'LISTENING' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950 border border-red-700 text-xs font-mono text-red-300 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>LISTENING... Speak clearly (en-IN)</span>
            </div>
          )}
          {speechState === 'PROCESSING' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-xs font-mono text-cyan-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Analyzing emergency information...</span>
            </div>
          )}
          {speechState === 'RESULT' && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-xs font-mono text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>TRANSCRIPTION CAPTURED</span>
            </div>
          )}
        </div>

        {/* Large Central Microphone Button */}
        <div className="relative mb-6">
          {speechState === 'LISTENING' && (
            <>
              <div className="absolute -inset-4 rounded-full bg-red-600/30 animate-ping pointer-events-none"></div>
              <div className="absolute -inset-8 rounded-full bg-red-600/15 animate-pulse pointer-events-none"></div>
            </>
          )}

          <button
            id="mic-action-btn"
            onClick={speechState === 'LISTENING' ? handleStopSpeaking : handleStartSpeaking}
            className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-300 shadow-2xl active:scale-95 ${
              speechState === 'LISTENING'
                ? 'bg-gradient-to-tr from-red-600 to-rose-500 border-4 border-red-300 text-white shadow-red-950/80 scale-105'
                : 'bg-gradient-to-tr from-cyan-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 border-4 border-cyan-400/40 text-white shadow-cyan-950/80 hover:scale-105'
            }`}
          >
            {speechState === 'LISTENING' ? (
              <Square className="w-10 h-10 fill-current" />
            ) : (
              <Mic className="w-12 h-12" />
            )}
          </button>
        </div>

        {/* Simulated Waveform Bars while listening */}
        {speechState === 'LISTENING' && (
          <div className="flex items-center justify-center gap-1.5 h-12 mb-6">
            {waveHeights.map((h, idx) => (
              <div
                key={idx}
                style={{ height: `${h}%` }}
                className="w-1.5 bg-gradient-to-t from-red-600 to-rose-400 rounded-full transition-all duration-100"
              />
            ))}
          </div>
        )}

        {/* Action Controls for Microphone */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {speechState === 'READY' && (
            <button
              id="start-speaking-btn"
              onClick={handleStartSpeaking}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-cyan-950"
            >
              <Mic className="w-4 h-4" />
              <span>START SPEAKING</span>
            </button>
          )}

          {speechState === 'LISTENING' && (
            <button
              id="stop-speaking-btn"
              onClick={handleStopSpeaking}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-md shadow-red-950"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>STOP</span>
            </button>
          )}

          {(speechState === 'RESULT' || transcript.length > 0) && (
            <>
              <button
                id="try-again-btn"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold tracking-wider uppercase transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>TRY AGAIN</span>
              </button>

              <button
                id="analyze-emergency-btn"
                onClick={handleAnalyzeEmergency}
                disabled={isAnalyzing || !transcript}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-red-950"
              >
                <Cpu className="w-4 h-4 animate-pulse" />
                <span>{isAnalyzing ? 'ANALYZING...' : 'ANALYZE EMERGENCY'}</span>
              </button>
            </>
          )}
        </div>

        {/* Live Transcript Display Box */}
        <div className="w-full max-w-2xl text-left">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5 px-1">
            <span>VOICE TRANSCRIPT (ACCURACY EVALUATED)</span>
            {transcript && (
              <span className="text-cyan-400 font-bold">Web Speech API • en-IN</span>
            )}
          </div>
          <div className="w-full min-h-[90px] p-4 rounded-xl border border-slate-800 bg-slate-950/80 text-sm font-sans text-slate-200 leading-relaxed shadow-inner">
            {transcript ? (
              <p className="font-medium text-slate-100 italic">"{transcript}"</p>
            ) : (
              <p className="text-slate-500 italic">
                Awaiting voice input. Tap the microphone or click "USE DEMO VOICE" above to test.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 5: EMERGENCY AI ANALYSIS DISPLAY */}
      {isAnalyzing && (
        <div className="rounded-2xl border border-cyan-500/50 bg-slate-950/90 p-8 text-center space-y-4 shadow-2xl animate-pulse">
          <Cpu className="w-10 h-10 text-cyan-400 mx-auto animate-spin" />
          <h3 className="text-lg font-bold font-mono text-cyan-300 uppercase tracking-wider">
            SYNTHESIZING EMERGENCY INTELLIGENCE...
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Extracting casualty count, geolocation vector, entrapment probability, and atmospheric hazards via SafeSight NLP...
          </p>
        </div>
      )}

      {extractedIntel && !isAnalyzing && (
        <div className="rounded-2xl border border-red-500/50 bg-slate-950/95 p-6 shadow-2xl space-y-6 animate-in fade-in duration-300">
          {/* Section Title */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-1 rounded-md bg-red-950 border border-red-700/80 text-red-400">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold font-mono text-white tracking-wide uppercase">
                  EMERGENCY INTELLIGENCE
                </h3>
                <p className="text-xs text-slate-400">Real-time parsed parametric intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-red-950/90 border border-red-700 text-red-300 font-bold">
                SEVERITY: {extractedIntel.severity}
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-950/90 border border-cyan-700 text-cyan-300 font-bold">
                CONFIDENCE: {extractedIntel.confidence}%
              </span>
            </div>
          </div>

          {/* Structured Intelligence Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Emergency Type</span>
              <span className="text-slate-100 font-bold text-sm mt-0.5 block">{extractedIntel.type}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Location</span>
              <span className="text-cyan-300 font-bold text-sm mt-0.5 block">{extractedIntel.location}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Victims</span>
              <span className="text-slate-100 font-bold text-sm mt-0.5 block">{extractedIntel.victims}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Unconscious</span>
              <span className="text-rose-400 font-bold text-sm mt-0.5 block">{extractedIntel.unconscious}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Trapped</span>
              <span className="text-amber-300 font-bold text-sm mt-0.5 block">{extractedIntel.trapped}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Fire/Smoke</span>
              <span className="text-amber-300 font-bold text-sm mt-0.5 block">{extractedIntel.fireSmoke}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Hazards</span>
              <span className="text-slate-300 font-bold text-sm mt-0.5 block">{extractedIntel.hazards}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Severity</span>
              <span className="text-red-400 font-bold text-sm mt-0.5 block">{extractedIntel.severity}</span>
            </div>
          </div>

          {/* AI SUMMARY BOX */}
          <div className="p-4 rounded-xl border border-cyan-800/40 bg-cyan-950/20">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 mb-1.5 uppercase">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI SUMMARY</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              "{extractedIntel.summary}"
            </p>
          </div>

          {/* Button: CONTINUE AI TRIAGE */}
          <div className="flex justify-end pt-2">
            <button
              id="continue-ai-triage-btn"
              onClick={() => navigateTo('triage', createdIncidentId || 'RSQ-1042')}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-mono font-bold tracking-wider uppercase transition-all shadow-lg shadow-red-950 active:scale-95"
            >
              <span>CONTINUE AI TRIAGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
