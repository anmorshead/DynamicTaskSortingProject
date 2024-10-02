import React from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="task-lists-container">
        <TaskBoard />
      </main>
    </div>
  );
}

export default App;
