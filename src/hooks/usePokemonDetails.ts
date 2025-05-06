import { useState, useEffect } from "react";

import { usePokemon } from "./usePokemon";

// Type : Pokemon Data
import { TPokemonDetail } from "../types/pokemon-data";

import { retrieveFromLocalStorage } from "../utils/";

const keyName = "allPokemonData";

export const usePokemonDetails = (
  urls: string[] | [],
): { loading: boolean; error: string; data: TPokemonDetail[] | [] } => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<TPokemonDetail[] | []>([]);

  const { state, dispatch } = usePokemon();

  useEffect(() => {
    if (!urls.length) {
      setError("URL is required to fetch Pokemon details.");
      setLoading(false);
      setError("");
      return;
    }

    if ((retrieveFromLocalStorage(keyName) as TPokemonDetail[])?.length) {
      setData(retrieveFromLocalStorage(keyName) as TPokemonDetail[]);
      return;
    }

    async function fetchPokemonDetailsFromApi() {
      try {
        setLoading(true);

        const responses = await Promise.all(urls.map((url) => fetch(url)));

        const dataPromises = responses.map((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data from ${response.url}: ${response.statusText}`);
          }
          return response.json();
        });

        const allPokemonData = (await Promise.all(dataPromises)) as TPokemonDetail[];
        setData(allPokemonData);
      } catch (error) {
        setError(
          (error as Error).message || "An unknown error occurred while fetching Pokemon details.",
        );
      } finally {
        setLoading(false);
      }
    }

    if ((state.pokemonCardsData as TPokemonDetail[]).length) return;
    fetchPokemonDetailsFromApi();
  }, [urls.length]);

  useEffect(() => {
    if (!urls.length) return;
    if (!data.length) return;

    const updatedData = data.map(
      (pokemon: TPokemonDetail): TPokemonDetail => ({
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        types: pokemon.types,
      }),
    );
    dispatch({ type: "POKEMON/SET_POKEMON_CARDS_DATA", payload: updatedData as TPokemonDetail[] });
  }, [data.length]);

  return { loading, error, data };
};
