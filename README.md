# City Explorer

An interactive application to explore and learn about cities around the world.

## Features

- **City List**: Displays a list of cities with basic information, including name, native name, country, population, and landmarks.

- **City Details**: Provides a detailed view of a selected city, including key information and an interactive map.

- **City Guesser**: A geography-based game that challenges users to guess cities based on given clues.

- **Sorting and Filtering**: Allows users to sort and filter the city list based on various criteria.

- **Pagination**: Supports pagination for easy navigation through the list of cities.

## Tech Stack

- **Frontend**: Angular, NgRx, TailwindCSS

- **Backend**: NestJS, Swagger

- **Third-Party Services**: Google Maps

## How to Run the Application

### Running the Development Server

- Clone the repository:

```bash
git clone https://github.com/mohammadmaleh/cities-explorer
```

- Navigate to the backend project directory:

```bash
cities-explorer-api
pnpm install
pnpm run start:dev
```

- In another terminal, navigate to the frontend project directory:

```bash
cd cities-explorer-frontend
pnpm install
ng start
```

the application will be running on:

```bash
http://localhost:4200
```

### Running Tests

- Frontend Tests

```bash
ng test
```

- Backend Tests

```bash
pnpm run test
```

## Reviewing the API Documentation

- Start the backend server:

```bash
pnpm run start:dev
```

- Open your browser and navigate to:

```bash
http://localhost:3000/api
```

##Approach

- The application exposes three API endpoints:

1. City List API: Returns a list of cities.

2. City Details API: Returns details for a specific city.

3. City Guesser API: Provides questions for the city guessing game.

- Uses modern Angular features, emphasizing Signal-based architecture, standalone components, and control flow syntax.
- leverages a signal store using NgRx for state management.

- Fully documented, mobile-friendly, and well-tested.

## Future Improvements

- Dockerization: Containerize the application for easier deployment.

- Nx Monorepo: Utilize Nx to manage shared code between frontend and backend, including interfaces and reusable components.

- Microfrontend Architecture: Separate reusable components like buttons and pagination into independent microfrontends.

- Enhanced Google Maps Integration: Improve map features (currently, API key is not included for security reasons).

- Database Integration: Store city data in a database and implement a search feature for better scalability.
