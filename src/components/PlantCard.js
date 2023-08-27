import React, { useState } from "react";

function PlantCard({plant, onClickDeletePlant, onSubmitUpdatePrice={onSubmitUpdatePrice}}) {
  const {id, name, image, price} = plant; 

  const [inStock, setInStock] = useState(true);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  function handleClick() {
    setInStock(!inStock);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => onClickDeletePlant(id) )
  }

  function handlePriceChange(e) {
    setUpdatedPrice(e.target.value);
  }

  function handlePriceSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({price: parseFloat(updatedPrice)})
    })
    .then(r => r.json())
    .then(updatedPlant => onSubmitUpdatePrice(updatedPlant))
  }


  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: {price}</p>
      {inStock ? (
        <button className="primary" onClick={handleClick}>In Stock</button>
      ) : (
        <button onClick={handleClick}>Out of Stock</button>
      )}
      <button onClick={handleDeleteClick}>Delete Plant</button>
      <form onSubmit={handlePriceSubmit}>
        <input type="number" step="0.01" value={updatedPrice} onChange={handlePriceChange}/>
        <button type="submit">Update Price</button>
      </form>
    </li>
  );
}

export default PlantCard;
