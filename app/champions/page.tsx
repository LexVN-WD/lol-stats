"use client";
import React, { useState, useEffect } from "react";
import ChampionDetails from "@/components/ChampionDetails";

const BASE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json";

const Champions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [championData, setChampionData] = useState(null);
  const [showSplashArt, setShowSplashArt] = useState(false); // Track whether a champion is clicked
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
      setShowSplashArt(true); // Set the state to true when a champion is clicked
    } else {
      setSelectedChampion(null);
      setShowSplashArt(false);
    }
  };

  const resetChampionDetail = () => {
    setShowSplashArt(false);
    setSelectedChampion(null);
  };

  return (
    <div className="champions">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a champion..."
        className="text-black"
      />
      <button onClick={handleSearch}>Search</button>
      {showSplashArt ? (
        <ChampionDetails
          champion={selectedChampion}
          onBack={resetChampionDetail}
          className="champion-details"
        />
      ) : (
        <div className="champion-grid">
          {championData &&
            Object.values(championData).map((champion) => (
              <div
                key={champion.id}
                className="champion-card"
                onClick={() => {
                  setSelectedChampion(champion);
                  setShowSplashArt(true); // Set the state to true when a champion is clicked
                }}
              >
                <h2>{champion.name}</h2>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/13.18.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Champions;
