import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useAuth } from "../context/AuthContext";
import { subscribeToTasks } from "../services/taskService"; // Провери точния път до taskService

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCard from "../components/dashboard/StatsCard";
import EmptyState from "../components/dashboard/EmptyState";

function Dashboard() {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Абонамент за задачите в реално време
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = subscribeToTasks(currentUser.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
      setLoading(false);
    });

    // 🧹 Cleanup функцията, която преговорихме!
    return () => unsubscribe();
  }, [currentUser]);

  // 📊 Изчисления за статичните данни
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const inProgressTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const recentTasks = tasks.slice(0, 3); // Взема първите 3 задачи

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p className={styles.userInfo}>
          Logged in as: <span>{currentUser?.email}</span>
        </p>
      </header>

      <WelcomeCard email={currentUser?.email} />

      {loading ? (
        <p className={styles.loading}>Loading stats...</p>
      ) : totalTasks === 0 ? (
        <EmptyState />
      ) : (
        <StatsCard
          total={totalTasks}
          completed={completedTasks}
          inProgress={inProgressTasks}
          percentage={completionPercentage}
        />
      )}
      <section className={styles.recentSection}>
        <h2>Recent Activity</h2>
        <div className={styles.recentList}>
          {recentTasks.map((task) => (
            <div key={task.id} className={styles.recentItem}>
              <span
                className={
                  task.completed ? styles.doneBadge : styles.pendingBadge
                }
              >
                {task.completed ? "Completed" : "In Progress"}
              </span>
              <p className={styles.taskTitle}>{task.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
