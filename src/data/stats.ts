// ── Dashboard analytics dummy data ──

export const overviewStats = {
  totalDonated: 4820,      // kg
  totalDistributed: 3940,  // kg
  wasteReduced: 880,       // kg prevented from landfill
  co2Saved: 1584,          // kg CO2 (1 kg food waste ≈ 1.8 kg CO2)
  mealsServed: 19200,
  activeDonors: 142,
  activeNGOs: 23,
  citiesCovered: 12,
};

// Line chart: last 7 days daily donations (kg)
export const weeklyDonations = [
  { day: 'Mon', donated: 580, distributed: 460 },
  { day: 'Tue', donated: 720, distributed: 610 },
  { day: 'Wed', donated: 640, distributed: 590 },
  { day: 'Thu', donated: 810, distributed: 700 },
  { day: 'Fri', donated: 950, distributed: 820 },
  { day: 'Sat', donated: 1120, distributed: 980 },
  { day: 'Sun', donated: 760, distributed: 650 },
];

// Pie chart: food category breakdown
export const categoryBreakdown = [
  { name: 'Cooked Meals', value: 42, color: '#16a34a' },
  { name: 'Raw Produce', value: 21, color: '#22c55e' },
  { name: 'Packaged Goods', value: 18, color: '#4ade80' },
  { name: 'Fruits & Veggies', value: 13, color: '#86efac' },
  { name: 'Beverages', value: 6,  color: '#bbf7d0' },
];

// Bar chart: city-wise distribution kg
export const cityDistribution = [
  { city: 'Mumbai',    donated: 1200, distributed: 980 },
  { city: 'Delhi',     donated: 980,  distributed: 800 },
  { city: 'Bengaluru', donated: 760,  distributed: 640 },
  { city: 'Hyderabad', donated: 640,  distributed: 510 },
  { city: 'Chennai',   donated: 520,  distributed: 430 },
  { city: 'Pune',      donated: 420,  distributed: 360 },
  { city: 'Jaipur',    donated: 300,  distributed: 220 },
];

// Area chart: monthly trend
export const monthlyTrend = [
  { month: 'Oct', donated: 9200 },
  { month: 'Nov', donated: 11400 },
  { month: 'Dec', donated: 14800 },
  { month: 'Jan', donated: 13200 },
  { month: 'Feb', donated: 15600 },
  { month: 'Mar', donated: 18900 },
  { month: 'Apr', donated: 21400 },
];
