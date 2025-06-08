import React from "react";
import { Filter, Bell, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentMatch: number;
  interestedCount: number;
  currentIndex: number;
  totalMissions: number;
  onOpenFilters: () => void;
}

export function Header({
  currentMatch,
  interestedCount,
  currentIndex,
  totalMissions,
  onOpenFilters,
}: HeaderProps) {
  return (
    <header className="gradient-orange text-white px-6 py-6 safe-area-top">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Challenger</h1>
          <Zap className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 p-2 rounded-full"
            onClick={onOpenFilters}
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 p-2 rounded-full"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm opacity-90 mb-4">Suas melhores oportunidades te esperam</p>

      {/* Stats */}
      <div className="flex space-x-4 mb-4">
        <div className="bg-white/20 rounded-lg px-4 py-3 flex-1">
          <div className="text-xs opacity-80 mb-1">Match</div>
          <div className="text-2xl font-bold match-pulse">{currentMatch}%</div>
        </div>
        <div className="bg-white/20 rounded-lg px-4 py-3 flex-1">
          <div className="text-xs opacity-80 mb-1">Interessados</div>
          <div className="text-2xl font-bold">{interestedCount}</div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(totalMissions, 5) }).map((_, index) => (
            <div
              key={index}
              className={`w-8 h-1 rounded-full ${
                index === currentIndex
                  ? "bg-white"
                  : index < currentIndex
                  ? "bg-white/50"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <span className="text-xs opacity-80">
          {currentIndex + 1}/{Math.min(totalMissions, 5)}
        </span>
      </div>
    </header>
  );
}
