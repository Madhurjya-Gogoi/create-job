import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { Navbar } from './components';
import { JobCreatedProvider } from './hooks/useCreatedJob';

function App() {
  return (
    <Router>
      <JobCreatedProvider>
        <Navbar />
        <Routes />
      </JobCreatedProvider>
    </Router>
  );
}

export default App;
