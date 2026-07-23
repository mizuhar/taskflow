import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext"; // Добавяме Toast контекста

import {
  subscribeToTasks,
  deleteTask,
  toggleTaskStatus,
  updateTaskTitle,
} from "../services/taskService";

import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import styles from "./Tasks.module.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const { addToast } = useToast(); // Взимаме функцията за toast съобщения

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      return;
    }

    const unsubscribe = subscribeToTasks(currentUser.uid, setTasks);

    return unsubscribe;
  }, [currentUser]);

  // Обработчик за превключване на статус (готова / незавършена)
  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await toggleTaskStatus(taskId, currentStatus);
      // Опционално toast, ако искаш да известява при завършване
    } catch (error) {
      console.error(error);
      addToast("Failed to update task", "error");
    }
  };

  // Обработчик за изтриване
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      addToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to delete task", "error");
    }
  };

  const handleUpdateTaskTitle = async (taskId, newTitle) => {
    try {
      await updateTaskTitle(taskId, newTitle);
      addToast("Task updated successfully!", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to update task", "error");
    }
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Task Management</p>
        <h1>My Tasks</h1>
        <p className={styles.description}>
          Create and organize your daily tasks.
        </p>
      </header>
     

      <TaskForm />
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onUpdateTaskTitle={handleUpdateTaskTitle}
      />
    </main>
  );
}

export default Tasks;
