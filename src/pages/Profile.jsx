import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { subscribeToTasks } from "../services/taskService";
import styles from "./Profile.module.css";

function Profile() {
  const { currentUser, logout } = useAuth();
  const [taskStats, setTaskStats] = useState({ total: 0, completed: 0 });
  const navigate = useNavigate();

  // Вземаме заглавната буква от имейла за аватара
  const userInitial = currentUser?.email ? currentUser.email[0].toUpperCase() : "U";

  // Форматираме датата на регистрация от Firebase (ако съществува)
  const createdAt = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString("bg-BG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Няма информация";

  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribe = subscribeToTasks(currentUser.uid, (tasks) => {
      const completed = tasks.filter((t) => t.completed).length;
      setTaskStats({
        total: tasks.length,
        completed: completed,
      });
    });

    return () => unsubscribe();
  }, [currentUser]);

   async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Грешка при изход:', error.message);
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Account Settings</p>
        <h1>User Profile</h1>
      </header>

      <div className={styles.profileCard}>
        {/* Секция Аватар & Имейл */}
        <div className={styles.userHeader}>
          <div className={styles.avatar}>{userInitial}</div>
          <div className={styles.userInfo}>
            <h2>{currentUser?.email?.split("@")[0]}</h2>
            <p className={styles.email}>{currentUser?.email}</p>
            <span className={styles.badge}>Active User</span>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Секция Детайли за акаунта */}
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Member Since</span>
            <span className={styles.value}>{createdAt}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>User ID (UID)</span>
            <span className={styles.valueId}>{currentUser?.uid}</span>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Секция Мини Статистика */}
        <div className={styles.statsSection}>
          <h3>Account Activity</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{taskStats.total}</span>
              <span className={styles.statLabel}>Total Tasks</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNumber}>{taskStats.completed}</span>
              <span className={styles.statLabel}>Completed</span>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* Бутон за изход */}
        <div className={styles.actions}>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;