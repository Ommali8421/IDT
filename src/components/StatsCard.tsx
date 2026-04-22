import { motion } from 'framer-motion';

interface StatsCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color?: 'green' | 'blue' | 'amber' | 'purple';
  delay?: number;
}

const colorMap = {
  green:  { bg: 'bg-green-50',  iconBg: 'bg-green-100',  text: 'text-green-600',  val: 'text-green-700'  },
  blue:   { bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   text: 'text-blue-600',   val: 'text-blue-700'   },
  amber:  { bg: 'bg-amber-50',  iconBg: 'bg-amber-100',  text: 'text-amber-600',  val: 'text-amber-700'  },
  purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', text: 'text-purple-600', val: 'text-purple-700' },
};

export default function StatsCard({
  label,
  value,
  unit,
  icon,
  color = 'green',
  delay = 0,
}: StatsCardProps) {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`card-hover ${c.bg} rounded-2xl p-6 border border-white shadow-sm`}
    >
      <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center mb-4`}>
        <span className={c.text}>{icon}</span>
      </div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex items-end gap-1">
        <span className={`text-3xl font-extrabold ${c.val}`}>{value.toLocaleString()}</span>
        {unit && <span className="text-sm text-gray-400 mb-1">{unit}</span>}
      </div>
    </motion.div>
  );
}
