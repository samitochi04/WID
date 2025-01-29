import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Columns, Task } from '../types';
import { User } from '../lib/auth';

interface KanbanStore {
  columns: Columns;
  theme: 'light' | 'dark';
  user: User | null;
  token: string | null;
  setAuth: (user: User | null, token: string | null) => void;
  addTask: (columnId: string, task: Task) => void;
  updateTask: (columnId: string, taskId: string, updatedTask: Task) => void;
  deleteTask: (columnId: string, taskId: string) => void;
  moveTask: (fromColumn: string, toColumn: string, taskId: string) => void;
  toggleTheme: () => void;
}

const initialColumns: Columns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    tasks: [],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    tasks: [],
  },
  completed: {
    id: 'completed',
    title: 'Completed',
    tasks: [],
  },
};

export const useStore = create<KanbanStore>()(
  persist(
    (set) => ({
      columns: initialColumns,
      theme: 'light',
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      addTask: (columnId, task) =>
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              tasks: [...state.columns[columnId].tasks, task],
            },
          },
        })),
      updateTask: (columnId, taskId, updatedTask) =>
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              tasks: state.columns[columnId].tasks.map((task) =>
                task.id === taskId ? updatedTask : task
              ),
            },
          },
        })),
      deleteTask: (columnId, taskId) =>
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: {
              ...state.columns[columnId],
              tasks: state.columns[columnId].tasks.filter(
                (task) => task.id !== taskId
              ),
            },
          },
        })),
      moveTask: (fromColumn, toColumn, taskId) =>
        set((state) => {
          const task = state.columns[fromColumn].tasks.find(
            (t) => t.id === taskId
          );
          if (!task) return state;

          return {
            columns: {
              ...state.columns,
              [fromColumn]: {
                ...state.columns[fromColumn],
                tasks: state.columns[fromColumn].tasks.filter(
                  (t) => t.id !== taskId
                ),
              },
              [toColumn]: {
                ...state.columns[toColumn],
                tasks: [...state.columns[toColumn].tasks, task],
              },
            },
          };
        }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'kanban-storage',
    }
  )
);