import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Truck, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';

type PickupStatus = 'Scheduled' | 'Completed' | 'Cancelled';

const statusConfig: Record<PickupStatus, { label: string; style: string; dot: string }> = {
  Scheduled:  { label: 'Scheduled',  style: 'bg-blue-100 text-blue-700 border-blue-200',    dot: 'bg-blue-500'  },
  Completed:  { label: 'Completed',  style: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
  Cancelled:  { label: 'Cancelled',  style: 'bg-red-100 text-red-600 border-red-200',       dot: 'bg-red-500'   },
};

const FOOD_TYPES = ['Breakfast leftovers', 'Lunch leftovers', 'Dinner leftovers', 'Pantry surplus', 'Fresh produce'];

export default function PickupSchedule() {
  const { pickups, schedulePickup, completePickup, cancelPickup } = useFoodContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    ngoName: '', ngoContact: '', date: '', time: '14:00', foodType: FOOD_TYPES[0], quantity: '', status: 'Scheduled' as PickupStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ngoName.trim() || !form.date || !form.quantity.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    schedulePickup(form);
    toast.success(`🚐 Pickup scheduled for ${form.ngoName} on ${form.date} at ${form.time}`);
    setShowForm(false);
    setForm({ ngoName: '', ngoContact: '', date: '', time: '14:00', foodType: FOOD_TYPES[0], quantity: '', status: 'Scheduled' });
  };

  const scheduled  = pickups.filter(p => p.status === 'Scheduled');
  const completed  = pickups.filter(p => p.status === 'Completed');
  const cancelled  = pickups.filter(p => p.status === 'Cancelled');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🚐 Pickup Scheduling
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Donation Pickup <span className="gradient-text">Scheduler</span>
          </h1>
          <p className="text-gray-500">NGOs can schedule pickup slots for surplus food. Mess managers can track and manage all collections.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Upcoming Pickups', val: scheduled.length,  icon: <Truck className="w-5 h-5" />, bg: 'bg-blue-50',  c: 'text-blue-600'  },
            { label: 'Completed',        val: completed.length,  icon: <CheckCircle className="w-5 h-5" />, bg: 'bg-green-50', c: 'text-green-600' },
            { label: 'Cancelled',        val: cancelled.length,  icon: <XCircle className="w-5 h-5" />, bg: 'bg-red-50',  c: 'text-red-600'   },
          ].map(({ label, val, icon, bg, c }) => (
            <div key={label} className={`${bg} rounded-2xl border border-white shadow-sm p-5 flex items-center gap-4`}>
              <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center ${c} shadow-sm`}>{icon}</div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{val}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule button */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-gray-900">All Pickups</h2>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Schedule Pickup
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
              <h3 className="font-bold text-gray-900 mb-5">🚐 New Pickup Schedule</h3>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">NGO Name <span className="text-red-500">*</span></label>
                  <input required placeholder="e.g. Roti Bank" value={form.ngoName}
                    onChange={e => setForm(p => ({ ...p, ngoName: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Contact Number</label>
                  <input placeholder="+91-XXXXXXXXXX" value={form.ngoContact}
                    onChange={e => setForm(p => ({ ...p, ngoContact: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Pickup Date <span className="text-red-500">*</span></label>
                  <input type="date" required value={form.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Pickup Time</label>
                  <input type="time" value={form.time}
                    onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Food Type</label>
                  <select value={form.foodType} onChange={e => setForm(p => ({ ...p, foodType: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                    {FOOD_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Estimated Quantity <span className="text-red-500">*</span></label>
                  <input required placeholder="e.g. 25 kg" value={form.quantity}
                    onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div className="sm:col-span-2 flex gap-3">
                  <button type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Confirm Schedule
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pickups list */}
        <div className="space-y-4">
          {pickups.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🚐</div>
              <p className="font-semibold">No pickups scheduled yet</p>
              <p className="text-sm mt-1">Click "Schedule Pickup" to get started</p>
            </div>
          )}
          {pickups.map(p => {
            const cfg = statusConfig[p.status];
            return (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-bold text-gray-900">{p.ngoName}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1 ${cfg.style}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.time}</span>
                        <span>📦 {p.quantity}</span>
                        <span>🍱 {p.foodType}</span>
                        {p.ngoContact && <span>📞 {p.ngoContact}</span>}
                      </div>
                    </div>
                  </div>
                  {p.status === 'Scheduled' && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { completePickup(p.id); toast.success('✅ Pickup completed!'); }}
                        className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-green-700 transition-colors">
                        Mark Done
                      </button>
                      <button onClick={() => { cancelPickup(p.id); toast('❌ Pickup cancelled', { icon: '🚫' }); }}
                        className="bg-red-100 text-red-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-red-200 transition-colors">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
