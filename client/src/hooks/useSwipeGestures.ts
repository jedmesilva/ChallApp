import { useRef, useCallback } from "react";
import type { SwipeDirection } from "@/types";

interface UseSwipeGesturesProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  resistanceThreshold?: number;
}

export function useSwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 100,
  resistanceThreshold = 75,
}: UseSwipeGesturesProps) {
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const startTime = useRef<number>(0);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    currentX.current = clientX;
    currentY.current = clientY;
    isDragging.current = true;
    startTime.current = Date.now();
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number, element?: HTMLElement) => {
    if (!isDragging.current) return { deltaX: 0, deltaY: 0 };

    currentX.current = clientX;
    currentY.current = clientY;

    const deltaX = currentX.current - startX.current;
    const deltaY = currentY.current - startY.current;

    // Apply visual feedback if element is provided
    if (element) {
      const rotation = deltaX * 0.1;
      const opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 300);
      
      element.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      element.style.opacity = opacity.toString();

      // Color feedback
      if (Math.abs(deltaX) > resistanceThreshold) {
        if (deltaX > 0) {
          element.style.borderColor = "hsl(142, 76%, 36%)"; // success color
        } else {
          element.style.borderColor = "hsl(0, 84%, 60%)"; // danger color
        }
      } else {
        element.style.borderColor = "transparent";
      }
    }

    return { deltaX, deltaY };
  }, [resistanceThreshold]);

  const handleEnd = useCallback((element?: HTMLElement) => {
    if (!isDragging.current) return;

    const deltaX = currentX.current - startX.current;
    const deltaY = currentY.current - startY.current;
    const deltaTime = Date.now() - startTime.current;
    const velocity = Math.abs(deltaX) / deltaTime;

    // Reset element styles
    if (element) {
      element.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      element.style.transform = "translateX(0) rotate(0deg)";
      element.style.opacity = "1";
      element.style.borderColor = "transparent";
    }

    // Determine swipe direction and trigger callbacks
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX);

    if (isHorizontalSwipe && Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    } else if (isVerticalSwipe && Math.abs(deltaY) > threshold) {
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }

    // Reset values
    isDragging.current = false;
    startX.current = 0;
    startY.current = 0;
    currentX.current = 0;
    currentY.current = 0;
    startTime.current = 0;

    // Clear transition after animation
    if (element) {
      setTimeout(() => {
        element.style.transition = "";
      }, 300);
    }
  }, [threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  const touchStartHandler = useCallback((e: React.TouchEvent, element?: HTMLElement) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const touchMoveHandler = useCallback((e: React.TouchEvent, element?: HTMLElement) => {
    e.preventDefault();
    const touch = e.touches[0];
    return handleMove(touch.clientX, touch.clientY, element);
  }, [handleMove]);

  const touchEndHandler = useCallback((e: React.TouchEvent, element?: HTMLElement) => {
    handleEnd(element);
  }, [handleEnd]);

  const mouseDownHandler = useCallback((e: React.MouseEvent, element?: HTMLElement) => {
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  const mouseMoveHandler = useCallback((e: MouseEvent, element?: HTMLElement) => {
    if (!isDragging.current) return { deltaX: 0, deltaY: 0 };
    return handleMove(e.clientX, e.clientY, element);
  }, [handleMove]);

  const mouseUpHandler = useCallback((element?: HTMLElement) => {
    handleEnd(element);
  }, [handleEnd]);

  return {
    touchStartHandler,
    touchMoveHandler,
    touchEndHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
    isDragging: isDragging.current,
  };
}
