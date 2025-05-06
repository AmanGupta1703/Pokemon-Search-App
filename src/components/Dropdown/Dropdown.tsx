import { useCallback, useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import { Loading } from "../";

import styles from "./Dropdown.module.css";

type TDropdownItemProps = {
  type: string;
};

type TDropdownListProps = {
  toShow: boolean;

  onClick: (ev: React.MouseEvent<HTMLDivElement>) => void;
};

const Dropdown = () => {
  const [toShow, setToShow] = useState<boolean>(false);

  const {
    state: { filterByType },
  } = usePokemon();

  return (
    <div className={`${styles.dropdown}`} onClick={() => setToShow((prevToShow) => !prevToShow)}>
      <span className={`${styles["dropdown-value"]}`}>
        {filterByType ? filterByType[0]?.toUpperCase() + filterByType?.slice(1) : "Type"}
      </span>
      <span>{!toShow ? "\u25BC" : "\u25B2"}</span>

      <DropdownList toShow={toShow} onClick={() => setToShow((prevToShow) => !prevToShow)} />
    </div>
  );
};

const DropdownList = ({ toShow, onClick }: TDropdownListProps) => {
  const { state } = usePokemon();

  const { pokemonTypes, loading, error } = state;

  if (loading) {
    return (
      <div className={`${styles["dropdown-list"]} ${toShow ? styles.show : null}`}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles["dropdown-list"]} ${toShow ? styles.show : null}`}>
        <span className={`${styles["error"]}`}>Failed to load data</span>
      </div>
    );
  }

  return (
    <div className={`${styles["dropdown-list"]} ${toShow ? styles.show : null}`} onClick={onClick}>
      {pokemonTypes?.map((type) => type !== "unknown" && <DropdownItem key={type} type={type} />)}
    </div>
  );
};

const DropdownItem = ({ type }: TDropdownItemProps) => {
  const { dispatch } = usePokemon();

  const handleFilter = useCallback(() => {
    dispatch({ type: "POKEMON/SET_FILTER_BY", payload: type });
  }, [dispatch, type]);

  return (
    <span onClick={handleFilter} className={`${styles["dropdown-item"]}`} role="button">
      {type}
    </span>
  );
};

export default Dropdown;
