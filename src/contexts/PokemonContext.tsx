import { useReducer, createContext, Dispatch, useMemo, ReactNode, useEffect } from "react";

import { retrieveFromLocalStorage, saveToLocalStorage } from "../utils";

import { TPokemonDetail } from "../types/pokemon-data";

type TPokemonContextProviderProps = {
  children: ReactNode;
};

export type TPokemonData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

type TInitialState = {
  searchInput: string | null;
  pokemonTypes: string[] | [];
  pokemonData: TPokemonData | null;
  filterByType: string | null;
  pokemonCardsData: TPokemonDetail[] | [];
  filterPokemonCardsData: TPokemonDetail[] | [];

  error: string | null;
  loading: boolean;
};

type TReducerType =
  | "POKEMON/SET_POKEMON_TYPES"
  | "POKEMON/SET_LOADING"
  | "POKEMON/SET_ERROR"
  | "POKEMON/SET_FILTER_BY"
  | "POKEMON/SET_SEARCH_VALUE"
  | "POKEMON/SET_POKEMON_DATA"
  | "POKEMON/SET_POKEMON_CARDS_DATA";

type TReducerAction = {
  type: TReducerType;
  payload?: TPokemonDetail[] | TPokemonData[] | TPokemonData | [] | string[] | string;
};

type TPokemonContext = {
  state: TInitialState;
  dispatch: Dispatch<TReducerAction>;
};

const PokemonContext = createContext<TPokemonContext | undefined>(undefined);

const initialState: TInitialState = retrieveFromLocalStorage<TInitialState>("initialState") || {
  searchInput: "",
  pokemonTypes: [],
  pokemonData: null,
  filterByType: "",
  pokemonCardsData: [],
  filterPokemonCardsData: [],

  error: null,
  loading: false,
};

const pokemonReducer = (state: TInitialState, action: TReducerAction): TInitialState => {
  switch (action.type) {
    case "POKEMON/SET_LOADING":
      return { ...state, loading: !state.loading };
    case "POKEMON/SET_ERROR":
      return {
        ...state,
        error: typeof action.payload === "string" ? action.payload : "An unknown error occurred.",
      };
    case "POKEMON/SET_POKEMON_TYPES":
      const updatedPokemonTypes =
        Array.isArray(action.payload) && action.payload.every((item) => typeof item === "string")
          ? action.payload
          : state.pokemonTypes;

      return {
        ...state,
        error: null,
        loading: false,
        pokemonTypes: updatedPokemonTypes,
      };
    case "POKEMON/SET_FILTER_BY":
      const filterBy = action.payload as string;
      const updatedPokemonCardsData =
        filterBy !== "all"
          ? state.pokemonCardsData.filter((item) =>
              item.types.some(({ type }) => type.name.toLowerCase() === filterBy.toLowerCase()),
            )
          : state.pokemonCardsData;

      return {
        ...state,
        filterByType: filterBy,
        filterPokemonCardsData: updatedPokemonCardsData,
      };
    case "POKEMON/SET_SEARCH_VALUE":
      const searchValue = (action.payload as string).toLowerCase();

      const updatedPokemonData = state.pokemonCardsData.filter(
        (pokemon) => pokemon.name.toLowerCase() === searchValue,
      );

      return {
        ...state,
        searchInput: action.payload as string,
        filterPokemonCardsData: updatedPokemonData,
      };
    case "POKEMON/SET_POKEMON_DATA":
      return { ...state, pokemonData: action.payload as TPokemonData };
    case "POKEMON/SET_POKEMON_CARDS_DATA":
      return { ...state, pokemonCardsData: action.payload as TPokemonDetail[] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const PokemonContextProvider = ({ children }: TPokemonContextProviderProps) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  useEffect(() => {
    saveToLocalStorage<TInitialState>("initialState", state);
  }, [state]);

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export default PokemonContextProvider;

export { PokemonContext };
