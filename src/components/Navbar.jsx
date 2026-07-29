import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Грешка при изход:', error.message);
    }
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>TaskFlow</Link>
      
      <div className={styles.navLinks}>
        {/* Home си стои винаги, за да е удобно навигарането */}
        <Link to="/" className={styles.navLink}>Home</Link>

        {currentUser ? (
          // 🟢 Показва се, когато потребителят Е логнат
          <>
            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link to="/tasks" className={styles.navLink}>Tasks</Link>
            <Link to="/profile" className={styles.navLink}>Profile</Link>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          // 🔵 Показва се, когато потребителят НЕ Е логнат
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;