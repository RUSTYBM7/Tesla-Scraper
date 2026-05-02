import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import VehicleGrid from './components/VehicleGrid';
import EnergySection from './components/EnergySection';
import ChargingSection from './components/ChargingSection';
import FSDSection from './components/FSDSection';
import AccessoriesSection from './components/AccessoriesSection';
import BottomBar from './components/BottomBar';
import Footer from './components/Footer';

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <Header />
      <main>
        <HeroSlider />
        <VehicleGrid />
        <EnergySection />
        <ChargingSection />
        <FSDSection />
        <AccessoriesSection />
        <Footer />
      </main>
      <BottomBar />
    </div>
  );
}
