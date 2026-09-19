import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Food } from '../types/food';
import { menuService } from '../services/menuService';

interface MenuContextType {
  menuItems: Food[];
  loading: boolean;
  selectedItem: Food | null;
  setSelectedItem: (item: Food | null) => void;
  addOrUpdateMenuItem: (item: Omit<Food, 'id'> & { id?: string }) => void;
  deleteMenuItem: (id: string) => void;
  refreshMenu: () => void;
  resetMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<Food | null>(null);

  const refreshMenu = useCallback(() => {
    setLoading(true);
    const items = menuService.getMenuItems();
    setMenuItems(items);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshMenu();
  }, [refreshMenu]);

  const addOrUpdateMenuItem = (item: Omit<Food, 'id'> & { id?: string }) => {
    menuService.saveMenuItem(item);
    refreshMenu();
  };

  const deleteMenuItem = (id: string) => {
    menuService.deleteMenuItem(id);
    refreshMenu();
  };

  const resetMenu = () => {
    menuService.resetToDefault();
    refreshMenu();
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        loading,
        selectedItem,
        setSelectedItem,
        addOrUpdateMenuItem,
        deleteMenuItem,
        refreshMenu,
        resetMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
