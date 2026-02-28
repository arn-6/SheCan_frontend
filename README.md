# SheCan - Project description

SheCan is a web-based platform designed to help women diagnosed with cancer understand their fertility risks and explore preservation options before starting treatment. The website provides personalized recommendations based on age, type of cancer, and location, along with estimated cost calculations and educational guidance. Our goal is to empower patients with early awareness and informed decision-making during a critical stage of their healthcare journey.


## Tech Stack
FRONTEND
- HTML5
- CSS3
- JavaScript
- React.js
- Vite 
- Tailwind CSS 
- Axios 
- React Router DOM 
- Lucide React

  BACKEND

  Python3
  FastAPI
  Pydantic
  Uvicorn

Features List

- Patient Onboarding: Interactive forms for collecting clinical data including AMH levels, cancer diagnosis, and medical history.
- Decision Support: Comparative analysis of preservation techniques with personalized recommendations and success rate estimations.
- Financial Planning: Detailed cost breakdowns and storage estimates to help patients plan for the long term.
- Resource Center: Searchable interfaces for locating specialized fertility centers in Kerala and accessing expert-vetted FAQs.

Screenshots

<img width="1898" height="907" alt="Screenshot 2026-02-28 081806" src="https://github.com/user-attachments/assets/8462e9e2-93f8-4b2e-ba31-e0d911680f48" />


<img width="1886" height="898" alt="Screenshot 2026-02-28 081858" src="https://github.com/user-attachments/assets/d80f8240-2794-4d14-8454-5b588048e670" />


<img width="1854" height="845" alt="Screenshot 2026-02-28 082027" src="https://github.com/user-attachments/assets/2b5eaa6c-e4b8-4451-b34b-0ffb27f8f22c" />


<img width="1893" height="779" alt="Screenshot 2026-02-28 082057" src="https://github.com/user-attachments/assets/bed3e226-7324-4862-b5ba-98def72e07b0" />


<img width="1857" height="867" alt="Screenshot 2026-02-28 082129" src="https://github.com/user-attachments/assets/4fdb5ed5-a2ea-4510-ae06-5338e2c26944" />

Demo Video Link

https://drive.google.com/file/d/16YW2T69aO_Ar8pKa2qkHln41SNZSVOYK/view?usp=drivesdk


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

Architecture Diagram
+--------------------+
|        User        |
|   (Web Browser)    |
+---------+----------+
          |
          | HTTPS
          v
+--------------------+
|  React Frontend    |
| (Vite + Tailwind)  |
+---------+----------+
          |
          | REST API (Axios)
          v
+--------------------+
|  FastAPI Backend   |
|    (Python)        |
+----+----------+----+
     |          |
     v          v
 Calculations   Data Models
 (Risk, Cost)   (Pydantic)

Team Members 
ANJANA R NAIR
JERUSHA ACCU ANDREWS

## License

This project is licensed under the MIT License.
