import { CafeInfo } from '../types/cafe';
import { INITIAL_CAFE_INFO } from '../data/cafe';

const STORAGE_KEY = 'khatti_cafe_info_v2';

export const cafeService = {
  getCafeInfo(): CafeInfo {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return { ...INITIAL_CAFE_INFO, ...parsed };
      }
    } catch (e) {
      console.warn('Failed to read cafe info from localStorage', e);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CAFE_INFO));
    } catch (e) {
      console.warn('Failed to seed cafe info to localStorage', e);
    }
    return INITIAL_CAFE_INFO;
  },

  updateCafeInfo(info: CafeInfo): CafeInfo {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    } catch (e) {
      console.error('Failed to update cafe info', e);
    }
    return info;
  },

  resetToDefault(): CafeInfo {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CAFE_INFO));
    } catch (e) {
      console.error('Failed to reset cafe info', e);
    }
    return INITIAL_CAFE_INFO;
  }
};
