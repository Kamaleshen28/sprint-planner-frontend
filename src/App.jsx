import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OutputList from './Pages/OutputList';
import DataProvider from './Contexts/DataContext';
import './App.css';
import Home from './Pages/InputPage';
import { ErrorScreen, GanttChart, InputPage, EditPage } from './Pages';
import DependencyGraph from './Pages/DependencyGraph';
import Login from './Pages/Login';
// import { Navbar, Footer } from './Components';
// import GlobalContextProvider from './Contexts';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import SecureRoute from './Components/SecureRoute';
import LoginCallbackUser from './Components/LoginCallbackUser';

const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.REACT_APP_ISSUER}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: `${window.location.origin}/login/callback`,
});

function App() {
  const history = useNavigate();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  const navigate = useNavigate();

  return (
    <div className="App">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <DataProvider>
          <Routes>
            <Route
              path="/"
              element={
                <SecureRoute>
                  <OutputList />
                </SecureRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/login/callback" element={<LoginCallbackUser />} />
            <Route
              path="/create"
              element={<SecureRoute>{<InputPage />}</SecureRoute>}
            />
            <Route
              path="/ganttChart"
              element={
                <SecureRoute>
                  <GanttChart />
                </SecureRoute>
              }
            />
            <Route
              path="/graph"
              element={
                <SecureRoute>
                  <DependencyGraph />
                </SecureRoute>
              }
            />
            <Route path="error/:errorCode?" element={<ErrorScreen />} />
            <Route
              path="/edit"
              element={
                <SecureRoute>
                  <EditPage />
                </SecureRoute>
              }
            />
          </Routes>
        </DataProvider>
      </Security>
    </div>
  );
}

export default App;
