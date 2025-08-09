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
  placeholder = 'Search . . .',
  className = '',
}) => {
  return (
    <>
      <div className="flex-grow mx-4 md:mx-6 border-l-2">
        <div className="flex items-center bg-gray-100/80 px-4 py-2 rounded-full w-full md:max-w-md border-2 border-gray-300">
          <FiSearch className="text-[var(--color-bg-primary)] bg-[var(--color-primary)] text-lg flex-shrink-0 p-3 rounded-full" />
          <input
            type="search"
            placeholder="Search . . ."
            className="ml-2 w-full bg-transparent text-sm text-gray-600 placeholder-gray-300 outline-none"
          />
        </div>
      </div>
    </>
  );
};
