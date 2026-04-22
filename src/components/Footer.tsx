import { Link } from 'react-router-dom';
import { Leaf, Code, Send, Globe, Mail, Heart } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Donate Food', to: '/donate' },
    { label: 'Request Food', to: '/request' },
    { label: 'Browse Listings', to: '/listings' },
    { label: 'Dashboard', to: '/dashboard' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Impact', to: '/#impact' },
    { label: 'Partners', to: '/about' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Food<span className="text-green-400">Share</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Connecting surplus food with communities in need. Together we can
              end food waste and hunger in our cities.
            </p>
            <div className="flex items-center gap-3">
              {[Code, Send, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-green-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-gray-400 hover:text-green-400 transition-colors animated-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Get updates on food availability in your city.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FoodShare. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for a hunger-free world
          </p>
        </div>
      </div>
    </footer>
  );
}
