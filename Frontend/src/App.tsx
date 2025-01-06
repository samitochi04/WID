import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Column } from './components/Column';
import { Navbar } from './components/Navbar';
import { TaskModal } from './components/TaskModal';
import { useStore } from './store/useStore';
import { Task } from './types';

function App() {
  const { columns, addTask, updateTask, deleteTask, moveTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = result.draggableId;
    moveTask(source.droppableId, destination.droppableId, taskId);
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumn(columnId);
    setSelectedTask(undefined);
    setIsModalOpen(true);
  };

  const handleEditTask = (columnId: string, task: Task) => {
    setSelectedColumn(columnId);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedColumn) {
      if (selectedTask) {
        updateTask(selectedColumn, selectedTask.id, task);
      } else {
        addTask(selectedColumn, task);
      }
    }
  };

  return (
    <div className={useStore.getState().theme}>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            Kanban Board
          </h1>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Object.values(columns).map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  onAddTask={() => handleAddTask(column.id)}
                  onEditTask={(task) => handleEditTask(column.id, task)}
                  onDeleteTask={(taskId) => deleteTask(column.id, taskId)}
                />
              ))}
            </div>
          </DragDropContext>
        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={selectedTask}
        />
      </main>
    </div>
  );
}

export default App;