# 🌍 EcoTrack: Context-Aware Carbon Awareness Platform

## 🎯 Chosen Vertical: The Urban Commuter & Consumer
We focused on the modern urban professional. This demographic frequently utilizes mixed transportation (rideshares, trains), orders food deliveries, and consumes high residential energy. By targeting this vertical, EcoTrack addresses high-frequency, high-impact carbon events where small behavioral nudges yield massive environmental ROI.

## 🧠 Approach and Logic
EcoTrack moves beyond generic carbon calculators. It acts as a proactive ecosystem:
1. **Frictionless Tracking:** Users log daily activities across Transport, Food, and Energy using a streamlined UI.
2. **Context-Aware AI Assistant:** This is the core brain. Instead of a generic chatbot, our AI dynamically reads the user's logged data state. If a user logs high "rideshare" emissions, the AI synthesizes this context to suggest micro-mobility (bikes/scooters) or public transit options tailored to an urban environment.
3. **Local-First Architecture:** To ensure flawless usability and zero setup for evaluators, all user data is safely persisted locally using Zustand. 

## ⚙️ How the Solution Works
- **Dashboard:** Built with React & Recharts, it recalculates carbon metrics in real-time, comparing the user's footprint against recommended urban baselines.
- **Security:** All user inputs are strictly validated using `Zod` schemas before processing to prevent injection or state corruption.
- **Efficiency:** The application leverages Next.js server-side API routes to securely handle AI requests, keeping the client bundle lightweight (<10MB repo size) and fast. Heavy data transformations for charts are memoized.
- **Accessibility:** Built with shadcn/ui and semantic HTML, ensuring screen-reader compatibility and full keyboard navigation.

## 🤔 Assumptions Made
- **Emissions Factors:** We utilized standardized EPA/GHG Protocol baseline estimates for activity calculations (e.g., 1 mile driven in a standard gas car ≈ 0.40 kg CO2).
- **Zero-Config Evaluation:** We assumed evaluators need a seamless testing experience. Therefore, we bypassed a traditional SQL database in favor of secure, persistent Local Storage to guarantee the app runs instantly upon `npm run dev` without complex `.env` database string configurations.

🚀 **Live Demo:** [Launch EcoTrack Live Application](https://carbon-footprint-tracker-sable.vercel.app)

## 🎯 Chosen Vertical: The Urban Commuter & Consumer
...
