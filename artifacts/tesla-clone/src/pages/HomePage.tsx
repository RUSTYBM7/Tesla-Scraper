import VehicleGrid from '../components/VehicleGrid';
import EnergySection from '../components/EnergySection';
import ChargingSection from '../components/ChargingSection';
import FSDSection from '../components/FSDSection';
import AccessoriesSection from '../components/AccessoriesSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main>
      <VehicleGrid />
      <EnergySection />
      <ChargingSection />
      <FSDSection />
      <AccessoriesSection />
      <Footer />
    </main>
  );
}
