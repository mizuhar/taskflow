import styles from "./Dashboard.module.css";
import { useAuth } from "../context/AuthContext";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import EmptyState from "../components/dashboard/EmptyState";


function Dashboard() {
  const { currentUser} = useAuth();
  return (
      <main className={styles.dashboard}>
  <h1>Dashboard</h1>

  <p>Logged in as: {currentUser?.email}</p>


  

  <WelcomeCard />
  <StatsCard />
  {/* <EmptyState /> */}
</main>
   
  );
}

export default Dashboard;