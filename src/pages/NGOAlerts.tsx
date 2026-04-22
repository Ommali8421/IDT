import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, Clock, XCircle, Plus } from 'lucide-react';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';

const THRESHOLD_KG = 20; // alert if leftover > 20 kg

type AlertStatus = 'Pending' | 'Accepted' | 'Completed';

const statusConfig: Record<AlertStatus, { label: string; style: string }> = {
  Pending:   { label: '🔴 Pending',   style: 'bg-red-100 text-red-700 border-red-200'     },
  Accepted:  { label: '🟡 Accepted',  style: 'bg-amber-100 text-amber-700 border-amber-200'},
  Completed: { label: '🟢 Completed', style: 'bg-green-100 text-green-700 border-green-200' },
};

export default function NGOAlerts() {
  const { alerts, acceptAlert, completeAlert, addAlert, schedulePickup } = useFoodContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ mealType: 'Dinner' as 'Breakfast' | 'Lunch' | 'Dinner', leftoverQty: '', ngoName: '' });
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [ngoInput, setNgoInput] = useState('');

  const handleCreate = () => {
    if (!form.leftoverQty.trim()) { toast.error('Enter leftover quantity'); return; }
    addAlert({
      mealType: form.mealType,
      leftoverQty: form.leftoverQty,
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
      location: 'Hostel Mess, Block A, IIT Campus',
    });
    toast.success('🔔 Alert sent to all registered NGOs!');
    setShowForm(false);
    setForm({ mealType: 'Dinner', leftoverQty: '', ngoName: '' });
  };

  const handleAccept = (alertId: string) => {
    if (!ngoInput.trim()) { toast.error('Enter NGO name'); return; }
    acceptAlert(alertId, ngoInput);
    schedulePickup({
      ngoName: ngoInput,
      ngoContact: '+91-9000000000',
      date: new Date().toISOString().slice(0, 10),
      time: '20:00',
      foodType: 'Mess leftovers',
      quantity: alerts.find(a => a.id === alertId)?.leftoverQty || '',
      status: 'Scheduled',
      alertId,
    });
    toast.success(`✅ ${ngoInput} accepted the alert! Pickup scheduled.`);
    setAcceptingId(null);
    setNgoInput('');
  };

  const handleComplete = (id: string) => {
    completeAlert(id);
    toast.success('🎉 Food successfully redistributed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🔔 Leftover Alert System
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Leftover Food <span className="gradient-text">Alerts</span>
          </h1>
          <p className="text-gray-500">
            When excess food exceeds {THRESHOLD_KG} kg, alerts are automatically dispatched to registered NGOs and shelters.
          </p>
        </motion.div>

        {/* Summary bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active Alerts',    val: alerts.filter(a => a.status === 'Pending').length,   color: 'bg-red-50 text-red-700',     icon: '🔴' },
            { label: 'Accepted by NGOs', val: alerts.filter(a => a.status === 'Accepted').length,  color: 'bg-amber-50 text-amber-700', icon: '🔔' },
            { label: 'Completed',        val: alerts.filter(a => a.status === 'Completed').length, color: 'bg-green-50 text-green-700', icon: '✅' },
          ].map(({ label, val, color, icon }) => (
            <div key={label} className={`${color} rounded-2xl border border-current/20 p-5 text-center`}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-3xl font-extrabold">{val}</div>
              <div className="text-sm opacity-75 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Create Alert Button */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-bold text-gray-900">All Alerts</h2>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" /> Create Alert
          </button>
        </div>

        {/* Create Alert Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
              <h3 className="font-bold text-gray-900 mb-4">🔔 New Leftover Alert</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Meal Type</label>
                  <select value={form.mealType} onChange={e => setForm(p => ({ ...p, mealType: e.target.value as 'Breakfast'|'Lunch'|'Dinner' }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400">
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Leftover Quantity</label>
                  <input placeholder="e.g. 25 kg / ~100 plates" value={form.leftoverQty}
                    onChange={e => setForm(p => ({ ...p, leftoverQty: e.target.value }))}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleCreate}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Send Alert to NGOs
                </button>
                <button onClick={() => setShowForm(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alerts list */}
        <div className="space-y-4">
          {alerts.map(alert => {
            const cfg = statusConfig[alert.status];
            return (
              <motion.div key={alert.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                layout className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Bell className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-gray-900 text-lg">
                        {alert.mealType} Leftover Alert
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.style}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">📦 Quantity: <strong>{alert.leftoverQty}</strong></p>
                    <p className="text-sm text-gray-500">📍 {alert.location}</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {alert.date}
                      {alert.ngoName && <span className="ml-4 font-semibold text-green-700">✅ {alert.ngoName}</span>}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {alert.status === 'Pending' && (
                      acceptingId === alert.id ? (
                        <div className="flex gap-2">
                          <input placeholder="NGO Name" value={ngoInput} onChange={e => setNgoInput(e.target.value)}
                            className="px-3 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 w-40" />
                          <button onClick={() => handleAccept(alert.id)}
                            className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => setAcceptingId(null)}
                            className="bg-gray-100 text-gray-600 text-sm font-semibold px-3 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setAcceptingId(alert.id)}
                          className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                          Accept as NGO
                        </button>
                      )
                    )}
                    {alert.status === 'Accepted' && (
                      <button onClick={() => handleComplete(alert.id)}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        Mark Complete
                      </button>
                    )}
                    {alert.status === 'Completed' && (
                      <span className="text-green-600 font-semibold text-sm flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Food Redistributed
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
