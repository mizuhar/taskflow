import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  getDocs: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
}));

// Функцията, която тестваме
async function getTasksFromFirebase(db) {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  const tasks = [];
  querySnapshot.forEach((d) => tasks.push({ id: d.id, ...d.data() }));
  return tasks;
}

// Нова функция: Изтриване от Firebase
async function deleteTaskFromFirebase(db, taskId) {
  const docRef = doc(db, 'tasks', taskId);
  await deleteDoc(docRef);
}

describe('Firebase Firestore Service Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch tasks from Firestore successfully', async () => {
    const mockDocs = [
      { id: '1', data: () => ({ title: 'Научи Vitest', completed: false }) }
    ];
    getDocs.mockResolvedValueOnce({
      forEach: (callback) => mockDocs.forEach(callback)
    });

    const tasks = await getTasksFromFirebase({});
    expect(tasks).toEqual([{ id: '1', title: 'Научи Vitest', completed: false }]);
  });

  it('should delete a task from Firestore by ID', async () => {
    const fakeDb = {};
    const taskId = 'task-123';

    await deleteTaskFromFirebase(fakeDb, taskId);

    expect(doc).toHaveBeenCalledWith(fakeDb, 'tasks', taskId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});