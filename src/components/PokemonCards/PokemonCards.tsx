import { useCallback } from "react";

import { usePokemon } from "../../hooks/usePokemon";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";

import { Loading } from "../";

import styles from "./PokemonCards.module.css";

import { TPokemonDetail, TType } from "../../types/pokemon-data";
import { TPokemonData } from "../../contexts/PokemonContext";

type TPokemonCardProps = TPokemonDetail;
type TPokemonTypeProps = TType;

const PokemonCards = () => {
  const {
    state: { pokemonData, filterByType, pokemonCardsData, filterPokemonCardsData },
  } = usePokemon();

  const {
    error,
    loading,
    data: allPokemonData,
  } = usePokemonDetails(
    (pokemonData as TPokemonData)?.results?.length
      ? (pokemonData as TPokemonData).results.map((item) => item.url)
      : [],
  );

  if (!(pokemonData as TPokemonData)?.results?.length || !allPokemonData.length) {
    <p>No Pokémon data available. Please try again later.</p>;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (filterByType?.length && !filterPokemonCardsData.length) {
    return <p>No Pokémon found with the type "{filterByType}" in the current dataset.</p>;
  }

  const allPokemons =
    filterPokemonCardsData.length > 0
      ? filterPokemonCardsData
      : (pokemonCardsData as TPokemonDetail[]).length > 0
      ? pokemonCardsData
      : allPokemonData;

  return (
    <article className={`${styles["pokemon-cards"]}`}>
      {(allPokemons as TPokemonDetail[]).map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </article>
  );
};

const PokemonType = ({ type }: TPokemonTypeProps) => {
  const { dispatch } = usePokemon();

  const handleFilter = useCallback(() => {
    dispatch({ type: "POKEMON/SET_FILTER_BY", payload: type.name });
  }, []);

  return (
    <span onClick={handleFilter} className={styles["pokemon-type"]}>
      {type.name}
    </span>
  );
};

const PokemonCard = ({ sprites: { front_default }, name, id, types }: TPokemonCardProps) => {
  return (
    <div className={styles["pokemon-card"]}>
      <img src={front_default || ""} alt={`${name}`} className={styles["pokemon-image"]} />
      <h2 className={styles["pokemon-name"]}>{name}</h2>
      <p className={styles["pokemon-id"]}>ID: {id}</p>
      <div className={styles["pokemon-types"]}>
        {types.map((type, index) => (
          <PokemonType key={index} {...type} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCards;
