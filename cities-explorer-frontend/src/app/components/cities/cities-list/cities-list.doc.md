# CitiesListComponent Documentation

A component provides a simple list view for displaying cities along with filtering, pagination, and error/loading states.

## Features

- **City Filters:**  
  Integrates a filtering component (`CitiesFiltersComponent`) to allow users to filter cities.

- **City Cards:**  
  Displays each city using the `CityCardComponent`.

- **Pagination:**  
  Provides pagination through the `PaginationComponent` to navigate the list of cities.

- **Loading & Error States:**  
  Renders a loading indicator via `LoadingComponent` when data is being fetched, and shows error feedback using `ErrorFeedbackComponent` if an error occurs.

## How It Works

- **Data Loading:**  
  On initialization, the component calls `loadCities()` from `CitiesStore` to fetch the list of cities.

- **Conditional Rendering:**

  - Displays a loading indicator if the store's `loading()` method returns true.
  - Shows an error feedback component if the store's `error()` method returns a truthy value.
  - Otherwise, renders a grid of city cards and includes pagination controls.

- **Navigation:**  
  When a city card is clicked, the component navigates to the detailed view of the selected city using Angular's `Router`.
