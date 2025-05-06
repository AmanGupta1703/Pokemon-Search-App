import { useEffect } from "react";

// Custom Hooks
import { usePokemon } from "./hooks/usePokemon";

// Components
import { Layout } from "./components";

// Utils
import { fetchJsonDataFromApi } from "./utils";

// types
import { TPokemonData } from "./contexts/PokemonContext";

const App = () => {
  const { state, dispatch } = usePokemon();

  useEffect(() => {
    if (state.pokemonTypes?.length) return;

    async function fetchAndHandlePokemonTypes() {
      dispatch({ type: "POKEMON/SET_LOADING" });

      try {
        const data = (await fetchJsonDataFromApi<TPokemonData>(
          "https://pokeapi.co/api/v2/type?limit=21",
        )) as TPokemonData;

        if (!data.results) {
          dispatch({
            type: "POKEMON/SET_ERROR",
            payload: "No Pokémon types found in the API response.",
          });
          throw new Error("No Pokémon types found in the API response.");
        }

        const pokemonTypes = data.results.map((item) => item.name);

        pokemonTypes.unshift("all");
        dispatch({ type: "POKEMON/SET_POKEMON_TYPES", payload: pokemonTypes });
      } catch (error) {
        dispatch({
          type: "POKEMON/SET_ERROR",
          payload: "Error in fetching Pokémon types.",
        });
        console.log(`Error in fetching Pokémon types: ${error}`);
        throw error;
      }
    }

    fetchAndHandlePokemonTypes();
  }, []);

  useEffect(() => {
    if ((state.pokemonData as TPokemonData)?.results?.length) return;

    async function fetchPokemonData() {
      try {
        const pokemonsData = (await fetchJsonDataFromApi<TPokemonData>(
          "https://pokeapi.co/api/v2/pokemon?limit=20",
        )) as TPokemonData;

        if (!pokemonsData?.results.length) {
          dispatch({
            type: "POKEMON/SET_ERROR",
            payload: "No Pokémon data found in the API response.",
          });
          throw new Error("No Pokémon data found in the API response.");
        }

        dispatch({ type: "POKEMON/SET_POKEMON_DATA", payload: pokemonsData });
      } catch (error) {
        dispatch({
          type: "POKEMON/SET_ERROR",
          payload: "Error in fetching Pokémon data.",
        });
        console.log(`Error in fetching Pokémon data: ${error}`);
        throw error;
      }
    }

    fetchPokemonData();
  }, []);

  return <Layout />;
};

export default App;
