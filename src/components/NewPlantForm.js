import React, { useState } from "react";
//Set input values equal to state, gather inputs on change, on submit freeze inputs for use

function NewPlantForm({addNewPlant}) {
  
  const [plantForm, setPlantForm] = useState({
    name: "",
    image: "",
    price: 0,
  }) 

  function handleChange(e) {
    const {name, value} = e.target
    setPlantForm({...plantForm, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    const submittedPlantForm = {
      name: e.target[0].value,
      image: e.target[1].value,
      price: parseFloat(e.target[2].value)
    }
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(submittedPlantForm)
    })
    .then(res => res.json())
    .then(postedPlant => addNewPlant(postedPlant))

  }
  

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value={plantForm.name} onChange={handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value={plantForm.image} onChange={handleChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={plantForm.price} onChange={handleChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
