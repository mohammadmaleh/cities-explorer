# CityCardComponent Documentation

A component provides a simple card layout for displaying detailed information about a city.

## Features

- **City Information:**  
  Displays the city's name along with its native name.

- **Country Display:**  
  Shows the country of the city with a globe emoji for visual context.

- **Population:**  
  Presents the city's population in a formatted number with a population emoji.

- **Landmarks:**  
  Lists notable landmarks associated with the city, each with a marker icon.

## How It Works

- **Input Property:**  
  The component requires a `city` object (of type `City`) passed as an input. This object contains properties such as `name`, `name_native`, `country`, `population`, and `landmarks`.

- **Template Structure:**  
  The component template is structured within an `<article>` element (with `data-testid="city-card"`) that:

  - Displays the city name and native name in a header (`data-testid="city-name"`).
  - Shows the city country in a subheader (`data-testid="city-country"`).
  - Lists the population with a number pipe for formatting (`data-testid="city-population"`).
  - Iterates over the `city.landmarks` array to display each landmark (`data-testid="city-landmark"`).
