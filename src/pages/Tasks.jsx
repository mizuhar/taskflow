import TaskForm from "../components/tasks/TaskForm";
import styles from "./Tasks.module.css";

function Tasks() {
  return (
     <main className={styles.container}>
      <div>
        <p>Task Management</p>
        <h1>My Tasks</h1>
        <p>Create and organize your daily tasks.</p>
      </div>

      <TaskForm />
    </main>
  );
}

export default Tasks;