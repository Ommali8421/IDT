import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FoodProvider } from './context/FoodContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Original Pages
import Home      from './pages/Home';
import Donate    from './pages/Donate';
import Request   from './pages/Request';
import Dashboard from './pages/Dashboard';
import Listings  from './pages/Listings';
import About     from './pages/About';

// New Feature Pages
import MessManagement from './pages/MessManagement';
import AIPrediction   from './pages/AIPrediction';
import NGOAlerts      from './pages/NGOAlerts';
import QRConfirm      from './pages/QRConfirm';
import Rewards        from './pages/Rewards';
import PickupSchedule from './pages/PickupSchedule';
import Feedback       from './pages/Feedback';

export default function App() {
  return (
    <FoodProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Original pages */}
              <Route path="/"          element={<Home />}      />
              <Route path="/donate"    element={<Donate />}    />
              <Route path="/request"   element={<Request />}   />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/listings"  element={<Listings />}  />
              <Route path="/about"     element={<About />}     />

              {/* Feature pages */}
              <Route path="/mess"     element={<MessManagement />} />
              <Route path="/predict"  element={<AIPrediction />}   />
              <Route path="/alerts"   element={<NGOAlerts />}      />
              <Route path="/qr"       element={<QRConfirm />}      />
              <Route path="/rewards"  element={<Rewards />}        />
              <Route path="/pickup"   element={<PickupSchedule />} />
              <Route path="/feedback" element={<Feedback />}       />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#fff',
                color: '#111827',
                border: '1px solid #dcfce7',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontSize: '14px',
                fontWeight: '500',
              },
            }}
          />
        </div>
      </BrowserRouter>
    </FoodProvider>
  );
}
