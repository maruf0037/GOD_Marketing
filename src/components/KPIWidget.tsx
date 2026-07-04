import React from "react";
import { LucideIcon } from "lucide-react";

interface KPIWidgetProps {
  title: string;
  value: string;
  trend: string;
  trendType: "up" | "down" | "neutral";
  icon: LucideIcon;
  role: "ADMIN" | "SUPPLIER";
  colorPreset?: "indigo" | "teal" | "amber" | "rose";
}

export default function KPIWidget({
  title,
  value,
  trend,
  trendType,
  icon: Icon,
  role,
  colorPreset = "indigo"
}: KPIWidgetProps) {
  
  // Decide borders and colors based on role or overrides
  const getColors = () => {
    switch (colorPreset) {
      case "indigo":
        return {
          bg: "bg-indigo-950/10 hover:bg-indigo-950/20",
          border: "border-indigo-950/35",
          glow: "bg-indigo-500/10",
          iconColor: "text-indigo-400",
          accent: "from-indigo-500/20 to-transparent"
        };
      case "teal":
        return {
          bg: "bg-teal-950/10 hover:bg-teal-950/20",
          border: "border-teal-950/35",
          glow: "bg-teal-500/10",
          iconColor: "text-teal-400",
          accent: "from-teal-500/20 to-transparent"
        };
      case "amber":
        return {
          bg: "bg-amber-950/10 hover:bg-amber-950/20",
          border: "border-amber-950/35",
          glow: "bg-amber-500/10",
          iconColor: "text-amber-400",
          accent: "from-amber-500/20 to-transparent"
        };
      case "rose":
        return {
          bg: "bg-rose-950/10 hover:bg-rose-950/20",
          border: "border-rose-950/35",
          glow: "bg-rose-500/10",
          iconColor: "text-rose-400",
          accent: "from-rose-500/20 to-transparent"
        };
    }
  };

  const style = getColors();

  return (
    <div className={`relative overflow-hidden border border-slate-800 bg-slate-900/40 p-5 rounded-xl transition-all duration-300 hover:border-slate-700 hover:translate-y-[-2px] flex items-center justify-between shadow-xl ${style.bg}`}>
      {/* Dynamic top corner background glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${style.accent} rounded-bl-full pointer-events-none opacity-40`} />

      <div className="space-y-2 relative z-10">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="font-display font-bold text-2xl text-white tracking-tight">{value}</h3>
        
        <div className="flex items-center space-x-1.5 pt-1">
          <span 
            className={`text-xs font-bold px-1.5 py-0.5 rounded ${
              trendType === "up" 
                ? "bg-emerald-500/10 text-emerald-400" 
                : trendType === "down" 
                ? "bg-rose-500/10 text-rose-400" 
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {trend}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">from last 15 days</span>
        </div>
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 border border-slate-800/80 ${style.glow}`}>
        <Icon size={22} className={style.iconColor} />
      </div>
    </div>
  );
}
