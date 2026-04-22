import { createContext, useContext, useReducer, type ReactNode } from 'react';
import seedDonations, { type Donation } from '../data/donations';
import {
  type Student, type MealAttendance, type NGOAlert, type PickupSchedule, type FeedbackEntry,
  students as seedStudents,
  ngoAlerts as seedAlerts,
  pickupSchedules as seedPickups,
  feedbackEntries as seedFeedback,
} from '../data/mess';

// ── Types ──────────────────────────────────────────────────────────────────

export interface FoodRequest {
  id: number;
  ngoName: string;
  location: string;
  requiredQty: string;
  urgency: 'Low' | 'Medium' | 'High';
  submittedAt: string;
  donationId?: number;
}

interface AppState {
  donations: Donation[];
  requests: FoodRequest[];
  students: Student[];
  attendance: MealAttendance[];
  alerts: NGOAlert[];
  pickups: PickupSchedule[];
  feedback: FeedbackEntry[];
}

type AppAction =
  | { type: 'ADD_DONATION';       payload: Donation }
  | { type: 'REQUEST_DONATION';   payload: { donationId: number; request: FoodRequest } }
  | { type: 'QR_CONFIRM';         payload: MealAttendance }
  | { type: 'ADD_ALERT';          payload: NGOAlert }
  | { type: 'ACCEPT_ALERT';       payload: { alertId: string; ngoName: string } }
  | { type: 'COMPLETE_ALERT';     payload: string }
  | { type: 'SCHEDULE_PICKUP';    payload: PickupSchedule }
  | { type: 'COMPLETE_PICKUP';    payload: string }
  | { type: 'CANCEL_PICKUP';      payload: string }
  | { type: 'ADD_FEEDBACK';       payload: FeedbackEntry }
  | { type: 'ADD_REWARD_POINTS';  payload: { studentId: string; points: number } };

interface AppContextValue extends AppState {
  addDonation:    (d: Omit<Donation, 'id' | 'status' | 'addedAt'>) => void;
  requestDonation:(id: number, r: Omit<FoodRequest, 'id' | 'submittedAt' | 'donationId'>) => void;
  confirmMealQR:  (a: Omit<MealAttendance, 'id' | 'timestamp'>) => void;
  addAlert:       (a: Omit<NGOAlert, 'id'>) => void;
  acceptAlert:    (alertId: string, ngoName: string) => void;
  completeAlert:  (alertId: string) => void;
  schedulePickup: (p: Omit<PickupSchedule, 'id'>) => void;
  completePickup: (id: string) => void;
  cancelPickup:   (id: string) => void;
  addFeedback:    (f: Omit<FeedbackEntry, 'id'>) => void;
  addRewardPoints:(studentId: string, points: number) => void;
}

// ── Reducer ────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_DONATION':
      return { ...state, donations: [action.payload, ...state.donations] };

    case 'REQUEST_DONATION':
      return {
        ...state,
        donations: state.donations.map(d =>
          d.id === action.payload.donationId ? { ...d, status: 'Requested' as const } : d
        ),
        requests: [action.payload.request, ...state.requests],
      };

    case 'QR_CONFIRM':
      return { ...state, attendance: [action.payload, ...state.attendance] };

    case 'ADD_ALERT':
      return { ...state, alerts: [action.payload, ...state.alerts] };

    case 'ACCEPT_ALERT':
      return {
        ...state,
        alerts: state.alerts.map(a =>
          a.id === action.payload.alertId
            ? { ...a, status: 'Accepted' as const, ngoName: action.payload.ngoName }
            : a
        ),
      };

    case 'COMPLETE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map(a =>
          a.id === action.payload ? { ...a, status: 'Completed' as const } : a
        ),
      };

    case 'SCHEDULE_PICKUP':
      return { ...state, pickups: [action.payload, ...state.pickups] };

    case 'COMPLETE_PICKUP':
      return {
        ...state,
        pickups: state.pickups.map(p =>
          p.id === action.payload ? { ...p, status: 'Completed' as const } : p
        ),
      };

    case 'CANCEL_PICKUP':
      return {
        ...state,
        pickups: state.pickups.map(p =>
          p.id === action.payload ? { ...p, status: 'Cancelled' as const } : p
        ),
      };

    case 'ADD_FEEDBACK':
      return { ...state, feedback: [action.payload, ...state.feedback] };

    case 'ADD_REWARD_POINTS':
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.payload.studentId
            ? { ...s, points: s.points + action.payload.points, confirmedMeals: s.confirmedMeals + 1 }
            : s
        ),
      };

    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

export function FoodProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    donations: seedDonations,
    requests: [],
    students: seedStudents,
    attendance: [],
    alerts: seedAlerts,
    pickups: seedPickups,
    feedback: seedFeedback,
  });

  const addDonation = (d: Omit<Donation, 'id' | 'status' | 'addedAt'>) =>
    dispatch({ type: 'ADD_DONATION', payload: { ...d, id: Date.now(), status: 'Available', addedAt: new Date().toISOString() } });

  const requestDonation = (donationId: number, r: Omit<FoodRequest, 'id' | 'submittedAt' | 'donationId'>) =>
    dispatch({ type: 'REQUEST_DONATION', payload: { donationId, request: { ...r, id: Date.now(), submittedAt: new Date().toISOString(), donationId } } });

  const confirmMealQR = (a: Omit<MealAttendance, 'id' | 'timestamp'>) =>
    dispatch({ type: 'QR_CONFIRM', payload: { ...a, id: `att-${Date.now()}`, timestamp: new Date().toISOString() } });

  const addAlert = (a: Omit<NGOAlert, 'id'>) =>
    dispatch({ type: 'ADD_ALERT', payload: { ...a, id: `alert-${Date.now()}` } });

  const acceptAlert = (alertId: string, ngoName: string) =>
    dispatch({ type: 'ACCEPT_ALERT', payload: { alertId, ngoName } });

  const completeAlert = (alertId: string) =>
    dispatch({ type: 'COMPLETE_ALERT', payload: alertId });

  const schedulePickup = (p: Omit<PickupSchedule, 'id'>) =>
    dispatch({ type: 'SCHEDULE_PICKUP', payload: { ...p, id: `pickup-${Date.now()}` } });

  const completePickup = (id: string) =>
    dispatch({ type: 'COMPLETE_PICKUP', payload: id });

  const cancelPickup = (id: string) =>
    dispatch({ type: 'CANCEL_PICKUP', payload: id });

  const addFeedback = (f: Omit<FeedbackEntry, 'id'>) =>
    dispatch({ type: 'ADD_FEEDBACK', payload: { ...f, id: `fb-${Date.now()}` } });

  const addRewardPoints = (studentId: string, points: number) =>
    dispatch({ type: 'ADD_REWARD_POINTS', payload: { studentId, points } });

  return (
    <AppContext.Provider value={{
      ...state,
      addDonation, requestDonation, confirmMealQR,
      addAlert, acceptAlert, completeAlert,
      schedulePickup, completePickup, cancelPickup,
      addFeedback, addRewardPoints,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useFoodContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useFoodContext must be used within FoodProvider');
  return ctx;
}
