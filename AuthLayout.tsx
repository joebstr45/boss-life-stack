import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">BOSS LIFE</h1>
          <h2 className="text-2xl font-semibold text-white mb-1">COMMAND CENTER</h2>
          <p className="text-secondary font-medium">ALPHA</p>
        </div>
        
        <Outlet />
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>© 2025 Boss Life Command Center. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
