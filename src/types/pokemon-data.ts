type TAbility = {
  name: string | null;
  url: string | null;
};

type TPokemonAbility = {
  ability: TAbility;
  is_hidden: boolean;
  slot: number;
};

type TCries = {
  latest: string;
  legacy: string;
};

type TForm = {
  name: string;
  url: string;
};

type TVersion = {
  name: string;
  url: string;
};

type TGameIndex = {
  game_index: number;
  version: TVersion;
};

type TMove = {
  name: string;
  url: string;
};

type TMoveLearnMethod = {
  name: string;
  url: string;
};

type TVersionGroup = {
  name: string;
  url: string;
};

type TVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: TMoveLearnMethod;
  order: number | null;
  version_group: TVersionGroup;
};

type TMoveDetails = {
  move: TMove;
  version_group_details: TVersionGroupDetail[];
};

type TGeneration = {
  name: string;
  url: string;
};

type TPastAbility = {
  abilities: TPokemonAbility[];
  generation: TGeneration;
};

type TSpecies = {
  name: string;
  url: string;
};

type TSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    official_artwork: {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    [generation: string]: {
      [version: string]: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        front_gray?: string | null;
        back_gray?: string | null;
        front_transparent?: string | null;
        back_transparent?: string | null;
        front_shiny_transparent?: string | null;
        back_shiny_transparent?: string | null;
      };
    };
  };
};

type TStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type TType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type TPokemonDetail = {
  id: number;
  name: string;
  sprites: TSprites;
  types: TType[];
};
