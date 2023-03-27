import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OutputList from './Pages/OutputList';
import DataProvider from './Contexts/DataContext';
import './App.css';
// import Home from './Pages/InputPage';
import { ErrorScreen, GanttChart, InputPage, EditPage } from './Pages';
import DependencyGraph from './Pages/DependencyGraph';
import Login from './Pages/Login';
import NewListView from './Components/NewListView';
// import { Navbar, Footer } from './Components';
// import GlobalContextProvider from './Contexts';

function App() {
  return (
    <div className="App">
      <Router>
        <DataProvider>
          <Routes>
            <Route path="/" element={<OutputList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<InputPage />} />
            <Route path="/ganttChart" element={<GanttChart />} />
            <Route path="/graph" element={<DependencyGraph />} />
            <Route path="error/:errorCode?" element={<ErrorScreen />} />
            <Route path="/edit/:auto-fill?" element={<EditPage />} />
          </Routes>
        </DataProvider>
      </Router>
    </div>
  );
}

export default App;
