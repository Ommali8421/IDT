import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import { useFoodContext } from '../context/FoodContext';

const STATUS_OPTS = ['All', 'Available', 'Requested', 'Expired'] as const;
type StatusFilter = typeof STATUS_OPTS[number];

const CITIES = ['All', 'Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur', 'Kolkata'];
const CATS   = ['All', 'Cooked', 'Raw', 'Packaged', 'Fruits & Veggies', 'Beverages'];

export default function Listings() {
  const { donations } = useFoodContext();
  const [search,   setSearch]   = useState('');
  const [city,     setCity]     = useState('All');
  const [status,   setStatus]   = useState<StatusFilter>('All');
  const [category, setCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = donations.filter(d => {
    const matchSearch   = !search   || d.food.toLowerCase().includes(search.toLowerCase()) || d.donor.toLowerCase().includes(search.toLowerCase());
    const matchCity     = city === 'All'     || d.location === city;
    const matchStatus   = status === 'All'   || d.status === status;
    const matchCategory = category === 'All' || d.category === category;
    return matchSearch && matchCity && matchStatus && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Food <span className="gradient-text">Listings</span></h1>
          <p className="text-gray-500">Browse all available surplus food donations in your city.</p>
        </motion.div>

        {/* Search + filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search food type or donor..."
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors ${showFilters ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />Filters
            </button>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">City</label>
                    <div className="flex flex-wrap gap-1.5">
                      {CITIES.map(c => (
                        <button key={c} onClick={() => setCity(c)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${city === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Status</label>
                    <div className="flex flex-wrap gap-1.5">
                      {STATUS_OPTS.map(s => (
                        <button key={s} onClick={() => setStatus(s)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${status === s ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Category</label>
                    <div className="flex flex-wrap gap-1.5">
                      {CATS.map(c => (
                        <button key={c} onClick={() => setCategory(c)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${category === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Result count */}
        <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-green-500" />
          Showing <strong className="text-gray-800 mx-1">{filtered.length}</strong> donations
          {city !== 'All' && <> in <strong className="text-green-700 ml-1">{city}</strong></>}
        </p>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="col-span-4 text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">🔍</div>
                <p className="font-semibold text-lg">No results found</p>
                <p className="text-sm mt-2">Try adjusting your search or filters</p>
              </div>
            ) : (
              filtered.map(d => <FoodCard key={d.id} donation={d} />)
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
