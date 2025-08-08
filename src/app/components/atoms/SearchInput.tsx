import React from 'react';
import { Input } from './Input';
import { FiSearch } from 'react-icons/fi';

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search Here..',
  className = '',
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-blue-400">
        <FiSearch size={18} />
      </div>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 rounded-full bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
    </div>
  );
};
