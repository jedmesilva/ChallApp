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
      <div className="bg-white rounded-2xl card-shadow p-6 relative">
        {/* Match Percentage Badge */}
        <div className="absolute -top-2 left-6 bg-success text-white px-3 py-1 rounded-full text-sm font-semibold">
          {mission.matchPercentage}% match
        </div>

        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-100 text-orange-primary px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <span>{getCategoryIcon(mission.category)}</span>
              <span>{mission.category}</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {mission.interestedCount} interessados
          </div>
        </div>

        {/* Mission Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">{mission.title}</h2>

        {/* Mission Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {mission.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-coral/10 text-coral hover:bg-coral/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Mission Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {mission.shortDescription}
        </p>

        {/* Location */}
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-4 h-4 text-orange-primary" />
          <span className="font-medium text-gray-900">{mission.location}</span>
          <span className="text-sm text-gray-500">{mission.distance}</span>
        </div>

        {/* Time and Payment Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-orange-primary" />
              <span className="text-sm font-medium text-gray-900">
                {mission.duration}
              </span>
            </div>
            <Badge className={getUrgencyColor(mission.urgency)}>
              {mission.urgency}
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">R$</span>
            </div>
            <div className="text-2xl font-bold text-orange-primary">
              {mission.payment}
            </div>
            <Badge className={getDifficultyColor(mission.difficulty)}>
              {mission.difficulty}
            </Badge>
          </div>
        </div>

        {/* Mission Advantages */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">
            Vantagens desta missão
          </h4>
          <div className="flex flex-wrap gap-2">
            {mission.advantages.map((advantage, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
              >
                {advantage}
              </Badge>
            ))}
          </div>
        </div>

        {/* Client Information */}
        {mission.client && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={mission.client.profileImage} />
                <AvatarFallback className="bg-orange-primary text-white font-semibold">
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
                <span className="font-semibold text-gray-900">
                  {mission.client.name}
                </span>
                {mission.client.isVerified && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
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
