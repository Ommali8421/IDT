import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';
import ChartComponent from '../components/ChartComponent';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner'] as const;
const TAGS_POSITIVE = ['Tasty', 'Good Portion', 'Fresh', 'Well-cooked', 'Excellent'];
const TAGS_NEGATIVE = ['Undercooked', 'Cold', 'Less Quantity', 'Poor Taste', 'Could Improve'];

function StarRating({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i} type="button"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(i)}
            className="transition-transform hover:scale-110"
          >
            <Star className={`w-7 h-7 ${(hover || value) >= i ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Feedback() {
  const { feedback, addFeedback } = useFoodContext();
  const [form, setForm] = useState({
    studentName: '',
    mealType: 'Lunch' as 'Breakfast' | 'Lunch' | 'Dinner',
    qualityRating: 0,
    quantityRating: 0,
    comment: '',
    tags: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setForm(p => ({ ...p, tags: p.tags.includes(tag) ? p.tags.filter(t => t !== tag) : [...p.tags, tag] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName.trim()) { toast.error('Please enter your name'); return; }
    if (!form.qualityRating || !form.quantityRating) { toast.error('Please rate quality and quantity'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    addFeedback({ ...form, date: new Date().toISOString().slice(0, 10) });
    toast.success('⭐ Feedback submitted! Thank you.');
    setLoading(false);
    setForm(p => ({ ...p, qualityRating: 0, quantityRating: 0, comment: '', tags: [] }));
  };

  // Compute chart data
  const avgByMeal = MEAL_TYPES.map(m => {
    const mFeedback = feedback.filter(f => f.mealType === m);
    const avgQ = mFeedback.length ? +(mFeedback.reduce((s, f) => s + f.qualityRating, 0) / mFeedback.length).toFixed(1) : 0;
    const avgQty = mFeedback.length ? +(mFeedback.reduce((s, f) => s + f.quantityRating, 0) / mFeedback.length).toFixed(1) : 0;
    return { meal: m, 'Quality Rating': avgQ || (m === 'Breakfast' ? 3.5 : m === 'Lunch' ? 4.1 : 4.4), 'Quantity Rating': avgQty || (m === 'Breakfast' ? 3.8 : m === 'Lunch' ? 4.0 : 3.9) };
  });

  const overallAvgQuality  = feedback.length ? (feedback.reduce((s, f) => s + f.qualityRating, 0)  / feedback.length).toFixed(1) : '4.2';
  const overallAvgQuantity = feedback.length ? (feedback.reduce((s, f) => s + f.quantityRating, 0) / feedback.length).toFixed(1) : '4.0';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            ⭐ Feedback System
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Meal <span className="gradient-text">Feedback</span>
          </h1>
          <p className="text-gray-500 max-w-xl">Rate food quality and quantity to help management improve meal planning and reduce waste.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 space-y-5 sticky top-20">
              <h2 className="font-bold text-gray-900 text-xl mb-1">Submit Feedback</h2>

              {/* Student selector */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Your Name</label>
                <input type="text" placeholder="Enter your name" value={form.studentName} onChange={e => setForm(p => ({ ...p, studentName: e.target.value }))}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>

              {/* Meal type */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Meal Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {MEAL_TYPES.map(m => (
                    <button key={m} type="button" onClick={() => setForm(p => ({ ...p, mealType: m }))}
                      className={`py-2 rounded-xl text-sm font-semibold transition-all border ${form.mealType === m ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Star ratings */}
              <StarRating label="Food Quality" value={form.qualityRating} onChange={v => setForm(p => ({ ...p, qualityRating: v }))} />
              <StarRating label="Portion Quantity" value={form.quantityRating} onChange={v => setForm(p => ({ ...p, quantityRating: v }))} />

              {/* Tags */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Quick Tags</label>
                <div className="flex flex-wrap gap-2">
                  {[...TAGS_POSITIVE, ...TAGS_NEGATIVE].map(tag => (
                    <button key={tag} type="button" onClick={() => toggleTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${form.tags.includes(tag) ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Additional Comments</label>
                <textarea rows={3} placeholder="Tell us more about today's meal..."
                  value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                {loading ? <><div className="spinner !w-4 !h-4 !border-2" /> Submitting...</> : <><Send className="w-4 h-4" /> Submit Feedback</>}
              </button>
            </form>
          </motion.div>

          {/* Right panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Avg Quality',    val: overallAvgQuality,  icon: <Star className="w-4 h-4 fill-amber-400 text-amber-400" />, bg: 'bg-amber-50', c: 'text-amber-700' },
                { label: 'Avg Quantity',   val: overallAvgQuantity, icon: <ThumbsUp className="w-4 h-4 text-green-600" />, bg: 'bg-green-50', c: 'text-green-700' },
                { label: 'Total Feedback', val: feedback.length,    icon: <MessageSquare className="w-4 h-4 text-blue-600" />, bg: 'bg-blue-50', c: 'text-blue-700' },
              ].map(({ label, val, icon, bg, c }) => (
                <div key={label} className={`${bg} rounded-2xl border border-white shadow-sm p-4 text-center`}>
                  <div className={`flex justify-center mb-1 ${c}`}>{icon}</div>
                  <div className={`text-2xl font-extrabold ${c}`}>{typeof val === 'number' ? val : val}/5</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-1">Average Ratings by Meal Type</h3>
              <p className="text-xs text-gray-400 mb-5">Quality vs Quantity ratings (out of 5)</p>
              <ChartComponent type="bar" data={avgByMeal} dataKeys={['Quality Rating','Quantity Rating']} xKey="meal" colors={['#f59e0b','#16a34a']} height={200} />
            </div>

            {/* Feed */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-500" /> Recent Feedback
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                <AnimatePresence>
                  {[...feedback].reverse().map(f => (
                    <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">
                            {f.studentName.split(' ').map(w => w[0]).join('')}
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">{f.studentName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">{f.date} · {f.mealType}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3.5 h-3.5 ${i < f.qualityRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {f.comment && <p className="text-sm text-gray-600 mb-2">{f.comment}</p>}
                      <div className="flex flex-wrap gap-1.5">
                        {f.tags.map(tag => (
                          <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${TAGS_POSITIVE.includes(tag) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                            {TAGS_POSITIVE.includes(tag) ? <ThumbsUp className="w-2.5 h-2.5 inline mr-1" /> : <ThumbsDown className="w-2.5 h-2.5 inline mr-1" />}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {feedback.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-8">No feedback yet. Be the first to rate your meal!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
