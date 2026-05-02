import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import HomePage from './pages/HomePage';
import VehiclePage from './pages/VehiclePage';
import ComparePage from './pages/ComparePage';
import NewsletterPage from './pages/NewsletterPage';
import ContactPage from './pages/ContactPage';
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
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomBar />
      </div>
    </BrowserRouter>
  );
}
