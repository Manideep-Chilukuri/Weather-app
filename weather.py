import os
import sys
import requests

API_URL = "https://api.openweathermap.org/data/2.5/weather"
CITY_QUERY = "Melbourne,AU"
UNITS = "metric"


def get_api_key():
    """Read the OpenWeatherMap API key from the environment."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing environment variable OPENWEATHER_API_KEY. "
            "Please set it before running this script."
        )
    return api_key


def fetch_weather(api_key):
    """Call OpenWeatherMap and return the parsed JSON weather response."""
    params = {
        "q": CITY_QUERY,
        "appid": api_key,
        "units": UNITS,
    }

    try:
        response = requests.get(API_URL, params=params, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as exc:
        raise ConnectionError(f"Weather request failed: {exc}") from exc

    try:
        return response.json()
    except ValueError as exc:
        raise ValueError("Invalid JSON response received from weather service.") from exc


def parse_weather(data):
    """Extract temperature and weather description from the API response."""
    if not isinstance(data, dict):
        raise TypeError("Unexpected API response format.")

    main = data.get("main")
    weather = data.get("weather")

    if not main or not isinstance(main, dict) or "temp" not in main:
        raise KeyError("Temperature data is missing from the API response.")
    if not weather or not isinstance(weather, list) or not weather:
        raise KeyError("Weather condition data is missing from the API response.")

    temperature = main["temp"]
    description = weather[0].get("description", "Unknown conditions")
    return temperature, description.capitalize()


def main():
    """Main entry point for the weather script."""
    try:
        api_key = get_api_key()
        weather_data = fetch_weather(api_key)
        temperature, description = parse_weather(weather_data)

        print("Current weather in Melbourne, Australia:")
        print(f"Temperature: {temperature:.1f} °C")
        print(f"Conditions: {description}")
    except EnvironmentError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)
    except (ConnectionError, KeyError, TypeError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
