import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../services/taskService";
import { subscribeToTasks } from "../services/taskService";

import TaskForm from "../components/tasks/TaskForm";
import TaskList from  "../components/tasks/TaskList";
import styles from "./Tasks.module.css";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const { currentUser } = useAuth();

 useEffect(() => {
  if (!currentUser) {
    setTasks([]);
    return;
  }

  const unsubscribe = subscribeToTasks(
    currentUser.uid,
    setTasks
  );

  return unsubscribe;
}, [currentUser]);


  return (
     <main className={styles.container}>
      <div>
        <p>Task Management</p>
        <h1>My Tasks</h1>
        <p>Create and organize your daily tasks.</p>
      </div>

      <TaskForm />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default Tasks;