export type Player = {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: "M" | "F",
  country: {
    picture: string;
    code: string
  },
  picture: string;
  data: {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: [number, number, number, number, number]
  }
};


export type PlayersAnalytics = {
  bestCountry: {
    code: string;
    picture: string;
    playersNb: number;
    victories: number;
    ratio: number
  };
  averageImc: number;
  mHeight: number;
};

export type CountryData = { code: string; picture: string; playersNb: number; victories: number, ratio: number };
export type CountryList =  Record<string, CountryData>;

export const PLAYER_DATABASE_PATH = "";
export const FILE_ENCODING = "utf-8";