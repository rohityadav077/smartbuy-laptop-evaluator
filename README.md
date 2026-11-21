# SmartBuy – Smart Laptop Purchase Evaluator

SmartBuy is a React-based web application that helps users evaluate whether a laptop meets their personal requirements, usage needs, and budget.

Instead of choosing a laptop based only on its price or specifications, SmartBuy analyzes the user's requirements and provides a detailed evaluation.

## Live Demo

[Visit SmartBuy](https://smartbuy-laptop-evaluator.vercel.app)

## GitHub Repository

[View Source Code](https://github.com/rohityadav077/smartbuy-laptop-evaluator)

## Features

- **Personalized Requirements:** Select your intended usage, such as programming, gaming, video editing, college work, or office work.
- **Usage Intensity:** Choose between Basic, Moderate, and Heavy usage.
- **Single Laptop Evaluation:** Check whether a laptop meets your requirements.
- **Laptop Comparison:** Compare two laptops based on the same requirements.
- **RAM and Storage Analysis:** Get recommendations based on your selected usage.
- **Budget Evaluation:** Check whether a laptop fits your budget.
- **Graphics Evaluation:** Analyze graphics requirements based on intended usage.
- **Detailed Evaluation Report:** Understand which requirements are satisfied and which need improvement.
- **Responsive UI:** Use the application across different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Structure |
| CSS3 | Styling and responsive design |
| Vite | Development and build tool |
| LocalStorage | Persisting application data |
| Git & GitHub | Version control |
| Vercel | Deployment |

## How It Works

1. Choose whether to evaluate one laptop or compare two laptops.
2. Select your intended usage and requirements.
3. Enter laptop specifications such as brand, model, processor, RAM, storage, graphics, and price.
4. SmartBuy evaluates the specifications against your requirements.
5. View a detailed report or comparison to understand the results.

## Evaluation Approach

SmartBuy uses a rule-based evaluation approach.

It considers factors such as:

- Recommended RAM based on usage.
- Recommended storage based on usage.
- Whether the laptop fits the selected budget.
- Whether the graphics hardware meets the selected requirements.

The application provides decision-support guidance based on its built-in rules. It does not perform hardware benchmarks or guarantee real-world performance.

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/rohityadav077/smartbuy-laptop-evaluator.git
```

Navigate into the project folder:

```bash
cd smartbuy-laptop-evaluator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## Project Structure

```text
src/
├── Components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── RequirmentsForm.jsx
│   ├── LaptopForm.jsx
│   ├── EvaluationReport.jsx
│   ├── EvaluationMode.jsx
│   ├── LaptopComparison.jsx
│   └── StepProgress.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Future Improvements

- Backend integration.
- User authentication.
- Database integration.
- Laptop data from external APIs.
- More advanced hardware evaluation.

## Learning Outcomes

Through this project, I practiced:

- Building reusable React components.
- Managing state using React Hooks.
- Passing data through props.
- Handling forms and user input.
- Implementing rule-based evaluation logic.
- Using LocalStorage for data persistence.
- Styling responsive interfaces.
- Managing source code using Git and GitHub.
- Deploying a React application using Vercel.

## Author

Developed as a personal project to practice React and frontend development.