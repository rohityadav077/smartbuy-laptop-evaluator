
import React from 'react'

const EvaluationMode = ({ onSelectMode }) => {
  return (
    <section className="evaluation-mode">
      <div className="mode-heading">
        <span className="mode-badge">STEP 1 · CHOOSE YOUR MODE</span>

        <h1>What would you like to do?</h1>

        <p>
          Choose how you want to evaluate laptops.
          We'll help you make a smarter buying decision.
        </p>
      </div>

      <div className="mode-cards">
        <div className="mode-card">
          <div className="mode-icon">💻</div>

          <h2>Evaluate One Laptop</h2>

          <p>
            Already have a laptop in mind? Check whether
            its specifications meet your requirements.
          </p>

          <button
            className="mode-button"
            onClick={() => onSelectMode("single")}
          >
            Evaluate Laptop <span>→</span>
          </button>
        </div>

        <div className="mode-card">
          <div className="mode-icon">⚖️</div>

          <h2>Compare Two Laptops</h2>

          <p>
            Confused between two laptops? Compare their
            specifications and find which suits your needs.
          </p>

          <button
            className="mode-button"
            onClick={() => onSelectMode("compare")}
          >
            Compare Laptops <span>→</span>
          </button>
        </div>
      </div>

      <p className="mode-footer">
        Not sure which option to choose? You can start by evaluating one laptop.
      </p>
    </section>
  )
}

export default EvaluationMode
