# BackButtonComponent Documentation

A component provides a simple back button to navigate to a specified route.

## Features

- **Navigation Button:**  
  A styled button that, when clicked, navigates the user back to a specified route.

- **Customizable Link:**  
  Accepts an optional `link` input. If provided, clicking the button navigates to that link.
  otherwise, it defaults to navigating to the "cities-list" route.

## How It Works

- **Router Injection:**  
  Uses Angular's Router for navigation.

- **Input Property:**  
  The component accepts an input property `link` which determines the navigation destination.

- **Click Handler:**  
  When the button is clicked, the `handleGoBack()` method is called, navigating to the specified `link` if available, or defaulting to "cities-list".
