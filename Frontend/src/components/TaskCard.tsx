import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Pencil, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-2 group"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium dark:text-white">{task.title}</h3>
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={onDelete}
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {task.description}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </Draggable>
  );
};