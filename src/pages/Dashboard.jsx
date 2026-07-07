import styles from "./Dashboard.module.css";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import EmptyState from "../components/dashboard/EmptyState";

function Dashboard() {
  return (
    <main className={styles.dashboard}>
      <WelcomeCard />
      <StatsCard />
      <EmptyState />
    </main>
  );
}

export default Dashboard;