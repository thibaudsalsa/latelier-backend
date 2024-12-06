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

};

export const PLAYER_DATABASE_PATH = "";
export const FILE_ENCODING = "utf-8";