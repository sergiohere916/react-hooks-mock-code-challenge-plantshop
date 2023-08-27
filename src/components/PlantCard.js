import React, { useState } from "react";

function PlantCard({plant, deletePlant, updatePlantPrice}) {
  const {id, name, image, price} = plant; //Destructuring plant
  const [inStock, setInStock] = useState(true);

  const [updatedPrice, setUpdatedPrice] = useState(price);
  
  function handlePriceChange(e) {
    const newPrice = parseFloat(e.target.value)
    setUpdatedPrice(newPrice);
  }
  function handleSubmit() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({price: updatedPrice })
    })
    .then(r => r.json())
    .then(updatedPlant => updatePlantPrice(updatedPlant))
  }
  function handleCLick() {
    setInStock(!inStock);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(deletePlant(id))
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleCLick}>In Stock</button>
      ) : (
        <button onClick={handleCLick}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete Plant</button>
      <form onSubmit={handleSubmit}>
        <input type="number" value={updatedPrice} step="0.01" onChange={handlePriceChange}/>
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
