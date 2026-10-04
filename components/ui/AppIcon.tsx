import type { ReactNode } from "react";

type AppIconProps = {
  size?: number;
  theme?: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export default function AppIcon({
  size = 80,
  theme = "dark",
  icon,
  children,
  className = "",
}: AppIconProps) {
  const isDark = theme === "dark";

  return (
    <div
      style={{ width: size, height: size }}
      className={`
        relative isolate overflow-hidden rounded-[22%]
        shadow-[0_8px_24px_rgba(0,0,0,0.2)]
        ${isDark ? "bg-black" : "bg-white"}
        ${className}
      `}
    >
      {/* Glossy background glare */}
      <div
        className={`
          pointer-events-none absolute -left-1/4 -top-1/3
          h-[80%] w-[120%] rotate-[-25deg]
          rounded-full blur-xl
          ${isDark ? "bg-white/20" : "bg-black/10"}
        `}
      />

      {/* Secondary reflection */}
      <div
        className={`
          pointer-events-none absolute left-[15%] top-[10%]
          h-1/3 w-2/3 rounded-full blur-md
          ${isDark ? "bg-white/30" : "bg-black/15"}
        `}
      />

      {/* Icon or custom content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children ?? icon}
      </div>
    </div>
  );
}