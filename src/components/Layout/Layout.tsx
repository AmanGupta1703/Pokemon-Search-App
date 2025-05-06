import { Dropdown, Header, Main, Modal, PokemonCards, SearchForm, Section, Wrapper } from "../";

const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Section className="section-search">
          {/* Search Form */}
          <Wrapper className="wrapper-search">
            <SearchForm />

            {/* Dropdown ( Search By Type ) */}
            <Dropdown />
          </Wrapper>
        </Section>
        <Section className="section-cards">
          <PokemonCards />
        </Section>
      </Main>

      <Modal>
        <p>This website works with 20 Pokémon objects from PokeAPI.</p>
      </Modal>
    </>
  );
};

export default Layout;
