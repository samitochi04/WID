import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../types';

interface ColumnProps {
  column: ColumnType;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg w-full">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-200">
          {column.title}
        </h2>
        <button
          onClick={onAddTask}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          aria-label="Add task"
        >
          <Plus className="text-gray-600 dark:text-gray-300 h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[150px] sm:min-h-[200px]"
          >
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};