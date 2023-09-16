const BASE_URL ="http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json";

export const getChampionByName = async (championName: string) => {
  const response = await fetch(
    `${BASE_URL}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch champion data");
  }

  const data = await response.json();

  const championPicture = data.data.Aatrox.image.full;

  return championPicture;
};
