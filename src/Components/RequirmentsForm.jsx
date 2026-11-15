
import React, { useState } from 'react'

const OptionButton = ({ label, selected, onClick }) => (
  <button
    type="button"
    className={`option-btn ${selected ? "selected" : ""}`}
    onClick={onClick}
    aria-pressed={selected}
  >
    {label}
  </button>
)

const RequirmentsForm = ({ onContinue }) => {
  const [selectedPurposes, setSelectedPurposes] = useState([])
  const [usageIntensity, setUsageIntensity] = useState("")
  const [programmingTypes, setProgrammingTypes] = useState([])
  const [gamingType, setGamingType] = useState("")
  const [videoEditingType, setVideoEditingType] = useState("")
  const [collegeWorkType, setCollegeWorkType] = useState("")
  const [budget, setBudget] = useState("")
  const [error, setError] = useState("")

  const handlePurposeChange = (purpose) => {
    if (selectedPurposes.includes(purpose)) {
      setSelectedPurposes(prev => prev.filter(item => item !== purpose))

      if (purpose === "Programming") setProgrammingTypes([])
      if (purpose === "Gaming") setGamingType("")
      if (purpose === "Video Editing") setVideoEditingType("")
      if (purpose === "College Work") setCollegeWorkType("")
    } else {
      setSelectedPurposes(prev => [...prev, purpose])
    }

    setError("")
  }

  const handleProgrammingChange = (type) => {
    setProgrammingTypes(prev =>
      prev.includes(type)
        ? prev.filter(item => item !== type)
        : [...prev, type]
    )
    setError("")
  }

  const handleContinue = () => {
    if (selectedPurposes.length === 0) {
      setError("Please select at least one purpose.")
      return
    }

    if (!usageIntensity) {
      setError("Please select your usage intensity.")
      return
    }

    if (
      selectedPurposes.includes("Programming") &&
      programmingTypes.length === 0
    ) {
      setError("Please select at least one programming type.")
      return
    }

    if (selectedPurposes.includes("Gaming") && !gamingType) {
      setError("Please select your gaming type.")
      return
    }

    if (selectedPurposes.includes("Video Editing") && !videoEditingType) {
      setError("Please select your video editing type.")
      return
    }

    if (selectedPurposes.includes("College Work") && !collegeWorkType) {
      setError("Please select your college work type.")
      return
    }

    if (!budget || Number(budget) <= 0) {
      setError("Please enter a valid budget.")
      return
    }

    setError("")

    onContinue({
      selectedPurposes,
      usageIntensity,
      programmingTypes,
      gamingType,
      videoEditingType,
      collegeWorkType,
      budget: Number(budget)
    })
  }

  const purposes = [
    "Programming",
    "Gaming",
    "College Work",
    "Video Editing",
    "Office Work",
    "General Use"
  ]


  return (
    <div className="requirements-form">
      <div className="requirements-heading">
        <span className="form-badge">PERSONALIZED LAPTOP GUIDE</span>
        <h1>Tell Us What You Need</h1>
        <p>
          Tell us how you plan to use your laptop and what matters most to you.
          We'll help you identify the right specifications based on your needs.
        </p>
      </div>

      <section className="form-section">
        <h2>What will you use your laptop for?</h2>
        <p className="section-description">
          Select all the activities you plan to do.
        </p>

        <div className="opt">
          {purposes.map(purpose => (
            <OptionButton
              key={purpose}
              label={purpose}
              selected={selectedPurposes.includes(purpose)}
              onClick={() => handlePurposeChange(purpose)}
            />
          ))}
        </div>
      </section>

      {selectedPurposes.includes("Programming") && (
        <section className="subsection">
          <h3>What type of programming do you do?</h3>
          <p className="section-description">
            Select all that apply.
          </p>
          <div className="option-group">
            {[
              "Web Development",
              "App Development",
              "AI / Machine Learning",
              "General Programming"
            ].map(type => (
              <OptionButton
                key={type}
                label={type}
                selected={programmingTypes.includes(type)}
                onClick={() => handleProgrammingChange(type)}
              />
            ))}
          </div>
        </section>
      )}

      {selectedPurposes.includes("Gaming") && (
        <section className="subsection">
          <h3>What type of games do you play?</h3>
          <div className="option-group">
            {["Casual Games", "Competitive Games", "AAA Games"].map(type => (
              <OptionButton
                key={type}
                label={type}
                selected={gamingType === type}
                onClick={() => {
                  setGamingType(type)
                  setError("")
                }}
              />
            ))}
          </div>
        </section>
      )}

      {selectedPurposes.includes("Video Editing") && (
        <section className="subsection">
          <h3>What type of video editing do you do?</h3>
          <div className="option-group">
            {[
              "Basic Editing",
              "Professional Editing",
              "4K / High Resolution Editing"
            ].map(type => (
              <OptionButton
                key={type}
                label={type}
                selected={videoEditingType === type}
                onClick={() => {
                  setVideoEditingType(type)
                  setError("")
                }}
              />
            ))}
          </div>
        </section>
      )}

      {selectedPurposes.includes("College Work") && (
        <section className="subsection">
          <h3>What will you mainly do for college?</h3>
          <div className="option-group">
            {[
              "Assignments & Research",
              "Online Classes",
              "Coding & Projects"
            ].map(type => (
              <OptionButton
                key={type}
                label={type}
                selected={collegeWorkType === type}
                onClick={() => {
                  setCollegeWorkType(type)
                  setError("")
                }}
              />
            ))}
          </div>
        </section>
      )}

      {selectedPurposes.length > 0 && (
        <div className="selection-summary">
          <span className="summary-label">Your selected purposes</span>
          <div className="summary-chips">
            {selectedPurposes.map(purpose => (
              <span className="summary-chip" key={purpose}>
                {purpose}
              </span>
            ))}
          </div>
        </div>
      )}

      <section className="form-section intensity-section">
        <h2>How intensively will you use your laptop?</h2>
        <p className="section-description">
          This helps us estimate the hardware you'll need.
        </p>

        <div className="intensity-options">
          {["Basic", "Moderate", "Heavy"].map(level => (
            <OptionButton
              key={level}
              label={level}
              selected={usageIntensity === level}
              onClick={() => {
                setUsageIntensity(level)
                setError("")
              }}
            />
          ))}
        </div>
      </section>

      <section className="form-section budget-section">
        <h2>What is your laptop budget?</h2>
        <p className="section-description">
          Enter the maximum amount you are comfortable spending.
        </p>

        <div className="budget-field">
          <span>₹</span>
          <input
            className="budget-input"
            type="number"
            min="1"
            placeholder="Enter your budget"
            value={budget}
            onChange={e => {
              setBudget(e.target.value)
              setError("")
            }}
          />
        </div>
      </section>

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}

      <div className="continue-area">
        <button
          type="button"
          className="continue-btn"
          onClick={handleContinue}
        >
          Continue <span>→</span>
        </button>
        <p>Your answers help us make a more relevant recommendation.</p>
      </div>
    </div>
  )
}

export default RequirmentsForm
