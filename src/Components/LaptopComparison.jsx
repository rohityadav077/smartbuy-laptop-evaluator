
import React from 'react'
import './LaptopComparison.css'

const LaptopComparison = ({
  laptopOne = {},
  laptopTwo = {},
  requirements = {},
  onStartNew
}) => {
  requirements = requirements || {}
  laptopOne = laptopOne || {}
  laptopTwo = laptopTwo || {}

  const selectedPurposes = Array.isArray(requirements.selectedPurposes)
    ? requirements.selectedPurposes
    : []
  const programmingTypes = Array.isArray(requirements.programmingTypes)
    ? requirements.programmingTypes
    : []
  const intensity = requirements.usageIntensity || "Basic"

  // ==========================================
  // 1. RECOMMENDED RAM
  // ==========================================

  const getRecommendedRAM = () => {
    let recommendedRAM = 8

    if (selectedPurposes.includes("Programming")) {
      if (programmingTypes.includes("AI / Machine Learning")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Heavy" ? 32 : 16
        )
      }

      if (programmingTypes.includes("App Development")) {
        recommendedRAM = Math.max(
          recommendedRAM,
          intensity === "Heavy" ? 32 :
          intensity === "Moderate" ? 16 : 8
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
          intensity === "Basic" ? 8 :
          intensity === "Moderate" ? 16 : 32
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
        intensity === "Basic" ? 8 :
        intensity === "Moderate" ? 8 : 16

      recommendedRAM = Math.max(recommendedRAM, basicRAM)
    }

    return recommendedRAM
  }

  // ==========================================
  // 2. RECOMMENDED STORAGE
  // ==========================================

  const getRecommendedStorage = () => {
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

      recommendedStorage = Math.max(
        recommendedStorage,
        gamingStorage
      )
    }

    if (selectedPurposes.includes("Video Editing")) {
      const editingStorage =
        requirements.videoEditingType === "4K / High Resolution Editing"
          ? 2048
          : requirements.videoEditingType === "Professional Editing"
            ? 1024
            : 512

      recommendedStorage = Math.max(
        recommendedStorage,
        editingStorage
      )
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

  // ==========================================
  // 3. GRAPHICS CLASSIFICATION
  // ==========================================

  const normalizeGraphics = (graphics) =>
    (graphics || "").toLowerCase().replace(/[\s-]/g, "")

  const getGraphicsCategory = (graphics) => {
    const name = normalizeGraphics(graphics)

    if (!name) {
      return "Unknown Graphics"
    }

    // Integrated graphics
    if (
      name.includes("integrated") ||
      name.includes("inteluhd") ||
      name.includes("inteliris") ||
      name.includes("intelhd") ||
      name.includes("radeongraphics") ||
      name.includes("radeonvega")
    ) {
      return "Integrated"
    }

    // Entry-level dedicated graphics
    if (
      name.includes("gtx1050") ||
      name.includes("gtx1650") ||
      name.includes("gtx1660") ||
      name.includes("rtx2050") ||
      name.includes("rtx3050") ||
      name.includes("rtx2060")
    ) {
      return "Entry-level Dedicated"
    }

    // Higher-performance dedicated graphics
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

  // ==========================================
  // 4. PROCESSOR CLASSIFICATION
  // Informational only
  // ==========================================

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

  // ==========================================
  // 5. USER REQUIREMENTS
  // ==========================================

  const recommendedRAM = getRecommendedRAM()
  const recommendedStorage = getRecommendedStorage()

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

  // ==========================================
  // 6. EVALUATE EACH LAPTOP
  // ==========================================

  const getValidNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null
    const number = Number(value)
    return Number.isFinite(number) && number > 0 ? number : null
  }

  const evaluateLaptop = (laptop = {}) => {
    const ram = getValidNumber(laptop.ram)
    const storage = getValidNumber(laptop.storage)
    const price = getValidNumber(laptop.price)
    const budget = getValidNumber(requirements.budget)

    const meetsRAM = ram === null ? null : ram >= recommendedRAM
    const meetsStorage = storage === null ? null : storage >= recommendedStorage
    const meetsBudget = price === null || budget === null ? null : price <= budget

    const graphicsCategory = getGraphicsCategory(laptop.graphics)
    let meetsGraphics = null

    if (graphicsCategory !== "Unknown Graphics") {
      if (!needsDedicatedGraphics) {
        meetsGraphics = true
      } else if (needsHigherPerformance) {
        meetsGraphics = graphicsCategory === "Higher-performance Dedicated"
      } else {
        meetsGraphics =
          graphicsCategory === "Entry-level Dedicated" ||
          graphicsCategory === "Higher-performance Dedicated"
      }
    }

    const statuses = [meetsRAM, meetsStorage, meetsBudget, meetsGraphics]
    const score = statuses.filter(status => status === true).length
    const unknownCount = statuses.filter(status => status === null).length

    return {
      meetsRAM,
      meetsStorage,
      meetsBudget,
      meetsGraphics,
      graphicsCategory,
      score,
      unknownCount
    }
  }

  const resultOne = evaluateLaptop(laptopOne)
  const resultTwo = evaluateLaptop(laptopTwo)

  // ==========================================
  // 7. DECIDE THE COMPARISON RESULT
  // ==========================================

  const priceOne = getValidNumber(laptopOne.price)
  const priceTwo = getValidNumber(laptopTwo.price)

  let winner = ""
  let winnerReason = ""

  const criticalGraphicsRequired = needsDedicatedGraphics
  const bothFailCriticalGraphics =
    criticalGraphicsRequired &&
    resultOne.meetsGraphics === false &&
    resultTwo.meetsGraphics === false

  const hasUnknownCriticalGraphics =
    criticalGraphicsRequired &&
    (resultOne.meetsGraphics === null || resultTwo.meetsGraphics === null)

  const hasUnknownRequirements =
    resultOne.unknownCount > 0 || resultTwo.unknownCount > 0

  if (bothFailCriticalGraphics) {
    winner = "Neither laptop meets the critical graphics requirement"
  } else if (hasUnknownCriticalGraphics || hasUnknownRequirements) {
    winner = "Comparison needs verification"
  } else if (
    criticalGraphicsRequired &&
    resultOne.meetsGraphics !== resultTwo.meetsGraphics
  ) {
    winner = resultOne.meetsGraphics ? "Laptop 1" : "Laptop 2"
    winnerReason = "graphics"
  } else if (resultOne.score > resultTwo.score) {
    winner = "Laptop 1"
    winnerReason = "requirements"
  } else if (resultTwo.score > resultOne.score) {
    winner = "Laptop 2"
    winnerReason = "requirements"
  } else if (priceOne !== null && priceTwo !== null && priceOne < priceTwo) {
    winner = "Laptop 1"
    winnerReason = "price"
  } else if (priceOne !== null && priceTwo !== null && priceTwo < priceOne) {
    winner = "Laptop 2"
    winnerReason = "price"
  } else if (priceOne !== null && priceTwo !== null && priceOne === priceTwo) {
    winner = "Both laptops are equally suitable"
  } else {
    winner = "Comparison needs verification"
  }

  // ==========================================
  // 8. HELPER FUNCTIONS
  // ==========================================

  const formatPrice = (price) => {
    const value = getValidNumber(price)

    return value !== null
      ? value.toLocaleString("en-IN")
      : "Not available"
  }

  const getStatusText = (status) => {
    if (status === null) return "? Needs verification"
    return status ? "✓ Meets requirement" : "✕ Does not meet requirement"
  }

  const getStatusClass = (status) => {
    if (status === null) return "table-unknown"
    return status ? "table-pass" : "table-fail"
  }

  // ==========================================
  // 9. COMPARISON TABLE DATA
  // ==========================================

  const comparisonRows = [
    {
      label: "RAM",
      valueOne: `${getValidNumber(laptopOne.ram) ?? "N/A"} GB`,
      valueTwo: `${getValidNumber(laptopTwo.ram) ?? "N/A"} GB`,
      requirement: `${recommendedRAM} GB minimum`,
      statusOne: resultOne.meetsRAM,
      statusTwo: resultTwo.meetsRAM
    },
    {
      label: "Storage",
      valueOne: `${getValidNumber(laptopOne.storage) ?? "N/A"} GB`,
      valueTwo: `${getValidNumber(laptopTwo.storage) ?? "N/A"} GB`,
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
      valueOne: laptopOne.graphics || "Not specified",
      valueTwo: laptopTwo.graphics || "Not specified",
      requirement: needsHigherPerformance
        ? "Higher-performance dedicated GPU"
        : needsDedicatedGraphics
          ? "Dedicated GPU"
          : "Identifiable graphics",
      statusOne: resultOne.meetsGraphics,
      statusTwo: resultTwo.meetsGraphics
    }
  ]

  // ==========================================
  // 10. FINAL RECOMMENDATION EXPLANATION
  // ==========================================

  const getRecommendationTitle = () => {
    if (bothFailCriticalGraphics) return "Neither laptop meets your graphics needs"
    if (winner === "Comparison needs verification") return "More information is needed"
    if (winner === "Both laptops are equally suitable") return "It's a tie!"
    if (winnerReason === "graphics") return `${winner} is recommended for your graphics needs`
    if (winnerReason === "price") return `${winner} offers better value`
    return `${winner} is the better match`
  }

  const getRecommendationMessage = () => {
    if (bothFailCriticalGraphics) {
      return "Neither laptop meets the required graphics category for your selected usage. Consider another laptop with suitable dedicated graphics."
    }

    if (winner === "Comparison needs verification") {
      return `SmartBuy could not verify all four requirements. Laptop 1 has ${resultOne.unknownCount} item(s) needing verification and Laptop 2 has ${resultTwo.unknownCount}. Check the missing or unrecognized specifications and compare again before choosing a winner.`
    }

    if (winner === "Both laptops are equally suitable") {
      return `Both laptops meet ${resultOne.score} of the four evaluated requirements and have the same price. Compare their processor performance, display, battery, build quality, warranty, and real-world benchmarks before deciding.`
    }

    if (winnerReason === "graphics") {
      const otherLaptop = winner === "Laptop 1" ? "Laptop 2" : "Laptop 1"
      const winnerResult = winner === "Laptop 1" ? resultOne : resultTwo
      const otherResult = winner === "Laptop 1" ? resultTwo : resultOne

      return `${winner} is recommended because it meets the graphics requirement for your selected workload. ${otherLaptop} does not meet this important requirement. ${winner} meets ${winnerResult.score} of 4 evaluated requirements, while ${otherLaptop} meets ${otherResult.score} of 4. This recommendation prioritizes graphics over the total count.`
    }

    if (winnerReason === "price") {
      return `${winner} meets the same number of requirements and costs ₹${formatPrice(Math.abs(priceOne - priceTwo))} less. It offers the lower price based on the specifications entered. Also compare processor performance, display, battery, warranty, and build quality.`
    }

    const winningResult = winner === "Laptop 1" ? resultOne : resultTwo
    const otherResult = winner === "Laptop 1" ? resultTwo : resultOne
    const otherLaptop = winner === "Laptop 1" ? "Laptop 2" : "Laptop 1"

    const advantages = []
    if (winningResult.meetsRAM && !otherResult.meetsRAM) advantages.push("RAM")
    if (winningResult.meetsStorage && !otherResult.meetsStorage) advantages.push("storage")
    if (winningResult.meetsBudget && !otherResult.meetsBudget) advantages.push("budget")
    if (winningResult.meetsGraphics && !otherResult.meetsGraphics) advantages.push("graphics")

    const advantageText = advantages.length
      ? ` Its advantages are: ${advantages.join(", ")}.`
      : ""

    return `${winner} meets ${winningResult.score} of the four evaluated requirements, compared with ${otherResult.score} for ${otherLaptop}.${advantageText} The recommendation is based on RAM, storage, budget, and graphics only; processor category is informational and does not affect the score.`
  }

  // ==========================================
  // 11. UI
  // ==========================================

  return (
    <div className="comparison-container">

      {/* Header */}
      <div className="comparison-header">
        <span className="comparison-badge">
          SMARTBUY COMPARISON
        </span>

        <h1>Laptop Comparison</h1>

        <p>
          Compare both laptops and find which one better matches your needs.
        </p>
      </div>

      {/* Laptop Cards */}
      <div className="laptop-comparison-cards">

        <div
          className={`laptop-choice-card ${
            winner === "Laptop 1" ? "winner-card" : ""
          }`}
        >
          {winner === "Laptop 1" && (
            <span className="winner-label">
              RECOMMENDED CHOICE
            </span>
          )}

          <div className="choice-icon">💻</div>

          <span className="choice-label">LAPTOP 1</span>

          <h2>
            {laptopOne.brand || "Laptop"} {laptopOne.model || ""}
          </h2>

          <p>{laptopOne.processor || "Processor not specified"}</p>

          <div className="choice-price">
            ₹{formatPrice(laptopOne.price)}
          </div>

          <div className="choice-score">
            {resultOne.score}/4 requirements met
            {resultOne.unknownCount > 0 && <small> · {resultOne.unknownCount} needs verification</small>}
          </div>
        </div>

        <div className="versus-divider">VS</div>

        <div
          className={`laptop-choice-card ${
            winner === "Laptop 2" ? "winner-card" : ""
          }`}
        >
          {winner === "Laptop 2" && (
            <span className="winner-label">
              RECOMMENDED CHOICE
            </span>
          )}

          <div className="choice-icon">💻</div>

          <span className="choice-label">LAPTOP 2</span>

          <h2>
            {laptopTwo.brand || "Laptop"} {laptopTwo.model || ""}
          </h2>

          <p>{laptopTwo.processor || "Processor not specified"}</p>

          <div className="choice-price">
            ₹{formatPrice(laptopTwo.price)}
          </div>

          <div className="choice-score">
            {resultTwo.score}/4 requirements met
            {resultTwo.unknownCount > 0 && <small> · {resultTwo.unknownCount} needs verification</small>}
          </div>
        </div>

      </div>

      {/* Comparison Table */}
      <section className="comparison-section">

        <div className="comparison-section-heading">
          <h2>Specification Comparison</h2>

          <p>
            Both laptops evaluated against your requirements.
          </p>
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

                  <td className="comparison-row-label">
                    {row.label}
                  </td>

                  <td>
                    <strong>{row.valueOne}</strong>

                    <span
                      className={`table-status ${
                        getStatusClass(row.statusOne)
                      }`}
                    >
                      {getStatusText(row.statusOne)}
                    </span>
                  </td>

                  <td>
                    <strong>{row.valueTwo}</strong>

                    <span
                      className={`table-status ${
                        getStatusClass(row.statusTwo)
                      }`}
                    >
                      {getStatusText(row.statusTwo)}
                    </span>
                  </td>

                  <td className="requirement-column">
                    {row.requirement}
                  </td>

                </tr>
              ))}

              {/* Processor */}
              <tr>

                <td className="comparison-row-label">
                  Processor
                </td>

                <td>
                  <strong>
                    {laptopOne.processor || "Not specified"}
                  </strong>

                  <span className="processor-category">
                    {getProcessorCategory(laptopOne.processor)}
                  </span>
                </td>

                <td>
                  <strong>
                    {laptopTwo.processor || "Not specified"}
                  </strong>

                  <span className="processor-category">
                    {getProcessorCategory(laptopTwo.processor)}
                  </span>
                </td>

                <td className="requirement-column">
                  Informational only
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

      {/* Final Recommendation */}
      <section className="comparison-result">

        <span className="result-eyebrow">
          SMARTBUY RECOMMENDATION
        </span>

        <h2>
          {getRecommendationTitle()}
        </h2>

        <p>
          {getRecommendationMessage()}
        </p>

        <div className="result-scores">

          <div>
            <span>Laptop 1</span>
            <strong>{resultOne.score}/4{resultOne.unknownCount > 0 ? " + ?" : ""}</strong>
          </div>

          <div>
            <span>Laptop 2</span>
            <strong>{resultTwo.score}/4{resultTwo.unknownCount > 0 ? " + ?" : ""}</strong>
          </div>

        </div>

      </section>

      {/* Action */}
      <div className="comparison-actions">

        <button onClick={onStartNew}>
          Start New Evaluation <span>→</span>
        </button>

      </div>

      {/* Disclaimer */}
      <p className="comparison-disclaimer">
        Note: This comparison uses estimated hardware requirements
        and simplified graphics and processor model checks. GPU
        classifications do not guarantee actual performance.
        Verify exact specifications, GPU power limits, benchmarks,
        warranty, and real-world performance before purchasing.
      </p>

    </div>
  )
}

export default LaptopComparison
