
import React from 'react';
import { ForecastDay } from '@/api/weatherService';
import { getWeatherIconUrl } from '@/utils/weatherUtils';

interface WeatherForecastProps {
  forecast: ForecastDay[];
  tempUnit: 'celsius' | 'fahrenheit';
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, tempUnit }) => {
  const tempSymbol = tempUnit === 'celsius' ? '°C' : '°F';

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-white mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div 
            key={index} 
            className="forecast-card bg-white/10 p-4 rounded-lg flex flex-col items-center animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="text-white mb-2">{day.date}</span>
            <img 
              src={getWeatherIconUrl(day.icon)} 
              alt={day.description} 
              className="w-12 h-12"
            />
            <span className="text-white text-lg font-semibold mt-2">
              {Math.round(day.temperature)}{tempSymbol}
            </span>
            <span className="text-white/80 text-sm mt-1 capitalize">{day.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
