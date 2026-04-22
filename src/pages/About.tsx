import { motion } from 'framer-motion';
import { Leaf, AlertTriangle, BarChart3, Globe2, Recycle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const facts = [
  { icon: '🌍', stat: '1/3', label: 'of all food produced is wasted — 1.3 billion tonnes per year' },
  { icon: '💧', stat: '25%', label: "of world's freshwater supply is used to grow food that's never eaten" },
  { icon: '🌿', stat: '8%',  label: 'of global greenhouse gas emissions come from food waste' },
  { icon: '💰', stat: '$1T', label: 'worth of food is lost or wasted in the global economy annually' },
  { icon: '😔', stat: '800M', label: 'people go hungry while we throw away enough to feed them twice over' },
  { icon: '🗑️', stat: '45%', label: 'of all fruits and vegetables produced globally are wasted' },
];

const timeline = [
  { year: '2021', event: 'FoodShare concept born in a college hostel after seeing 40 kg of food discarded daily' },
  { year: '2022', event: 'First pilot launched connecting 3 restaurants with 2 NGOs in Mumbai' },
  { year: '2023', event: 'Expanded to 6 cities; 50,000 meals redistributed' },
  { year: '2024', event: 'AI prediction model and QR meal confirmation launched' },
  { year: '2025', event: '142 active donors, 23 NGO partners, 12 cities covered' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-bg py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Leaf className="w-4 h-4" /> Our Mission
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              The Food Waste <span className="gradient-text">Crisis</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are in the middle of a paradox: the world produces enough food to feed everyone, yet 800 million people go hungry.
              The problem isn't production — it's <strong>distribution and waste</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facts grid */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            The Numbers Don't <span className="gradient-text">Lie</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facts.map(({ icon, stat, label }, i) => (
              <motion.div key={stat} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-hover bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-4xl font-extrabold text-green-700 mb-1">{stat}</div>
                <p className="text-sm text-gray-600">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20 bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-3">Environmental <span className="text-green-400">Impact</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Food in landfills is one of the world's biggest environmental problems.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: AlertTriangle, title: 'Methane Emissions',  text: 'Rotting food in landfills produces methane — a greenhouse gas 80× more potent than CO₂ over 20 years. Food waste accounts for ~6% of total global GHG.', color: 'text-red-400' },
              { Icon: Globe2,        title: 'Land & Water Waste', text: 'Wasted food means wasted land (28% of agriculture land globally), and wasted water (250 km³ per year — 3× Lake Geneva).', color: 'text-blue-400'  },
              { Icon: Recycle,       title: 'Carbon Footprint',   text: 'If food waste were a country, it would be the 3rd largest emitter of greenhouse gases after the USA and China.', color: 'text-green-400' },
            ].map(({ Icon, title, text, color }) => (
              <motion.div key={title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <Icon className={`w-8 h-8 mb-4 ${color}`} />
                <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic impact */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-5">
              Economic <span className="gradient-text">Loss</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Food waste is not just a moral issue — it's one of the largest economic inefficiencies in our global system.
              Families, businesses, and governments lose trillions of dollars growing, transporting, and discarding food that is never consumed.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              In India alone, <strong className="text-gray-900">approximately ₹92,000 crore worth of food</strong> is wasted every year.
              This is food that was grown on real land, with real water, by real farmers.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { val: '₹92K Cr', label: 'Food wasted in India/year' },
                { val: '40%',     label: 'Food lost post-harvest' },
                { val: '67M',     label: 'Tonnes wasted in India' },
                { val: '195M',    label: 'Undernourished in India' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <div className="text-2xl font-extrabold text-amber-700">{val}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-green-50 rounded-3xl p-8 border border-green-100">
            <BarChart3 className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Solution</h3>
            <ul className="space-y-3">
              {[
                'Real-time surplus food listings from restaurants, hostels & events',
                'AI-powered demand prediction to reduce over-cooking',
                'QR code meal confirmation for accurate headcounts',
                'Automated NGO alerts when leftovers cross threshold',
                'Pickup scheduling for seamless food collection',
                'Gamified student rewards to encourage mindful eating',
                'Waste analytics to guide policy and behavior change',
              ].map(s => (
                <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                  <Leaf className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Our <span className="gradient-text">Journey</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-100" />
            {timeline.map(({ year, event }, i) => (
              <motion.div key={year} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-5 mb-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shrink-0 z-10">
                  <span className="text-white text-xs font-bold">{year}</span>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 flex-1 shadow-sm">
                  <p className="text-gray-700 text-sm leading-relaxed">{event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
