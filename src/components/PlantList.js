import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plantList, deletePlant, updatePlantPrice}) {
  
  const displayedPlantCards = plantList.map((plant)=> {
    return <PlantCard key={plant.id} plant={plant} deletePlant={deletePlant} updatePlantPrice={updatePlantPrice}/>
  })
  return (
    <ul className="cards">{displayedPlantCards}</ul>
  );
}

export default PlantList;
