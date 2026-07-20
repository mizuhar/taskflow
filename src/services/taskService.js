import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export async function addTask(task) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...task,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
}

export async function getTasks(userId) {
  const tasksRef = collection(db, "tasks");

  const q = query(
    tasksRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
export function subscribeToTasks(userId, callback) {
  const tasksRef = collection(db, "tasks");

  const q = query(
    tasksRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(tasks);
  });

  return unsubscribe;
}
// Функция за изтриване на задача
export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  await deleteDoc(taskRef);
};
// Функция за промяна на статуса (completed: true/false)
export const toggleTaskStatus = async (taskId, currentStatus) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    completed: !currentStatus
  });
};
// Редактиране на заглавието на задача
export const updateTaskTitle = async (taskId, newTitle) => {
  const taskRef = doc(db, "tasks", taskId);
  await updateDoc(taskRef, {
    title: newTitle
  });
};
