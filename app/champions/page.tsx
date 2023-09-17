"use client";
import React, { useState, useEffect } from "react";
import ChampionDetails from "@/components/ChampionDetails";

const BASE_URL =
  "http://ddragon.leagueoflegends.com/cdn/13.18.1/data/en_US/champion.json";

const Champions = () => {
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

  const resetChampionDetail = () => {
    setShowSplashArt(false);
    setSelectedChampion(null);
  };

  return (
    <div className="champions">
      {showSplashArt ? (
        <ChampionDetails
          champion={selectedChampion}
          onBack={resetChampionDetail}
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
