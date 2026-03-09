"use client";

import React from "react";
import { NoiseOverlay } from "./components/VisualAssets";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  return (
    <div className="min-h-screen bg-s9-black text-s9-text-secondary font-sans selection:bg-white selection:text-black">
      <NoiseOverlay />
      <LandingPage onNavigate={() => {}} />
    </div>
  );
}
