import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const plantUrl = "http://localhost:6001/plants";

function PlantPage() {
  //Variables

  const [plantList, setPlantList] = useState([]);
  const [searchValue, setSearchValue] = useState("") 

  useEffect(()=> {
    fetch(plantUrl)
    .then(res => res.json())
    .then(plants => setPlantList(plants))
  }, [])

  
  function addNewPlant(newPlant) {
    setPlantList([...plantList, newPlant]);
  }

  function onChangeSetSearchValue(newSearchValue) {
    // console.log(newSearchValue);
    setSearchValue(newSearchValue);
  }

  const filteredPlantList = plantList.filter((plant)=> {
    return (plant.name.includes(searchValue));
  })

  function deletePlant(id) {
    const newPlantList = plantList.filter((plant) => {
      return (plant.id !== id)
    })
    setPlantList([...newPlantList])
  }

  function updatePlantPrice(updatedPlant) {
    const newPlantList = plantList.map((plant) => {
      if (plant.id !== updatedPlant.id) {
        return plant;
      } else {
        return updatedPlant;
      }
    })
    console.log(newPlantList);
    setPlantList([...newPlantList]);
  }
  return (
    <main>
      <NewPlantForm addNewPlant={addNewPlant}/>
      <Search searchValue={searchValue} onChangeSetSearchValue={onChangeSetSearchValue}/>
      <PlantList plantList={filteredPlantList} deletePlant={deletePlant} updatePlantPrice={updatePlantPrice} />
    </main>
  );
}

export default PlantPage;
