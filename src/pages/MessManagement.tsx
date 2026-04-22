import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UtensilsCrossed, TrendingDown, Calendar, ChevronDown } from 'lucide-react';
import { mealHistory } from '../data/mess';
import { useFoodContext } from '../context/FoodContext';
import ChartComponent from '../components/ChartComponent';

const TODAY = mealHistory[mealHistory.length - 1];

function pct(actual: number, planned: number) {
  return ((actual / planned) * 100).toFixed(0);
}

export default function MessManagement() {
  const { students, attendance } = useFoodContext();
  const [selectedDate, setSelectedDate] = useState(TODAY.date);
  const day = mealHistory.find(d => d.date === selectedDate) || TODAY;

  // Chart data: 7-day leftover trend
  const leftoverTrend = mealHistory.map(d => ({
    date: d.date.slice(5),
    Breakfast: d.breakfast.leftover,
    Lunch: d.lunch.leftover,
    Dinner: d.dinner.leftover,
  }));

  const todayAttendance = attendance.filter(a => a.date === new Date().toISOString().slice(0, 10)).length;

  const meals = [
    { name: 'Breakfast', data: day.breakfast, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: '🌅' },
    { name: 'Lunch',     data: day.lunch,     color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100', icon: '☀️'  },
    { name: 'Dinner',    data: day.dinner,    color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100', icon: '🌙' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🏫 Smart Mess Management
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Hostel Mess <span className="gradient-text">Dashboard</span></h1>
          <p className="text-gray-500">Track daily meal attendance, food production, and leftover data for your hostel mess.</p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Students', val: 320, icon: <Users className="w-5 h-5" />, bg: 'bg-blue-50', c: 'text-blue-600' },
            { label: 'QR Confirmations Today', val: todayAttendance + 268, icon: <span>📱</span>, bg: 'bg-green-50', c: 'text-green-600' },
            { label: 'Today\'s Leftover', val: `${day.breakfast.leftover + day.lunch.leftover + day.dinner.leftover} kg`, icon: <UtensilsCrossed className="w-5 h-5" />, bg: 'bg-amber-50', c: 'text-amber-600' },
            { label: 'Waste Reduction', val: '18%', icon: <TrendingDown className="w-5 h-5" />, bg: 'bg-purple-50', c: 'text-purple-600' },
          ].map(({ label, val, icon, bg, c }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className={`${bg} rounded-2xl p-5 border border-white shadow-sm`}>
              <div className={`mb-3 ${c}`}>{icon}</div>
              <div className="text-2xl font-extrabold text-gray-900">{val}</div>
              <div className="text-sm text-gray-500 mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Date Selector + Meal Cards */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Meal-wise Breakdown</h2>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none bg-white"
              >
                {mealHistory.map(d => (
                  <option key={d.date} value={d.date}>{d.date}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {meals.map(({ name, data, color, bg, border, icon }) => (
              <div key={name} className={`${bg} rounded-xl border ${border} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{icon}</span>
                  <h3 className={`font-bold ${color}`}>{name}</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Planned',     val: data.planned },
                    { label: 'Actual',      val: data.actual },
                    { label: 'Leftover',    val: data.leftover },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-bold text-gray-900">{val} portions</span>
                    </div>
                  ))}
                </div>
                {/* Efficiency bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Efficiency</span>
                    <span>{pct(data.actual, data.planned)}%</span>
                  </div>
                  <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${pct(data.actual, data.planned)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leftover Trend Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-1">7-Day Leftover Trend</h3>
          <p className="text-xs text-gray-400 mb-5">Daily leftover per meal type (in portions)</p>
          <ChartComponent type="bar" data={leftoverTrend} dataKeys={['Breakfast','Lunch','Dinner']}
            xKey="date" colors={['#f59e0b','#16a34a','#6366f1']} height={240} />
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5">Student Attendance Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Student','Roll No','Room','Confirmations','Points','Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wide pb-3 pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{s.avatar}</div>
                        <span className="font-medium text-gray-900">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-6 text-gray-500">{s.roll}</td>
                    <td className="py-3 pr-6 text-gray-500">{s.room}, {s.hostel}</td>
                    <td className="py-3 pr-6 font-semibold text-gray-900">{s.confirmedMeals}</td>
                    <td className="py-3 pr-6">
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">{s.points} pts</span>
                    </td>
                    <td className="py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.wastedMeals <= 3 ? 'bg-green-100 text-green-700' : s.wastedMeals <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                        {s.wastedMeals <= 3 ? '🟢 Eco Hero' : s.wastedMeals <= 7 ? '🟡 Improving' : '🔴 High Waste'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
