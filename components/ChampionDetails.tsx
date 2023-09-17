// ChampionDetails.js
import React from "react";

const ChampionDetails = ({ champion, onBack }) => {
  const baseSkinString = champion.id + "_0";

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to List
      </button>
      <h2>{champion.name}</h2>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${baseSkinString}.jpg`}
        alt={champion.name}
      />
      {/* Add additional champion details here */}
    </div>
  );
};

export default ChampionDetails;
