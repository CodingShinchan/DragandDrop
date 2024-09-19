import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const TaskBlock = ({ blockName, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      moveTask(item.id, item.sourceBlock, blockName);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={`task-block ${isOver ? 'hover' : ''}`}
    >
      <h2>{blockName.toUpperCase()}</h2>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} sourceBlock={blockName} />
      ))}
    </div>
  );
};

export default TaskBlock;
