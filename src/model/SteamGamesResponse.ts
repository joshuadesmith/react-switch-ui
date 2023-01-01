export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

export interface SteamGamesResponse {
  total_count: number;
  games: SteamGame[];
}
