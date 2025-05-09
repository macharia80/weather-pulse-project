
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import WeatherForecast from '@/components/WeatherForecast';
import LoadingSpinner from '@/components/LoadingSpinner';
import TemperatureUnitToggle from '@/components/TemperatureUnitToggle';
import { fetchWeatherData, WeatherResponse } from '@/api/weatherService';
import { getWeatherBackground, getTimeBasedGreeting } from '@/utils/weatherUtils';
import { getWeatherIconUrl } from '@/utils/weatherUtils';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('London'); // Default city
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>('celsius');
  const { toast } = useToast();

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      
      // Successful toast notification
      toast({
        title: "Weather Updated",
        description: `Latest weather for ${data.current.city} loaded.`,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  // Determine background based on weather condition
  const backgroundClass = weatherData 
    ? getWeatherBackground(weatherData.current.description)
    : 'bg-gradient-clear';

  return (
    <div className={`min-h-screen w-full ${backgroundClass}`}>
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{getTimeBasedGreeting()}</h1>
            <p className="text-white/80">Get the latest weather updates</p>
          </div>
          
          <div className="flex items-center gap-4">
            <TemperatureUnitToggle unit={tempUnit} onChange={setTempUnit} />
          </div>
        </header>

        <div className="mb-8 w-full flex justify-center">
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : weatherData ? (
          <div className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <div className="flex justify-center">
                <CurrentWeather data={weatherData.current} tempUnit={tempUnit} />
              </div>
            </div>
            
            <WeatherForecast forecast={weatherData.forecast} tempUnit={tempUnit} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white text-xl">Enter a city to see the weather</p>
          </div>
        )}
        
        <footer className="mt-auto pt-8 text-center text-white/60 text-sm">
          <p>Weather Application — Developed with React & TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
