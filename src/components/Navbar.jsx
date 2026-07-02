import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const isLoggedIn = false;
  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        TaskFlow
      </NavLink>

      {isLoggedIn ? (
  <div className={styles.links}>
    <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Dashboard
    </NavLink>
    <NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Tasks
    </NavLink>
    <NavLink to="/profile" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Profile
    </NavLink>
    <NavLink to="/logout" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Logout
    </NavLink>
  </div>
) : (
  <div className={styles.links}>
    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Home
    </NavLink>
    <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Login
    </NavLink>
    <NavLink to="/register" className={({ isActive }) => isActive ? styles.active : styles.link}>
      Register
    </NavLink>
  </div>
)}
    </nav>
  );
}

export default Navbar;