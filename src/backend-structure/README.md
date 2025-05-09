
# Laravel Backend Structure

This is a representation of how the Laravel backend would be structured. In a real implementation, this would be a separate repository.

## Directory Structure

```
weather-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── WeatherController.php
│   │   └── Middleware/
│   │       └── Cors.php
│   └── Services/
│       └── WeatherService.php
├── routes/
│   └── api.php
├── .env
└── composer.json
```

## API Endpoints

### Get Weather Data
- **URL:** `/api/weather`
- **Method:** `GET`
- **Query Parameters:** `city=[string]`
- **Response Format:**
```json
{
  "current": {
    "city": "London",
    "country": "GB",
    "temperature": 285.15,
    "feelsLike": 283.65,
    "description": "clear sky",
    "icon": "01d",
    "humidity": 75,
    "windSpeed": 5.1,
    "pressure": 1012,
    "visibility": 10000,
    "sunrise": 1621151400,
    "sunset": 1621203600,
    "timeZone": 3600
  },
  "forecast": [
    {
      "date": "2023-05-10",
      "temperature": 288.15,
      "icon": "01d",
      "description": "clear sky"
    },
    ...
  ]
}
```

## Implementation Notes

In a complete implementation, the Laravel backend would:

1. Receive requests from the React frontend
2. Call the OpenWeatherMap API
3. Process and transform the data
4. Return formatted responses to the frontend
5. Handle errors gracefully
6. Implement caching to reduce API calls

You would need to obtain an API key from OpenWeatherMap and add it to your `.env` file.
