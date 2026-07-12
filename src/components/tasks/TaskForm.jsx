import { useState } from "react";
import { addTask } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import styles from "./TaskForm.module.css";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { currentUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a task.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await addTask({
        title: trimmedTitle,
        completed: false,
        userId: currentUser.uid,
      });

      setTitle("");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError("Could not add the task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.card}>
      <h2>Add a new task</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="What needs to be done?"
          className={styles.input}
        />

        <button
          type="submit"
          disabled={submitting}
          className={styles.button}
        >
          {submitting ? "Adding..." : "Add Task"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
}

export default TaskForm;