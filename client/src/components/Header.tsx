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
    <header className="gradient-header text-white px-6 py-6 safe-area-top relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">Challenger</h1>
            <Zap className="w-6 h-6" />
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-105"
              onClick={onOpenFilters}
            >
              <Filter className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-105 relative"
            >
              <Bell className="w-4 h-4" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-orange-100 text-sm mb-4">Suas melhores oportunidades te esperam</p>

        {/* Stats */}
        <div className="flex space-x-4 mb-4">
          <div className="glass-card-light rounded-2xl px-4 py-3 flex-1">
            <div className="text-xs text-white/80 mb-1">Match</div>
            <div className="text-2xl font-bold text-white match-pulse">{currentMatch}%</div>
          </div>
          <div className="glass-card-light rounded-2xl px-4 py-3 flex-1">
            <div className="text-xs text-white/80 mb-1">Interessados</div>
            <div className="text-2xl font-bold text-white">{interestedCount}</div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(totalMissions, 5) }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white"
                    : index < currentIndex
                    ? "bg-white/50"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-white/80">
            {currentIndex + 1}/{Math.min(totalMissions, 5)}
          </span>
        </div>
      </div>
    </header>
  );
}
