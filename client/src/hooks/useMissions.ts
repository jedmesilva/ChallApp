import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Mission, Category, UserInteraction } from "@/types";

export function useMissions(category?: string) {
  return useQuery<Mission[]>({
    queryKey: ["/api/missions", category],
    queryFn: async () => {
      const url = category ? `/api/missions?category=${encodeURIComponent(category)}` : "/api/missions";
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error("Failed to fetch missions");
      }
      return response.json();
    },
  });
}

export function useMission(id: number) {
  return useQuery<Mission>({
    queryKey: ["/api/missions", id],
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
}

export function useCreateInteraction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (interaction: UserInteraction) => {
      return apiRequest("POST", "/api/interactions", interaction);
    },
    onSuccess: () => {
      // Invalidate missions cache to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
    },
  });
}

export function useUpdateInterest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (missionId: number) => {
      return apiRequest("POST", `/api/missions/${missionId}/update-interest`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/missions"] });
    },
  });
}
