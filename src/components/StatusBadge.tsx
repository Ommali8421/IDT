import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

type Status = 'Available' | 'Requested' | 'Expired';

interface StatusBadgeProps {
  status: Status;
}

const config: Record<Status, { label: string; className: string; Icon: React.ElementType }> = {
  Available: {
    label: 'Available',
    className: 'bg-green-100 text-green-700 border border-green-200',
    Icon: CheckCircle,
  },
  Requested: {
    label: 'Requested',
    className: 'bg-amber-100 text-amber-700 border border-amber-200',
    Icon: AlertCircle,
  },
  Expired: {
    label: 'Expired',
    className: 'bg-red-100 text-red-600 border border-red-200',
    Icon: XCircle,
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className, Icon } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}
