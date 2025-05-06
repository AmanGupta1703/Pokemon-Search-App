import { useState } from "react";

import { usePokemon } from "../../hooks/usePokemon";

import { Form, Input, Button } from "../";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");

  const { dispatch } = usePokemon();

  const handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!searchValue) return alert("Search input should not be empty!");

    dispatch({ type: "POKEMON/SET_SEARCH_VALUE", payload: searchValue });
  };

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    if (!ev.target.value) {
      dispatch({ type: "POKEMON/SET_FILTER_BY", payload: "all" });
    }

    setSearchValue(ev.target.value);
  }

  return (
    <Form onSubmit={handleSearch}>
      <Input value={searchValue} name="search" onChange={handleChange} />
      <Button>Submit</Button>
    </Form>
  );
};

export default SearchForm;
