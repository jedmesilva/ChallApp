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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center">
      <div className="glass-card w-full max-w-sm h-full shadow-2xl border border-white/20 dark:border-white/10">
        <div className="p-6 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary">Filtros</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="p-2 glass-card-light hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5 text-secondary" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-semibold text-primary mb-4 text-lg">Categoria</h4>
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-sm text-secondary">Carregando categorias...</div>
              ) : (
                categories.map((category: Category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer p-4 glass-card-light hover:bg-orange-50/50 dark:hover:bg-orange-500/20 rounded-2xl transition-all duration-200 hover:scale-105 border border-white/20 dark:border-white/10"
                  >
                    <Checkbox
                      checked={tempSelectedCategory === category.name}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setTempSelectedCategory(category.name);
                        }
                      }}
                      className="text-orange-500 focus:ring-orange-500 w-5 h-5"
                    />
                    <span className="text-primary flex items-center space-x-3 font-medium">
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 glass-card border-t border-white/20 dark:border-white/10">
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 glass-card-light border border-white/20 dark:border-white/10 rounded-2xl py-3 font-semibold hover:scale-105 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1 btn-primary rounded-2xl py-3 font-semibold hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
