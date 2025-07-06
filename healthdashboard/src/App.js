import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './App.css';

// Create a wrapper for the theme-aware app
function ThemedApp() {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? 'app-container dark' : 'app-container'}>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
