import React, { createContext, useContext, useState } from 'react';

// Create a context to manage the store's state
interface StoreContextProps {
  refreshStores: () => void;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

// Provider component to wrap around your app or relevant part
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to trigger a refresh by incrementing the key
  const refreshStores = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <StoreContext.Provider value={{ refreshStores }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook to use context
export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};
