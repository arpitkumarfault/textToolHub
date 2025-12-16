"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export const Tooltip = ({
  children,
  content,
  position = "top",
  delay = 100,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  const show = () => {
    timeout = setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const arrowClasses = {
    top: "-bottom-1 left-1/2 -translate-x-1/2",
    bottom: "-top-1 left-1/2 -translate-x-1/2",
    left: "-right-1 top-1/2 -translate-y-1/2",
    right: "-left-1 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}

      {isVisible && (
        <div
          className={cn(
            "absolute z-50 max-w-xs whitespace-normal break-words rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-xl transition-opacity",
            positionClasses[position]
          )}
        >
          {content}

          {/* Arrow */}
          <div
            className={cn(
              "absolute h-2 w-2 rotate-45 bg-gray-900",
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
};