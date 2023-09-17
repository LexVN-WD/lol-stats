// ChampionDetails.js
import React from "react";

const ChampionDetails = ({ champion, onBack }) => {
  const baseSkinString = champion.id + "_0";

  return (
    <div className="champion-details">
        <div className="champion-details__container">
          <h2>{champion.name}</h2>
          <button onClick={onBack} className="champion-details__backbutton">
            Back to List
          </button>
      </div>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${baseSkinString}.jpg`}
        alt={champion.name}
        className="champion-details__splash"
      />
      {/* Add additional champion details here */}
    </div>
  );
};

export default ChampionDetails;
