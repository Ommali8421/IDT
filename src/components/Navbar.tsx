import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, ChevronDown, ChevronRight, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { to: '/mess',     label: '🏫 Mess Management',     desc: 'Smart hostel food tracking' },
  { to: '/qr',       label: '📱 QR Confirmation',      desc: 'Scan to confirm your meal' },
  { to: '/predict',  label: '🤖 AI Demand Prediction', desc: 'ML-based meal forecasting' },
  { to: '/alerts',   label: '🔔 Leftover Alerts',      desc: 'Notify NGOs of surplus food' },
  { to: '/rewards',  label: '🏆 Rewards System',       desc: 'Earn points for saving food' },
  { to: '/pickup',   label: '🚐 Pickup Scheduling',    desc: 'Schedule NGO food pickups' },
  { to: '/feedback', label: '⭐ Feedback System',      desc: 'Rate meals and quality' },
];

const NAV_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/listings',  label: 'Browse'    },
  { to: '/donate',    label: 'Donate'    },
  { to: '/request',   label: 'Request'   },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about',     label: 'About'     },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featDropOpen, setFeatDropOpen] = useState(false);
  const [mobileFeatOpen, setMobileFeatOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setFeatDropOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 glass border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">
              Food<span className="text-green-600">Share</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Features dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setFeatDropOpen(!featDropOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  featDropOpen ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                Features
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${featDropOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {featDropOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-50"
                  >
                    {FEATURES.map(({ to, label, desc }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setFeatDropOpen(false)}
                        className="flex flex-col px-4 py-3 hover:bg-green-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-gray-800">{label}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA / Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-green-600" />
                  {user?.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all pulse-green">
                  Sign up <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-green-100 bg-white px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-green-700 bg-green-50' : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            {/* Mobile features section */}
            <button
              onClick={() => setMobileFeatOpen(!mobileFeatOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors"
            >
              Features
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeatOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileFeatOpen && (
              <div className="pl-4 space-y-1">
                {FEATURES.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-xl text-sm transition-colors ${
                        isActive ? 'text-green-700 bg-green-50' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMobileOpen(false); navigate('/'); }}
                className="w-full mt-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
