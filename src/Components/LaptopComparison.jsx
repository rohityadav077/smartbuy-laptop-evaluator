
import React from 'react'
import './LaptopComparison.css'

const LaptopComparison = ({
  laptopOne,
  laptopTwo,
  requirements,
  onStartNew
}) => {
  const selectedPurposes = requirements.selectedPurposes || []
  const programmingTypes = requirements.programmingTypes || []

  // Recommended RAM
  const getRecommendedRAM = (requirements) => {
    const intensity = requirements.usageIntensity
    let recommendedRAM = 8

    if (selectedPurposes.includes("Programming")) {
      if (programmingTypes.includes("AI / Machine Learning")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Basic" ? 16 : intensity === "Moderate" ? 16 : 32
        )
      }

      if (programmingTypes.includes("App Development")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Heavy" ? 32 : intensity === "Moderate" ? 16 : 8
        )
      }

      if (programmingTypes.includes("Web Development")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Basic" ? 8 : 16
        )
      }

      if (programmingTypes.includes("General Programming")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Basic" ? 8 : intensity === "Moderate" ? 16 : 32
        )
      }
    }

    if (selectedPurposes.includes("Gaming")) {
      const gamingRAM =
        requirements.gamingType === "AAA Games"
          ? intensity === "Heavy" ? 32 : 16
          : intensity === "Basic" ? 8 : 16

      recommendedRAM = Math.max(recommendedRAM, gamingRAM)
    }

    if (selectedPurposes.includes("Video Editing")) {
      const editingRAM =
        requirements.videoEditingType === "Professional Editing" ||
        requirements.videoEditingType === "4K / High Resolution Editing"
          ? intensity === "Basic" ? 16 : 32
          : intensity === "Basic" ? 8 : 16

      recommendedRAM = Math.max(recommendedRAM, editingRAM)
    }

    if (
      selectedPurposes.includes("College Work") ||
      selectedPurposes.includes("Office Work") ||
      selectedPurposes.includes("General Use")
    ) {
      const basicRAM =
        intensity === "Basic" ? 8 : intensity === "Moderate" ? 8 : 16

      recommendedRAM = Math.max(recommendedRAM, basicRAM)
    }

    return recommendedRAM
  }

  // Recommended storage
  const getRecommendedStorage = (requirements) => {
    const intensity = requirements.usageIntensity
    let recommendedStorage = 256

    if (selectedPurposes.includes("Programming")) {
      if (programmingTypes.includes("Web Development")) {
        recommendedStorage = Math.max(
          recommendedStorage,
          intensity === "Basic" ? 256 : 512
        )
      }

      if (programmingTypes.includes("App Development")) {
        recommendedStorage = Math.max(recommendedStorage, 512)
      }

      if (programmingTypes.includes("AI / Machine Learning")) {
        recommendedStorage = Math.max(
          recommendedStorage,
          intensity === "Heavy" ? 1024 : 512
        )
      }

      if (programmingTypes.includes("General Programming")) {
        recommendedStorage = Math.max(recommendedStorage, 512)
      }
    }

    if (selectedPurposes.includes("Gaming")) {
      const gamingStorage =
        requirements.gamingType === "AAA Games" ? 1024 : 512

      recommendedStorage = Math.max(recommendedStorage, gamingStorage)
    }

    if (selectedPurposes.includes("Video Editing")) {
      const editingStorage =
        requirements.videoEditingType === "4K / High Resolution Editing"
          ? 2048
          : requirements.videoEditingType === "Professional Editing"
            ? 1024
            : 512

      recommendedStorage = Math.max(recommendedStorage, editingStorage)
    }

    if (
      selectedPurposes.includes("College Work") ||
      selectedPurposes.includes("Office Work") ||
      selectedPurposes.includes("General Use")
    ) {
      recommendedStorage = Math.max(
        recommendedStorage,
        intensity === "Basic" ? 256 : 512
      )
    }

    return recommendedStorage
  }

  // Graphics evaluation
  const normalizeGraphics = (graphics) =>
    (graphics || "").toLowerCase().replace(/[\s-]/g, "")

  const getGraphicsCategory = (graphics) => {
    const name = normalizeGraphics(graphics)

    if (
      name.includes("integrated") ||
      name.includes("inteluhd") ||
      name.includes("inteliris") ||
      name.includes("intelhd")
    ) {
      return "Integrated"
    }

    if (
      name.includes("gtx1650") ||
      name.includes("gtx1050") ||
      name.includes("rtx2050") ||
      name.includes("gtx1660")
    ) {
      return "Entry-level Dedicated"
    }

    if (
      name.includes("rtx3060") ||
      name.includes("rtx3070") ||
      name.includes("rtx3080") ||
      name.includes("rtx4050") ||
      name.includes("rtx4060") ||
      name.includes("rtx4070") ||
      name.includes("rtx4080") ||
      name.includes("rtx4090")
    ) {
      return "Higher-performance Dedicated"
    }

    return "Unknown Graphics"
  }

  // Processor category (informational only)
  const getProcessorCategory = (processor) => {
    const name = (processor || "").toLowerCase()

    if (name.includes("i3") || name.includes("ryzen 3")) {
      return "Entry-level"
    }

    if (name.includes("i5") || name.includes("ryzen 5")) {
      return "Mid-range"
    }

    if (
      name.includes("i7") ||
      name.includes("i9") ||
      name.includes("ryzen 7") ||
      name.includes("ryzen 9")
    ) {
      return "High-performance"
    }

    return "Unknown"
  }

  const recommendedRAM = getRecommendedRAM(requirements)
  const recommendedStorage = getRecommendedStorage(requirements)

  const needsDedicatedGraphics =
    selectedPurposes.includes("Gaming") ||
    selectedPurposes.includes("Video Editing")

  const needsHigherPerformance =
    (
      selectedPurposes.includes("Gaming") &&
      requirements.gamingType === "AAA Games"
    ) ||
    (
      selectedPurposes.includes("Video Editing") &&
      (
        requirements.videoEditingType === "Professional Editing" ||
        requirements.videoEditingType === "4K / High Resolution Editing"
      )
    )

  // Evaluate each laptop
  const evaluateLaptop = (laptop) => {
    const meetsRAM = Number(laptop.ram) >= recommendedRAM

    const meetsStorage =
      Number(laptop.storage) >= recommendedStorage

    const meetsBudget =
      Number(laptop.price) <= Number(requirements.budget)

    const graphicsCategory = getGraphicsCategory(laptop.graphics)

    const meetsGraphics =
      !needsDedicatedGraphics
        ? graphicsCategory !== "Unknown Graphics"
        : needsHigherPerformance
          ? graphicsCategory === "Higher-performance Dedicated"
          : (
            graphicsCategory === "Entry-level Dedicated" ||
            graphicsCategory === "Higher-performance Dedicated"
          )

    const score = [
      meetsRAM,
      meetsStorage,
      meetsBudget,
      meetsGraphics
    ].filter(Boolean).length

    return {
      meetsRAM,
      meetsStorage,
      meetsBudget,
      meetsGraphics,
      graphicsCategory,
      score
    }
  }
  const resultOne = evaluateLaptop(laptopOne)
const resultTwo = evaluateLaptop(laptopTwo)

 
  // Decide the comparison result

  const priceOne = Number(laptopOne.price)
  const priceTwo = Number(laptopTwo.price)

  let winner = ""
  let winnerReason = ""

  const bothFailCriticalGraphics =
    needsHigherPerformance &&
    !resultOne.meetsGraphics &&
    !resultTwo.meetsGraphics

  if (bothFailCriticalGraphics) {
    winner = "Neither laptop meets the critical graphics requirement"
  } 
  else if (
    needsHigherPerformance &&
    resultOne.meetsGraphics !== resultTwo.meetsGraphics
  ) {
    winner = resultOne.meetsGraphics ? "Laptop 1" : "Laptop 2"
    winnerReason = "graphics"
  } 
  else if (resultOne.score > resultTwo.score) {
    winner = "Laptop 1"
    winnerReason = "requirements"
  } 
  else if (resultTwo.score > resultOne.score) {
    winner = "Laptop 2"
    winnerReason = "requirements"
  } 
  else if (priceOne < priceTwo) {
    winner = "Laptop 1"
    winnerReason = "price"
  } 
  else if (priceTwo < priceOne) {
    winner = "Laptop 2"
    winnerReason = "price"
  } 
  else {
    winner = "Both laptops are equally suitable"
  }


  const formatPrice = (price) =>
    Number(price).toLocaleString("en-IN")

  const comparisonRows = [
    {
      label: "RAM",
      valueOne: `${laptopOne.ram} GB`,
      valueTwo: `${laptopTwo.ram} GB`,
      requirement: `${recommendedRAM} GB minimum`,
      statusOne: resultOne.meetsRAM,
      statusTwo: resultTwo.meetsRAM
    },
    {
      label: "Storage",
      valueOne: `${laptopOne.storage} GB`,
      valueTwo: `${laptopTwo.storage} GB`,
      requirement: `${recommendedStorage} GB minimum`,
      statusOne: resultOne.meetsStorage,
      statusTwo: resultTwo.meetsStorage
    },
    {
      label: "Price",
      valueOne: `₹${formatPrice(laptopOne.price)}`,
      valueTwo: `₹${formatPrice(laptopTwo.price)}`,
      requirement: `Budget: ₹${formatPrice(requirements.budget)}`,
      statusOne: resultOne.meetsBudget,
      statusTwo: resultTwo.meetsBudget
    },
    {
      label: "Graphics",
      valueOne: laptopOne.graphics,
      valueTwo: laptopTwo.graphics,
      requirement: needsHigherPerformance
        ? "Higher-performance dedicated GPU"
        : needsDedicatedGraphics
          ? "Dedicated GPU"
          : "Identifiable graphics",
      statusOne: resultOne.meetsGraphics,
      statusTwo: resultTwo.meetsGraphics
    }
  ]

  const getStatusText = (status) =>
    status ? "✓ Meets requirement" : "✕ Does not meet requirement"

  return (
    <div className="comparison-container">

      {/* Header */}
      <div className="comparison-header">
        <span className="comparison-badge">SMARTBUY COMPARISON</span>
        <h1>Laptop Comparison</h1>
        <p>Compare both laptops and find which one better matches your needs.</p>
      </div>

      {/* Laptop Cards */}
      <div className="laptop-comparison-cards">

        <div className={`laptop-choice-card ${winner === "Laptop 1" ? "winner-card" : ""}`}>
          {winner === "Laptop 1" && (
            <span className="winner-label">RECOMMENDED CHOICE</span>
          )}

          <div className="choice-icon">💻</div>
          <span className="choice-label">LAPTOP 1</span>

          <h2>{laptopOne.brand} {laptopOne.model}</h2>

          <p>{laptopOne.processor}</p>

          <div className="choice-price">
            ₹{formatPrice(laptopOne.price)}
          </div>

          <div className="choice-score">
            {resultOne.score}/4 requirements met
          </div>
        </div>

        <div className="versus-divider">VS</div>

        <div className={`laptop-choice-card ${winner === "Laptop 2" ? "winner-card" : ""}`}>
          {winner === "Laptop 2" && (
            <span className="winner-label">RECOMMENDED CHOICE</span>
          )}

          <div className="choice-icon">💻</div>
          <span className="choice-label">LAPTOP 2</span>

          <h2>{laptopTwo.brand} {laptopTwo.model}</h2>

          <p>{laptopTwo.processor}</p>

          <div className="choice-price">
            ₹{formatPrice(laptopTwo.price)}
          </div>

          <div className="choice-score">
            {resultTwo.score}/4 requirements met
          </div>
        </div>

      </div>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div className="comparison-section-heading">
          <h2>Specification Comparison</h2>
          <p>Both laptops evaluated against your requirements.</p>
        </div>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Specification</th>
                <th>Laptop 1</th>
                <th>Laptop 2</th>
                <th>Requirement</th>
              </tr>
            </thead>

            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label}>
                  <td className="comparison-row-label">{row.label}</td>

                  <td>
                    <strong>{row.valueOne}</strong>
                    <span className={`table-status ${row.statusOne ? "table-pass" : "table-fail"}`}>
                      {getStatusText(row.statusOne)}
                    </span>
                  </td>

                  <td>
                    <strong>{row.valueTwo}</strong>
                    <span className={`table-status ${row.statusTwo ? "table-pass" : "table-fail"}`}>
                      {getStatusText(row.statusTwo)}
                    </span>
                  </td>

                  <td className="requirement-column">{row.requirement}</td>
                </tr>
              ))}

              <tr>
                <td className="comparison-row-label">Processor</td>
                <td>
                  <strong>{laptopOne.processor}</strong>
                  <span className="processor-category">
                    {getProcessorCategory(laptopOne.processor)}
                  </span>
                </td>
                <td>
                  <strong>{laptopTwo.processor}</strong>
                  <span className="processor-category">
                    {getProcessorCategory(laptopTwo.processor)}
                  </span>
                </td>
                <td className="requirement-column">Informational only</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Final Result */}
   
  {/* Final Result */}

  <section className="comparison-result">
    <span className="result-eyebrow">
      SMARTBUY RECOMMENDATION
    </span>

    <h2>
      {winner === "Neither laptop meets the critical graphics requirement"
        ? "Neither laptop meets your critical graphics needs"
        : winner === "Both laptops are equally suitable"
          ? "It's a tie!"
          : winnerReason === "price"
            ? `${winner} offers better value`
            : `${winner} is the better match`}
    </h2>

    <p>
      {winner === "Neither laptop meets the critical graphics requirement"
        ? "Both laptops fail the estimated higher-performance graphics requirement. Consider another laptop with a suitable GPU."
        : winner === "Both laptops are equally suitable"
          ? "Both laptops meet the same requirements and have the same price. Compare their other features, warranty, and real-world performance before deciding."
          : winnerReason === "price"
            ? `Both laptops meet ${resultOne.score} out of 4 evaluated requirements, but ${winner} is cheaper by ₹${formatPrice(Math.abs(priceOne - priceTwo))}.`
            : `${winner} meets ${winner === "Laptop 1" ? resultOne.score : resultTwo.score} out of 4 evaluated requirements.`}
    </p>

    <div className="result-scores">
      <div>
        <span>Laptop 1</span>
        <strong>{resultOne.score}/4</strong>
      </div>

      <div>
        <span>Laptop 2</span>
        <strong>{resultTwo.score}/4</strong>
      </div>
    </div>
  </section>


      {/* Action */}
      <div className="comparison-actions">
        <button onClick={onStartNew}>
          Start New Evaluation <span>→</span>
        </button>
      </div>

      <p className="comparison-disclaimer">
        Note: This comparison uses estimated hardware requirements and simplified graphics and processor model checks. Verify exact specifications and real-world benchmarks before purchasing.
      </p>

    </div>
  )
}

export default LaptopComparison
