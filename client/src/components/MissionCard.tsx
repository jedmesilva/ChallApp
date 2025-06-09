import React from "react";
import { MapPin, Clock, DollarSign, Star, CheckCircle } from "lucide-react";
import { SwipeGestures } from "./SwipeGestures";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Mission } from "@/types";

interface MissionCardProps {
  mission: Mission;
  onAccept: () => void;
  onSkip: () => void;
  onSave: () => void;
  onShowDetails: () => void;
}

export function MissionCard({
  mission,
  onAccept,
  onSkip,
  onSave,
  onShowDetails,
}: MissionCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "fotografia":
        return "📷";
      case "música":
        return "🎵";
      case "tecnologia":
        return "💻";
      case "serviços":
        return "🔧";
      case "educação":
        return "📚";
      default:
        return "💼";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "urgente":
        return "bg-red-100 text-red-600";
      case "alta":
        return "bg-orange-100 text-orange-600";
      case "normal":
        return "bg-blue-100 text-blue-600";
      case "baixa":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "fácil":
        return "bg-green-100 text-green-600";
      case "intermediário":
        return "bg-yellow-100 text-yellow-600";
      case "avançado":
        return "bg-red-100 text-red-600";
      case "pesado":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <SwipeGestures
      onSwipeLeft={onSkip}
      onSwipeRight={onAccept}
      onSwipeUp={onShowDetails}
      onSwipeDown={onSave}
      threshold={100}
    >
      <div className="glass-card dark:glass-card-dark rounded-3xl p-6 relative swipe-card border border-white/20 dark:border-white/10">
        {/* Match Percentage Badge */}
        <div className="absolute -top-2 left-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
          {mission.matchPercentage}% match
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex items-center space-x-2">
            <div className="glass-card dark:glass-card-dark text-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 border border-white/20 dark:border-white/10">
              <span>{getCategoryIcon(mission.category)}</span>
              <span className="font-semibold">{mission.category}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {mission.interestedCount} interessados
          </div>
        </div>

        {/* Mission Title */}
        <h2 className="text-xl font-bold text-foreground mb-4">{mission.title}</h2>

        {/* Mission Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mission.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-orange-100/50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 hover:bg-orange-200/50 dark:hover:bg-orange-500/30 border border-white/20 dark:border-white/10"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Mission Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {mission.shortDescription}
        </p>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="font-medium text-foreground">{mission.location}</span>
          <span className="text-sm text-muted-foreground">{mission.distance}</span>
        </div>

        {/* Time and Payment Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-foreground">
                {mission.duration}
              </span>
            </div>
            <Badge className={getUrgencyColor(mission.urgency)}>
              {mission.urgency}
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">R$</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {mission.payment}
            </div>
            <Badge className={getDifficultyColor(mission.difficulty)}>
              {mission.difficulty}
            </Badge>
          </div>
        </div>

        {/* Mission Advantages */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3">
            Vantagens desta missão
          </h4>
          <div className="flex flex-wrap gap-2">
            {mission.advantages.map((advantage, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs glass-card dark:glass-card-dark text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-500/30"
              >
                {advantage}
              </Badge>
            ))}
          </div>
        </div>

        {/* Client Information */}
        {mission.client && (
          <div className="flex items-center space-x-3 p-4 glass-card dark:glass-card-dark rounded-2xl border border-white/20 dark:border-white/10">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mission.client.profileImage} />
                <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  {mission.client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {mission.client.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">
                  {mission.client.name}
                </span>
                {mission.client.isVerified && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{mission.client.rating}</span>
                  <span>({mission.client.reviewCount})</span>
                </div>
                <span>•</span>
                <span>{mission.client.responseTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </SwipeGestures>
  );
}
