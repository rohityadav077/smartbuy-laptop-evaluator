 import React from 'react'

const StepProgress = ({ currentStep, evaluationMode }) => {
  const steps = evaluationMode === "compare"
    ? [
        { id: "mode", label: "Mode" },
        { id: "requirements", label: "Requirements" },
        { id: "laptop", label: "Laptop 1" },
        { id: "secondLaptop", label: "Laptop 2" },
        { id: "comparison", label: "Comparison" }
      ]
    : [
        { id: "mode", label: "Mode" },
        { id: "requirements", label: "Requirements" },
        { id: "laptop", label: "Laptop" },
        { id: "report", label: "Report" }
      ]

  const currentIndex = steps.findIndex(
    step => step.id === currentStep
  )

  return (
    <div className="step-progress">
      <div className="step-progress-header">
        <span>YOUR PROGRESS</span>
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${((currentIndex + 1) / steps.length) * 100}%`
          }}
        />
      </div>

      <div className="progress-steps">
        {steps.map((step, index) => (
          <div
            className={`progress-step ${
              index <= currentIndex ? "active" : ""
            }`}
            key={step.id}
          >
            <span className="step-number">
              {index < currentIndex ? "✓" : index + 1}
            </span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepProgress