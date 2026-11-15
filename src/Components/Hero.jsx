
import React from 'react'

const Hero = ({ onGetStarted }) => {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-badge">
          Smart Laptop Evaluation Platform
        </div>

        <h1>
          Choose the right laptop.
          <br />
          <span>Without the confusion.</span>
        </h1>

        <p>
          Not sure whether a laptop meets your needs?
          Tell us what you want to do and enter the laptop
          specifications. SmartBuy helps you understand
          whether it's the right choice.
        </p>

        <div className="hero-content">
          <h3>Make a smarter laptop decision.</h3>
          <p>
            Evaluate one laptop or compare two laptops side by side.
          </p>

          <button className="btn" onClick={onGetStarted}>
            Get Started →
          </button>
        </div>
      </section>

      <section className="info-section" id="about">
        <span className="section-badge">ABOUT SMARTBUY</span>

        <h2>Making laptop decisions easier.</h2>

        <p>
          Choosing a laptop can be confusing. Different processors,
          RAM capacities, graphics cards and prices make it difficult
          to know which laptop is right for your needs.
        </p>

        <p>
          SmartBuy helps you evaluate laptop specifications against
          your personal requirements and budget, so you can make
          a more informed purchasing decision.
        </p>
      </section>

      <section className="info-section how-section" id="how-it-works">
        <span className="section-badge">HOW IT WORKS</span>

        <h2>Three simple steps.</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <h3>Choose Your Requirements</h3>
            <p>
              Select your intended usage, workload intensity
              and budget.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <h3>Enter Laptop Details</h3>
            <p>
              Add the laptop's processor, RAM, storage,
              graphics and price.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <h3>Get Your Evaluation</h3>
            <p>
              View requirement checks, recommendations
              or a side-by-side laptop comparison.
            </p>
          </div>
        </div>

        <button className="btn info-cta" onClick={onGetStarted}>
          Evaluate Your Laptop →
        </button>
      </section>
    </>
  )
}

export default Hero
