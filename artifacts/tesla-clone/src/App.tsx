import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import HomePage from './pages/HomePage';
import VehiclePage from './pages/VehiclePage';
import ComparePage from './pages/ComparePage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import ConfiguratorPage from './pages/ConfiguratorPage';
import EnergyPage from './pages/EnergyPage';
import ChargingPage from './pages/ChargingPage';
import SafetyPage from './pages/SafetyPage';
import OffersPage from './pages/OffersPage';
import PreOwnedPage from './pages/PreOwnedPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ShopPage from './pages/ShopPage';
import InsurancePage from './pages/InsurancePage';
import TripPlannerPage from './pages/TripPlannerPage';
import NewsletterPage from './pages/NewsletterPage';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles/:slug" element={<VehiclePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/configure/:slug" element={<ConfiguratorPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/energy/:product" element={<EnergyPage />} />
          <Route path="/charging" element={<ChargingPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/pre-owned" element={<PreOwnedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/trip-planner" element={<TripPlannerPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/energy" element={<EnergyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomBar />
      </div>
    </BrowserRouter>
  );
}
