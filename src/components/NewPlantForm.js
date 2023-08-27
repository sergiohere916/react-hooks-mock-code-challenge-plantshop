import React, { useState } from "react";

function NewPlantForm({onSubmitAddPlant}) {

  const initialForm = {
    name: "",
    image: "",
    price: 0
  }

  const [plantForm, setPlantForm] = useState(initialForm);

  function handleChange(e) {
    const {name, value} = e.target;
    setPlantForm({...plantForm, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({...plantForm, price: parseFloat(plantForm.price)})
    })
    .then(r => r.json())
    .then(postedPlant => {
      onSubmitAddPlant(postedPlant)
      setPlantForm(initialForm);
    })
  }
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={plantForm.name} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={plantForm.image} onChange={handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value={plantForm.price} onChange={handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
