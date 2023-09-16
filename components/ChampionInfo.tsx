'use client'
import React, { useState, useEffect } from "react";

const BASE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json";

const ChampionInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [championData, setChampionData] = useState(null);
  const [selectedChampion, setSelectedChampion] = useState(null);

  useEffect(() => {
    const fetchChampionData = async () => {
      const response = await fetch(`${BASE_URL}`);

      if (!response.ok) {
        throw new Error("Failed to fetch champion data");
      }

      const data = await response.json();
      setChampionData(data.data);
    };

    fetchChampionData();
  }, []);

  const handleSearch = () => {
    const capitalizedQuery =
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

    if (championData && championData[capitalizedQuery]) {
      setSelectedChampion(championData[capitalizedQuery]);
    } else {
      setSelectedChampion(null);
    }
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
      <div className="champion-grid">
        {selectedChampion ? (
          <div>
            <h2>{selectedChampion.name}</h2>
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${selectedChampion.image.full}`}
              alt={selectedChampion.name}
            />
          </div>
        ) : (
          championData &&
          Object.values(championData).map((champion) => (
            <div key={champion.id} className="champion-card">
              <h2>{champion.name}</h2>
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.image.full}`}
                alt={champion.name}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChampionInfo;
