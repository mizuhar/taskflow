import { useState } from "react";
import styles from "./TaskList.module.css";

function TaskList({ tasks, onToggleTask, onDeleteTask, onUpdateTaskTitle }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const handleSaveEdit = (taskId) => {
    if (editText.trim()) {
      onUpdateTaskTitle(taskId, editText.trim());
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, taskId) => {
    if (e.key === "Enter") {
      handleSaveEdit(taskId);
    } else if (e.key === "Escape") {
      setEditingId(null);
    }
  };

  return (
    <section className={styles.card}>
      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks yet.</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`${styles.item} ${task.completed ? styles.completed : ""}`}
            >
              <div className={styles.leftGroup}>
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => onToggleTask(task.id, task.completed)}
                  className={styles.checkbox}
                />

                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)}
                    onKeyDown={(e) => handleKeyDown(e, task.id)}
                    className={styles.editInput}
                    autoFocus
                  />
                ) : (
                  <span className={styles.title}>{task.title}</span>
                )}
              </div>

              <div className={styles.actions}>
                {/* Бутон за редактиране (моливче) */}
                {editingId !== task.id && !task.completed && (
                  <button 
                    onClick={() => handleStartEdit(task)} 
                    className={styles.editBtn}
                    title="Edit task title"
                  >
                    ✎
                  </button>
                )}

                {/* Бутонът за изтриване се показва САМО ако задачата е завършена */}
                {task.completed && (
                  <button 
                    onClick={() => onDeleteTask(task.id)} 
                    className={styles.deleteBtn}
                    title="Delete completed task"
                  >
                    ✕
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TaskList;