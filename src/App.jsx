import './App.css'
import { useState } from 'react'

import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import RequirmentsForm from './Components/RequirmentsForm'
import LaptopForm from './Components/LaptopForm'
import EvaluationReport from './Components/EvaluationReport'
import EvaluationMode from './Components/EvaluationMode'
import LaptopComparison from './Components/LaptopComparison'
import StepProgress from './Components/StepProgress'

function App() {
  const [evaluationMode, setEvaluationMode] = useState(() => {
    return localStorage.getItem("evaluationMode") || ""
  })

  const [currentStep, setCurrentStep] = useState(() => {
    const savedRequirements = localStorage.getItem("requirements")
    const savedLaptopDetails = localStorage.getItem("laptopDetails")
    const savedSecondLaptop = localStorage.getItem("secondLaptopDetails")
    const savedMode = localStorage.getItem("evaluationMode")

    if (!savedRequirements) {
      return "home"
    }

    if (!savedLaptopDetails) {
      return "laptop"
    }

    if (savedMode === "compare") {
      return savedSecondLaptop ? "comparison" : "secondLaptop"
    }

    return "report"
  })

  const [laptopDetails, setLaptopDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("laptopDetails")) || {}
  })

  const [secondLaptopDetails, setSecondLaptopDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("secondLaptopDetails")) || {}
  })

  const [requirements, setRequirements] = useState(() => {
    return JSON.parse(localStorage.getItem("requirements")) || {}
  })

  const handleStartNew = () => {
    localStorage.removeItem("requirements")
    localStorage.removeItem("laptopDetails")
    localStorage.removeItem("secondLaptopDetails")
    localStorage.removeItem("evaluationMode")

    setRequirements({})
    setLaptopDetails({})
    setSecondLaptopDetails({})
    setEvaluationMode("")
    setCurrentStep("home")
  }

  return (
    <div>
     <Navbar onGetStarted={() => setCurrentStep("mode")} />
      {currentStep !== "home" && (
  <StepProgress
    currentStep={currentStep}
    evaluationMode={evaluationMode}
  />
)}

      {currentStep === "home" && (
        <Hero onGetStarted={() => setCurrentStep("mode")} />
      )}

      {currentStep === "mode" && (
        <EvaluationMode
          onSelectMode={(mode) => {
            setEvaluationMode(mode)
            localStorage.setItem("evaluationMode", mode)
            setCurrentStep("requirements")
          }}
        />
      )}

      {currentStep === "requirements" && (
        <RequirmentsForm
          onContinue={(data) => {
            setRequirements(data)

            localStorage.setItem(
              "requirements",
              JSON.stringify(data)
            )

            setCurrentStep("laptop")
          }}
        />
      )}

      {currentStep === "laptop" && (
        <LaptopForm
          title="Enter First Laptop Details"
          onSubmit={(data) => {
            setLaptopDetails(data)

            localStorage.setItem(
              "laptopDetails",
              JSON.stringify(data)
            )

            if (evaluationMode === "single") {
              setCurrentStep("report")
            } else {
              setCurrentStep("secondLaptop")
            }
          }}
        />
      )}

      {currentStep === "secondLaptop" && (
        <LaptopForm
          title="Enter Second Laptop Details"
          onSubmit={(data) => {
            setSecondLaptopDetails(data)

            localStorage.setItem(
              "secondLaptopDetails",
              JSON.stringify(data)
            )

            setCurrentStep("comparison")
          }}
        />
      )}

      {currentStep === "comparison" && (
        <LaptopComparison
          laptopOne={laptopDetails}
          laptopTwo={secondLaptopDetails}
          requirements={requirements}
          onStartNew={handleStartNew}
        />
      )}

      {currentStep === "report" && (
        <EvaluationReport
          requirements={requirements}
          laptopDetails={laptopDetails}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  )
}

export default App
