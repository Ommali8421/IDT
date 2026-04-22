import type { Donation } from '../data/donations';
import { MapPin, Clock, User, Package, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from './StatusBadge';
import { useFoodContext } from '../context/FoodContext';
import toast from 'react-hot-toast';

interface FoodCardProps {
  donation: Donation;
  compact?: boolean;
}

export default function FoodCard({ donation, compact = false }: FoodCardProps) {
  const { requestDonation } = useFoodContext();

  const handleRequest = () => {
    if (donation.status !== 'Available') return;
    requestDonation(donation.id, {
      ngoName: 'Quick Request',
      location: donation.location,
      requiredQty: donation.quantity,
      urgency: 'High',
    });
    toast.success(`🎉 Request sent for ${donation.food}!`);
  };

  const categoryColors: Record<string, string> = {
    Cooked: 'bg-orange-100 text-orange-700',
    Raw: 'bg-lime-100 text-lime-700',
    Packaged: 'bg-blue-100 text-blue-700',
    'Fruits & Veggies': 'bg-green-100 text-green-700',
    Beverages: 'bg-purple-100 text-purple-700',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
    >
      {/* Colored top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-green-400 to-green-600" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{donation.food}</h3>
            <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColors[donation.category] ?? 'bg-gray-100 text-gray-600'}`}>
              {donation.category}
            </span>
          </div>
          <StatusBadge status={donation.status} />
        </div>

        {/* Details */}
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Package className="w-4 h-4 text-green-500 shrink-0" />
            <span>{donation.quantity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-green-500 shrink-0" />
            <span>{donation.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 text-green-500 shrink-0" />
            <span>Expires in {donation.expiry}</span>
          </div>
          {!compact && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4 text-green-500 shrink-0" />
              <span>{donation.donor}</span>
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={handleRequest}
          disabled={donation.status !== 'Available'}
          className={`mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl transition-all ${
            donation.status === 'Available'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {donation.status === 'Available' ? (
            <>Request This Food <ChevronRight className="w-4 h-4" /></>
          ) : (
            donation.status
          )}
        </button>
      </div>
    </motion.div>
  );
}
