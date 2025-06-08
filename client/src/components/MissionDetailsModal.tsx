import React from "react";
import { X, Check, Video, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Mission } from "@/types";

interface MissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: Mission | null;
  onAccept: () => void;
  onNotInterested: () => void;
}

export function MissionDetailsModal({
  isOpen,
  onClose,
  mission,
  onAccept,
  onNotInterested,
}: MissionDetailsModalProps) {
  if (!isOpen || !mission) return null;

  const getDeliverableIcon = (deliverable: string) => {
    if (deliverable.toLowerCase().includes("vídeo")) return <Video className="w-4 h-4" />;
    if (deliverable.toLowerCase().includes("material")) return <FileText className="w-4 h-4" />;
    if (deliverable.toLowerCase().includes("entrega")) return <Clock className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="bg-white h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Detalhes da Missão</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{mission.title}</h2>
          
          <Badge className="bg-orange-100 text-orange-primary mb-6">
            {mission.category}
          </Badge>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Descrição Completa</h4>
            <p className="text-gray-600 leading-relaxed">
              {mission.fullDescription}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Requisitos</h4>
            <ul className="space-y-2">
              {mission.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Entregáveis</h4>
            <ul className="space-y-2">
              {mission.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-600">
                  <span className="text-orange-primary">
                    {getDeliverableIcon(deliverable)}
                  </span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">Informações Adicionais</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Localização:</span>
                <div className="font-medium">{mission.location}</div>
              </div>
              <div>
                <span className="text-gray-500">Distância:</span>
                <div className="font-medium">{mission.distance}</div>
              </div>
              <div>
                <span className="text-gray-500">Duração:</span>
                <div className="font-medium">{mission.duration}</div>
              </div>
              <div>
                <span className="text-gray-500">Pagamento:</span>
                <div className="font-medium text-orange-primary">R$ {mission.payment}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onNotInterested}
              className="flex-1"
            >
              Não Interessado
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 gradient-orange text-white hover:opacity-90"
            >
              Aceitar Missão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
