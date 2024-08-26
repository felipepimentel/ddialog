import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Workspace from './pages/Workspace';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">DDialog</Link>
            <div className="space-x-4 flex items-center">
              <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-600">
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              <Link to="/login" className="btn btn-secondary dark:bg-gray-700 dark:text-gray-200">Login</Link>
              <Link to="/" className="btn btn-primary">Sign Up</Link>
            </div>
          </div>
        </nav>
        <main className="flex-grow container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/workspace/:id" component={Workspace} />
          </Switch>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            © 2023 DDialog. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;