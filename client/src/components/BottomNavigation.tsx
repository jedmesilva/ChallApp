import React from "react";
import { Info, ThumbsUp, X, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  onShowDetails: () => void;
  onAccept: () => void;
  onSkip: () => void;
  onSave: () => void;
}

export function BottomNavigation({
  onShowDetails,
  onAccept,
  onSkip,
  onSave,
}: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 dark:border-white/10 px-6 py-4 safe-area-bottom backdrop-blur-md">
      <div className="flex items-center justify-center space-x-8 text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowDetails}
          className="flex flex-col items-center space-y-2 p-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-500/20 rounded-2xl transition-all duration-200 hover:scale-105"
        >
          <Info className="w-6 h-6" />
          <span className="font-medium">Detalhes</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onAccept}
          className="flex flex-col items-center space-y-2 p-4 btn-primary rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
        >
          <ThumbsUp className="w-7 h-7" />
          <span className="font-semibold">Aceitar</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="flex flex-col items-center space-y-2 p-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/20 rounded-2xl transition-all duration-200 hover:scale-105"
        >
          <X className="w-6 h-6" />
          <span className="font-medium">Pular</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSave}
          className="flex flex-col items-center space-y-2 p-3 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50/50 dark:hover:bg-yellow-500/20 rounded-2xl transition-all duration-200 hover:scale-105"
        >
          <Bookmark className="w-6 h-6" />
          <span className="font-medium">Salvar</span>
        </Button>
      </div>
      
      <p className="text-center text-xs text-secondary mt-3 font-medium">
        👆 Detalhes • 👉 Aceitar • 👈 Pular • 👇 Salvar
      </p>
    </div>
  );
}
