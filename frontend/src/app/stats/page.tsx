import Maintenance from '../maintenance/page';
import StatsContent from './StatsContent';

export default function Stats() {
  const maintenanceMode = process.env.MAINTENANCE;
  if (maintenanceMode) {
    return <Maintenance />;
  }
  return <StatsContent />;
}
