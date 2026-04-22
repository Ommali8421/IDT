import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Heart, TrendingDown, Users, Zap, CheckCircle } from 'lucide-react';

const stats = [
  { value: '1.3B', label: 'Tonnes of food wasted annually', icon: '🗑️' },
  { value: '33%',  label: 'Of all food produced is wasted',  icon: '📊' },
  { value: '800M', label: 'People go to sleep hungry',        icon: '😔' },
  { value: '$1T',  label: 'Economic loss from food waste',    icon: '💸' },
];

const steps = [
  { step: '01', title: 'Donate Surplus Food', desc: 'Restaurants, homes, and events list their surplus food with details like quantity and expiry.', icon: <Leaf className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
  { step: '02', title: 'NGOs Coordinate',     desc: 'Our platform alerts registered NGOs and food banks about available surplus food nearby.',      icon: <Users className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
  { step: '03', title: 'Feed Communities',    desc: 'Food gets redistributed to shelters, orphanages, and communities in need within hours.',        icon: <Heart className="w-6 h-6" />, color: 'bg-amber-100 text-amber-600' },
];

const impacts = [
  { icon: <TrendingDown className="w-5 h-5" />, title: 'Reduce Methane', desc: 'Food in landfills produces methane, 80x more potent than CO₂. We prevent this.',  color: 'border-green-200 bg-green-50' },
  { icon: <Zap          className="w-5 h-5" />, title: 'Save Resources', desc: 'The water, land, and energy used to produce wasted food is an enormous hidden cost.', color: 'border-blue-200 bg-blue-50'  },
  { icon: <Heart        className="w-5 h-5" />, title: 'Fight Hunger',   desc: 'Just 25% of wasted food globally could feed all 800 million hungry people.',         color: 'border-amber-200 bg-amber-50' },
];

const features = [
  '🏫 Smart Mess Management', '🤖 AI Demand Prediction', '🔔 Leftover Food Alerts',
  '📱 QR Meal Confirmation', '🏆 Student Rewards', '🚐 Pickup Scheduling', '⭐ Feedback System',
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="hero-bg min-h-[90vh] flex items-center relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-30 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-300 rounded-full opacity-20 blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            >
              <Leaf className="w-4 h-4" /> Smart Food Redistribution Platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Reduce Food Waste,{' '}
              <span className="gradient-text">Feed Lives</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl"
            >
              Every day, tonnes of surplus food from restaurants, hostels & events are discarded — while millions go hungry.
              We bridge this gap with technology, making food redistribution instant, intelligent, and impactful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => navigate('/donate')}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all shadow-lg shadow-green-200 hover:shadow-green-300"
              >
                Donate Food <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/request')}
                className="flex items-center gap-2 bg-white hover:bg-green-50 text-green-700 font-bold px-8 py-4 rounded-2xl text-lg border-2 border-green-200 transition-all"
              >
                Request Food
              </button>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mt-8"
            >
              {features.map((f) => (
                <span key={f} className="text-xs bg-white/80 backdrop-blur text-gray-600 px-3 py-1.5 rounded-full border border-green-100 font-medium">
                  {f}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ value, label, icon }, i) => (
              <motion.div
                key={value}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{icon}</div>
                <div className="text-4xl font-extrabold text-white">{value}</div>
                <div className="text-green-200 text-sm mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Three simple steps to turn surplus food into smiles.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc, icon, color }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm"
              >
                <div className="absolute -top-4 left-8 text-6xl font-black text-gray-100">{step}</div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color}`}>{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section id="impact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Why It <span className="gradient-text">Matters</span></h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Food waste is a climate, economic, and humanitarian crisis all at once.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {impacts.map(({ icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`card-hover rounded-2xl border p-6 ${color}`}
              >
                <div className="mb-3 text-green-700">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="bg-green-700 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to make a difference?</h2>
            <p className="text-green-200 text-lg mb-8">Join thousands of donors, NGOs, and communities fighting food waste.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => navigate('/donate')} className="bg-white text-green-700 font-bold px-8 py-4 rounded-2xl text-lg hover:bg-green-50 transition-all">
                Start Donating
              </button>
              <button onClick={() => navigate('/dashboard')} className="bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg border border-green-500 hover:bg-green-600/80 transition-all">
                View Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">All <span className="gradient-text">Features</span></h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { to: '/mess',     icon: '🏫', label: 'Mess Management',     desc: 'Track hostel meal attendance' },
              { to: '/qr',       icon: '📱', label: 'QR Confirmation',     desc: 'Scan QR before meals' },
              { to: '/predict',  icon: '🤖', label: 'AI Prediction',       desc: 'ML-based demand forecasting' },
              { to: '/alerts',   icon: '🔔', label: 'Leftover Alerts',     desc: 'Auto-alert NGOs of surplus' },
              { to: '/rewards',  icon: '🏆', label: 'Rewards System',      desc: 'Earn points for saving food' },
              { to: '/pickup',   icon: '🚐', label: 'Pickup Scheduling',   desc: 'NGO food collection' },
              { to: '/feedback', icon: '⭐', label: 'Meal Feedback',       desc: 'Rate food quality & quantity' },
              { to: '/dashboard',icon: '📊', label: 'Waste Dashboard',     desc: 'Analytics & insights' },
            ].map(({ to, icon, label, desc }, i) => (
              <motion.a
                key={to}
                href={to}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card-hover bg-green-50 rounded-2xl p-5 border border-green-100 flex flex-col gap-2 cursor-pointer text-decoration-none"
              >
                <span className="text-3xl">{icon}</span>
                <span className="font-bold text-gray-900 text-sm">{label}</span>
                <span className="text-xs text-gray-500">{desc}</span>
                <span className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-1">
                  Explore <CheckCircle className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
