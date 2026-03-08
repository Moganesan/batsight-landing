"use client";

import React from "react";
import { NoiseOverlay } from "./components/VisualAssets";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  return (
    <div className="min-h-screen bg-sector-bg text-sector-body font-sans selection:bg-sector-accent selection:text-black">
      <NoiseOverlay />
      <LandingPage onNavigate={() => {}} />
    </div>
  );
}
