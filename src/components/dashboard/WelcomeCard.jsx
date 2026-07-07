import styles from "./WelcomeCard.module.css";

function WelcomeCard() {
  return (
    <section className={styles.card}>
      <h1>👋 Welcome to TaskFlow</h1>

      <p>
        Organize your work and track your progress.
      </p>
    </section>
  );
}

export default WelcomeCard;