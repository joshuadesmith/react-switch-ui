/**
 * Get steam image URL
 *
 * @param appid the game's application id
 * @returns the asset url for the game's image
 */
export const getSteamImageUrl = (appid: number): string =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/hero_capsule.jpg`;
