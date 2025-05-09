
import { toast } from "@/components/ui/use-toast";

// Simulating what would normally be environment variables in Next.js
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "dummy-key"; // In a real app, this would be fetched from environment variables

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

// Mock data for development - simulates response from a Laravel backend
export const getMockWeatherData = (city: string): Promise<WeatherResponse> => {
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
          country: "Country",
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

// This function would make the actual API call to our Laravel backend
export const fetchWeatherData = async (city: string): Promise<WeatherResponse> => {
  try {
    // In a real implementation, this would call the Laravel backend
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?city=${city}`);
    // if (!response.ok) throw new Error('Failed to fetch weather data');
    // return await response.json();
    
    // For this demo, we'll use the mock data
    return getMockWeatherData(city);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast({
      title: "Error",
      description: "Failed to fetch weather data. Please try again.",
      variant: "destructive"
    });
    throw error;
  }
};
