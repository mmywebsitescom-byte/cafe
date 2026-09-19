import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CafeInfo } from '../types/cafe';
import { cafeService } from '../services/cafeService';

interface CafeContextType {
  cafeInfo: CafeInfo;
  updateCafeInfo: (info: CafeInfo) => void;
  resetCafeInfo: () => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cafeInfo, setCafeInfo] = useState<CafeInfo>(cafeService.getCafeInfo());

  const refreshCafeInfo = useCallback(() => {
    setCafeInfo(cafeService.getCafeInfo());
  }, []);

  useEffect(() => {
    refreshCafeInfo();
  }, [refreshCafeInfo]);

  const updateCafeInfo = (info: CafeInfo) => {
    cafeService.updateCafeInfo(info);
    setCafeInfo(info);
  };

  const resetCafeInfo = () => {
    const defaultInfo = cafeService.resetToDefault();
    setCafeInfo(defaultInfo);
  };

  return (
    <CafeContext.Provider
      value={{
        cafeInfo,
        updateCafeInfo,
        resetCafeInfo,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
