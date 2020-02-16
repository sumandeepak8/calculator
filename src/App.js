import React from 'react';
import PageContent from './PageContent';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header"><span>Evalutate It</span></div>
      {<PageContent />}
    </div>
  );
}

export default App;
