// ── Student & Mess Data ──────────────────────────────────────────────

export interface Student {
  id: string;
  name: string;
  roll: string;
  room: string;
  hostel: string;
  points: number;
  confirmedMeals: number;
  wastedMeals: number;
  avatar: string; // initials
  badges: string[];
}

export interface MealAttendance {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  confirmedViaQR: boolean;
  attended: boolean;
  timestamp: string;
}

export interface MealPlan {
  date: string;
  breakfast: { planned: number; actual: number; leftover: number };
  lunch:     { planned: number; actual: number; leftover: number };
  dinner:    { planned: number; actual: number; leftover: number };
}

export interface NGOAlert {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  leftoverQty: string;
  date: string;
  status: 'Pending' | 'Accepted' | 'Completed';
  ngoName?: string;
  location: string;
}

export interface PickupSchedule {
  id: string;
  ngoName: string;
  ngoContact: string;
  date: string;
  time: string;
  foodType: string;
  quantity: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  alertId?: string;
}

export interface FeedbackEntry {
  id: string;
  studentName: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  qualityRating: number; // 1-5
  quantityRating: number; // 1-5
  comment: string;
  tags: string[];
}

export interface RewardTier {
  name: string;
  minPoints: number;
  color: string;
  badge: string;
}

// ── Seed Students ──────────────────────────────────────────────────

export const students: Student[] = [
  { id: 's1', name: 'Arjun Sharma',    roll: 'CS21001', room: '101', hostel: 'Block A', points: 420, confirmedMeals: 84, wastedMeals: 2,  avatar: 'AS', badges: ['Early Bird', 'Eco Champion'] },
  { id: 's2', name: 'Priya Patel',     roll: 'EC21045', room: '202', hostel: 'Block B', points: 360, confirmedMeals: 72, wastedMeals: 4,  avatar: 'PP', badges: ['Consistent']               },
  { id: 's3', name: 'Rahul Verma',     roll: 'ME21023', room: '305', hostel: 'Block A', points: 280, confirmedMeals: 56, wastedMeals: 8,  avatar: 'RV', badges: ['Regular']                   },
  { id: 's4', name: 'Sneha Iyer',      roll: 'CS21067', room: '110', hostel: 'Block C', points: 510, confirmedMeals: 102, wastedMeals: 1, avatar: 'SI', badges: ['Top Saver', 'Eco Champion'] },
  { id: 's5', name: 'Vikram Nair',     roll: 'EE21012', room: '220', hostel: 'Block B', points: 195, confirmedMeals: 39, wastedMeals: 12, avatar: 'VN', badges: []                             },
  { id: 's6', name: 'Ananya Gupta',    roll: 'CS21089', room: '408', hostel: 'Block D', points: 450, confirmedMeals: 90, wastedMeals: 3,  avatar: 'AG', badges: ['Eco Champion']               },
  { id: 's7', name: 'Karthik Menon',   roll: 'IT21034', room: '115', hostel: 'Block A', points: 320, confirmedMeals: 64, wastedMeals: 5,  avatar: 'KM', badges: ['Regular']                   },
  { id: 's8', name: 'Meera Krishnan',  roll: 'CS21056', room: '301', hostel: 'Block C', points: 380, confirmedMeals: 76, wastedMeals: 4,  avatar: 'MK', badges: ['Consistent']                },
];

// ── Meal History (last 7 days) ─────────────────────────────────────

export const mealHistory: MealPlan[] = [
  { date: '2026-04-16', breakfast: { planned: 280, actual: 245, leftover: 35 }, lunch: { planned: 310, actual: 298, leftover: 12 }, dinner: { planned: 300, actual: 272, leftover: 28 } },
  { date: '2026-04-17', breakfast: { planned: 285, actual: 260, leftover: 25 }, lunch: { planned: 315, actual: 310, leftover: 5  }, dinner: { planned: 305, actual: 280, leftover: 25 } },
  { date: '2026-04-18', breakfast: { planned: 275, actual: 240, leftover: 35 }, lunch: { planned: 305, actual: 290, leftover: 15 }, dinner: { planned: 295, actual: 265, leftover: 30 } },
  { date: '2026-04-19', breakfast: { planned: 290, actual: 270, leftover: 20 }, lunch: { planned: 320, actual: 315, leftover: 5  }, dinner: { planned: 310, actual: 288, leftover: 22 } },
  { date: '2026-04-20', breakfast: { planned: 270, actual: 255, leftover: 15 }, lunch: { planned: 300, actual: 285, leftover: 15 }, dinner: { planned: 290, actual: 260, leftover: 30 } },
  { date: '2026-04-21', breakfast: { planned: 288, actual: 265, leftover: 23 }, lunch: { planned: 318, actual: 300, leftover: 18 }, dinner: { planned: 308, actual: 278, leftover: 30 } },
  { date: '2026-04-22', breakfast: { planned: 292, actual: 268, leftover: 24 }, lunch: { planned: 322, actual: 305, leftover: 17 }, dinner: { planned: 312, actual: 282, leftover: 30 } },
];

// ── Seed NGO Alerts ────────────────────────────────────────────────

export const ngoAlerts: NGOAlert[] = [
  { id: 'a1', mealType: 'Dinner',    leftoverQty: '28 kg / ~112 plates', date: '2026-04-22', status: 'Pending',   location: 'Hostel Mess, Block A, IIT Campus' },
  { id: 'a2', mealType: 'Breakfast', leftoverQty: '35 kg / ~140 portions', date: '2026-04-22', status: 'Accepted', ngoName: 'Roti Bank', location: 'Hostel Mess, Block A, IIT Campus' },
  { id: 'a3', mealType: 'Lunch',     leftoverQty: '12 kg / ~48 plates',  date: '2026-04-21', status: 'Completed', ngoName: 'Annadaata NGO', location: 'Hostel Mess, Block A, IIT Campus' },
];

// ── Seed Pickup Schedules ──────────────────────────────────────────

export const pickupSchedules: PickupSchedule[] = [
  { id: 'p1', ngoName: 'Roti Bank',      ngoContact: '+91-9876501234', date: '2026-04-23', time: '09:00', foodType: 'Breakfast leftovers', quantity: '35 kg', status: 'Scheduled',  alertId: 'a2' },
  { id: 'p2', ngoName: 'Annadaata NGO',  ngoContact: '+91-9988001122', date: '2026-04-21', time: '14:30', foodType: 'Lunch leftovers',    quantity: '12 kg', status: 'Completed',  alertId: 'a3' },
  { id: 'p3', ngoName: 'Feed the Hungry',ngoContact: '+91-9456001122', date: '2026-04-20', time: '20:00', foodType: 'Dinner leftovers',   quantity: '30 kg', status: 'Completed'               },
];

// ── Seed Feedback ──────────────────────────────────────────────────

export const feedbackEntries: FeedbackEntry[] = [
  { id: 'f1', studentName: 'Arjun Sharma',   date: '2026-04-22', mealType: 'Lunch',     qualityRating: 4, quantityRating: 5, comment: 'Dal makhani was excellent today!',          tags: ['Tasty', 'Good Portion'] },
  { id: 'f2', studentName: 'Priya Patel',    date: '2026-04-22', mealType: 'Breakfast',  qualityRating: 3, quantityRating: 4, comment: 'Bread was a bit dry, but poha was good.',  tags: ['Average', 'Could Improve'] },
  { id: 'f3', studentName: 'Sneha Iyer',     date: '2026-04-21', mealType: 'Dinner',    qualityRating: 5, quantityRating: 4, comment: 'Loved the paneer bhurji and roti!',          tags: ['Excellent', 'Tasty'] },
  { id: 'f4', studentName: 'Rahul Verma',    date: '2026-04-21', mealType: 'Lunch',     qualityRating: 2, quantityRating: 3, comment: 'Rice was undercooked. Please fix this.',    tags: ['Poor Quality', 'Undercooked'] },
  { id: 'f5', studentName: 'Vikram Nair',    date: '2026-04-20', mealType: 'Breakfast',  qualityRating: 4, quantityRating: 4, comment: 'South Indian breakfast is always great.',   tags: ['Tasty', 'Good Portion'] },
];

// ── Reward Tiers ───────────────────────────────────────────────────

export const rewardTiers: RewardTier[] = [
  { name: 'Bronze',   minPoints: 0,   color: '#cd7f32', badge: '🥉' },
  { name: 'Silver',   minPoints: 200, color: '#9ca3af', badge: '🥈' },
  { name: 'Gold',     minPoints: 350, color: '#f59e0b', badge: '🥇' },
  { name: 'Platinum', minPoints: 500, color: '#06b6d4', badge: '💎' },
];
