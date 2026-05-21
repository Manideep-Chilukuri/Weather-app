# WEATHERLY

A minimalist, static weather lookup app built for GitHub Pages using HTML, CSS, and vanilla JavaScript.

## Features

- Search current weather by city and country code
- Displays location, temperature, condition, humidity, and wind speed
- Uses OpenWeatherMap Current Weather Data API
- Responsive, clean interface with icon-driven results
- Handles invalid input, missing API key, and network errors gracefully

## Setup

1. Duplicate the project files to your web server or GitHub Pages branch.
2. Open `index.html` in your browser.
3. Enter your OpenWeatherMap API key directly into the app when prompted.

> If the page still shows the old message, refresh the browser or clear the cache so the updated script loads.

## API Key

This project is client-side only, so the API key is entered in the browser and not stored in the repository.

- Do not commit a private API key to the repository.
- Use a free tier key with domain restrictions if available.
- Keep your API key private and only enter it while using the app.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Enable GitHub Pages in the repository settings.
3. Set the source branch to `main` and the folder to `/`.
4. Visit the provided GitHub Pages URL and start using the app.

## Notes

- Enter a city like `Sydney` and a country code like `AU`.
- The country field is optional, but adding it improves accuracy.
- The app uses metric units for temperature (`°C`).
