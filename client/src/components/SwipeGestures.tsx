import React, { useRef, useEffect } from "react";
import { useSwipeGestures } from "@/hooks/useSwipeGestures";
import type { SwipeGestureProps } from "@/types";

export function SwipeGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 100,
  children,
}: SwipeGestureProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const {
    touchStartHandler,
    touchMoveHandler,
    touchEndHandler,
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler,
  } = useSwipeGestures({
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseMoveHandler(e, element);
    };

    const handleMouseUp = () => {
      mouseUpHandler(element);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseMoveHandler, mouseUpHandler]);

  return (
    <div
      ref={elementRef}
      onTouchStart={(e) => touchStartHandler(e, elementRef.current || undefined)}
      onTouchMove={(e) => touchMoveHandler(e, elementRef.current || undefined)}
      onTouchEnd={(e) => touchEndHandler(e, elementRef.current || undefined)}
      onMouseDown={(e) => mouseDownHandler(e, elementRef.current || undefined)}
      className="swipe-card"
    >
      {children}
    </div>
  );
}
