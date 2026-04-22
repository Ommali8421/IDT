import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ScanLine, User } from 'lucide-react';
import { useFoodContext } from '../context/FoodContext';
import { students } from '../data/mess';
import toast from 'react-hot-toast';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;

export default function QRConfirm() {
  const { confirmMealQR, attendance, addRewardPoints } = useFoodContext();
  const [selectedMeal, setSelectedMeal] = useState<'Breakfast' | 'Lunch' | 'Dinner'>('Lunch');
  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [scanning, setScanning] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  // QR payload – in a real app this would be a signed JWT
  const qrPayload = JSON.stringify({
    studentId: selectedStudent.id,
    studentName: selectedStudent.name,
    roll: selectedStudent.roll,
    meal: selectedMeal,
    date: today,
    ts: Date.now(),
  });

  const alreadyConfirmed = attendance.some(
    a => a.studentId === selectedStudent.id && a.mealType === selectedMeal && a.date === today
  );

  const handleScan = async () => {
    if (alreadyConfirmed) {
      toast.error(`${selectedStudent.name} already confirmed ${selectedMeal} today!`);
      return;
    }
    setScanning(true);
    await new Promise(r => setTimeout(r, 1600)); // simulate scan
    confirmMealQR({
      studentId: selectedStudent.id,
      studentName: selectedStudent.name,
      date: today,
      mealType: selectedMeal,
      confirmedViaQR: true,
      attended: true,
    });
    addRewardPoints(selectedStudent.id, 10);
    setScanning(false);
    setConfirmed(true);
    toast.success(`✅ ${selectedStudent.name} confirmed for ${selectedMeal}! +10 pts`);
    setTimeout(() => setConfirmed(false), 4000);
  };

  const todayConfirmations = attendance.filter(a => a.date === today);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📱 QR Meal Confirmation
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            QR Code <span className="gradient-text">Meal Confirmation</span>
          </h1>
          <p className="text-gray-500 max-w-xl">
            Students scan a QR code before each meal to confirm attendance. This data feeds directly into the AI prediction model,
            helping the mess plan accurate quantities and eliminate waste.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* QR Generator */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-bold text-gray-900 text-xl mb-6">Generate Meal QR Code</h2>

            {/* Student selector */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-1.5">
                <User className="w-4 h-4" /> Select Student
              </label>
              <select
                value={selectedStudent.id}
                onChange={e => setSelectedStudent(students.find(s => s.id === e.target.value) || students[0])}
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>
                ))}
              </select>
            </div>

            {/* Meal selector */}
            <div className="mb-7">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Meal Type</label>
              <div className="grid grid-cols-3 gap-2">
                {MEAL_TYPES.map(m => (
                  <button key={m} onClick={() => setSelectedMeal(m)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                      selectedMeal === m
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
                    }`}>
                    {m === 'Breakfast' ? '🌅' : m === 'Lunch' ? '☀️' : '🌙'} {m}
                  </button>
                ))}
              </div>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                <QRCodeSVG value={qrPayload} size={180} fgColor="#166534" bgColor="#ffffff"
                  level="M" includeMargin={false} />
              </div>
              <p className="text-sm font-semibold text-gray-700">{selectedStudent.name}</p>
              <p className="text-xs text-gray-400">{selectedStudent.roll} · {selectedMeal} · {today}</p>
            </div>

            {/* Scan button (simulate) */}
            <button
              onClick={handleScan}
              disabled={scanning || alreadyConfirmed}
              className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-2xl text-base transition-all ${
                alreadyConfirmed
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {scanning ? (
                <><div className="spinner !w-5 !h-5 !border-2" /> Scanning...</>
              ) : alreadyConfirmed ? (
                <><CheckCircle className="w-5 h-5" /> Already Confirmed Today</>
              ) : (
                <><ScanLine className="w-5 h-5" /> Simulate QR Scan</>
              )}
            </button>

            {/* Success animation */}
            <AnimatePresence>
              {confirmed && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center">
                  <p className="text-green-700 font-bold">✅ Meal Confirmed! +10 Reward Points Earned</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Today's Confirmations */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-gray-900 text-xl">Today's Confirmations</h2>
              <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                {todayConfirmations.length + 268} / 320
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Attendance rate</span>
                <span>{(((todayConfirmations.length + 268) / 320) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${((todayConfirmations.length + 268) / 320) * 100}%` }} />
              </div>
            </div>

            {/* Meals breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {MEAL_TYPES.map(m => {
                const count = todayConfirmations.filter(a => a.mealType === m).length;
                return (
                  <div key={m} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                    <div className="text-lg">{m === 'Breakfast' ? '🌅' : m === 'Lunch' ? '☀️' : '🌙'}</div>
                    <div className="text-xl font-extrabold text-gray-900 mt-1">{count + (m === 'Breakfast' ? 91 : m === 'Lunch' ? 105 : 72)}</div>
                    <div className="text-xs text-gray-400">{m}</div>
                  </div>
                );
              })}
            </div>

            {/* Live feed */}
            <h3 className="font-semibold text-gray-700 text-sm mb-3">Live Feed</h3>
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {todayConfirmations.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">No confirmations yet today. Simulate a scan!</p>
              )}
              {[...todayConfirmations].reverse().map(a => (
                <div key={a.id} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-2.5 border border-green-100">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="font-semibold text-gray-900">{a.studentName}</span>
                    <span className="text-gray-500 ml-2">confirmed {a.mealType}</span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">+10 pts</span>
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="mt-5 bg-blue-50 rounded-xl p-4 border border-blue-100 text-xs text-blue-700">
              <strong>💡 How it works:</strong> Students scan their unique QR code at the mess entry before each meal.
              Data is instantly recorded, reducing over-cooking by enabling accurate headcounts.
              Early confirmations earn bonus points!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
