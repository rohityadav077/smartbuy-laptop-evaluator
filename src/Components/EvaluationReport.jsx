
import React from 'react'
import './EvaluationReport.css'

const EvaluationReport = ({ requirements, laptopDetails, onStartNew }) => {
  const selectedPurposes = requirements.selectedPurposes || []
  const programmingTypes = requirements.programmingTypes || []

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString('en-IN')

  // RAM recommendation
  const getRecommendedRAM = (requirements) => {
    const intensity = requirements.usageIntensity
    let recommendedRAM = 8

    if (selectedPurposes.includes("Programming")) {
      if (programmingTypes.includes("AI / Machine Learning")) {
        recommendedRAM = Math.max(recommendedRAM,
          intensity === "Heavy" ? 32 : 16)
      }

      if (programmingTypes.includes("App Development")) {
        recommendedRAM = Math.max(recommendedRAM,
          intensity === "Heavy" ? 32 : intensity === "Moderate" ? 16 : 8)
      }

      if (programmingTypes.includes("Web Development")) {
        recommendedRAM = Math.max(recommendedRAM,
          intensity === "Basic" ? 8 : 16)
      }

      if (programmingTypes.includes("General Programming")) {
        recommendedRAM = Math.max(recommendedRAM,
          intensity === "Basic" ? 8 : intensity === "Moderate" ? 16 : 32)
      }
    }

    if (selectedPurposes.includes("Gaming")) {
      const gamingRAM = requirements.gamingType === "AAA Games"
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
      const basicRAM = intensity === "Heavy" ? 16 : 8
      recommendedRAM = Math.max(recommendedRAM, basicRAM)
    }

    return recommendedRAM
  }

  // Storage recommendation
  const getRecommendedStorage = (requirements) => {
    const intensity = requirements.usageIntensity
    let recommendedStorage = 256

    if (selectedPurposes.includes("Programming")) {
      if (programmingTypes.includes("Web Development")) {
        recommendedStorage = Math.max(recommendedStorage,
          intensity === "Basic" ? 256 : 512)
      }

      if (programmingTypes.includes("App Development")) {
        recommendedStorage = Math.max(recommendedStorage, 512)
      }

      if (programmingTypes.includes("AI / Machine Learning")) {
        recommendedStorage = Math.max(recommendedStorage,
          intensity === "Heavy" ? 1024 : 512)
      }

      if (programmingTypes.includes("General Programming")) {
        recommendedStorage = Math.max(recommendedStorage, 512)
      }
    }

    if (selectedPurposes.includes("Gaming")) {
      recommendedStorage = Math.max(
        recommendedStorage,
        requirements.gamingType === "AAA Games" ? 1024 : 512
      )
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

  // Processor evaluation
  const checkProcessor = (processor) => {
    const name = (processor || "").toLowerCase()

    if (name.includes("i3") || name.includes("ryzen 3")) {
      return "Entry-level Processor"
    }

    if (name.includes("i5") || name.includes("ryzen 5")) {
      return "Mid-range Processor"
    }

    if (
      name.includes("i7") || name.includes("i9") ||
      name.includes("ryzen 7") || name.includes("ryzen 9")
    ) {
      return "High-performance Processor"
    }

    return "Processor category unknown"
  }

  const getIntelGeneration = (processor) => {
    const match = (processor || "").toLowerCase().match(/i[3579]-(\d{4,5})/)
    if (!match) return null

    const modelNumber = match[1]
    return modelNumber.length === 4
      ? Number(modelNumber[0])
      : Number(modelNumber.slice(0, 2))
  }

  const getAMDSeries = (processor) => {
    const match = (processor || "").toLowerCase().match(/ryzen\s+[3579]\s+(\d{4})/)
    if (!match) return null

    return Number(match[1][0]) * 1000
  }

  const getProcessorEvaluation = (processor) => {
    const generation = getIntelGeneration(processor)
    const amdSeries = getAMDSeries(processor)

    if (generation !== null) {
      if (generation <= 10) return "Older Intel generation"
      if (generation <= 13) return "Newer Intel generation"
      return "Generation needs verification"
    }

    if (amdSeries !== null) {
      return `AMD Ryzen ${amdSeries} Series detected`
    }

    return "Processor generation unknown"
  }

  // Graphics evaluation
  const normalizeGraphics = (graphics) =>
    (graphics || "").toLowerCase().replace(/[\s-]/g, "")

  const isIntegratedGraphics = (graphics) => {
    const name = normalizeGraphics(graphics)

    return (
      name.includes("integrated") ||
      name.includes("inteluhd") ||
      name.includes("inteliris") ||
      name.includes("intelhd")
    )
  }

  const getGraphicsCategory = (graphics) => {
    const name = normalizeGraphics(graphics)

    if (isIntegratedGraphics(name)) return "Integrated"

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

  const getGraphicsRecommendation = () => {
    if (
      selectedPurposes.includes("Gaming") ||
      selectedPurposes.includes("Video Editing")
    ) {
      return "Dedicated graphics are recommended for your selected workload."
    }

    return "Integrated graphics may be sufficient for your selected workload."
  }

  // Calculations
  const recommendedRAM = getRecommendedRAM(requirements)
  const recommendedStorage = getRecommendedStorage(requirements)

  const ram = Number(laptopDetails.ram || 0)
  const storage = Number(laptopDetails.storage || 0)
  const price = Number(laptopDetails.price || 0)
  const budget = Number(requirements.budget || 0)

  const meetsRAM = ram >= recommendedRAM
  const meetsStorage = storage >= recommendedStorage
  const meetsBudget = price <= budget

  const graphicsCategory = getGraphicsCategory(laptopDetails.graphics)

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

  const meetsGraphics = !needsDedicatedGraphics
    ? graphicsCategory !== "Unknown Graphics"
    : needsHigherPerformance
      ? graphicsCategory === "Higher-performance Dedicated"
      : (
          graphicsCategory === "Entry-level Dedicated" ||
          graphicsCategory === "Higher-performance Dedicated"
        )

  const failedRequirements = [
    meetsRAM,
    meetsStorage,
    meetsBudget,
    meetsGraphics
  ].filter(status => !status).length

  const overallVerdict = failedRequirements === 0
    ? "Suitable"
    : failedRequirements === 1
      ? "Partially Suitable"
      : "Not Suitable"

  const processorType = checkProcessor(laptopDetails.processor)
  const intelGeneration = getIntelGeneration(laptopDetails.processor)
  const amdSeries = getAMDSeries(laptopDetails.processor)
  const processorEvaluation = getProcessorEvaluation(laptopDetails.processor)

  const graphicsExplanation =
    graphicsCategory === "Integrated"
      ? "Your laptop uses integrated graphics. A dedicated GPU may be more appropriate for demanding gaming or editing workloads."
      : graphicsCategory === "Entry-level Dedicated"
        ? "Your laptop has entry-level dedicated graphics. More demanding workloads may benefit from a stronger GPU."
        : graphicsCategory === "Unknown Graphics"
          ? "We couldn't identify this graphics model. Verify its exact model and performance before purchasing."
          : "The graphics category identified by this prototype does not meet the estimated requirement for your workload."

  const ramProgress = Math.min((ram / recommendedRAM) * 100, 100)
  const storageProgress = Math.min((storage / recommendedStorage) * 100, 100)
  const budgetProgress = budget > 0 ? Math.min((budget / Math.max(price, 1)) * 100, 100) : 0

  const recommendations = []

  if (!meetsRAM) {
    recommendations.push(`Consider at least ${recommendedRAM} GB RAM. Your laptop currently has ${ram} GB.`)
  }

  if (!meetsStorage) {
    recommendations.push(`Consider at least ${recommendedStorage} GB storage. Your laptop currently has ${storage} GB.`)
  }

  if (!meetsBudget) {
    recommendations.push(`Look for a laptop within your budget of ₹${formatPrice(budget)}.`)
  }

  if (!meetsGraphics) {
    recommendations.push(graphicsExplanation)
  }

  return (
    <main className="report-container">

      <header className="report-header">
        <div className="report-eyebrow">
          <span className="report-eyebrow-dot" />
          SMARTBUY · LAPTOP ANALYSIS
        </div>
        <h1>Your Laptop Evaluation</h1>
        <p>A clear breakdown of how this laptop matches your needs.</p>
      </header>

      <section className="report-laptop-banner">
        <div className="report-laptop-main">
          <span className="report-overline">EVALUATED LAPTOP</span>
          <h2>{laptopDetails.brand} {laptopDetails.model}</h2>
          <p>{laptopDetails.processor}</p>
        </div>
        <div className="report-price">
          <span className="report-overline">LAPTOP PRICE</span>
          <strong>₹{formatPrice(price)}</strong>
          <span className={meetsBudget ? "price-within" : "price-over"}>
            {meetsBudget ? "Within your budget" : "Above your budget"}
          </span>
        </div>
      </section>

      <section className="report-section-block">
        <div className="report-section-heading">
          <div>
            <span className="report-overline">HARDWARE CHECK</span>
            <h2>Specification overview</h2>
          </div>
          <span className="report-section-count">4 checks</span>
        </div>

        <div className="report-spec-grid">
          <article className={`report-spec-card ${meetsRAM ? "is-pass" : "is-fail"}`}>
            <div className="report-spec-top">
              <span className="report-spec-icon">RAM</span>
              <span className="report-pill">{meetsRAM ? "Meets target" : "Below target"}</span>
            </div>
            <h3>Memory</h3>
            <strong className="report-spec-value">{ram}<small> GB</small></strong>
            <p>Recommended: {recommendedRAM} GB</p>
            <div className="report-meter">
              <span style={{ width: `${ramProgress}%` }} />
            </div>
          </article>

          <article className={`report-spec-card ${meetsStorage ? "is-pass" : "is-fail"}`}>
            <div className="report-spec-top">
              <span className="report-spec-icon">SSD</span>
              <span className="report-pill">{meetsStorage ? "Meets target" : "Below target"}</span>
            </div>
            <h3>Storage</h3>
            <strong className="report-spec-value">{storage}<small> GB</small></strong>
            <p>Recommended: {recommendedStorage} GB</p>
            <div className="report-meter">
              <span style={{ width: `${storageProgress}%` }} />
            </div>
          </article>

          <article className={`report-spec-card ${meetsBudget ? "is-pass" : "is-fail"}`}>
            <div className="report-spec-top">
              <span className="report-spec-icon">₹</span>
              <span className="report-pill">{meetsBudget ? "Within budget" : "Over budget"}</span>
            </div>
            <h3>Budget</h3>
            <strong className="report-spec-value report-price-value">
              ₹{formatPrice(price)}
            </strong>
            <p>Your budget: ₹{formatPrice(budget)}</p>
            <div className="report-meter">
              <span style={{ width: `${budgetProgress}%` }} />
            </div>
          </article>

          <article className={`report-spec-card ${meetsGraphics ? "is-pass" : "is-fail"}`}>
            <div className="report-spec-top">
              <span className="report-spec-icon">GPU</span>
              <span className="report-pill">{meetsGraphics ? "Meets target" : "Needs attention"}</span>
            </div>
            <h3>Graphics</h3>
            <strong className="report-spec-value report-graphics-value">
              {laptopDetails.graphics}
            </strong>
            <p>{graphicsCategory}</p>
          </article>
        </div>
      </section>

      <section className="report-section-block">
        <div className="report-section-heading">
          <div>
            <span className="report-overline">CPU DETAILS</span>
            <h2>Processor evaluation</h2>
          </div>
        </div>

        <article className="report-processor-card">
          <div className="report-processor-symbol">CPU</div>
          <div className="report-processor-content">
            <span className="report-overline">YOUR PROCESSOR</span>
            <h3>{laptopDetails.processor}</h3>
            <p>{processorType}</p>
            <div className="report-processor-tags">
              <span>{processorEvaluation}</span>
              {intelGeneration && <span>Intel {intelGeneration}th Gen</span>}
              {amdSeries && <span>Ryzen {amdSeries} Series</span>}
            </div>
            {processorEvaluation === "Older Intel generation" && (
              <p className="report-warning">
                This is an older Intel generation. Check the exact processor model and independent benchmarks before purchasing.
              </p>
            )}
          </div>
        </article>
        <p className="report-muted-note">
          Processor classification is based on the model name entered. It is not a benchmark measurement.
        </p>
      </section>

      <section className={`report-verdict ${overallVerdict.toLowerCase().replaceAll(" ", "-")}`}>
        <div className="report-verdict-top">
          <div>
            <span className="report-overline">YOUR SMARTBUY RESULT</span>
            <h2>{overallVerdict}</h2>
            <p>
              {failedRequirements === 0
                ? "This laptop meets all four evaluated requirements."
                : `${failedRequirements} out of 4 requirements need attention.`}
            </p>
          </div>
          <div className="report-verdict-score">
            <strong>{4 - failedRequirements}<small>/4</small></strong>
            <span>Requirements met</span>
          </div>
        </div>
        <div className="report-verdict-track">
          <span style={{ width: `${((4 - failedRequirements) / 4) * 100}%` }} />
        </div>
      </section>

      <section className="report-section-block">
        <div className="report-section-heading">
          <div>
            <span className="report-overline">AT A GLANCE</span>
            <h2>Requirement breakdown</h2>
          </div>
        </div>

        <div className="report-breakdown">
          {[
            { label: "RAM", passed: meetsRAM, detail: `${ram} GB installed · ${recommendedRAM} GB recommended` },
            { label: "Storage", passed: meetsStorage, detail: `${storage} GB installed · ${recommendedStorage} GB recommended` },
            { label: "Budget", passed: meetsBudget, detail: `₹${formatPrice(price)} price · ₹${formatPrice(budget)} budget` },
            { label: "Graphics", passed: meetsGraphics, detail: graphicsCategory }
          ].map((item) => (
            <div className="report-breakdown-row" key={item.label}>
              <div className={`report-check ${item.passed ? "check-pass" : "check-fail"}`}>
                {item.passed ? "✓" : "!"}
              </div>
              <div className="report-breakdown-info">
                <strong>{item.label}</strong>
                <span>{item.detail}</span>
              </div>
              <span className={`report-breakdown-status ${item.passed ? "status-pass" : "status-fail"}`}>
                {item.passed ? "Passed" : "Needs attention"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="report-section-block">
        <div className="report-section-heading">
          <div>
            <span className="report-overline">WHAT THIS MEANS</span>
            <h2>Detailed explanation</h2>
          </div>
        </div>

        <div className="report-explanations">
          <article>
            <span className="explanation-marker">{meetsRAM ? "✓" : "!"}</span>
            <div>
              <h3>Memory</h3>
              <p>
                {meetsRAM
                  ? `${ram} GB RAM meets the estimated ${recommendedRAM} GB requirement for your selected usage.`
                  : `Your laptop has ${ram} GB RAM, while this evaluation recommends ${recommendedRAM} GB. More memory can help with multitasking and demanding applications.`}
              </p>
            </div>
          </article>

          <article>
            <span className="explanation-marker">{meetsStorage ? "✓" : "!"}</span>
            <div>
              <h3>Storage</h3>
              <p>
                {meetsStorage
                  ? `${storage} GB storage meets the estimated ${recommendedStorage} GB requirement.`
                  : `Your laptop has ${storage} GB storage, while this evaluation recommends ${recommendedStorage} GB. Additional storage may be useful for applications, games, projects, and media files.`}
              </p>
            </div>
          </article>

          <article>
            <span className="explanation-marker">{meetsBudget ? "✓" : "!"}</span>
            <div>
              <h3>Budget</h3>
              <p>
                {meetsBudget
                  ? `The laptop price of ₹${formatPrice(price)} is within your ₹${formatPrice(budget)} budget.`
                  : `The laptop costs ₹${formatPrice(price)}, which is ₹${formatPrice(price - budget)} above your budget.`}
              </p>
            </div>
          </article>

          <article>
            <span className="explanation-marker">{meetsGraphics ? "✓" : "!"}</span>
            <div>
              <h3>Graphics</h3>
              <p>
                {meetsGraphics
                  ? "The identified graphics category meets this prototype's estimated requirement for your selected usage."
                  : graphicsExplanation}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="report-recommendations">
        <div className="report-recommendation-icon">✦</div>
        <div>
          <span className="report-overline">NEXT STEPS</span>
          <h2>Our recommendations</h2>

          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((recommendation, index) => (
                <li key={index}>{recommendation}</li>
              ))}
            </ul>
          ) : (
            <p>Your laptop meets all the evaluated requirements. No major changes are suggested by this assessment.</p>
          )}

          <p className="report-graphics-note">
            {getGraphicsRecommendation()}
          </p>
        </div>
      </section>

      <div className="report-actions">
        <button onClick={onStartNew}>
          Start New Evaluation <span>→</span>
        </button>
      </div>

      <p className="report-disclaimer">
        SmartBuy uses estimated hardware requirements and simplified model-name checks. Processor and graphics classifications are approximate, not benchmark results. Verify exact specifications, upgradeability, and real-world performance before purchasing.
      </p>

    </main>
  )
}

export default EvaluationReport
