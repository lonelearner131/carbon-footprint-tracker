"use client";

import React from "react";
import { Dashboard } from "@/components/Dashboard";
import { SmartAssistant } from "@/components/SmartAssistant";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center pt-10 pb-20 gap-10">
      <Dashboard />
      <div className="w-full max-w-5xl px-4 md:px-8">
        <SmartAssistant />
      </div>
    </main>
  );
}
