# SheCan - Frontend Application

SheCan is a modern web application designed to empower female cancer patients with information and tools for fertility preservation before starting treatment.

## Tech Stack

- React 19 (UI Library)
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Axios (API Client)
- React Router DOM 7 (Navigation)
- Lucide React (Icons)

## Core Implementation Details

The frontend provides a user-centric experience for navigating complex medical decisions:

- Patient Onboarding: Interactive forms for collecting clinical data including AMH levels, cancer diagnosis, and medical history.
- Risk Visualization: Dynamic dashboards that visualize fertility risk scores and clinical analysis.
- Decision Support: Comparative analysis of preservation techniques with personalized recommendations and success rate estimations.
- Financial Planning: Detailed cost breakdowns and storage estimates to help patients plan for the long term.
- Resource Center: Searchable interfaces for locating specialized fertility centers in Kerala and accessing expert-vetted FAQs.

## Project Structure

- src/components: Reusable UI components including navigation and layout elements.
- src/pages: Functional views for Home, Fertility Risk, Preservation Techniques, FAQs, and Center search.
- src/api.js: Centralized Axios configuration and API service functions.

## Setup and Installation

Follow these steps to run the frontend locally:

1. Navigate to the frontend directory:
   cd frontend

2. Install the project dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Access the application:
   Open http://localhost:5173 in your browser.

## Build and Production

To create a production-ready build:
npm run build

The output will be available in the dist directory.

## License

This project is licensed under the MIT License.
