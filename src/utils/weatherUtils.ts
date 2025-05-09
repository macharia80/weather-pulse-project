
/**
 * Converts temperature from Kelvin to Celsius
 */
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

/**
 * Converts temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9/5) + 32);
};

/**
 * Returns the appropriate background class based on weather condition
 */
export const getWeatherBackground = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
    return 'bg-gradient-sunny';
  } 
  else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle') || lowerCondition.includes('shower')) {
    return 'bg-gradient-rainy';
  }
  else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
    return 'bg-gradient-cloudy';
  }
  else if (lowerCondition.includes('snow') || lowerCondition.includes('sleet') || lowerCondition.includes('hail')) {
    return 'bg-gradient-snowy';
  }
  else if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) {
    return 'bg-gradient-foggy';
  }
  else if (lowerCondition.includes('thunder') || lowerCondition.includes('storm')) {
    return 'bg-gradient-stormy';
  }
  
  // Default background
  return 'bg-gradient-clear';
};

/**
 * Formats a timestamp to a readable time string
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Gets the OpenWeatherMap icon URL
 */
export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Returns a greeting based on time of day
 */
export const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
