import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {

  const [plantList, setPlantList] = useState([]);
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(r => r.json())
    .then(plants => setPlantList(plants))
  },[])

  function onSubmitAddPlant(postedPlant) {
    setPlantList([...plantList, postedPlant]);
  }
  
  function onChangeUpdateSearchValue(newSearchValue) {
    setSearchValue(newSearchValue);
  }
  
  const displayedPlantList = plantList.filter((plant) => {
    return (plant.name.toLowerCase().includes(searchValue.toLowerCase()))
  })

  function onClickDeletePlant(id) {
    const newPlantList = plantList.filter((plant) => {
      return (plant.id !== id);
    })
    setPlantList(newPlantList);
  }

  function onSubmitUpdatePrice(updatedPlant) {
    const newPlantList = plantList.map((plant) => {
      if (plant.id !== updatedPlant.id) {
        return plant;
      } else {
        return updatedPlant;
      }
    })
    setPlantList(newPlantList);
  }

  return (
    <main>
      <NewPlantForm onSubmitAddPlant={onSubmitAddPlant}/>
      <Search searchValue={searchValue} onChangeUpdateSearchValue={onChangeUpdateSearchValue}/>
      <PlantList plantList={displayedPlantList} onClickDeletePlant={onClickDeletePlant} onSubmitUpdatePrice={onSubmitUpdatePrice}/>
    </main>
  );
}

export default PlantPage;
