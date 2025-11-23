"use client";

import React, { useState } from "react";
import { NoiseOverlay } from "./components/VisualAssets";
import { LandingPage } from "./components/LandingPage";
import { LoginView } from "./components/LoginView";
import { DashboardView } from "./components/DashboardView";

export default function App() {
  const [view, setView] = useState<"landing" | "login" | "dashboard">("login");

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#d6d3d1] font-sans selection:bg-[#ff4d00] selection:text-[#000]">
      <NoiseOverlay />

      {view === "login" ? (
        <LoginView
          onBack={() => setView("landing")}
          onLogin={() => setView("dashboard")}
        />
      ) : view === "dashboard" ? (
        <DashboardView onLogout={() => setView("landing")} />
      ) : (
        <LandingPage onNavigate={setView} />
      )}
    </div>
  );
}
