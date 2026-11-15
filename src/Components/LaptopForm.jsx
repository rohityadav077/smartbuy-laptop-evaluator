import React from 'react'
import { useState } from 'react'
const LaptopForm = ({ onSubmit, title }) => {
const [brand, setBrand] = useState("")
const [model, setModel] = useState("")
const [processor, setProcessor] = useState("")
const [ram, setRam] = useState("")
const [storage, setStorage] = useState("")
const [graphics, setGraphics] = useState("")
const [price, setPrice] = useState("")
const [error, setError] = useState("")
const handleSubmit = () => {
  if (!brand || !model || !processor || !ram || !storage || !graphics || !price) {
    setError("Please fill in all laptop details.")
    return
  }
  if (Number(ram) <= 0 || Number(storage) <= 0 || Number(price) <= 0) {
    setError("RAM, storage and price must be greater than zero.")
    return
  }
  setError("")

onSubmit({
  brand,
  model,
  processor,
  ram: Number(ram),
  storage: Number(storage),
  graphics,
  price: Number(price)
})
}
  return (
    <div className="laptop-form">
      <h1>{title}</h1>
      <p>Tell us which laptop you want to evaluate.</p>
      <div className="laptop-fields">
  <label>Laptop Brand</label>
  <input
    type="text"
    placeholder="e.g. HP, Dell, Lenovo, Apple"
    value={brand}
    onChange={(e) => setBrand(e.target.value)}
  />
  <label>Laptop Model</label>
  <input
    type="text"
    placeholder="e.g. HP Pavilion 15"
    value={model}
    onChange={(e) => setModel(e.target.value)}
  />
  <label>Processor</label>
<input
  type="text"
  placeholder="e.g. Intel Core i5-13420H, AMD Ryzen 7 7840HS"
  value={processor}
  onChange={(e) => setProcessor(e.target.value)}
/>
<label>RAM (GB)</label>
<input
  type="number"
  placeholder="e.g. 8, 16, 32"
  value={ram}
  onChange={(e) => setRam(e.target.value)}
/>
<label>Storage (GB)</label>
<input
  type="number"
  placeholder="e.g. 512, 1024"
  value={storage}
  onChange={(e) => setStorage(e.target.value)}
/>
<label>Graphics Card</label>
<input
  type="text"
  placeholder="e.g. Integrated Intel Graphics, NVIDIA RTX 4050"
  value={graphics}
  onChange={(e) => setGraphics(e.target.value)}
/>
<label>Laptop Price (₹)</label>
<input
  type="number"
  placeholder="e.g. 65000"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>
{error && <p className="error-text">{error}</p>}

<button onClick={handleSubmit}>
  Submit Laptop Details
</button>
</div>
    </div>
  )
}

export default LaptopForm