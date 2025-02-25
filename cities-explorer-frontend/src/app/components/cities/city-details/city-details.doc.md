# CityDetailsComponent Documentation

A component provides a detailed view of a selected city including its key information and a map.

## Features

- **Back Button:**  
  Allows users to navigate back to the previous view.

- **Loading State:**  
  Displays a loading indicator while fetching city data.

- **Error Handling:**  
  Shows error feedback if an error occurs during data retrieval.

- **City Information:**  
  Presents details such as name, country, continent, population, founded year, and landmarks.

- **Google Map:**  
  Integrates a Google Map with a marker to display the city's location.

## How It Works

- **Data Fetching:**  
  On initialization, the component subscribes to route parameters to extract the city ID. If a valid ID is found, it loads the city's details using the `CitiesStore`. If no valid ID is provided, it navigates back to the cities list.

- **Conditional Rendering:**

  - If the data is loading, the `LoadingComponent` is displayed.
  - If an error occurs, the `ErrorFeedbackComponent` is shown.
  - Otherwise, the component displays the city's details along with landmarks and a map.

- **Map Integration:**  
  The component uses computed properties to derive the latitude and longitude from the city's data.
  These values are passed to the Google Map and Map Marker components to correctly position the map marker.

- **Cleanup:**  
  When the component is destroyed, it clears the selected city from the `CitiesStore`.
