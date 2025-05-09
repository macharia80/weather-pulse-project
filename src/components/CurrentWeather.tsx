
import React from 'react';
import { WeatherData } from '@/api/weatherService';
import { getWeatherIconUrl } from '@/utils/weatherUtils';

interface CurrentWeatherProps {
  data: WeatherData;
  tempUnit: 'celsius' | 'fahrenheit';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, tempUnit }) => {
  const temperature = data.temperature;
  const tempSymbol = tempUnit === 'celsius' ? '°C' : '°F';

  return (
    <div className="text-white flex flex-col items-center animate-fade-in">
      <div className="mb-2 text-center">
        <h2 className="text-3xl font-bold mb-1">{data.city}</h2>
        <p className="text-lg opacity-80">{data.country}</p>
      </div>
      
      <div className="flex flex-col items-center mt-4">
        <img 
          src={getWeatherIconUrl(data.icon)}
          alt={data.description}
          className="weather-icon mb-2"
        />
        <p className="text-xl capitalize mb-2">{data.description}</p>
        <h1 className="text-6xl font-bold">{Math.round(temperature)}{tempSymbol}</h1>
        <p className="text-lg mt-2">Feels like: {Math.round(data.feelsLike)}{tempSymbol}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8">
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-80">Humidity</span>
          <span className="text-xl">{data.humidity}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-80">Wind</span>
          <span className="text-xl">{data.windSpeed} km/h</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-80">Pressure</span>
          <span className="text-xl">{data.pressure} hPa</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-80">Visibility</span>
          <span className="text-xl">{(data.visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
