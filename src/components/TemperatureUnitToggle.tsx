
import React from 'react';
import { Button } from '@/components/ui/button';

interface TemperatureUnitToggleProps {
  unit: 'celsius' | 'fahrenheit';
  onChange: (unit: 'celsius' | 'fahrenheit') => void;
}

const TemperatureUnitToggle: React.FC<TemperatureUnitToggleProps> = ({ unit, onChange }) => {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant={unit === 'celsius' ? 'default' : 'outline'}
        className={unit === 'celsius' 
          ? 'bg-white/20 hover:bg-white/30 text-white' 
          : 'bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-white/10'}
        onClick={() => onChange('celsius')}
      >
        °C
      </Button>
      <Button
        size="sm"
        variant={unit === 'fahrenheit' ? 'default' : 'outline'}
        className={unit === 'fahrenheit' 
          ? 'bg-white/20 hover:bg-white/30 text-white' 
          : 'bg-transparent border-white/20 text-white/70 hover:text-white hover:bg-white/10'}
        onClick={() => onChange('fahrenheit')}
      >
        °F
      </Button>
    </div>
  );
};

export default TemperatureUnitToggle;
