import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MissionCard } from "@/components/MissionCard";
import { FilterModal } from "@/components/FilterModal";
import { MissionDetailsModal } from "@/components/MissionDetailsModal";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useMissions, useCreateInteraction } from "@/hooks/useMissions";
import { useToast } from "@/hooks/use-toast";
import type { Mission } from "@/types";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const { data: missions = [], isLoading } = useMissions(selectedCategory);
  const createInteraction = useCreateInteraction();
  const { toast } = useToast();

  const currentMission = missions[currentIndex];

  // Simulate real-time interest updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would typically be handled by websockets or server-sent events
      // For now, we'll just refetch data periodically
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAccept = () => {
    if (!currentMission) return;

    createInteraction.mutate(
      {
        userId: 1, // In a real app, this would come from auth context
        missionId: currentMission.id,
        action: "accepted",
      },
      {
        onSuccess: () => {
          toast({
            title: "Missão aceita! 🎉",
            description: "Você receberá as instruções em breve.",
          });
          setCurrentIndex((prev) => prev + 1);
        },
        onError: () => {
          toast({
            title: "Erro",
            description: "Não foi possível aceitar a missão.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleSkip = () => {
    if (!currentMission) return;

    createInteraction.mutate(
      {
        userId: 1,
        missionId: currentMission.id,
        action: "skipped",
      },
      {
        onSuccess: () => {
          toast({
            title: "Missão pulada",
            description: "Mostrando próxima oportunidade.",
          });
          setCurrentIndex((prev) => prev + 1);
        },
      }
    );
  };

  const handleSave = () => {
    if (!currentMission) return;

    createInteraction.mutate(
      {
        userId: 1,
        missionId: currentMission.id,
        action: "saved",
      },
      {
        onSuccess: () => {
          toast({
            title: "Missão salva! 📋",
            description: "Você pode encontrá-la na sua lista de salvos.",
          });
        },
      }
    );
  };

  const handleShowDetails = () => {
    setSelectedMission(currentMission);
    setIsDetailsOpen(true);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentIndex(0); // Reset to first mission when category changes
  };

  const handleAcceptFromDetails = () => {
    setIsDetailsOpen(false);
    handleAccept();
  };

  const handleNotInterested = () => {
    setIsDetailsOpen(false);
    handleSkip();
  };

  if (isLoading) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando missões...</p>
        </div>
      </div>
    );
  }

  if (missions.length === 0) {
    return (
      <div className="mobile-container">
        <Header
          currentMatch={0}
          interestedCount={0}
          currentIndex={0}
          totalMissions={0}
          onOpenFilters={() => setIsFilterOpen(true)}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Nenhuma missão encontrada</p>
            <p className="text-sm text-gray-400">
              Tente alterar os filtros ou aguarde novas oportunidades
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentIndex >= missions.length) {
    return (
      <div className="mobile-container">
        <Header
          currentMatch={0}
          interestedCount={0}
          currentIndex={0}
          totalMissions={missions.length}
          onOpenFilters={() => setIsFilterOpen(true)}
        />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Sem mais missões por agora! 🎯</p>
            <p className="text-sm text-gray-400">
              Volte mais tarde para novas oportunidades
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <Header
        currentMatch={currentMission?.matchPercentage || 0}
        interestedCount={currentMission?.interestedCount || 0}
        currentIndex={currentIndex}
        totalMissions={missions.length}
        onOpenFilters={() => setIsFilterOpen(true)}
      />

      <div className="px-4 py-6 relative" style={{ height: "calc(100vh - 280px)" }}>
        <MissionCard
          mission={currentMission}
          onAccept={handleAccept}
          onSkip={handleSkip}
          onSave={handleSave}
          onShowDetails={handleShowDetails}
        />
      </div>

      <BottomNavigation
        onShowDetails={handleShowDetails}
        onAccept={handleAccept}
        onSkip={handleSkip}
        onSave={handleSave}
      />

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <MissionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        mission={selectedMission}
        onAccept={handleAcceptFromDetails}
        onNotInterested={handleNotInterested}
      />
    </div>
  );
}
