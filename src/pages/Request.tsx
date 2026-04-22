import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import FormInput from '../components/FormInput';
import FoodCard from '../components/FoodCard';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';

const URGENCY_OPTIONS = [
  { value: 'Low', label: '🟢 Low – Within 24 hours' },
  { value: 'Medium', label: '🟡 Medium – Within 6 hours' },
  { value: 'High', label: '🔴 High – ASAP' },
];

const CITIES = ['','Mumbai','Delhi','Bengaluru','Chennai','Hyderabad','Pune','Jaipur','Kolkata'].map(c => ({ value: c, label: c || 'Any City' }));

export default function Request() {
  const { donations } = useFoodContext();
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [form, setForm] = useState({ ngoName: '', location: '', requiredQty: '', urgency: 'Medium' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const available = donations.filter(d =>
    d.status === 'Available' &&
    (search === '' || d.food.toLowerCase().includes(search.toLowerCase()) || d.location.toLowerCase().includes(search.toLowerCase())) &&
    (filterCity === '' || d.location === filterCity)
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.ngoName.trim())    e.ngoName     = 'Name is required';
    if (!form.location)          e.location     = 'City is required';
    if (!form.requiredQty.trim()) e.requiredQty = 'Quantity is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    toast.success('✅ Food request submitted successfully!');
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ ngoName: '', location: '', requiredQty: '', urgency: 'Medium' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Request <span className="gradient-text">Food</span></h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">NGOs and individuals can request surplus food directly from available listings.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Submit a Request</h2>
              {submitted && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                  ✅ Request submitted! An NGO coordinator will reach out shortly.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <FormInput label="NGO / Person Name" placeholder="e.g. Roti Bank" required
                  value={form.ngoName} onChange={e => setForm(p => ({ ...p, ngoName: e.target.value }))} error={errors.ngoName} />
                <FormInput as="select" label="Your City" required options={CITIES}
                  value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} error={errors.location} />
                <FormInput label="Required Quantity" placeholder="e.g. 30 plates / 10 kg" required
                  value={form.requiredQty} onChange={e => setForm(p => ({ ...p, requiredQty: e.target.value }))} error={errors.requiredQty} />
                <FormInput as="select" label="Urgency Level" required
                  options={[{ value: '', label: 'Select urgency...' }, ...URGENCY_OPTIONS]}
                  value={form.urgency} onChange={e => setForm(p => ({ ...p, urgency: e.target.value }))} />
                <button type="submit" disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  {loading ? <><span className="spinner !w-4 !h-4 !border-2" />Submitting...</> : 'Submit Request'}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Listings */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search food or city..."
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={filterCity}
                  onChange={e => setFilterCity(e.target.value)}
                  className="pl-10 pr-8 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                >
                  {CITIES.map(c => <option key={c.value} value={c.value}>{c.label || 'All Cities'}</option>)}
                </select>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              <MapPin className="w-4 h-4 inline text-green-500 mr-1" />
              {available.length} donations available {filterCity ? `in ${filterCity}` : 'near you'}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatePresence>
                {available.length === 0 ? (
                  <div className="col-span-2 text-center py-16 text-gray-400">
                    <div className="text-5xl mb-3">🍽️</div>
                    <p className="font-semibold">No donations found</p>
                    <p className="text-sm mt-1">Try a different search or city filter</p>
                  </div>
                ) : (
                  available.map(d => <FoodCard key={d.id} donation={d} />)
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
