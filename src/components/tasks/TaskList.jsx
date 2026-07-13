import styles from "./TaskList.module.css";

function TaskList({ tasks }) {
  return (
    <section className={styles.card}>
      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;