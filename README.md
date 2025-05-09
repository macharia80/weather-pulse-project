
# Weather Pulse Application

A decoupled weather application featuring a React frontend (simulating Next.js) and instructions for setting up a Laravel API backend.

## Project Structure

This project consists of two main components:

1. Frontend: A React application styled with Tailwind CSS
2. Backend: Instructions for implementing a Laravel API (not included in this version)

## Frontend Features

- Display current weather for any city
- 5-day weather forecast
- Temperature unit toggle (Celsius/Fahrenheit)
- Responsive design for all devices
- Visual feedback based on weather conditions
- Clean, modern UI with optimal UX

## Backend Implementation Instructions

For a complete implementation, you would need to create a Laravel backend that:

1. Accepts API requests for weather data
2. Communicates with the OpenWeatherMap API
3. Processes and returns formatted data to the frontend

### Laravel Backend Setup Steps

1. Install Laravel:
   ```
   composer create-project laravel/laravel weather-api
   ```

2. Create a WeatherController:
   ```
   php artisan make:controller WeatherController
   ```

3. Implement the controller with a method to fetch weather:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'London');
        $apiKey = env('OPENWEATHERMAP_API_KEY');
        
        // Current weather data
        $currentResponse = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q' => $city,
            'appid' => $apiKey,
        ]);
        
        if ($currentResponse->failed()) {
            return response()->json(['error' => 'Failed to fetch weather data'], 422);
        }
        
        $currentData = $currentResponse->json();
        
        // Forecast data
        $forecastResponse = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'appid' => $apiKey,
        ]);
        
        if ($forecastResponse->failed()) {
            return response()->json(['error' => 'Failed to fetch forecast data'], 422);
        }
        
        $forecastData = $forecastResponse->json();
        
        // Process forecast data to get one entry per day
        $processedForecast = $this->processForecastData($forecastData);
        
        return response()->json([
            'current' => [
                'city' => $currentData['name'],
                'country' => $currentData['sys']['country'],
                'temperature' => $currentData['main']['temp'],
                'feelsLike' => $currentData['main']['feels_like'],
                'description' => $currentData['weather'][0]['description'],
                'icon' => $currentData['weather'][0]['icon'],
                'humidity' => $currentData['main']['humidity'],
                'windSpeed' => $currentData['wind']['speed'],
                'pressure' => $currentData['main']['pressure'],
                'visibility' => $currentData['visibility'],
                'sunrise' => $currentData['sys']['sunrise'],
                'sunset' => $currentData['sys']['sunset'],
                'timeZone' => $currentData['timezone']
            ],
            'forecast' => $processedForecast
        ]);
    }
    
    private function processForecastData($forecastData)
    {
        $processedData = [];
        $dates = [];
        
        foreach ($forecastData['list'] as $forecast) {
            $date = date('Y-m-d', $forecast['dt']);
            
            if (!in_array($date, $dates)) {
                $dates[] = $date;
                $processedData[] = [
                    'date' => $date,
                    'temperature' => $forecast['main']['temp'],
                    'icon' => $forecast['weather'][0]['icon'],
                    'description' => $forecast['weather'][0]['description']
                ];
            }
            
            // Limit to 5 days
            if (count($dates) >= 5) {
                break;
            }
        }
        
        return $processedData;
    }
}
```

4. Set up routes in `routes/api.php`:

```php
<?php

use App\Http\Controllers\WeatherController;
use Illuminate\Support\Facades\Route;

Route::get('/weather', [WeatherController::class, 'getWeather']);
```

5. Add CORS middleware to allow frontend requests:

```
php artisan make:middleware Cors
```

Implement the middleware:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Cors
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
    }
}
```

Register the middleware in `app/Http/Kernel.php`.

6. Set up environment variables:

```
OPENWEATHERMAP_API_KEY=your_api_key_here
```

## Deployment Instructions

1. Deploy the Laravel API to a server
2. Deploy the React frontend to a hosting service
3. Update the API URL in the frontend configuration
4. Ensure CORS is properly configured to allow cross-domain requests

## Technologies Used

- React with TypeScript
- TailwindCSS for styling
- Laravel 10 for API backend (implementation instructions provided)
- OpenWeatherMap API for weather data

## License

This project is open-sourced under the MIT license.
Project made by Macharia Sam Kamau

