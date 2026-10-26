export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type IncidentStatus =
  | 'Detected'
  | 'Awaiting Dispatch'
  | 'Dispatched'
  | 'En Route'
  | 'On Scene'
  | 'Resolved';

export interface RecommendedResource {
  id: string;
  type: 'Ambulance' | 'Fire & Rescue' | 'Police' | 'Trauma Hospital Alert';
  name: string;
  count: number;
  reason: string;
  icon: 'ambulance' | 'flame' | 'shield' | 'hospital';
}

export interface AssignedResponder {
  id: string;
  callsign: string;
  unitType: 'Ambulance' | 'Fire & Rescue' | 'Police';
  distance: string;
  etaMinutes: number;
  status: 'Available' | 'Dispatched' | 'En Route' | 'Arrived' | 'On Scene';
  location: { x: number; y: number }; // percentage coords on tactical map 0-100
  color: string;
}

export interface Incident {
  id: string;
  type: string;
  location: string;
  sector: string;
  victims: number;
  unconscious: number;
  trapped: number | 'Unknown';
  fireSmoke: 'Smoke detected' | 'Fire detected' | 'No Fire or Smoke' | 'Unknown';
  hazards: string;
  severity: SeverityLevel;
  confidence: number;
  status: IncidentStatus;
  detectedAt: string;
  source: string;
  cameraFeedId?: string;
  summary: string;
  detailedAnalysis?: string;
  triageStep: number; // 0 = unstarted, 1 = trapped asked, 2 = fire asked, 3 = complete
  recommendedResources: RecommendedResource[];
  responders: AssignedResponder[];
  coordinates: { x: number; y: number }; // tactical map percentage coords (0-100)
  auditLog: Array<{ time: string; event: string; user: string }>;
}

export type ViewRoute =
  | 'mission-control'
  | 'voice-report'
  | 'triage'
  | 'dispatch'
  | 'tracking'
  | 'responder'
  | 'insights'
  | 'privacy';
