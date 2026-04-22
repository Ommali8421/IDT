import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award } from 'lucide-react';
import { useFoodContext } from '../context/FoodContext';
import { rewardTiers } from '../data/mess';

function getTier(points: number) {
  return [...rewardTiers].reverse().find(t => points >= t.minPoints) || rewardTiers[0];
}

function getNextTier(points: number) {
  return rewardTiers.find(t => t.minPoints > points);
}

const rewardCatalog = [
  { points: 100, reward: '☕ Free Canteen Coffee',       claimed: false },
  { points: 200, reward: '🍕 Free Snack Voucher',         claimed: false },
  { points: 350, reward: '📚 Library Late-Night Pass',    claimed: false },
  { points: 500, reward: '🎮 Gaming Zone Free Hour',      claimed: false },
  { points: 750, reward: '🎓 Eco Champion Certificate',   claimed: false },
  { points: 1000, reward: '🏆 Mess Hero – Semester',      claimed: false },
];

const leaderboardActivities = [
  { icon: '📱', desc: 'QR confirmed meal', pts: '+10' },
  { icon: '🍽️', desc: 'Zero waste week',   pts: '+50' },
  { icon: '♻️', desc: 'Donated food',      pts: '+30' },
  { icon: '📢', desc: 'Referred a friend', pts: '+20' },
];

export default function Rewards() {
  const { students } = useFoodContext();

  const sorted = [...students].sort((a, b) => b.points - a.points);
  const topThree = sorted.slice(0, 3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            🏆 Student Reward System
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Earn Points, <span className="gradient-text">Save Food</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Students who pre-confirm meals via QR, avoid wastage, and participate in donations earn reward points
            redeemable for exciting perks.
          </p>
        </motion.div>

        {/* How to Earn */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {leaderboardActivities.map(({ icon, desc, pts }) => (
            <div key={desc} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="text-lg font-extrabold text-green-700">{pts}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>

        {/* Podium */}
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl border border-amber-100 p-8 mb-10">
          <h2 className="font-bold text-gray-900 text-xl mb-8 text-center flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" /> Top 3 Eco Heroes
          </h2>
          <div className="flex items-end justify-center gap-4">
            {podiumOrder.map((s, i) => {
              const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
              const heights = { 1: 'h-36', 2: 'h-28', 3: 'h-20' };
              const tier = getTier(s.points);
              return (
                <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} className="flex flex-col items-center">
                  <div className="text-2xl mb-2">{tier.badge}</div>
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-lg font-extrabold mb-2 border-2 border-green-300">
                    {s.avatar}
                  </div>
                  <p className="text-sm font-bold text-gray-900 text-center mb-1 max-w-[80px] leading-tight">{s.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500 mb-2">{s.points} pts</p>
                  <div className={`w-20 ${heights[rank as 1|2|3]} rounded-t-xl flex items-center justify-center font-black text-white text-xl ${rank === 1 ? 'bg-amber-400' : rank === 2 ? 'bg-gray-300 text-gray-700' : 'bg-amber-700/60'}`}>
                    #{rank}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Full Leaderboard */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" /> Full Leaderboard
            </h3>
            <div className="space-y-3">
              {sorted.map((s, i) => {
                const tier = getTier(s.points);
                const nextTier = getNextTier(s.points);
                const pctToNext = nextTier
                  ? ((s.points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100
                  : 100;
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-7 text-center font-extrabold text-gray-400 text-sm">#{i + 1}</div>
                    <div className="w-9 h-9 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {s.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm truncate">{s.name}</span>
                        <span>{tier.badge}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: tier.color + '22', color: tier.color }}>{tier.name}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${pctToNext}%` }} />
                      </div>
                      {nextTier && <p className="text-xs text-gray-400 mt-0.5">{nextTier.minPoints - s.points} pts to {nextTier.name}</p>}
                    </div>
                    <div className="font-extrabold text-green-700 text-sm shrink-0">{s.points} pts</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Reward Catalog */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" /> Reward Catalog
            </h3>
            <div className="space-y-3">
              {rewardCatalog.map(({ points, reward }) => {
                const studentMax = Math.max(...students.map(s => s.points));
                const unlocked = studentMax >= points;
                return (
                  <div key={reward} className={`rounded-xl p-4 border ${unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className={`text-sm font-semibold ${unlocked ? 'text-gray-900' : 'text-gray-400'}`}>{reward}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{points} pts required</p>
                      </div>
                      {unlocked ? (
                        <button className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                          Redeem
                        </button>
                      ) : (
                        <span className="text-xs text-gray-300"><Zap className="w-4 h-4" /></span>
                      )}
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min(100, (studentMax / points) * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
