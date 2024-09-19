import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskBlock from './TaskBlock.jsx';
import './App.css'; 

const initialTasks = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Task ${index + 1}`
}));

const App = () => {
  const [taskBlocks, setTaskBlocks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: initialTasks
  });

  const moveTask = (taskId, sourceBlock, targetBlock) => {
    const sourceTasks = taskBlocks[sourceBlock].filter(task => task.id !== taskId);
    const movedTask = taskBlocks[sourceBlock].find(task => task.id === taskId);
    const targetTasks = [...taskBlocks[targetBlock], movedTask];

    setTaskBlocks(prevBlocks => ({
      ...prevBlocks,
      [sourceBlock]: sourceTasks,
      [targetBlock]: targetTasks
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <h1>Drag and Drop List</h1>
        <div className="task-list-container">
          {/* Rendering 5 TaskBlocks */}
          {Object.entries(taskBlocks).map(([blockName, tasks]) => (
            <TaskBlock
              key={blockName}
              blockName={blockName}
              tasks={tasks}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;