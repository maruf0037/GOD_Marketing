import React from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Megaphone, 
  BarChart3, 
  BrainCircuit, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  CirclePercent,
  X
} from "lucide-react";
import { Role } from "../types";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: Role;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  role, 
  isCollapsed, 
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen
}: SidebarProps) {
  
  // Define navigation items based on role or common views
  const commonNavs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Product Management", icon: Package },
    { id: "orders", label: "Order Hub", icon: ShoppingBag },
  ];

  const adminNavs = [
    { id: "commissions", label: "Commission Center", icon: CirclePercent },
    { id: "campaigns", label: "AI Campaign Builder", icon: Megaphone },
    { id: "analytics", label: "Analytics & Funnels", icon: BarChart3 },
    { id: "insights", label: "AI Decision Engine", icon: BrainCircuit },
  ];

  const supplierNavs = [
    { id: "campaigns", label: "AI Campaign Builder", icon: Megaphone },
    { id: "analytics", label: "Analytics & Funnels", icon: BarChart3 },
    { id: "insights", label: "AI Coach & Advice", icon: BrainCircuit },
  ];

  const navItems = [
    ...commonNavs,
    ...(role === "ADMIN" ? adminNavs : supplierNavs),
    { id: "settings", label: "Settings & Systems", icon: Settings }
  ];

  // Styling helpers depending on active role theme
  const activeColorClass = role === "ADMIN"
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-teal-600 text-white hover:bg-teal-700";

  const hoverColorClass = role === "ADMIN"
    ? "hover:bg-indigo-950/40 text-slate-300 hover:text-indigo-200"
    : "hover:bg-teal-950/40 text-slate-300 hover:text-teal-200";

  return (
    <>
      {/* Mobile Drawer Backdrop overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs animate-fade-in"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <div 
        className={`fixed md:relative top-0 bottom-0 left-0 h-screen border-r border-slate-800 bg-[#09090b] text-slate-200 flex flex-col justify-between transition-all duration-300 z-50 ${
          isMobileOpen 
            ? "translate-x-0 w-64 shadow-[5px_0_25px_rgba(0,0,0,0.6)]" 
            : "-translate-x-full md:translate-x-0"
        } ${
          isCollapsed ? "md:w-16" : "md:w-64"
        }`}
      >
        {/* Upper Brand / Logo */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
            {(!isCollapsed || isMobileOpen) ? (
              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-lg ${role === "ADMIN" ? "bg-indigo-500/20 text-indigo-400" : "bg-teal-500/20 text-teal-400"}`}>
                  <TrendingUp size={20} className="animate-pulse" />
                </div>
                <span className="font-display font-bold text-lg tracking-wide text-white">
                  Fabric<span className={role === "ADMIN" ? "text-indigo-400" : "text-teal-400"}>Flow BD</span>
                </span>
              </div>
            ) : (
              <div className={`mx-auto p-1.5 rounded-lg ${role === "ADMIN" ? "bg-indigo-500/20 text-indigo-400" : "bg-teal-500/20 text-teal-400"}`}>
                <TrendingUp size={20} />
              </div>
            )}
            
            {/* Toggle controls - Close button on Mobile Drawer, Collapse button on Desktop */}
            {isMobileOpen ? (
              <button 
                onClick={() => setIsMobileOpen?.(false)}
                className="p-1 rounded bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors md:hidden"
                title="Close Drawer"
              >
                <X size={16} />
              </button>
            ) : (
              !isCollapsed && (
                <button 
                  onClick={() => setIsCollapsed(true)}
                  className="p-1 rounded bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors hidden md:block"
                  title="Collapse Menu"
                >
                  <ChevronLeft size={16} />
                </button>
              )
            )}
          </div>

          {/* Navigation list */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsMobileOpen?.(false); // Auto close drawer on navigation click
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive ? activeColorClass : hoverColorClass
                  }`}
                  title={item.label}
                >
                  <Icon size={18} className="shrink-0" />
                  {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}

            {/* Network Status from Design Template (Admin only) */}
            {(!isCollapsed || isMobileOpen) && role === "ADMIN" && (
              <div className="pt-4 border-t border-slate-800/60 mt-4 space-y-3 px-3">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Network Status</div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>SQL Cluster</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Redis Cache</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>MinIO S3</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                </div>
              </div>
            )}
          </nav>
        </div>

        {/* Expand / Collapse Control when collapsed, plus User indicator */}
        <div className="border-t border-slate-800 p-3">
          {(isCollapsed && !isMobileOpen) ? (
            <button 
              onClick={() => setIsCollapsed(false)}
              className="w-full py-2.5 flex justify-center rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white hidden md:flex"
              title="Expand Menu"
            >
              <ChevronRight size={18} />
            </button>
          ) : (
            <div className="bg-slate-900/60 p-3 rounded-lg flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-display font-semibold text-xs text-indigo-300 border border-slate-600">
                  {role === "ADMIN" ? "AD" : "SU"}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate leading-none">
                    {role === "ADMIN" ? "Super Admin" : "Dhaka Fabrics"}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {role === "ADMIN" ? "admin@fabricflow.bd" : "supplier@dhakafabrics.bd"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Mode: <strong className={role === "ADMIN" ? "text-indigo-400" : "text-teal-400"}>{role}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
