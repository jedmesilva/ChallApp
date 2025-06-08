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
    <div className="fixed bottom-0 left-0 right-0 mobile-container bg-white border-t px-6 py-3 safe-area-bottom">
      <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
        <Button
          variant="ghost"
          size="sm"
          onClick={onShowDetails}
          className="flex flex-col items-center space-y-1 p-2"
        >
          <Info className="w-5 h-5" />
          <span>Detalhes</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onAccept}
          className="flex flex-col items-center space-y-1 p-2 text-success"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Aceitar</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSkip}
          className="flex flex-col items-center space-y-1 p-2 text-danger"
        >
          <X className="w-5 h-5" />
          <span>Pular</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onSave}
          className="flex flex-col items-center space-y-1 p-2"
        >
          <Bookmark className="w-5 h-5" />
          <span>Salvar</span>
        </Button>
      </div>
      
      <p className="text-center text-xs text-gray-400 mt-2">
        👆 Detalhes • 👉 Aceitar • 👈 Pular • 👇 Salvar
      </p>
    </div>
  );
}
