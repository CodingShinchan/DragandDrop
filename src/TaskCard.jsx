import React from 'react';
import { useDrag } from 'react-dnd';

const TaskCard = ({ task, sourceBlock }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, sourceBlock },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <p>{task.title}</p>
    </div>
  );
};

export default TaskCard;