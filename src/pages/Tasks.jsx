import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { subscribeToTasks, deleteTask, toggleTaskStatus, updateTaskTitle } from "../services/taskService";

import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import styles from "./Tasks.module.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { currentUser } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      return;
    }

    const unsubscribe = subscribeToTasks(currentUser.uid, setTasks);
    return unsubscribe;
  }, [currentUser]);

  // Handlers за Firebase операците
  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await toggleTaskStatus(taskId, currentStatus);
    } catch (error) {
      console.error(error);
      addToast("Failed to update task", "error");
    }
  };

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

  // 🧠 ЛОГИКА ЗА ФИЛТРИРАНЕ НА ЗАДАЧИТЕ В ЕФИР
  const filteredTasks = tasks.filter((task) => {
    // 1. Проверка по търсена дума (Case-insensitive)
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Проверка по избран статус (All / Active / Completed)
    let matchesFilter = true;
    if (filterStatus === "active") matchesFilter = !task.completed;
    if (filterStatus === "completed") matchesFilter = task.completed;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <p className={styles.subtitle}>Task Management</p>
        <h1>My Tasks</h1>
        <p className={styles.description}>Create and organize your daily tasks.</p>
      </header>

      <TaskForm />

      {/* 🔍 СЕКЦИЯ ЗА ТЪРСЕНЕ И ФИЛТРИ */}
      <div className={styles.controlsBar}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />

        <div className={styles.filterGroup}>
          <button
            className={`${styles.filterBtn} ${filterStatus === "all" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === "active" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </button>
          <button
            className={`${styles.filterBtn} ${filterStatus === "completed" ? styles.activeFilter : ""}`}
            onClick={() => setFilterStatus("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Подаваме филтрирания масив `filteredTasks` вместо оригиналния `tasks` */}
      <TaskList
        tasks={filteredTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
        onUpdateTaskTitle={handleUpdateTaskTitle}
      />
    </main>
  );
}

export default Tasks;