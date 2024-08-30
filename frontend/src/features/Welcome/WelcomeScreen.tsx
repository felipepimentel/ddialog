import React from 'react';
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onCreateWorkspace: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCreateWorkspace }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to DDialog</h1>
      <p className="text-xl mb-8">Select a workspace to start chatting or create a new one</p>
      <Button 
        variant="outline" 
        className="text-white border-white hover:bg-white hover:text-indigo-600 transition-colors"
        onClick={onCreateWorkspace}
      >
        Create New Workspace
      </Button>
    </div>
  );
};

export default WelcomeScreen;