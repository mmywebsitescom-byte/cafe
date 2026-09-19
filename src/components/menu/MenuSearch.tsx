import React from 'react';
import { Search, X } from 'lucide-react';

interface MenuSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export const MenuSearch: React.FC<MenuSearchProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Search dishes, pizzas, coffee...',
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A99B8C]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-[#241B16] border border-[#C6A15B]/25 rounded-full text-sm text-[#F8F3EC] placeholder-[#A99B8C]/60 focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all"
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#A99B8C] hover:text-[#F8F3EC]"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
