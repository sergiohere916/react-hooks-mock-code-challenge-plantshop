import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plantList, onClickDeletePlant, onSubmitUpdatePrice}) {
  
  const plantCards = plantList.map((plant) => {
    return <PlantCard key={plant.id} plant={plant} onClickDeletePlant={onClickDeletePlant} onSubmitUpdatePrice={onSubmitUpdatePrice}/>
  })

  return (
    <ul className="cards">{plantCards}</ul>
  );
}

export default PlantList;
