import { Incident, AssignedResponder } from '../types/emergency';

export const INITIAL_RESPONDERS: AssignedResponder[] = [
  {
    id: 'AMB-07',
    callsign: 'AMB-07 (Alpha)',
    unitType: 'Ambulance',
    distance: '2.3 km',
    etaMinutes: 6,
    status: 'Available',
    location: { x: 28, y: 72 },
    color: '#38bdf8', // cyan-400
  },
  {
    id: 'FIRE-03',
    callsign: 'FIRE-03 (Bravo)',
    unitType: 'Fire & Rescue',
    distance: '3.1 km',
    etaMinutes: 8,
    status: 'Available',
    location: { x: 74, y: 25 },
    color: '#fb923c', // orange-400
  },
  {
    id: 'PCR-04',
    callsign: 'PCR-04 (Delta)',
    unitType: 'Police',
    distance: '1.2 km',
    etaMinutes: 4,
    status: 'Available',
    location: { x: 42, y: 32 },
    color: '#a855f7', // purple-500
  },
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'RSQ-1042',
    type: 'Road Collision & Pileup',
    location: 'Anna Salai Crossway',
    sector: 'Sector 4, Central Junction',
    victims: 3,
    unconscious: 1,
    trapped: 'Unknown',
    fireSmoke: 'Unknown',
    hazards: 'Fluids on road, blocked arterial lane',
    severity: 'CRITICAL',
    confidence: 94,
    status: 'Awaiting Dispatch',
    detectedAt: '2 mins ago',
    source: 'CAM 1 - YOLOv8 Edge Node',
    cameraFeedId: 'cam-1',
    summary: 'Two-wheeler collision at high velocity; rider non-responsive on asphalt. Multiple vehicles stalled.',
    detailedAnalysis: 'Multiple-victim road accident with one potentially unconscious victim. Additional safety information is required before dispatch.',
    triageStep: 0,
    coordinates: { x: 52, y: 48 },
    recommendedResources: [
      {
        id: 'rec-1',
        type: 'Ambulance',
        name: 'Ambulance Unit',
        count: 2,
        reason: 'Multiple injured victims + unconscious victim requiring advanced trauma life support',
        icon: 'ambulance',
      },
      {
        id: 'rec-2',
        type: 'Fire & Rescue',
        name: 'Fire & Rescue Tender',
        count: 1,
        reason: 'Vehicle entrapment suspected + smoke hazard mitigation',
        icon: 'flame',
      },
      {
        id: 'rec-3',
        type: 'Police',
        name: 'Police Patrol PCR',
        count: 1,
        reason: 'Traffic cordoning, corridor clearance and perimeter safety',
        icon: 'shield',
      },
      {
        id: 'rec-4',
        type: 'Trauma Hospital Alert',
        name: 'Trauma Hospital Alert',
        count: 1,
        reason: 'Critical head/polytrauma pre-notification (Level 1 Trauma Unit)',
        icon: 'hospital',
      },
    ],
    responders: [
      {
        id: 'AMB-07',
        callsign: 'AMB-07',
        unitType: 'Ambulance',
        distance: '2.3 km',
        etaMinutes: 6,
        status: 'Available',
        location: { x: 28, y: 72 },
        color: '#38bdf8',
      },
      {
        id: 'FIRE-03',
        callsign: 'FIRE-03',
        unitType: 'Fire & Rescue',
        distance: '3.1 km',
        etaMinutes: 8,
        status: 'Available',
        location: { x: 74, y: 25 },
        color: '#fb923c',
      },
      {
        id: 'PCR-04',
        callsign: 'PCR-04',
        unitType: 'Police',
        distance: '1.2 km',
        etaMinutes: 4,
        status: 'Available',
        location: { x: 42, y: 32 },
        color: '#c084fc',
      },
    ],
    auditLog: [
      { time: '10:41:02', event: 'YOLOv8 Edge Neural Net flagged collision at 94.2% confidence', user: 'Edge Node #01' },
      { time: '10:41:15', event: 'Voice dispatch correlation matched: Anna Salai sector', user: 'SafeSight NLP' },
    ],
  },
  {
    id: 'RSQ-1038',
    type: 'Physical Altercation Detected',
    location: 'North Flyover Plaza',
    sector: 'Sector 2, Pedestrian Zone',
    victims: 2,
    unconscious: 0,
    trapped: 0,
    fireSmoke: 'No Fire or Smoke',
    hazards: 'Crowd gathering, aggression escalating',
    severity: 'HIGH',
    confidence: 88,
    status: 'Dispatched',
    detectedAt: '14 mins ago',
    source: 'CAM 2 - YOLOv8 Edge Node',
    cameraFeedId: 'cam-2',
    summary: 'Group altercation with dynamic posturing and blunt force interaction detected.',
    detailedAnalysis: 'Fast-moving disturbance near transit stairs. Threat escalated to level 3.',
    triageStep: 3,
    coordinates: { x: 78, y: 64 },
    recommendedResources: [
      {
        id: 'rec-5',
        type: 'Police',
        name: 'Police Patrol Unit',
        count: 2,
        reason: 'Rapid de-escalation and perimeter security',
        icon: 'shield',
      },
      {
        id: 'rec-6',
        type: 'Ambulance',
        name: 'First Response Medic',
        count: 1,
        reason: 'Minor blunt trauma triage on scene',
        icon: 'ambulance',
      },
    ],
    responders: [
      {
        id: 'PCR-09',
        callsign: 'PCR-09',
        unitType: 'Police',
        distance: '0.4 km',
        etaMinutes: 2,
        status: 'En Route',
        location: { x: 72, y: 60 },
        color: '#c084fc',
      },
    ],
    auditLog: [
      { time: '10:29:12', event: 'Aggression model trigger: 88% confidence', user: 'Edge Node #02' },
      { time: '10:30:00', event: 'PCR-09 assigned by dispatcher', user: 'Dispatcher-HQ' },
    ],
  },
  {
    id: 'RSQ-1035',
    type: 'Transit Escalator Stoppage & Fall',
    location: 'Sector 4 Metro Interchange',
    sector: 'Sector 4, Concourse Level',
    victims: 1,
    unconscious: 0,
    trapped: 0,
    fireSmoke: 'No Fire or Smoke',
    hazards: 'Elderly patron slip, localized crowd surge',
    severity: 'MODERATE',
    confidence: 91,
    status: 'Resolved',
    detectedAt: '38 mins ago',
    source: 'CAM 3 - Concourse Node',
    cameraFeedId: 'cam-3',
    summary: 'Emergency stop activated; station medic assisted fallen passenger.',
    detailedAnalysis: 'No major fractures. First aid administered by transit safety team.',
    triageStep: 3,
    coordinates: { x: 22, y: 38 },
    recommendedResources: [
      {
        id: 'rec-7',
        type: 'Ambulance',
        name: 'Paramedic Quick Response',
        count: 1,
        reason: 'Passenger evaluation',
        icon: 'ambulance',
      },
    ],
    responders: [],
    auditLog: [
      { time: '10:05:00', event: 'Fall detection threshold exceeded', user: 'Edge Node #03' },
      { time: '10:25:00', event: 'Station medic cleared scene. Incident closed.', user: 'Medic Unit' },
    ],
  },
];

export interface CCTVFeed {
  id: string;
  name: string;
  location: string;
  resolution: string;
  fps: number;
  model: string;
  status: 'ONLINE' | 'ACTIVE_DETECTION' | 'CALIBRATING';
  detectedObject?: string;
  confidence?: number;
  cameraCoords: { x: number; y: number };
}

export const CCTV_NODES: CCTVFeed[] = [
  {
    id: 'cam-1',
    name: 'CAM 1 — ANNA SALAI JUNCTION',
    location: 'Sector 4 Crossway (North-East Facing)',
    resolution: 'HD 1080p',
    fps: 30,
    model: 'On-Camera YOLOv8',
    status: 'ACTIVE_DETECTION',
    detectedObject: 'Crash & Multi-Vehicle Collision',
    confidence: 94.2,
    cameraCoords: { x: 48, y: 44 },
  },
  {
    id: 'cam-2',
    name: 'CAM 2 — NORTH FLYOVER PLAZA',
    location: 'Sector 2 Pedestrian Overpass',
    resolution: 'HD 1080p',
    fps: 30,
    model: 'On-Camera YOLOv8',
    status: 'ONLINE',
    detectedObject: 'Physical Altercation Tracked',
    confidence: 88.0,
    cameraCoords: { x: 75, y: 60 },
  },
  {
    id: 'cam-3',
    name: 'CAM 3 — SECTOR 4 TRANSIT HUB',
    location: 'Central Concourse Entry Gate B',
    resolution: 'HD 1080p',
    fps: 30,
    model: 'On-Camera YOLOv8',
    status: 'ONLINE',
    detectedObject: 'Clear / Routine Foot Traffic',
    confidence: 96.5,
    cameraCoords: { x: 25, y: 35 },
  },
];

export const RADAR_LANDMARKS = [
  { name: 'Police Beat PCR #4', distance: '1.2 km', type: 'police', x: 42, y: 32 },
  { name: 'Nearest Police Station', distance: '1.2 km', type: 'police_station', x: 35, y: 22 },
  { name: 'Nearest Trauma Hospital', distance: '2.1 km', type: 'hospital', x: 68, y: 82 },
  { name: 'Central Fire Station #2', distance: '3.1 km', type: 'fire_station', x: 80, y: 22 },
];
