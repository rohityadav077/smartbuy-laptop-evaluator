
import React, { useState } from 'react'

const LaptopForm = ({ onSubmit, title }) => {
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [processor, setProcessor] = useState("")
  const [ram, setRam] = useState("")
  const [storage, setStorage] = useState("")
  const [graphics, setGraphics] = useState("")
  const [price, setPrice] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check empty fields
    if (
      !brand.trim() ||
      !model.trim() ||
      !processor.trim() ||
      !ram ||
      !storage ||
      !graphics.trim() ||
      !price
    ) {
      setError("Please fill in all laptop details.")
      return
    }

    // Convert numeric values
    const ramValue = Number(ram)
    const storageValue = Number(storage)
    const priceValue = Number(price)

    // Check valid positive numbers
    if (
      !Number.isFinite(ramValue) ||
      !Number.isFinite(storageValue) ||
      !Number.isFinite(priceValue) ||
      ramValue <= 0 ||
      storageValue <= 0 ||
      priceValue <= 0
    ) {
      setError("RAM, storage and price must be valid positive numbers.")
      return
    }

    // Check whole numbers
    if (
      !Number.isInteger(ramValue) ||
      !Number.isInteger(storageValue) ||
      !Number.isInteger(priceValue)
    ) {
      setError("RAM, storage and price must be whole numbers.")
      return
    }

    // Check reasonable input limits
    if (ramValue > 256) {
      setError("RAM cannot exceed 256 GB.")
      return
    }

    if (storageValue > 16384) {
      setError("Storage cannot exceed 16384 GB.")
      return
    }

    if (priceValue > 10000000) {
      setError("Please enter a valid laptop price.")
      return
    }

    // Clear errors
    setError("")

    // Send laptop details to parent component
    onSubmit({
      brand: brand.trim(),
      model: model.trim(),
      processor: processor.trim(),
      ram: ramValue,
      storage: storageValue,
      graphics: graphics.trim(),
      price: priceValue
    })
  }

  return (
    <div className="laptop-form">

      <h1>{title}</h1>

      <p>Tell us which laptop you want to evaluate.</p>

      <form
        className="laptop-fields"
        onSubmit={handleSubmit}
        noValidate
      >

        <label>Laptop Brand</label>

        <input
          type="text"
          placeholder="e.g. HP, Dell, Lenovo, Apple"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
            setError("")
          }}
          maxLength={50}
        />

        <label>Laptop Model</label>

        <input
          type="text"
          placeholder="e.g. HP Pavilion 15"
          value={model}
          onChange={(e) => {
            setModel(e.target.value)
            setError("")
          }}
          maxLength={100}
        />

        <label>Processor</label>

        <input
          type="text"
          placeholder="e.g. Intel Core i5-13420H, AMD Ryzen 7 7840HS"
          value={processor}
          onChange={(e) => {
            setProcessor(e.target.value)
            setError("")
          }}
          maxLength={100}
        />

        <label>RAM (GB)</label>

        <input
          type="number"
          min="1"
          max="256"
          step="1"
          placeholder="e.g. 8, 16, 32"
          value={ram}
          onChange={(e) => {
            setRam(e.target.value)
            setError("")
          }}
        />

        <label>Storage (GB)</label>

        <input
          type="number"
          min="1"
          max="16384"
          step="1"
          placeholder="e.g. 512, 1024"
          value={storage}
          onChange={(e) => {
            setStorage(e.target.value)
            setError("")
          }}
        />

        <label>Graphics Card</label>

        <input
          type="text"
          placeholder="e.g. Integrated Intel Graphics, NVIDIA RTX 4050"
          value={graphics}
          onChange={(e) => {
            setGraphics(e.target.value)
            setError("")
          }}
          maxLength={100}
        />

        <label>Laptop Price (₹)</label>

        <input
          type="number"
          min="1"
          max="10000000"
          step="1"
          placeholder="e.g. 65000"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value)
            setError("")
          }}
        />

        {error && (
          <p className="error-text" role="alert">
            {error}
          </p>
        )}

        <button type="submit">
          Submit Laptop Details
        </button>

      </form>

    </div>
  )
}

export default LaptopForm
