import { motion } from 'framer-motion';
import { Package, Truck, TrendingDown, Wind, Users, Building2 } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import ChartComponent from '../components/ChartComponent';
import { useFoodContext } from '../context/FoodContext';
import { overviewStats, weeklyDonations, categoryBreakdown, cityDistribution, monthlyTrend } from '../data/stats';

export default function Dashboard() {
  const { donations, requests, feedback } = useFoodContext();

  const totalDonated   = donations.length;
  const totalRequested = donations.filter(d => d.status === 'Requested').length;
  const available      = donations.filter(d => d.status === 'Available').length;
  const avgQuality     = feedback.length
    ? (feedback.reduce((s, f) => s + f.qualityRating, 0) / feedback.length).toFixed(1)
    : '4.2';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Waste <span className="gradient-text">Analytics Dashboard</span>
          </h1>
          <p className="text-gray-500">Real-time insights on food donations, distribution, and environmental impact.</p>
        </motion.div>

        {/* Stat cards row 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard label="Total Food Donated"   value={overviewStats.totalDonated}      unit="kg" icon={<Package className="w-5 h-5" />}    color="green"  delay={0}   />
          <StatsCard label="Food Distributed"     value={overviewStats.totalDistributed}  unit="kg" icon={<Truck className="w-5 h-5" />}       color="blue"   delay={0.1} />
          <StatsCard label="Waste Prevented"      value={overviewStats.wasteReduced}      unit="kg" icon={<TrendingDown className="w-5 h-5" />} color="amber"  delay={0.2} />
          <StatsCard label="CO₂ Saved"            value={overviewStats.co2Saved}          unit="kg" icon={<Wind className="w-5 h-5" />}         color="purple" delay={0.3} />
        </div>

        {/* Stat cards row 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Meals Served"    value={overviewStats.mealsServed}                   icon={<span className="text-lg">🍽️</span>}     color="green"  delay={0.1}  />
          <StatsCard label="Active Donors"   value={overviewStats.activeDonors + totalDonated}   icon={<Users className="w-5 h-5" />}             color="blue"   delay={0.15} />
          <StatsCard label="NGO Partners"    value={overviewStats.activeNGOs}                    icon={<Building2 className="w-5 h-5" />}         color="amber"  delay={0.2}  />
          <StatsCard label="Cities Covered"  value={overviewStats.citiesCovered}                 icon={<span className="text-lg">🌆</span>}        color="purple" delay={0.25} />
        </div>

        {/* Live counts */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Listed Today',  val: totalDonated,   color: 'bg-green-600' },
            { label: 'Requested',     val: totalRequested, color: 'bg-amber-500' },
            { label: 'Available Now', val: available,      color: 'bg-blue-600'  },
          ].map(({ label, val, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <div className={`inline-block w-2.5 h-2.5 rounded-full ${color} mb-2`} />
              <div className="text-2xl font-extrabold text-gray-900">{val}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Weekly Donations vs Distribution</h3>
            <p className="text-xs text-gray-400 mb-5">Last 7 days (in kg)</p>
            <ChartComponent type="line" data={weeklyDonations} dataKeys={['donated','distributed']} xKey="day" colors={['#16a34a','#3b82f6']} height={220} />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Food Category Breakdown</h3>
            <p className="text-xs text-gray-400 mb-5">By percentage</p>
            <ChartComponent type="pie" data={categoryBreakdown} dataKeys={['value']} nameKey="name" valueKey="value" height={220} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">City-wise Distribution</h3>
            <p className="text-xs text-gray-400 mb-5">Donated vs distributed (kg)</p>
            <ChartComponent type="bar" data={cityDistribution} dataKeys={['donated','distributed']} xKey="city" colors={['#16a34a','#4ade80']} height={220} />
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-1">Monthly Growth Trend</h3>
            <p className="text-xs text-gray-400 mb-5">Total food donated per month (kg)</p>
            <ChartComponent type="area" data={monthlyTrend} dataKeys={['donated']} xKey="month" colors={['#16a34a']} height={220} />
          </div>
        </div>

        {/* Feedback summary */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Summary Stats</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Avg Quality Rating',  val: `${avgQuality}/5`,  icon: '⭐' },
              { label: 'Total Requests Made', val: requests.length,    icon: '📋' },
              { label: 'Feedback Submitted',  val: feedback.length,    icon: '💬' },
              { label: 'Waste Reduction %',   val: '18.2%',            icon: '📉' },
            ].map(({ label, val, icon }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xl font-extrabold text-gray-900">{val}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
