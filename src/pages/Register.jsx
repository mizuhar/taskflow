import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Register.module.css";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Паролите не съвпадат.");
    }

    if (password.length < 6) {
      return setError("Паролата трябва да е поне 6 символа.");
    }

    setIsLoading(true);

    try {
      await register(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err.message);
      setError("Възникна грешка при регистрацията. Опитайте отново.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>Създай акаунт</h2>
          <p>Присъедини се към TaskFlow и организирай деня си</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Имейл адрес</label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Парола</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Повтори паролата</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Регистриране..." : "Регистрация"}
          </button>
        </form>

        <div className={styles.footer}>
          <span>Вече имаш акаунт? </span>
          <Link to="/login" className={styles.link}>Влез оттук</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;