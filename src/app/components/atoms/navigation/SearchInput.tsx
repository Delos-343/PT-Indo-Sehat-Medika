import React from 'react';
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
      <div className="flex-grow mx-4 md:mx-6">
        <div className="flex items-center bg-gray-100/80 px-3 py-1 rounded-full w-full md:max-w-md border-1 border-gray-300">
          <FiSearch className="bg-[var(--color-primary)] text-lg text-[var(--color-bg-primary)] flex-shrink-0 p-2 rounded-full" size={30} />
          <input
            type="search"
            placeholder="Search . . ."
            className="ml-2 w-full bg-transparent text-sm text-[var(--color-primary)] placeholder-gray-400 outline-none"
          />
        </div>
      </div>
    </>
  );
};
