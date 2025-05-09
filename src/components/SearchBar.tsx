
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

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
      <div className="relative flex-1">
        <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a real city..."
          className="w-full pl-10 pr-4 py-2 rounded-lg search-input focus:outline-none bg-white/10 text-white placeholder:text-white/60"
          disabled={isLoading}
        />
      </div>
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
