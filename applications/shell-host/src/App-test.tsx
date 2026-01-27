import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestShellComponent from './TestShellComponent';

// Micro Frontend Import
const ReactDemoMfe = React.lazy(() => import('react-demo-mfe/ReactDemoApp'));

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
          <a href="/" style={{ marginRight: '20px' }}>Home</a>
          <a href="/react-demo">React Demo MFE</a>
        </nav>
        
        <Routes>
          <Route path="/" element={<TestShellComponent />} />
          <Route 
            path="/react-demo" 
            element={
              <div>
                <TestShellComponent />
                <Suspense fallback={<div>Loading React Demo MFE...</div>}>
                  <ReactDemoMfe />
                </Suspense>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;