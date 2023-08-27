import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plantList, setPlantList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(plants => setPlantList(plants))
  }, [])

  function onSubmitAddPlant(postedPlant) {
    setPlantList([...plantList, postedPlant]);
  }

  function onChangeUpdateSearchTerm(searchValue) {
    setSearchTerm(searchValue)
  }
  
  const displayedPlantList = plantList.filter((plant) => {
    return (plant.name.toLowerCase().indexOf(searchTerm) === 0);
  })

  function onClickDeletePlant(id) {
    const newPlantList = plantList.filter((plant) => plant.id !== id);
    setPlantList(newPlantList);
  }

  function onSubmitUpdatePrice(updatedPlant) {
    const newPlantList = plantList.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant
      } else {
        return plant
      }
    })
    setPlantList(newPlantList);
  }

  return (
    <main>
      <NewPlantForm onSubmitAddPlant={onSubmitAddPlant} />
      <Search searchTerm={searchTerm} onChangeUpdateSearchTerm={onChangeUpdateSearchTerm}/>
      <PlantList plantList={displayedPlantList} onClickDeletePlant={onClickDeletePlant} onSubmitUpdatePrice={onSubmitUpdatePrice} />
    </main>
  );
}

export default PlantPage;
