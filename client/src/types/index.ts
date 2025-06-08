export interface Mission {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  distance: string;
  payment: string;
  duration: string;
  urgency: string;
  difficulty: string;
  tags: string[];
  requirements: string[];
  deliverables: string[];
  advantages: string[];
  clientId: number;
  interestedCount: number;
  matchPercentage: number;
  isActive: boolean;
  createdAt: string;
  client?: {
    id: number;
    name: string;
    rating: string;
    reviewCount: number;
    isVerified: boolean;
    responseTime: string;
    profileImage?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface UserInteraction {
  userId: number;
  missionId: number;
  action: "accepted" | "skipped" | "saved";
}

export interface SwipeDirection {
  direction: "left" | "right" | "up" | "down";
  distance: number;
  velocity: number;
}

export interface SwipeGestureProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  children: React.ReactNode;
}
