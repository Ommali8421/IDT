import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, CheckCircle } from 'lucide-react';
import FormInput from '../components/FormInput';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';

interface FormData {
  donor: string;
  contact: string;
  location: string;
  food: string;
  category: string;
  quantity: string;
  expiry: string;
  expiryHours: string;
}

const CATEGORIES = [
  { value: '', label: 'Select category...' },
  { value: 'Cooked', label: 'Cooked Meals' },
  { value: 'Raw', label: 'Raw Produce' },
  { value: 'Packaged', label: 'Packaged Goods' },
  { value: 'Fruits & Veggies', label: 'Fruits & Vegetables' },
  { value: 'Beverages', label: 'Beverages' },
];

const EXPIRY_OPTIONS = [
  { value: '', label: 'Select expiry time...' },
  { value: '1', label: '1 hour' },
  { value: '2', label: '2 hours' },
  { value: '4', label: '4 hours' },
  { value: '6', label: '6 hours' },
  { value: '12', label: '12 hours' },
  { value: '24', label: '24 hours' },
  { value: '48', label: '2 days' },
  { value: '72', label: '3+ days' },
];

const CITIES = [
  { value: '', label: 'Select city...' },
  ...['Mumbai','Delhi','Bengaluru','Chennai','Hyderabad','Pune','Jaipur','Kolkata','Ahmedabad','Surat']
    .map(c => ({ value: c, label: c }))
];

const initialForm: FormData = {
  donor: '', contact: '', location: '', food: '',
  category: '', quantity: '', expiry: '', expiryHours: '',
};

export default function Donate() {
  const { addDonation } = useFoodContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.donor.trim())    errs.donor    = 'Name is required';
    if (!form.location)        errs.location  = 'City is required';
    if (!form.food.trim())     errs.food      = 'Food name is required';
    if (!form.category)        errs.category  = 'Category is required';
    if (!form.quantity.trim()) errs.quantity  = 'Quantity is required';
    if (!form.expiryHours)     errs.expiryHours = 'Expiry is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));

    // Auto-populate expiry label when hours selected
    if (field === 'expiryHours') {
      const opt = EXPIRY_OPTIONS.find(o => o.value === value);
      setForm(prev => ({ ...prev, expiryHours: value, expiry: opt?.label || '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // simulate async

    addDonation({
      donor:       form.donor,
      contact:     form.contact || 'Not provided',
      location:    form.location,
      food:        form.food,
      category:    form.category as 'Cooked' | 'Raw' | 'Packaged' | 'Fruits & Veggies' | 'Beverages',
      quantity:    form.quantity,
      expiry:      form.expiry || `${form.expiryHours} hours`,
      expiryHours: Number(form.expiryHours),
    });

    setLoading(false);
    setSubmitted(true);
    toast.success('🎉 Donation listed! Thank you for your generosity.');
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 text-center shadow-xl border border-green-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Donation Listed! 🎉</h2>
          <p className="text-gray-500 mb-2">Your <strong className="text-gray-800">{form.food}</strong> ({form.quantity}) is now visible to NGOs and people in need.</p>
          <p className="text-sm text-gray-400 mb-8">Location: {form.location} · Expires: {form.expiry}</p>
          <div className="flex gap-3">
            <button onClick={() => { setForm(initialForm); setSubmitted(false); }}
              className="flex-1 border-2 border-green-200 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors">
              Add Another
            </button>
            <button onClick={() => navigate('/listings')}
              className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors">
              View Listings
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Leaf className="w-4 h-4" /> Donate Surplus Food
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">List Your <span className="gradient-text">Donation</span></h1>
          <p className="text-gray-500">Fill in the details about your surplus food. NGOs and people in need will be able to see and request it.</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-5"
        >
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Donor Information</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput label="Your Name / Organization" placeholder="e.g. Hotel Spice Garden" required
              value={form.donor} onChange={e => handleChange('donor', e.target.value)} error={errors.donor} />
            <FormInput label="Contact Number" placeholder="+91-XXXXXXXXXX" type="tel"
              value={form.contact} onChange={e => handleChange('contact', e.target.value)} />
          </div>

          <FormInput as="select" label="City / Location" required options={CITIES}
            value={form.location} onChange={e => handleChange('location', e.target.value)} error={errors.location} />

          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 pt-2">Food Details</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput label="Food Name" placeholder="e.g. Rice & Dal" required
              value={form.food} onChange={e => handleChange('food', e.target.value)} error={errors.food} />
            <FormInput as="select" label="Category" required options={CATEGORIES}
              value={form.category} onChange={e => handleChange('category', e.target.value)} error={errors.category} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <FormInput label="Quantity" placeholder="e.g. 20 plates, 5 kg" required
              value={form.quantity} onChange={e => handleChange('quantity', e.target.value)} error={errors.quantity} />
            <FormInput as="select" label="Best Before (from now)" required options={EXPIRY_OPTIONS}
              value={form.expiryHours} onChange={e => handleChange('expiryHours', e.target.value)} error={errors.expiryHours} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 rounded-xl transition-all text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="spinner !w-5 !h-5 !border-2" />Listing your donation...</>
            ) : (
              <><Leaf className="w-5 h-5" />List Donation</>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
