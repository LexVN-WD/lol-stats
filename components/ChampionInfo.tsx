'use client'
import React, { useState, useEffect } from "react";

const BASE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json";

const ChampionInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [championPicture, setChampionPicture] = useState(null);

  const handleSearch = async () => {
    const capitalizedQuery =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
      throw new Error("Failed to fetch champion data");
    }

    const data = await response.json();
    const championPicture = data.data[capitalizedQuery].image.full;

    setChampionPicture(championPicture);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a champion..."
        className="text-black"
      />
      <button onClick={handleSearch}>Search</button>
      {championPicture && (
        <div>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${championPicture}`}
            alt="Champion"
          />
        </div>
      )}
    </div>
  );
};

export default ChampionInfo;