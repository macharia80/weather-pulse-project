
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city..."
        className="flex-1 px-4 py-2 rounded-lg search-input focus:outline-none"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="bg-white/20 hover:bg-white/30"
      >
        <Search size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;
