import { Food } from '../types/food';
import { INITIAL_MENU_ITEMS } from '../data/menu';

const STORAGE_KEY = 'khatti_cafe_menu_v2';

export const menuService = {
  getMenuItems(): Food[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to read menu from localStorage', e);
    }
    // initialize storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
    } catch (e) {
      console.warn('Failed to seed menu to localStorage', e);
    }
    return INITIAL_MENU_ITEMS;
  },

  getMenuItemById(id: string): Food | undefined {
    const items = this.getMenuItems();
    return items.find((i) => i.id === id);
  },

  saveMenuItem(item: Omit<Food, 'id'> & { id?: string }): Food {
    const items = this.getMenuItems();
    let savedItem: Food;
    if (item.id) {
      // update
      savedItem = item as Food;
      const index = items.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        items[index] = savedItem;
      } else {
        items.push(savedItem);
      }
    } else {
      // create
      savedItem = {
        ...item,
        id: `food-${Date.now()}`,
      };
      items.unshift(savedItem);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist menu items', e);
    }
    return savedItem;
  },

  deleteMenuItem(id: string): void {
    const items = this.getMenuItems().filter((i) => i.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to delete menu item', e);
    }
  },

  resetToDefault(): Food[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MENU_ITEMS));
    } catch (e) {
      console.error('Failed to reset menu', e);
    }
    return INITIAL_MENU_ITEMS;
  }
};
