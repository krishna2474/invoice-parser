import React from 'react';
import InvoiceUploader from './components/InvoiceUploader';
// import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Invoice Parser</h1>
      </header>
      <main>
        <InvoiceUploader />
      </main>
    </div>
  );
}

export default App;
