import { Link } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Организирай задачите си <span className={styles.highlight}>умно и бързо</span> с TaskFlow.
          </h1>
          <p className={styles.subtitle}>
            Минималистичен и мощен инструмент за проследяване на вашите проекти и ежедневни задачи в реално време.
          </p>
          <div className={styles.actions}>
            <Link to="/register" className={styles.btnPrimary}>
              Започни безплатно
            </Link>
            <Link to="/login" className={styles.btnSecondary}>
              Вход в акаунт
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.card}>
          <div className={styles.icon}>📋</div>
          <h3>Канбан Табла</h3>
          <p>Визуализирай работния си процес с интуитивни колони и картички.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>⚡</div>
          <h3>Бързина & Синхрон</h3>
          <p>Всички промени се запазват мигновено без излишно забавяне.</p>
        </div>
        <div className={styles.card}>
          <div className={styles.icon}>🎯</div>
          <h3>Чист Дизайн</h3>
          <p>Без излишен шум — само това, което ти трябва, за да завършваш задачите си.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;