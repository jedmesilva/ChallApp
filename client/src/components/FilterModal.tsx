import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategories } from "@/hooks/useMissions";
import type { Category } from "@/types";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
}: FilterModalProps) {
  const { data: categories = [], isLoading } = useCategories();
  const [tempSelectedCategory, setTempSelectedCategory] = useState(selectedCategory);

  const handleApplyFilters = () => {
    onCategoryChange(tempSelectedCategory);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedCategory(selectedCategory);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
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
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Categoria</h4>
            <div className="space-y-2">
              {isLoading ? (
                <div className="text-sm text-gray-500">Carregando categorias...</div>
              ) : (
                categories.map((category: Category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-gray-50 rounded"
                  >
                    <Checkbox
                      checked={tempSelectedCategory === category.name}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempSelectedCategory(category.name);
                        }
                      }}
                      className="text-orange-primary focus:ring-orange-primary"
                    />
                    <span className="text-gray-700 flex items-center space-x-2">
                      <i className={category.icon} style={{ color: category.color }} />
                      <span>{category.name}</span>
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 gradient-orange text-white hover:opacity-90"
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
