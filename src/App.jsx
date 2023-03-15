import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OutputList from './Pages/OutputList';
import DataProvider from './Contexts/DataContext';
import './App.css';
// import Home from './Pages/InputPage';
import { ErrorScreen, GanttChart, InputPage } from './Pages';
import DependencyGraph from './Pages/DependencyGraph';
// import { Navbar, Footer } from './Components';
// import GlobalContextProvider from './Contexts';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<OutputList />} />
            {/* <Route path="/create" element={<Home />} /> */}
            <Route path="/create" element={<InputPage />} />
            <Route path="/:projectId/gantt" element={<GanttChart />} />
            <Route path="/graph" element={<DependencyGraph />} />
            <Route path="error/:errorCode?" element={<ErrorScreen />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
