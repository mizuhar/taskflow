import { useState } from "react";
import { addTask } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task"
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Task"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default TaskForm;