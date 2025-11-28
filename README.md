# Chess Stats Application

## Overview
A full-stack web application designed to provide detailed analytics and insights for Chess.com players.
It allows users to view player profiles, compare statistics between two players, explore opening repertoires, and visualize activity heatmaps.

![Main Image](https://drive.google.com/thumbnail?id=1rXazQs4IoFFcLrqyLZqVIEHYMNxzgoVc&sz=w1000)


![Second Image](https://drive.google.com/thumbnail?id=1Bs064ajTw_iCvaqRuOt4_d6-Nnab5zui&sz=w1000)


## Features
- **Player Profile**: View detailed statistics, ratings, and club memberships for any Chess.com user.
- **Comparison Mode**: Compare key metrics and head-to-head history between two players.
- **Insights Dashboard**: Visualize game activity with heatmaps, analyze win rates by color, and review opening performance.
- **Opening Explorer**: Interactive chessboard to explore games played by the user, filtering by moves and results.
- **Feedback System**: Integrated feedback form for user suggestions.


![Third Image](https://drive.google.com/thumbnail?id=14Xn5E4ugOKEnCSMa-z6a0tbGzaZE2TlV&sz=w1000)

## Tech Stack

### Frontend
- **Framework**: React (v19) with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, TailwindCss, CLSX, Class Variance Authority
- **UI Components**: shadcn/ui, Radix UI primitives, Lucide React icons
- **Animations**: Framer Motion, Canvas Confetti
- **Charts**: Recharts
- **Chess Logic**: Chess.js, React Chessboard
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB 
- **Caching**: Node-cache (In-memory caching)
- **External API**: Chess Web API (Wrapper for Chess.com API)

## Code Structure

### Root Directory (Backend)
- **index.ts**: Main entry point for the Express server. Handles API routes, database connection, and caching logic.
- **package.json**: Backend dependencies and scripts.
- **tsconfig.json**: TypeScript configuration for the backend.

### Client Directory (Frontend)
- **src/App.tsx**: Main application component handling routing and layout.
- **src/components/**: Reusable UI components (e.g., charts, chessboard, feedback form).
- **src/lib/**: Utility functions and helpers.
- **src/types.ts**: TypeScript definitions for shared data structures.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
   
2. **Install Backend Dependencies**
   Navigate to the root directory:
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies**
   Navigate to the client directory:
   ```bash
   cd client
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=connection string to mongodb
```

### Running the Application

1. **Start the Backend**
   From the root directory:
   ```bash
   npm run dev
   ```
   The server will start on http://localhost:3000.

2. **Start the Frontend**
   From the client directory:
   ```bash
   npm run dev
   ```
   The application will be accessible at the URL provided by Vite (usually http://localhost:5173).

## NPM Libraries Used

### Backend Dependencies
- **chess-web-api**: Wrapper for interacting with the Chess.com public API.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Loads environment variables from .env file.
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **node-cache**: Simple in-memory caching to improve performance and reduce API rate limiting.
- **nodemon**: Utility that monitors for changes and automatically restarts the server.
- **ts-node**: TypeScript execution engine for Node.js.
- **typescript**: Typed superset of JavaScript.

### Frontend Dependencies
- **@radix-ui/**: Unstyled, accessible UI primitives for React.
- **@tabler/icons-react**: Icon set.
- **canvas-confetti**: Performant confetti animations.
- **chess.js**: Library for chess move generation/validation.
- **class-variance-authority**: Utility for creating variant-based component styles.
- **clsx**: Utility for constructing className strings conditionally.
- **lucide-react**: Icon library.
- **motion**: Animation library for React (formerly Framer Motion).
- **react**: Library for building user interfaces.
- **react-chessboard**: Chessboard component for React.
- **react-dom**: React package for working with the DOM.
- **recharts**: Composable charting library.
- **sonner**: Toast notification library.
- **tailwind-merge**: Utility to merge Tailwind CSS classes without conflicts.
- **tailwindcss-animate**: Tailwind plugin for animation utilities.

## Open Source

This is an open source project. Feel free to use or contribute.
