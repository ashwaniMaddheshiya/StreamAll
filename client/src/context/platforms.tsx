import React, { createContext, useState, useContext, useEffect } from 'react';
import { myFetch } from '@/utils/myFetch';
import { baseUrl } from '@/constants';

interface PlatformContextType {
  platformList: any[];
  setPlatformList: React.Dispatch<React.SetStateAction<any[]>>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platformList, setPlatformList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlatformList = async () => {
      try {
        const { data, error } = await myFetch(`${baseUrl}/api/platform/all`);
        if (data) {
          setPlatformList(data);
        }
        if (error) {
          console.error('Error fetching platform list:', error);
        }
      } catch (error) {
        console.error('Unexpected error fetching platform list:', error);
      }
    };

    fetchPlatformList();
  }, []);

  return (
    <PlatformContext.Provider value={{ platformList, setPlatformList }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
