import React from 'react';
import CreatePost from './src/components/CreatePost/CreatePost.js';
import EditPost from './src/components/EditPost/EditPost.js';
import DeletePost from './src/components/DeletePost/DeletePost.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React Blog App</h1>
      </header>
      <main>
        <CreatePost />
        <EditPost />
        <DeletePost />
      </main>
    </div>
  );
}

export default App;
