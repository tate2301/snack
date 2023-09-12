// src/lib/integrations/PluginContext.tsx

import React, { createContext, useContext } from 'react';
import { useAppSelector } from '../../../redux/store';
import { PluginPermissions } from '../types';

interface PluginContextData {
  settings: any; // Replace with your settings type
}

const PluginContext = createContext<PluginContextData | null>(null);

export const PluginContextProvider: React.FC<{ permissions: PluginPermissions; children: React.ReactNode }> = ({ children, permissions }) => {
  const settings = useAppSelector(state => state.settings); // Replace with your settings selector

  const contextData = {
    settings: permissions.canAccessSettings ? settings : null,
    // Add more data here
  };

  return (
    <PluginContext.Provider value={contextData}>
      {children}
    </PluginContext.Provider>
  );
};

export const usePluginContext = () => {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error('usePluginContext must be used within a PluginContextProvider');
  }
  return context;
};