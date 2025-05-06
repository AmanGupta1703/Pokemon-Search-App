# Pokémon Search App

This project is a Pokémon search application built with React, TypeScript, and Vite. It allows users to search for Pokémon by name, filter them by type, and view detailed information about each Pokémon. The app fetches data from the [PokeAPI](https://pokeapi.co/) and provides a clean, responsive UI.

> **Important Note**: This app works only for the first 20 Pokémon objects returned from the PokeAPI.

## Features

- **Search Pokémon by Name**: Users can search for Pokémon using the search bar.
- **Filter by Type**: A dropdown menu allows filtering Pokémon by their type (e.g., Fire, Water, Grass).
- **Pokémon Cards**: Displays Pokémon details such as name, ID, image, and types.
- **Local Storage Caching**: Data is cached in local storage to reduce API calls and improve performance.
- **Responsive Design**: The app is fully responsive and works on all screen sizes.

---

## Project Structure

The project is organized into the following folders and files:

### `src/`

- **`components/`**: Contains reusable UI components.

  - **`Button/`**: Button component for actions like submitting forms.
  - **`Dropdown/`**: Dropdown component for filtering Pokémon by type.
  - **`Form/`**: Form component for handling user input.
  - **`Header/`**: Header component displaying the app title.
  - **`Input/`**: Input component for the search bar.
  - **`Layout/`**: Layout component for structuring the app.
  - **`Loading/`**: Loading spinner component for API calls.
  - **`Modal/`**: Modal component for displaying messages (e.g., app information).
  - **`PokemonCards/`**: Displays Pokémon cards with details like name, ID, and types.
  - **`SearchForm/`**: Search form component for searching Pokémon by name.
  - **`Section/`**: Section component for grouping content.
  - **`Wrapper/`**: Wrapper component for layout styling.

- **`contexts/`**: Contains the `PokemonContext` for managing global state using React Context and Reducer.

- **`hooks/`**: Custom hooks for reusable logic.

  - **`useFetch.ts`**: Fetches data from APIs with caching in local storage.
  - **`usePokemon.ts`**: Provides access to the Pokémon context.
  - **`usePokemonDetails.ts`**: Fetches detailed Pokémon data from the API.

- **`types/`**: TypeScript type definitions for Pokémon data.

- **`utils/`**: Utility functions for local storage operations and API calls.

- **`App.tsx`**: Main app component that initializes the layout and fetches Pokémon data.
- **`main.tsx`**: Entry point for rendering the React app.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokemon-search-app.git
   cd pokemon-search-app
   ```
