// src/components/dashboard/StatsCard.jsx
import styles from "./StatsCard.module.css"; // или твоя CSS файл

function StatsCard({ total, completed, inProgress, percentage }) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.card}>
        <h3>Total Tasks</h3>
        <p className={styles.number}>{total}</p>
      </div>

      <div className={styles.card}>
        <h3>Completed</h3>
        <p className={`${styles.number} ${styles.completed}`}>{completed}</p>
      </div>

      <div className={styles.card}>
        <h3>In Progress</h3>
        <p className={`${styles.number} ${styles.inProgress}`}>{inProgress}</p>
      </div>

      <div className={styles.card}>
        <h3>Progress</h3>
        <p className={styles.number}>{percentage}%</p>
        {/* Прогрес бар */}
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;