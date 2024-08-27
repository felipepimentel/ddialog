import React, { useState, useEffect } from 'react';
import WorkspaceList from '../components/workspace/WorkspaceList';
import CreateWorkspaceForm from '../components/workspace/CreateWorkspaceForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to DDialog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Your intelligent document-based conversation platform
        </p>
      </section>
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Create a New Workspace</h2>
        <CreateWorkspaceForm />
      </section>
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Workspaces</h2>
        {isLoading ? <LoadingSpinner /> : <WorkspaceList />}
      </section>
    </div>
  );
};

export default Home;