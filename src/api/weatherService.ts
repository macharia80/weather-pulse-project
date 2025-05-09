
import { toast } from "@/components/ui/use-toast";

// API configuration
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3f26d574f1f5dc159868c6809ebefc3d"; // This is a public key for demo purposes

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
  timeZone: number;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  icon: string;
  description: string;
}

export interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastDay[];
}

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

// This function fetches real weather data from OpenWeatherMap API
export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  try {
    // Fetch current weather data
    const currentWeatherResponse = await fetch(
      `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    
    if (!currentWeatherResponse.ok) {
      console.log(`Weather API error: ${currentWeatherResponse.statusText}`);
      // If API fails, fall back to mock data
      return getMockWeatherData(city);
    }
    
    const currentWeatherData = await currentWeatherResponse.json();
    
    // Fetch forecast data
    const forecastResponse = await fetch(
      `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
    );
    
    if (!forecastResponse.ok) {
      console.log(`Forecast API error: ${forecastResponse.statusText}`);
      // If API fails, fall back to mock data
      return getMockWeatherData(city);
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process and format current weather data
    const current: WeatherData = {
      city: currentWeatherData.name,
      country: currentWeatherData.sys.country,
      temperature: kelvinToCelsius(currentWeatherData.main.temp),
      feelsLike: kelvinToCelsius(currentWeatherData.main.feels_like),
      description: currentWeatherData.weather[0].description,
      icon: currentWeatherData.weather[0].icon,
      humidity: currentWeatherData.main.humidity,
      windSpeed: currentWeatherData.wind.speed,
      pressure: currentWeatherData.main.pressure,
      visibility: currentWeatherData.visibility,
      sunrise: currentWeatherData.sys.sunrise,
      sunset: currentWeatherData.sys.sunset,
      timeZone: currentWeatherData.timezone
    };
    
    // Process and format 5-day forecast data
    // OpenWeatherMap returns forecast data in 3-hour intervals
    // We'll pick one forecast per day at noon
    const forecast: ForecastDay[] = [];
    const processedDates: Set<string> = new Set();
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dateStr = date.toLocaleDateString();
      
      // Skip if we already have this date or if we already have 5 days
      if (!processedDates.has(dateStr) && forecast.length < 5) {
        processedDates.add(dateStr);
        
        forecast.push({
          date: dateStr,
          temperature: kelvinToCelsius(item.main.temp),
          icon: item.weather[0].icon,
          description: item.weather[0].description
        });
      }
    });
    
    return {
      current,
      forecast
    };
  } catch (error: any) {
    console.error("Error fetching weather data:", error);
    // If any unexpected error occurs, fall back to mock data
    return getMockWeatherData(city);
  }
};

// Mock data for development - simulates response from a Laravel backend
export const getMockWeatherData = (city: string): Promise<WeatherResponse> => {
  console.log("Using mock weather data for:", city);
  // This simulates what would be returned from our Laravel backend
  // In a real implementation, this would make a fetch call to the Laravel API
  
  // Generate random temperature between 15 and 35
  const temp = Math.floor(Math.random() * 20) + 15;
  
  // Weather conditions based on temperature
  let description, icon;
  if (temp < 20) {
    description = "Cloudy";
    icon = "04d";
  } else if (temp < 25) {
    description = "Partly Cloudy";
    icon = "02d";
  } else if (temp < 30) {
    description = "Clear Sky";
    icon = "01d";
  } else {
    description = "Sunny";
    icon = "01d";
  }

  // Generate random forecast
  const forecast = Array(5).fill(null).map((_, i) => {
    const forecastTemp = temp + Math.floor(Math.random() * 10) - 5;
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    
    return {
      date: date.toLocaleDateString(),
      temperature: forecastTemp,
      icon: ["01d", "02d", "03d", "04d", "10d"][Math.floor(Math.random() * 5)],
      description: ["Sunny", "Partly Cloudy", "Cloudy", "Overcast", "Rain"][Math.floor(Math.random() * 5)]
    };
  });

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        current: {
          city,
          country: "Cities",
          temperature: temp,
          feelsLike: temp - 2,
          description,
          icon,
          humidity: Math.floor(Math.random() * 50) + 30,
          windSpeed: Math.floor(Math.random() * 20) + 5,
          pressure: Math.floor(Math.random() * 30) + 1000,
          visibility: Math.floor(Math.random() * 5000) + 5000,
          sunrise: 1621151400,
          sunset: 1621203600,
          timeZone: 7200
        },
        forecast
      });
    }, 800);
  });
};
