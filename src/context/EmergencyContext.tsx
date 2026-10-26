import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Incident, ViewRoute, AssignedResponder } from '../types/emergency';
import { INITIAL_INCIDENTS, INITIAL_RESPONDERS, CCTV_NODES } from '../data/initialData';
import { playEmergencyAlert, playDispatchSuccess, playClickBeep, playRadarPing } from '../utils/audio';

interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'warning' | 'success' | 'info';
  timestamp: string;
}

interface EmergencyContextType {
  incidents: Incident[];
  activeIncident: Incident | null;
  activeIncidentId: string;
  currentView: ViewRoute;
  audioEnabled: boolean;
  toasts: Toast[];
  isDemoRunning: boolean;
  demoStep: number;
  demoModeActive: boolean;
  selectedCctvId: string;
  // Actions
  setCurrentView: (view: ViewRoute) => void;
  setActiveIncidentId: (id: string) => void;
  setAudioEnabled: (val: boolean) => void;
  addToast: (title: string, message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  createIncidentFromVoice: (transcript: string) => Incident;
  triggerCctvDetection: (camId: string) => void;
  startFullDemo: () => void;
  nextDemoStep: () => void;
  cancelDemo: () => void;
  answerTriageQuestion: (incidentId: string, question: 'trapped' | 'fireSmoke', answer: string) => void;
  dispatchAllResponders: (incidentId: string) => void;
  simulateRespondersArrival: (incidentId: string) => void;
  resolveIncident: (incidentId: string) => void;
  resetAllData: () => void;
  setSelectedCctvId: (id: string) => void;
  navigateTo: (view: ViewRoute, incidentId?: string) => void;
}

const STORAGE_KEY = 'safesight_incidents_v2';

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return INITIAL_INCIDENTS;
  });

  const [activeIncidentId, setActiveIncidentId] = useState<string>('RSQ-1042');
  const [currentView, setCurrentView] = useState<ViewRoute>('mission-control');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [demoModeActive] = useState<boolean>(true);
  const [selectedCctvId, setSelectedCctvId] = useState<string>('cam-1');

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [incidents]);

  const addToast = useCallback((title: string, message: string, type: Toast['type'] = 'info') => {
    const newToast: Toast = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const activeIncident = incidents.find((inc) => inc.id === activeIncidentId) || incidents[0] || null;

  const navigateTo = useCallback((view: ViewRoute, incidentId?: string) => {
    if (incidentId) {
      setActiveIncidentId(incidentId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Answer adaptive triage questions
  const answerTriageQuestion = useCallback(
    (incidentId: string, question: 'trapped' | 'fireSmoke', answer: string) => {
      playClickBeep(audioEnabled);
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== incidentId) return inc;

          const isTrapped = question === 'trapped' && answer.toLowerCase().includes('yes');
          const isSmoke =
            question === 'fireSmoke' && (answer.toLowerCase().includes('smoke') || answer.toLowerCase().includes('fire'));

          const updatedTrapped = question === 'trapped' ? (isTrapped ? 1 : 0) : inc.trapped;
          const updatedFire = question === 'fireSmoke' ? (isSmoke ? 'Smoke detected' : 'No Fire or Smoke') : inc.fireSmoke;

          // Increase step
          const newStep = question === 'trapped' ? 2 : 3;

          const newAudit = [
            ...inc.auditLog,
            {
              time: new Date().toLocaleTimeString(),
              event: `Adaptive Triage [${question}]: Answered "${answer}"`,
              user: 'Field / Operator Voice',
            },
          ];

          return {
            ...inc,
            trapped: updatedTrapped,
            fireSmoke: updatedFire,
            severity: 'CRITICAL',
            triageStep: newStep,
            auditLog: newAudit,
          };
        })
      );

      if (question === 'trapped') {
        addToast('Triage Updated', 'Victim entrapment confirmed. Updating resource requirements.', 'warning');
      } else {
        addToast('Triage Complete', 'Atmospheric hazard verified. Response matrix ready.', 'critical');
      }
    },
    [audioEnabled, addToast]
  );

  // Dispatch all responders
  const dispatchAllResponders = useCallback(
    (incidentId: string) => {
      playDispatchSuccess(audioEnabled);
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== incidentId) return inc;
          return {
            ...inc,
            status: 'Dispatched',
            responders: inc.responders.map((resp) => ({
              ...resp,
              status: resp.unitType === 'Police' ? 'Dispatched' : 'En Route',
            })),
            auditLog: [
              ...inc.auditLog,
              {
                time: new Date().toLocaleTimeString(),
                event: 'Emergency response dispatched: 2 Ambulances, 1 Fire Tender, 1 Police PCR Unit',
                user: 'City Emergency Dispatcher',
              },
            ],
          };
        })
      );
      addToast('Dispatched All Units', 'Ambulance, Fire & Police units have acknowledged dispatch.', 'success');
    },
    [audioEnabled, addToast]
  );

  // Simulate arrival of responders
  const simulateRespondersArrival = useCallback(
    (incidentId: string) => {
      playRadarPing(audioEnabled);
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== incidentId) return inc;
          return {
            ...inc,
            status: 'On Scene',
            responders: inc.responders.map((resp) => ({
              ...resp,
              status: 'Arrived',
              etaMinutes: 0,
            })),
            auditLog: [
              ...inc.auditLog,
              {
                time: new Date().toLocaleTimeString(),
                event: 'First responder PCR-04 and AMB-07 on scene at Anna Salai Crossway.',
                user: 'Responder Mesh GPS',
              },
            ],
          };
        })
      );
      addToast('Units On Scene', 'All units have arrived at the designated coordinates.', 'info');
    },
    [audioEnabled, addToast]
  );

  // Resolve incident
  const resolveIncident = useCallback(
    (incidentId: string) => {
      playDispatchSuccess(audioEnabled);
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id !== incidentId) return inc;
          return {
            ...inc,
            status: 'Resolved',
            responders: inc.responders.map((resp) => ({
              ...resp,
              status: 'Available',
            })),
            auditLog: [
              ...inc.auditLog,
              {
                time: new Date().toLocaleTimeString(),
                event: 'Incident safely mitigated, casualties evacuated to Trauma Hospital, scene secured.',
                user: 'Command Supervisor',
              },
            ],
          };
        })
      );
      addToast('Incident Resolved', 'Incident marked as complete and logged for DPDP-compliant audit.', 'success');
    },
    [audioEnabled, addToast]
  );

  // Trigger CCTV detection from a specific camera node
  const triggerCctvDetection = useCallback(
    (camId: string) => {
      playEmergencyAlert(audioEnabled);
      const cam = CCTV_NODES.find((c) => c.id === camId) || CCTV_NODES[0];
      const newId = `RSQ-${Math.floor(1000 + Math.random() * 9000)}`;

      const newInc: Incident = {
        id: newId,
        type: camId === 'cam-1' ? 'Road Collision & Pileup' : camId === 'cam-2' ? 'Physical Altercation Detected' : 'Structural Debris Hazard',
        location: cam.location,
        sector: cam.name.split('—')[1]?.trim() || 'Sector Zone',
        victims: camId === 'cam-1' ? 3 : camId === 'cam-2' ? 2 : 1,
        unconscious: camId === 'cam-1' ? 1 : 0,
        trapped: 'Unknown',
        fireSmoke: 'Unknown',
        hazards: 'Active hazard under edge model monitoring',
        severity: 'CRITICAL',
        confidence: 94.2,
        status: 'Awaiting Dispatch',
        detectedAt: 'Just now',
        source: `${cam.name} (${cam.model})`,
        cameraFeedId: camId,
        summary: `Instantaneous detection trigger from ${cam.name}. YOLOv8 real-time inference flagged hazard.`,
        detailedAnalysis: 'Multiple-victim situation identified by computer vision. Immediate verbal or automated triage recommended.',
        triageStep: 0,
        coordinates: cam.cameraCoords,
        recommendedResources: [
          {
            id: 'rec-n1',
            type: 'Ambulance',
            name: 'Ambulance Unit',
            count: 2,
            reason: 'High velocity collision / trauma indicators',
            icon: 'ambulance',
          },
          {
            id: 'rec-n2',
            type: 'Fire & Rescue',
            name: 'Rescue Tender',
            count: 1,
            reason: 'Impact containment and extrication capability',
            icon: 'flame',
          },
          {
            id: 'rec-n3',
            type: 'Police',
            name: 'Patrol Cruiser',
            count: 1,
            reason: 'Cordon zone security and traffic diversion',
            icon: 'shield',
          },
        ],
        responders: INITIAL_RESPONDERS.map((r) => ({ ...r, status: 'Available' })),
        auditLog: [
          {
            time: new Date().toLocaleTimeString(),
            event: `Edge camera trigger from ${cam.name}`,
            user: 'SafeSight YOLOv8 Daemon',
          },
        ],
      };

      setIncidents((prev) => [newInc, ...prev]);
      setActiveIncidentId(newId);
      addToast(
        `Critical Incident Detected!`,
        `${newInc.type} flagged by ${cam.name} (${cam.confidence}% confidence).`,
        'critical'
      );
    },
    [audioEnabled, addToast]
  );

  // Ingest voice transcript into emergency incident
  const createIncidentFromVoice = useCallback(
    (transcript: string): Incident => {
      playEmergencyAlert(audioEnabled);
      const newId = `RSQ-${Math.floor(1000 + Math.random() * 9000)}`;

      // Deterministic frontend NLP extractor
      const lower = transcript.toLowerCase();
      let type = 'Road Accident';
      if (lower.includes('fire') || lower.includes('smoke') || lower.includes('burn')) {
        type = 'Fire & Smoke Emergency';
      } else if (lower.includes('fight') || lower.includes('altercation') || lower.includes('assault')) {
        type = 'Physical Altercation';
      } else if (lower.includes('chest') || lower.includes('heart') || lower.includes('collapse')) {
        type = 'Cardiac / Medical Emergency';
      }

      let location = 'Anna Salai';
      if (lower.includes('sector 4')) location = 'Anna Salai Crossway, Sector 4';
      else if (lower.includes('anna salai')) location = 'Anna Salai Main Road';
      else if (lower.includes('flyover') || lower.includes('north')) location = 'North Flyover Plaza';

      let victims = 3;
      if (lower.includes('three') || lower.includes('3')) victims = 3;
      else if (lower.includes('two') || lower.includes('2')) victims = 2;
      else if (lower.includes('one') || lower.includes('1')) victims = 1;
      else if (lower.includes('four') || lower.includes('4')) victims = 4;

      const unconscious = lower.includes('unconscious') || lower.includes('not responsive') ? 1 : 0;

      const newInc: Incident = {
        id: newId,
        type,
        location,
        sector: 'Anna Salai Sector 4',
        victims,
        unconscious,
        trapped: 'Unknown',
        fireSmoke: 'Unknown',
        hazards: 'Unknown - pending adaptive voice triage',
        severity: 'CRITICAL',
        confidence: 94,
        status: 'Awaiting Dispatch',
        detectedAt: 'Just now',
        source: 'Voice Dispatch Hotline (en-IN)',
        summary: transcript,
        detailedAnalysis:
          'Multiple-victim road accident with one potentially unconscious victim. Additional safety information is required before dispatch.',
        triageStep: 0,
        coordinates: { x: 52, y: 48 },
        recommendedResources: [
          {
            id: 'rec-v1',
            type: 'Ambulance',
            name: 'Advanced Life Support Ambulance',
            count: 2,
            reason: 'Multiple injured victims + unconscious victim reported',
            icon: 'ambulance',
          },
          {
            id: 'rec-v2',
            type: 'Fire & Rescue',
            name: 'Fire & Rescue Squad',
            count: 1,
            reason: 'Potential extrication and fire hazard suppression',
            icon: 'flame',
          },
          {
            id: 'rec-v3',
            type: 'Police',
            name: 'Police Rapid PCR',
            count: 1,
            reason: 'Traffic corridor clearance & scene stabilization',
            icon: 'shield',
          },
          {
            id: 'rec-v4',
            type: 'Trauma Hospital Alert',
            name: 'Trauma Hospital Alert',
            count: 1,
            reason: 'Critical trauma standby protocol',
            icon: 'hospital',
          },
        ],
        responders: INITIAL_RESPONDERS.map((r) => ({ ...r, status: 'Available' })),
        auditLog: [
          {
            time: new Date().toLocaleTimeString(),
            event: 'Voice emergency audio captured and transcribed via Web Speech API',
            user: 'Citizen Caller',
          },
          {
            time: new Date().toLocaleTimeString(),
            event: 'SafeSight NLP extracted: 3 Victims, 1 Unconscious, Road Accident',
            user: 'SafeSight Edge NLP',
          },
        ],
      };

      setIncidents((prev) => [newInc, ...prev]);
      setActiveIncidentId(newId);
      addToast('Voice Report Ingested', `Extracted ${newInc.type} at ${newInc.location}.`, 'warning');
      return newInc;
    },
    [audioEnabled, addToast]
  );

  // Full demo walkthrough orchestrator
  const startFullDemo = useCallback(() => {
    // Reset RSQ-1042 to fresh state ready for step-by-step
    const fresh1042: Incident = {
      ...INITIAL_INCIDENTS[0],
      trapped: 'Unknown',
      fireSmoke: 'Unknown',
      triageStep: 0,
      status: 'Awaiting Dispatch',
      responders: INITIAL_RESPONDERS.map((r) => ({ ...r, status: 'Available' })),
    };

    setIncidents((prev) => [fresh1042, ...prev.filter((i) => i.id !== 'RSQ-1042')]);
    setActiveIncidentId('RSQ-1042');
    setIsDemoRunning(true);
    setDemoStep(1);
    setCurrentView('mission-control');
    playEmergencyAlert(audioEnabled);
    addToast(
      'Demo Mode Started',
      'Step 1/16: Edge CCTV detects collision on Anna Salai. Follow the guided sequence!',
      'critical'
    );
  }, [audioEnabled, addToast]);

  const nextDemoStep = useCallback(() => {
    setDemoStep((prev) => Math.min(prev + 1, 16));
  }, []);

  const cancelDemo = useCallback(() => {
    setIsDemoRunning(false);
    setDemoStep(1);
    addToast('Demo Guided Tour Exited', 'You can now freely explore all screens and controls.', 'info');
  }, [addToast]);

  const resetAllData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIncidents(INITIAL_INCIDENTS);
    setActiveIncidentId('RSQ-1042');
    setCurrentView('mission-control');
    setIsDemoRunning(false);
    setDemoStep(1);
    addToast('System Reset', 'All incident states reverted to baseline.', 'info');
  }, [addToast]);

  return (
    <EmergencyContext.Provider
      value={{
        incidents,
        activeIncident,
        activeIncidentId,
        currentView,
        audioEnabled,
        toasts,
        isDemoRunning,
        demoStep,
        demoModeActive,
        selectedCctvId,
        setCurrentView,
        setActiveIncidentId,
        setAudioEnabled,
        addToast,
        removeToast,
        createIncidentFromVoice,
        triggerCctvDetection,
        startFullDemo,
        nextDemoStep,
        cancelDemo,
        answerTriageQuestion,
        dispatchAllResponders,
        simulateRespondersArrival,
        resolveIncident,
        resetAllData,
        setSelectedCctvId,
        navigateTo,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
