# PaginationComponent Documentation

A component provides simple pagination controls for navigating between pages of city data.

## Features

- **Previous Button:**  
  Navigates to the previous page. Disabled when the current page is the first page.

- **Next Button:**  
  Navigates to the next page. Disabled when the current page equals the total number of pages.

- **Page Information:**  
  Displays the current page and total pages.

## How It Works

- **State Management:**  
  Uses the `CitiesStore` to access the current page, total items, and page limit. The total number of pages is computed by dividing the total items by the limit.

- **Navigation:**  
  Clicking the Previous or Next buttons triggers methods that update the page state in `CitiesStore`, ensuring the page number stays within valid bounds.
