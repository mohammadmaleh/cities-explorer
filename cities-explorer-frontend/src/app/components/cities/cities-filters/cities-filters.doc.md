# CitiesFiltersComponent Documentation

a component provides a simple form for filtering cities by search term, continent, and sort options.

## Features

- **Search Input:**  
  Users can search for a city or country (max 30 characters).

- **Continent Filter:**  
  Filter cities by continent using options imported from constants.

- **Sort Options:**  
  Choose a sort order for cities using options imported from constants.

## How It Works

- **Reactive Forms:**  
  Uses Angular's reactive forms to manage form controls (`searchTerm`, `continent`, `sortBy`).

- **Value Changes & Debounce:**  
  The search input value is debounced (300ms) and updated only when the value changes.

- **Filter Submission:**  
  On every change, a `CityFilters` object is constructed and passed to the `CitiesStore` to update the filter state.
