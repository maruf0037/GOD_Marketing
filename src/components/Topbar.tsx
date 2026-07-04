import React, { useState, useEffect } from "react";
import { 
  Search, 
  Sparkles, 
  Bell, 
  RefreshCw,
  Globe,
  UserCheck,
  Menu
} from "lucide-react";
import { Role } from "../types";

interface TopbarProps {
  currentTab: string;
  role: Role;
  setRole: (role: Role) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenCommandPalette: () => void;
  onOpenAiAssistant: () => void;
  onToggleMobileSidebar?: () => void;
}

export default function Topbar({ 
  currentTab, 
  role, 
  setRole, 
  searchTerm, 
  setSearchTerm,
  onOpenCommandPalette,
  onOpenAiAssistant,
  onToggleMobileSidebar
}: TopbarProps) {
  const [time, setTime] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    // Generate a beautiful, running digital time (using the user's base timezone/date)
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Map tabs to neat display text
  const tabTitles: { [key: string]: { title: string; subtitle: string } } = {
    dashboard: { title: "Control Room Dashboard", subtitle: "Operational intelligence, real-time KPI aggregates, and demand signals." },
    products: { title: "Material & Product Directory", subtitle: "Verify fabric specifications, approve catalog items, and view supplier listings." },
    orders: { title: "B2B Order Dispatch Hub", subtitle: "Fulfill orders, monitor logistics status, and coordinate with courier services." },
    commissions: { title: "Commission & Payout Ledger", subtitle: "Configure rules by category, verify ledger statements, and initiate payouts." },
    campaigns: { title: "AI Marketing Campaign Suite", subtitle: "Formulate ad strategies, predict ROI benchmarks, and optimize targeting using Gemini." },
    analytics: { title: "Business Intelligence & Funnels", subtitle: "Deep sales distribution metrics, and conversion funnel analytics." },
    insights: { title: "AI-Native Decision Engine", subtitle: "High-confidence suggestions, market predictions, and automated risk control." },
    settings: { title: "Integrations & System Settings", subtitle: "Control your third-party integrations (bKash, MinIO, Pathao) and environment configurations." }
  };

  const currentMeta = tabTitles[currentTab] || { title: "Commerce OS Platform", subtitle: "FabricFlow BD Enterprise Resource Planning Engine" };

  // Sample categorized notifications
  const sampleNotifications = [
    { id: 1, cat: "APPROVAL", text: "New Jamdani vendor registration request", time: "5m ago", type: "info" },
    { id: 2, cat: "INVENTORY", text: "Low stock alert: Cotton handloom white", time: "12m ago", type: "warning" },
    { id: 3, cat: "FINANCE", text: "Sufia Loom BDT 14,000 payout approved", time: "1h ago", type: "success" },
    { id: 4, cat: "AI INSIGHTS", text: "ROAS degraded on Eid Bonanza Ads below 3.5x", time: "2h ago", type: "danger" }
  ];

  return (
    <header className="h-20 border-b border-slate-800 bg-[#09090b]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Search / Title Area */}
      <div className="flex items-center space-x-3 sm:space-x-6 shrink-0 max-w-xl">
        {/* Hamburger Menu Button for mobile screens */}
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors md:hidden"
          title="Toggle Menu"
          id="mobile-sidebar-toggle-btn"
        >
          <Menu size={18} />
        </button>

        <div className="hidden lg:flex flex-col">
          <h1 className="font-display font-bold text-lg text-white leading-tight tracking-tight">
            {currentMeta.title}
          </h1>
          <p className="text-xs text-slate-400 mt-0.5 truncate max-w-md">
            {currentMeta.subtitle}
          </p>
        </div>

        {/* Global Instant Command Palette Trigger */}
        <button 
          onClick={onOpenCommandPalette}
          className="relative hidden sm:flex items-center justify-between w-48 md:w-64 lg:w-72 xl:w-80 h-10 px-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer group text-left select-none outline-none focus:ring-1 focus:ring-teal-500/30"
          id="global-search-command-btn"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <Search size={14} className="text-slate-500 group-hover:text-slate-400 transition-colors shrink-0" />
            <span className="text-xs truncate">Search or run command...</span>
          </div>
          <kbd className="hidden md:inline-flex items-center h-5 px-1.5 font-mono text-[9px] font-bold bg-slate-900 text-slate-500 rounded border border-slate-800 shrink-0 select-none">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Settings, Clock, and Role-Switcher */}
      <div className="flex items-center space-x-4">
        
        {/* Live System Clock */}
        <div className="hidden sm:flex flex-col items-end pr-3 border-r border-slate-800">
          <span className="font-mono text-xs font-semibold text-indigo-400 tracking-wider">
            {time || "11:49:17 AM"}
          </span>
          <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-0.5">
            LOCAL SYSTEM TIME
          </span>
        </div>

        {/* Role Multi-Role Switcher (Demonstrator Benefit) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-1 flex items-center space-x-1">
          <button
            onClick={() => setRole("ADMIN")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider transition-all uppercase ${
              role === "ADMIN"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            title="Switch to Admin Workspace"
          >
            <UserCheck size={11} />
            <span>Admin</span>
          </button>
          
          <button
            onClick={() => setRole("SUPPLIER")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider transition-all uppercase ${
              role === "SUPPLIER"
                ? "bg-teal-600/20 text-teal-400 border border-teal-500/30 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            title="Switch to Supplier Workspace"
          >
            <Sparkles size={11} />
            <span>Supplier</span>
          </button>
        </div>

        {/* Action Widgets */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Mobile Search Icon Button */}
          <button
            onClick={onOpenCommandPalette}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all sm:hidden border border-slate-800"
            title="Search"
            id="mobile-search-trigger-btn"
          >
            <Search size={15} />
          </button>

          {/* Ask AI Trigger */}
          <button 
            onClick={onOpenAiAssistant}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/10"
            title="Open FabricFlow AI Copilot"
          >
            <Sparkles size={12} className="text-white animate-pulse" />
            <span className="hidden md:inline">Ask AI</span>
          </button>

          {/* Notifications Trigger with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-all relative ${isNotificationsOpen ? "bg-slate-800 text-white" : ""}`}
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>

            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-[#09090b] border border-slate-800 rounded-xl shadow-2xl p-4 space-y-3 z-50 animate-fade-in text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold font-display text-white">System Alerts</span>
                    <span className="text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded uppercase">Categorized</span>
                  </div>
                  <div className="space-y-2.5">
                    {sampleNotifications.map((notif) => (
                      <div key={notif.id} className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80 flex flex-col space-y-1 hover:border-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className={`text-[8px] font-bold font-mono px-1.5 py-0.5 rounded ${
                            notif.cat === "INVENTORY" ? "bg-amber-500/10 text-amber-400" :
                            notif.cat === "FINANCE" ? "bg-emerald-500/10 text-emerald-400" :
                            notif.cat === "AI INSIGHTS" ? "bg-red-500/10 text-red-400" :
                            "bg-indigo-500/10 text-indigo-400"
                          }`}>
                            {notif.cat}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">{notif.time}</span>
                        </div>
                        <span className="text-xs text-slate-300 font-sans leading-tight">{notif.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-center border-t border-slate-800">
                    <button 
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-wider"
                    >
                      Clear All Notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Connected Framework API Marker */}
          <div className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-medium">
            <Globe size={11} className="text-teal-400 animate-spin-slow" />
            <span>API: ASP.NET 9</span>
          </div>
        </div>

      </div>
    </header>
  );
}
