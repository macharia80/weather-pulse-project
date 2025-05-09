
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

// List of real cities for mock data
const realCities = [
  { name: "London", country: "UK" },
  { name: "New York", country: "USA" },
  { name: "Tokyo", country: "Japan" },
  { name: "Paris", country: "France" },
  { name: "Sydney", country: "Australia" },
  { name: "Berlin", country: "Germany" },
  { name: "Toronto", country: "Canada" },
  { name: "Rome", country: "Italy" },
  { name: "Madrid", country: "Spain" },
  { name: "Dubai", country: "UAE" }
  const allMegacities = [
  // Your original 15 cities (unchanged)
  { id: 1, name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { id: 2, name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { id: 3, name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { id: 4, name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { id: 5, name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { id: 6, name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
  { id: 7, name: 'Cairo', country: 'EG', lat: 30.0444, lon: 31.2357 },
  { id: 8, name: 'Rio de Janeiro', country: 'BR', lat: -22.9068, lon: -43.1729 },
  { id: 9, name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
  { id: 10, name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
  { id: 11, name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
  { id: 12, name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
  { id: 13, name: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784 },
  { id: 14, name: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018 },
  { id: 15, name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 },

  // ===== ALL OTHER 2M+ CITIES (BY CONTINENT) =====
  // ASIA (45 cities)
  { id: 16, name: 'Shanghai', country: 'CN', lat: 31.2304, lon: 121.4737 },
  { id: 17, name: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025 },
  { id: 18, name: 'Dhaka', country: 'BD', lat: 23.8103, lon: 90.4125 },
  { id: 19, name: 'Osaka', country: 'JP', lat: 34.6937, lon: 135.5023 },
  { id: 20, name: 'Karachi', country: 'PK', lat: 24.8607, lon: 67.0011 },
  { id: 21, name: 'Jakarta', country: 'ID', lat: -6.2088, lon: 106.8456 },
  { id: 22, name: 'Seoul', country: 'KR', lat: 37.5665, lon: 126.9780 },
  { id: 23, name: 'Manila', country: 'PH', lat: 14.5995, lon: 120.9842 },
  { id: 24, name: 'Chongqing', country: 'CN', lat: 29.4316, lon: 106.9123 },
  { id: 25, name: 'Shenzhen', country: 'CN', lat: 22.5431, lon: 114.0579 },
  { id: 26, name: 'Lahore', country: 'PK', lat: 31.5204, lon: 74.3587 },
  { id: 27, name: 'Bangalore', country: 'IN', lat: 12.9716, lon: 77.5946 },
  { id: 28, name: 'Chennai', country: 'IN', lat: 13.0827, lon: 80.2707 },
  { id: 29, name: 'Kolkata', country: 'IN', lat: 22.5726, lon: 88.3639 },
  { id: 30, name: 'Hyderabad', country: 'IN', lat: 17.3850, lon: 78.4867 },
  { id: 31, name: 'Tehran', country: 'IR', lat: 35.6892, lon: 51.3890 },
  { id: 32, name: 'Wuhan', country: 'CN', lat: 30.5928, lon: 114.3055 },
  { id: 33, name: 'Tianjin', country: 'CN', lat: 39.0842, lon: 117.2010 },
  { id: 34, name: 'Chengdu', country: 'CN', lat: 30.5728, lon: 104.0668 },
  { id: 35, name: 'Ho Chi Minh City', country: 'VN', lat: 10.8231, lon: 106.6297 },
  { id: 36, name: 'Baghdad', country: 'IQ', lat: 33.3152, lon: 44.3661 },
  { id: 37, name: 'Riyadh', country: 'SA', lat: 24.7136, lon: 46.6753 },
  { id: 38, name: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694 },
  { id: 39, name: 'Ahmedabad', country: 'IN', lat: 23.0225, lon: 72.5714 },
  { id: 40, name: 'Kuala Lumpur', country: 'MY', lat: 3.1390, lon: 101.6869 },
  { id: 41, name: 'Surat', country: 'IN', lat: 21.1702, lon: 72.8311 },
  { id: 42, name: 'Pune', country: 'IN', lat: 18.5204, lon: 73.8567 },
  { id: 43, name: 'Hangzhou', country: 'CN', lat: 30.2741, lon: 120.1551 },
  { id: 44, name: 'Nagoya', country: 'JP', lat: 35.1815, lon: 136.9066 },
  { id: 45, name: 'Suzhou', country: 'CN', lat: 31.2989, lon: 120.5853 },
  { id: 46, name: 'Foshan', country: 'CN', lat: 23.0215, lon: 113.1214 },
  { id: 47, name: 'Xiamen', country: 'CN', lat: 24.4798, lon: 118.0894 },
  { id: 48, name: 'Zhengzhou', country: 'CN', lat: 34.7466, lon: 113.6253 },
  { id: 49, name: 'Jaipur', country: 'IN', lat: 26.9124, lon: 75.7873 },
  { id: 50, name: 'Nanjing', country: 'CN', lat: 32.0603, lon: 118.7969 },

  // AFRICA (18 cities)
  { id: 51, name: 'Lagos', country: 'NG', lat: 6.5244, lon: 3.3792 },
  { id: 52, name: 'Kinshasa', country: 'CD', lat: -4.4419, lon: 15.2663 },
  { id: 53, name: 'Johannesburg', country: 'ZA', lat: -26.2041, lon: 28.0473 },
  { id: 54, name: 'Nairobi', country: 'KE', lat: -1.2864, lon: 36.8172 },
  { id: 55, name: 'Alexandria', country: 'EG', lat: 31.2001, lon: 29.9187 },
  { id: 56, name: 'Abidjan', country: 'CI', lat: 5.3599, lon: -4.0083 },
  { id: 57, name: 'Casablanca', country: 'MA', lat: 33.5731, lon: -7.5898 },
  { id: 58, name: 'Cape Town', country: 'ZA', lat: -33.9249, lon: 18.4241 },
  { id: 59, name: 'Dar es Salaam', country: 'TZ', lat: -6.7924, lon: 39.2083 },
  { id: 60, name: 'Addis Ababa', country: 'ET', lat: 9.0054, lon: 38.7636 },
  { id: 61, name: 'Khartoum', country: 'SD', lat: 15.5007, lon: 32.5599 },
  { id: 62, name: 'Accra', country: 'GH', lat: 5.6037, lon: -0.1870 },
  { id: 63, name: 'Luanda', country: 'AO', lat: -8.8383, lon: 13.2344 },
  { id: 64, name: 'Durban', country: 'ZA', lat: -29.8587, lon: 31.0218 },
  { id: 65, name: 'Tripoli', country: 'LY', lat: 32.8872, lon: 13.1913 },
  { id: 66, name: 'Dakar', country: 'SN', lat: 14.6928, lon: -17.4467 },
  { id: 67, name: 'Algiers', country: 'DZ', lat: 36.7538, lon: 3.0588 },
  { id: 68, name: 'Kano', country: 'NG', lat: 12.0022, lon: 8.5927 },

  // EUROPE (12 cities)
  { id: 69, name: 'Moscow', country: 'RU', lat: 55.7558, lon: 37.6173 },
  { id: 70, name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
  { id: 71, name: 'Rome', country: 'IT', lat: 41.9028, lon: 12.4964 },
  { id: 72, name: 'Saint Petersburg', country: 'RU', lat: 59.9343, lon: 30.3351 },
  { id: 73, name: 'Barcelona', country: 'ES', lat: 41.3851, lon: 2.1734 },
  { id: 74, name: 'Athens', country: 'GR', lat: 37.9838, lon: 23.7275 },
  { id: 75, name: 'Milan', country: 'IT', lat: 45.4642, lon: 9.1900 },
  { id: 76, name: 'Warsaw', country: 'PL', lat: 52.2297, lon: 21.0122 },
  { id: 77, name: 'Vienna', country: 'AT', lat: 48.2082, lon: 16.3738 },
  { id: 78, name: 'Bucharest', country: 'RO', lat: 44.4268, lon: 26.1025 },
  { id: 79, name: 'Budapest', country: 'HU', lat: 47.4979, lon: 19.0402 },
  { id: 80, name: 'Hamburg', country: 'DE', lat: 53.5511, lon: 9.9937 },

  // NORTH AMERICA (15 cities)
  { id: 81, name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
  { id: 82, name: 'Chicago', country: 'US', lat: 41.8781, lon: -87.6298 },
  { id: 83, name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 },
  { id: 84, name: 'Houston', country: 'US', lat: 29.7604, lon: -95.3698 },
  { id: 85, name: 'Phoenix', country: 'US', lat: 33.4484, lon: -112.0740 },
  { id: 86, name: 'Philadelphia', country: 'US', lat: 39.9526, lon: -75.1652 },
  { id: 87, name: 'Montreal', country: 'CA', lat: 45.5017, lon: -73.5673 },
  { id: 88, name: 'Guadalajara', country: 'MX', lat: 20.6597, lon: -103.3496 },
  { id: 89, name: 'Ecatepec', country: 'MX', lat: 19.6018, lon: -99.0501 },
  { id: 90, name: 'Tijuana', country: 'MX', lat: 32.5149, lon: -117.0382 },
  { id: 91, name: 'Dallas', country: 'US', lat: 32.7767, lon: -96.7970 },
  { id: 92, name: 'San Diego', country: 'US', lat: 32.7157, lon: -117.1611 },
  { id: 93, name: 'San Antonio', country: 'US', lat: 29.4241, lon: -98.4936 },
  { id: 94, name: 'Puebla', country: 'MX', lat: 19.0414, lon: -98.2063 },
  { id: 95, name: 'Juárez', country: 'MX', lat: 31.6904, lon: -106.4246 },

  // SOUTH AMERICA (10 cities)
  { id: 96, name: 'São Paulo', country: 'BR', lat: -23.5505, lon: -46.6333 },
  { id: 97, name: 'Buenos Aires', country: 'AR', lat: -34.6037, lon: -58.3816 },
  { id: 98, name: 'Lima', country: 'PE', lat: -12.0464, lon: -77.0428 },
  { id: 99, name: 'Bogotá', country: 'CO', lat: 4.7110, lon: -74.0721 },
  { id: 100, name: 'Santiago', country: 'CL', lat: -33.4489, lon: -70.6693 },
  { id: 101, name: 'Belo Horizonte', country: 'BR', lat: -19.9167, lon: -43.9345 },
  { id: 102, name: 'Caracas', country: 'VE', lat: 10.4806, lon: -66.9036 },
  { id: 103, name: 'Porto Alegre', country: 'BR', lat: -30.0346, lon: -51.2177 },
  { id: 104, name: 'Recife', country: 'BR', lat: -8.0476, lon: -34.8770 },
  { id: 105, name: 'Fortaleza', country: 'BR', lat: -3.7319, lon: -38.5267 }
];
];

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

// Mock data for development - now using real city names
export const getMockWeatherData = (city: string): Promise<WeatherResponse> => {
  console.log("Using mock weather data for:", city);
  
  // Find a matching city or get a random one from our list
  const normalizedSearchCity = city.toLowerCase().trim();
  let selectedCity = realCities.find(c => c.name.toLowerCase() === normalizedSearchCity);
  
  // If no matching city found, find the closest match or use a random one
  if (!selectedCity) {
    for (const realCity of realCities) {
      if (realCity.name.toLowerCase().includes(normalizedSearchCity) || 
          normalizedSearchCity.includes(realCity.name.toLowerCase())) {
        selectedCity = realCity;
        break;
      }
    }
    
    // If still no match, pick a random city
    if (!selectedCity) {
      selectedCity = realCities[Math.floor(Math.random() * realCities.length)];
    }
  }
  
  // Generate realistic temperature based on the city
  let baseTemp: number;
  const currentMonth = new Date().getMonth(); // 0-11 (Jan-Dec)
  
  // Adjust base temperature by city and season
  switch (selectedCity.name) {
    case "Dubai":
      baseTemp = currentMonth >= 4 && currentMonth <= 9 ? 38 : 28;
      break;
    case "Sydney":
      // Southern hemisphere - seasons are reversed
      baseTemp = currentMonth >= 10 || currentMonth <= 3 ? 28 : 18;
      break;
    case "London":
    case "Berlin":
    case "Paris":
      baseTemp = currentMonth >= 5 && currentMonth <= 8 ? 22 : 12;
      break;
    case "New York":
    case "Toronto":
      baseTemp = currentMonth >= 5 && currentMonth <= 8 ? 25 : 10;
      break;
    case "Tokyo":
    case "Rome":
    case "Madrid":
      baseTemp = currentMonth >= 5 && currentMonth <= 8 ? 26 : 16;
      break;
    default:
      baseTemp = 20; // Fallback
  }
  
  // Add some randomization to make the temperature feel realistic
  const temp = baseTemp + (Math.random() * 6) - 3;
  
  // Weather conditions based on temperature
  let description, icon;
  if (temp < 10) {
    description = "Cold";
    icon = "13d"; // Snow icon
  } else if (temp < 18) {
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

  // Generate realistic forecast with temperature progression
  const forecast = Array(5).fill(null).map((_, i) => {
    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + i + 1);
    
    // Add some temperature variation for each day
    const variation = Math.random() * 6 - 3;
    const forecastTemp = temp + variation;
    
    // Vary the weather conditions slightly
    const conditions = [
      { description: "Clear Sky", icon: "01d" },
      { description: "Partly Cloudy", icon: "02d" },
      { description: "Cloudy", icon: "03d" },
      { description: "Overcast", icon: "04d" },
      { description: "Rain", icon: "10d" }
    ];
    
    const weatherCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      date: forecastDate.toLocaleDateString(),
      temperature: forecastTemp,
      icon: weatherCondition.icon,
      description: weatherCondition.description
    };
  });

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        current: {
          city: selectedCity.name,
          country: selectedCity.country,
          temperature: temp,
          feelsLike: temp - 2,
          description,
          icon,
          humidity: Math.floor(Math.random() * 30) + 40, // 40-70%
          windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
          pressure: Math.floor(Math.random() * 30) + 1000, // 1000-1030 hPa
          visibility: Math.floor(Math.random() * 5000) + 5000, // 5-10km
          sunrise: 1621151400,
          sunset: 1621203600,
          timeZone: 7200
        },
        forecast
      });
    }, 800);
  });
};
