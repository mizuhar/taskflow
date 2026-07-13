import {addDoc,collection,onSnapshot,serverTimestamp,getDocs,query,where,orderBy} from "firebase/firestore";
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
    orderBy("createdAt", "desc")
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
    orderBy("createdAt", "desc")
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