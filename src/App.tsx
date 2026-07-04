import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Plus, 
  Check, 
  X, 
  Trash2, 
  AlertTriangle, 
  Clock, 
  CirclePercent, 
  Download, 
  Sparkles, 
  ArrowUpRight, 
  Database, 
  HardDrive, 
  ExternalLink, 
  ShieldCheck, 
  Upload, 
  Megaphone,
  BrainCircuit,
  Settings as SettingsIcon,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Activity,
  Award
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from "recharts";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import KPIWidget from "./components/KPIWidget";
import StorefrontView from "./components/StorefrontView";
import LandingAndAuth from "./components/LandingAndAuth";
import { 
  Role, 
  Product, 
  Order, 
  CommissionRule, 
  Payout, 
  MarketingCampaign,
  initialProducts, 
  initialOrders, 
  initialCommissionRules, 
  initialPayouts, 
  initialCampaigns 
} from "./types";

export default function App() {
  // View mode state (switch between commerce OS backoffice, public customer storefront, and root landing/auth screens)
  const [viewMode, setViewMode] = useState<"landing" | "storefront" | "erp">("landing");

  // Current Perspective and Navigation Tab
  const [role, setRole] = useState<Role>("ADMIN");
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [devDiagnostics, setDevDiagnostics] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState<boolean>(false);
  const [decisionActions, setDecisionActions] = useState<{[key: string]: string}>({});

  // Centralized State (acting as full-fidelity database)
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>(initialCommissionRules);
  const [payouts, setPayouts] = useState<Payout[]>(initialPayouts);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);

  // Active Selected item states (e.g. for slide-overs)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Supplier Product Addition Form Multi-Step State
  const [newProductStep, setNewProductStep] = useState<number>(1);
  const [newProductData, setNewProductData] = useState({
    name: "",
    category: "Jamdani",
    price: "",
    stock: "",
    colors: [] as string[],
    sizes: [] as string[],
    patterns: [] as string[],
    description: "",
    image: ""
  });

  // Supplier Campaign Form State
  const [campaignForm, setCampaignForm] = useState({
    name: "Eid-ul-Fitr Saree Bonanza",
    goal: "Increase Sales",
    budget: "50000",
    channel: "Facebook Ads",
    audience: "Retail boutique owners and saree enthusiasts, female aged 22-45 in Dhaka"
  });

  // AI Loading & Result States
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [coachResult, setCoachResult] = useState<any>(null);
  const [isCampaignLoading, setIsCampaignLoading] = useState(false);
  const [campaignResult, setCampaignResult] = useState<any>(null);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);
  const [insightsResult, setInsightsResult] = useState<any>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Automatically fetch AI Insights whenever role switches
  useEffect(() => {
    fetchAiInsights();
  }, [role]);

  // Listen for Ctrl+K / Cmd+K global shortcuts to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [aiResponseOutput, setAiResponseOutput] = useState<React.ReactNode | null>(null);

  const handleTriggerAiPrompt = (id: string) => {
    if (id === "low-stock") {
      setAiResponseOutput(
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            Analyzing operational databases across Tangail, Sirajganj, and Dhaka weaver warehouses...
          </p>
          <div className="p-2 bg-[#09090b] border border-slate-800 rounded-lg space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-slate-400">
              <span>Material Name</span>
              <span>Available Stock</span>
            </div>
            <div className="flex justify-between items-center text-xs text-white font-medium border-t border-slate-800/40 pt-1.5">
              <span>Cotton Handloom (Midnight Indigo)</span>
              <span className="font-mono text-amber-400 font-bold">12 meters remaining</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Reorder recommendation: **500 meters** to satisfy outstanding July contracts.
          </p>
          {decisionActions.restock === "approved" ? (
            <div className="p-2 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
              <Check size={14} /> Dispatched 500m restock order!
            </div>
          ) : (
            <button
              onClick={() => {
                setProducts(prev => prev.map(p => p.id === "PROD-COTT-202" ? { ...p, stock: p.stock + 500 } : p));
                setDecisionActions(prev => ({ ...prev, restock: "approved" }));
              }}
              className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Fulfill Restock Now (500m)
            </button>
          )}
        </div>
      );
    } else if (id === "eid-camp") {
      setAiResponseOutput(
        <div className="space-y-3">
          <p className="text-xs text-slate-300">
            Generated Eid-ul-Fitr high-ROI campaign specification targeting boutique retail distributors in Dhaka:
          </p>
          <div className="p-3 bg-[#09090b] border border-slate-800 rounded-lg space-y-2 font-sans text-xs text-slate-300">
            <div>
              <span className="text-[9px] font-mono text-slate-500 block">AD COPY HOOK</span>
              <p className="font-semibold text-white">"Premium loom-fresh Sarees straight to your boutique shelves."</p>
            </div>
            <div className="border-t border-slate-800/40 pt-1.5">
              <span className="text-[9px] font-mono text-slate-500 block">BUDGET RECOMMENDATION</span>
              <p className="font-semibold text-white">BDT 50,000 | Estimated ROAS: 4.8x</p>
            </div>
          </div>
          <button
            onClick={() => {
              const clearCamp: MarketingCampaign = {
                id: `CAMP-EID-${Math.floor(100 + Math.random() * 900)}`,
                name: "Eid Saree Boutique Campaign",
                goal: "Increase Wholesale Sales",
                budget: 50000,
                channel: "Meta Ads Manager",
                audience: "Dhaka and regional boutique shop owners",
                status: "Active",
                predictedROAS: 4.8,
                confidence: "96%",
                adCopyHook: "Loom-fresh authentic sarees direct from weaver hubs",
                adCopyBody: "Fulfill your shop's Eid inventories directly with B2B wholesale pricing. Verified specifications.",
                targetInterests: ["Boutique Owners", "Retailers", "Jamdani Lovers"],
                dateCreated: new Date().toISOString().split("T")[0]
              };
              setCampaigns(prev => [clearCamp, ...prev]);
              alert("Campaign launched successfully in active logs!");
            }}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Launch Active Campaign
          </button>
        </div>
      );
    } else if (id === "supplier-rep") {
      setAiResponseOutput(
        <div className="space-y-3">
          <p className="text-xs text-slate-300">
            Outstanding payout ledger summary for active registered weaver nodes:
          </p>
          <div className="p-3 bg-[#09090b] border border-slate-800 rounded-lg text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-400">
              <span>Total Weaver Escrow</span>
              <span className="font-mono text-white font-semibold">BDT 245,000</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 border-t border-slate-800/40 pt-1.5">
              <span>Avg Commission Deducted</span>
              <span className="font-mono text-white font-semibold">12% BDT (52,000 total)</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 border-t border-slate-800/40 pt-1.5">
              <span>Next Payout Trigger</span>
              <span className="font-mono text-teal-400 font-semibold">July 10, 2026</span>
            </div>
          </div>
          <button
            onClick={handleExportLedger}
            className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Download size={12} />
            <span>Download CSV Statement</span>
          </button>
        </div>
      );
    } else if (id === "sales-drop") {
      setAiResponseOutput(
        <div className="space-y-3">
          <p className="text-xs text-slate-300 leading-relaxed">
            Commerce intelligence analysis indicates **two primary factors** for last week's wholesale dip:
          </p>
          <ol className="list-decimal pl-4 text-xs text-slate-400 space-y-1.5">
            <li>
              <strong className="text-slate-200">Price Inelasticity:</strong> Cotton Handloom list prices were BDT 240 higher than regional weaver averages, slowing retail boutique demand.
            </li>
            <li>
              <strong className="text-slate-200">Rain Delays:</strong> Monsoon waterlogging delayed shipment dispatches in Tangail Loom Hub by **2.4 days**, delaying courier completion handshakes.
            </li>
          </ol>
          <div className="p-2.5 bg-indigo-500/10 text-indigo-300 text-xs rounded-lg border border-indigo-500/20">
            💡 **Recommendation:** Lower Cotton Handloom catalog pricing by 5% and route priority dispatches through **Pathao Courier** to mitigate rainy delays.
          </div>
        </div>
      );
    } else {
      setAiResponseOutput(
        <div className="space-y-3">
          <p className="text-xs text-slate-300">
            Analyzing your custom query... 
          </p>
          <p className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg leading-relaxed">
            I am currently scanning the database for pattern recognition. Based on current sales, Jamdani and Tangail Cotton weavers remain your highest-ROAS revenue channels. No system risks detected.
          </p>
        </div>
      );
    }
  };

  // Sync state if dashboard needs initial values
  const handleProductStatusChange = (id: string, newStatus: "Approved" | "Rejected") => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateOrderStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        const updated = { ...o, status: newStatus };
        if (selectedOrder?.id === id) {
          setSelectedOrder(updated);
        }
        return updated;
      }
      return o;
    }));
  };

  // --- API CALL HANDLERS (Calling server-side Gemini) ---

  const fetchAiCoachFeedback = async () => {
    setIsCoachLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProductData.name,
          category: newProductData.category,
          price: newProductData.price,
          description: newProductData.description,
          colors: newProductData.colors.join(", "),
          sizes: newProductData.sizes.join(", "),
          patterns: newProductData.patterns.join(", ")
        })
      });
      const data = await response.json();
      if (response.ok) {
        setCoachResult(data);
      } else {
        setAiError(data.message || data.error || "Failed to analyze");
      }
    } catch (err: any) {
      setAiError("Connection to backend lost or model API key not set.");
    } finally {
      setIsCoachLoading(false);
    }
  };

  const generateAiCampaign = async () => {
    setIsCampaignLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/ai/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignName: campaignForm.name,
          campaignGoal: campaignForm.goal,
          budget: campaignForm.budget,
          channel: campaignForm.channel,
          audience: campaignForm.audience
        })
      });
      const data = await response.json();
      if (response.ok) {
        setCampaignResult(data);
        // Add to campaign list in UI
        const newCampaign: MarketingCampaign = {
          id: `CAMP-${Math.floor(100 + Math.random() * 900)}`,
          name: campaignForm.name,
          goal: campaignForm.goal,
          budget: Number(campaignForm.budget),
          channel: campaignForm.channel,
          audience: campaignForm.audience,
          status: "Active",
          predictedROAS: data.predictedROAS,
          confidence: data.confidence,
          adCopyHook: data.adCopyHook,
          adCopyBody: data.adCopyBody,
          targetInterests: data.targetInterests,
          dateCreated: new Date().toISOString().split("T")[0]
        };
        setCampaigns(prev => [newCampaign, ...prev]);
      } else {
        setAiError(data.message || data.error || "Failed to generate campaign insights");
      }
    } catch (err: any) {
      setAiError("Failed to connect to AI campaign builder endpoint.");
    } finally {
      setIsCampaignLoading(false);
    }
  };

  const fetchAiInsights = async () => {
    setIsInsightsLoading(true);
    setAiError(null);
    try {
      const response = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: role.toLowerCase() })
      });
      const data = await response.json();
      if (response.ok) {
        setInsightsResult(data);
      } else {
        setAiError(data.message || data.error || "Failed to query decision intelligence");
      }
    } catch (err: any) {
      setAiError("Failed to query decision engine. Running with local simulated triggers.");
    } finally {
      setIsInsightsLoading(false);
    }
  };

  // --- EXPORT SIMULATION ---
  const handleExportLedger = () => {
    const headers = "ID,Supplier,Amount,Date,Status,Method\n";
    const rows = payouts.map(p => `${p.id},"${p.supplierName}",${p.amount},${p.date},${p.status},"${p.paymentMethod}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FabricFlow_Ledger_Statements_${role}_2026.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- CHART METRICS (Calculated dynamically) ---
  const revenueTrendData = [
    { day: "May 01", revenue: 420000 },
    { day: "May 02", revenue: 580000 },
    { day: "May 03", revenue: 510000 },
    { day: "May 04", revenue: 780000 },
    { day: "May 05", revenue: 1025000 },
    { day: "May 06", revenue: 910000 },
    { day: "May 07", revenue: 1245000 },
  ];

  const categoryDistribution = [
    { name: "Jamdani", value: 38 },
    { name: "Cotton", value: 30 },
    { name: "Linen", value: 18 },
    { name: "Silk", value: 14 }
  ];

  const orderStatusCounts = [
    { name: "Pending", value: 120, color: "#eab308" },
    { name: "Confirmed", value: 320, color: "#3b82f6" },
    { name: "Shipped", value: 450, color: "#8b5cf6" },
    { name: "Delivered", value: 280, color: "#10b981" },
    { name: "Cancelled", value: 75, color: "#f43f5e" }
  ];

  const PIE_COLORS = ["#6366f1", "#14b8a6", "#f59e0b", "#ec4899"];

  // Filter products or orders based on search term
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(globalSearch.toLowerCase()) ||
    p.supplierName.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.productName.toLowerCase().includes(globalSearch.toLowerCase()) ||
    o.supplierName.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const activeThemeColor = role === "ADMIN" ? "indigo" : "teal";

  if (viewMode === "landing") {
    return (
      <LandingAndAuth 
        onLoginSuccess={(selectedRole, onboardingData) => {
          if (selectedRole === "CUSTOMER") {
            setViewMode("storefront");
          } else if (selectedRole === "SUPPLIER") {
            setRole("SUPPLIER");
            setViewMode("erp");
            setCurrentTab("dashboard");
          } else if (selectedRole === "EMPLOYEE" || selectedRole === "ADMIN") {
            setRole("ADMIN");
            setViewMode("erp");
            setCurrentTab("dashboard");
          }
        }}
        onNavigateToStorefront={() => setViewMode("storefront")}
        onSwitchToErp={(roleOption) => {
          setRole(roleOption);
          setViewMode("erp");
        }}
      />
    );
  }

  if (viewMode === "storefront") {
    return (
      <StorefrontView 
        products={products}
        setProducts={setProducts}
        orders={orders}
        setOrders={setOrders}
        onSwitchToErp={() => setViewMode("erp")}
        onNavigateToLanding={() => setViewMode("landing")}
        onNavigateToLogin={() => setViewMode("landing")}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#09090b] text-slate-100 font-sans">
      
      {/* 1. COLLAPSIBLE SIDEBAR */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        role={role} 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* RIGHT SIDE VIEW CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* 2. TOP NAVIGATION BAR */}
        <Topbar 
          currentTab={currentTab} 
          role={role} 
          setRole={setRole} 
          searchTerm={globalSearch} 
          setSearchTerm={setGlobalSearch} 
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenAiAssistant={() => setIsAiDrawerOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* 3. SCROLLABLE MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* AI Configuration Error Box (Always show warning if API Key is not set, dynamically handles user state) */}
          {aiError && (
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3 text-amber-300 animate-fade-in">
              <AlertTriangle className="shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider">AI Platform Notification</h4>
                <p className="text-xs text-amber-200/90 mt-1">{aiError}</p>
              </div>
            </div>
          )}

          {/* ========================================================
              01 & 02: DASHBOARDPERSPECTIVES (ADMIN vs SUPPLIER)
              ======================================================== */}
          {currentTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Role-specific intro */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    {role === "ADMIN" ? "Commerce OS Central Admin" : "Dhaka Fabrics Supplier Terminal"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {role === "ADMIN" 
                      ? "Consolidated transaction volume, merchant payout ledger, and AI market signals." 
                      : "Manage your looms, track active purchase demands, check commission deductions."}
                  </p>
                </div>
                
                {/* Instant refresh action */}
                <button 
                  onClick={fetchAiInsights}
                  disabled={isInsightsLoading}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-40`}
                >
                  <RefreshCw size={12} className={isInsightsLoading ? "animate-spin" : ""} />
                  <span>Sync Core Engine</span>
                </button>
              </div>

              {/* QUICK ACTIONS TOOLBAR (Point 7) */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1 mr-2 flex items-center gap-1.5 shrink-0">
                  <Sparkles size={11} className="text-indigo-400" />
                  Quick Actions:
                </span>
                <button 
                  onClick={() => {
                    setCurrentTab("products");
                    setNewProductStep(1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-center gap-1.5 font-medium"
                >
                  <Plus size={12} className="text-indigo-400" />
                  <span>+ Register Material</span>
                </button>
                {role === "ADMIN" && (
                  <button 
                    onClick={() => setCurrentTab("commissions")}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-center gap-1.5 font-medium"
                  >
                    <CirclePercent size={12} className="text-teal-400" />
                    <span>+ Set Commission Rule</span>
                  </button>
                )}
                <button 
                  onClick={() => setCurrentTab("campaigns")}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-center gap-1.5 font-medium"
                >
                  <Megaphone size={12} className="text-amber-400" />
                  <span>+ Formulate AI Campaign</span>
                </button>
                {role === "ADMIN" && (
                  <button 
                    onClick={() => setCurrentTab("commissions")}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-center gap-1.5 font-medium"
                  >
                    <RefreshCw size={12} className="text-pink-400 animate-spin-slow" />
                    <span>+ Trigger Payout</span>
                  </button>
                )}
                <button 
                  onClick={handleExportLedger}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 transition-all flex items-center gap-1.5 font-medium sm:ml-auto"
                >
                  <Download size={12} className="text-slate-400" />
                  <span>Export Ledger</span>
                </button>
              </div>

              {/* DYNAMIC HIGH-DENSITY KPI GRID (Point 10) */}
              {role === "ADMIN" ? (
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Revenue</span>
                    <span className="text-base font-bold font-mono text-white">BDT 1.24M</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+12.9%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Orders</span>
                    <span className="text-base font-bold font-mono text-white">1,245 reqs</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+18.2%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Net Profit</span>
                    <span className="text-base font-bold font-mono text-indigo-400">BDT 124.5K</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+15.4%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Inventory Value</span>
                    <span className="text-base font-bold font-mono text-white">24,560m</span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 block">Stable</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">GMV Volume</span>
                    <span className="text-base font-bold font-mono text-white">BDT 4.25M</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+8.5%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Active Suppliers</span>
                    <span className="text-base font-bold font-mono text-white">48 Co.</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+8.2%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Conversion Rate</span>
                    <span className="text-base font-bold font-mono text-teal-400">3.42%</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+0.8%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Avg Campaign ROAS</span>
                    <span className="text-base font-bold font-mono text-white">4.2x</span>
                    <span className="text-[9px] font-mono font-bold text-teal-400 block">Active</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Wholesale Sales</span>
                    <span className="text-base font-bold font-mono text-white">BDT 650K</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+14.2%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Fulfillment Orders</span>
                    <span className="text-base font-bold font-mono text-white">320 units</span>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 block">+9.5%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Deducted Commission</span>
                    <span className="text-base font-bold font-mono text-rose-400">BDT 52K</span>
                    <span className="text-[9px] font-mono font-bold text-rose-400 block">-2.4%</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Catalog Approvals</span>
                    <span className="text-base font-bold font-mono text-white">5 items</span>
                    <span className="text-[9px] font-mono font-bold text-amber-400 block">Needs Approval</span>
                  </div>
                </div>
              )}

              {/* AI DECISION CENTER HERO SECTION (Point 5) */}
              <div className="border border-indigo-500/30 bg-gradient-to-r from-indigo-950/25 via-slate-900/60 to-indigo-950/15 p-5 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-indigo-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 animate-pulse">
                      <BrainCircuit size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-white">AI Decision Intelligence Center</h3>
                      <p className="text-[11px] text-indigo-200/70">What needs attention? Real-time operational suggestions with instant execution actions.</p>
                    </div>
                  </div>
                  <span className="mt-2 md:mt-0 px-2.5 py-1 rounded-full text-[9px] font-bold font-mono tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                    ACTIVE COGNITIVE SYNC
                  </span>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
                  {/* Decision Action 1 */}
                  <div className="p-4 bg-[#09090b]/80 border border-slate-800 rounded-xl space-y-3 relative hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
                        Pricing Calibration
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Expected Profit +12%
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white">Optimize Pricing: Jamdani Premium Crimson</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        High consumer interest registered. Recommends raising catalog price from BDT 4,500 to BDT 5,040 to capture premium surplus.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                      {decisionActions.price === "approved" ? (
                        <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-1 animate-fade-in">
                          <Check size={14} /> Base catalog price successfully elevated to BDT 5,040.
                        </div>
                      ) : decisionActions.price === "disregarded" ? (
                        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 py-1 animate-fade-in">
                          <X size={14} /> Pricing recommendation disregarded.
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              setProducts(prev => prev.map(p => p.id === "PROD-JAMD-101" ? { ...p, price: 5040 } : p));
                              setDecisionActions(prev => ({ ...prev, price: "approved" }));
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Approve Price Hike (BDT 5,040)
                          </button>
                          <button 
                            onClick={() => setDecisionActions(prev => ({ ...prev, price: "disregarded" }))}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Disregard
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Decision Action 2 */}
                  <div className="p-4 bg-[#09090b]/80 border border-slate-800 rounded-xl space-y-3 relative hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded">
                        Inventory Replenishment
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                        Low Stock Alert
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white">Replenish Cotton Handloom (Midnight Indigo)</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Dhaka Hub stock is critical (only 12 meters left). Dispatch standard restock sequence to avoid fulfillment contract gaps.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                      {decisionActions.restock === "approved" ? (
                        <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-1 animate-fade-in">
                          <Check size={14} /> Dispatched 500 meters restock sequence. Supply chain status: Optimal.
                        </div>
                      ) : decisionActions.restock === "disregarded" ? (
                        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 py-1 animate-fade-in">
                          <X size={14} /> Alert archived.
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              setProducts(prev => prev.map(p => p.id === "PROD-COTT-202" ? { ...p, stock: p.stock + 500 } : p));
                              setDecisionActions(prev => ({ ...prev, restock: "approved" }));
                            }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Dispatch Restock (500 meters)
                          </button>
                          <button 
                            onClick={() => setDecisionActions(prev => ({ ...prev, restock: "disregarded" }))}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Ignore Alert
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Decision Action 3 */}
                  <div className="p-4 bg-[#09090b]/80 border border-slate-800 rounded-xl space-y-3 relative hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">
                        Marketing Target Shift
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        Expected ROAS 4.1x
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white">Shift Budget: Eid Saree Bonanza Campaign</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        ROAS dropped below benchmark. Recommends shifting 35% of campaign budget to target wholesale merchant pools in Chittagong Division.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                      {decisionActions.roas === "approved" ? (
                        <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-1 animate-fade-in">
                          <Check size={14} /> Marketing parameters recalibrated. Audience targets synced with Meta Ads Manager API.
                        </div>
                      ) : decisionActions.roas === "disregarded" ? (
                        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 py-1 animate-fade-in">
                          <X size={14} /> Campaign targets unmodified.
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              setDecisionActions(prev => ({ ...prev, roas: "approved" }));
                            }}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Shift Budget & Recalibrate Target
                          </button>
                          <button 
                            onClick={() => setDecisionActions(prev => ({ ...prev, roas: "disregarded" }))}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Disregard
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Decision Action 4 */}
                  <div className="p-4 bg-[#09090b]/80 border border-slate-800 rounded-xl space-y-3 relative hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded">
                        Dead Inventory
                      </span>
                      <span className="text-[10px] font-mono text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                        Release BDT 72,000 Cash
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-white font-sans">Clearance Liquidation: Silk Brocade</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        0 transactions recorded in the past 90 days. Approve 15% clearance campaign to target active high-volume distributors.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                      {decisionActions.liquidate === "approved" ? (
                        <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 py-1 animate-fade-in">
                          <Check size={14} /> 15% off liquidation push campaign formulated and live in B2B buyer app feeds.
                        </div>
                      ) : decisionActions.liquidate === "disregarded" ? (
                        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 py-1 animate-fade-in">
                          <X size={14} /> Alert archived.
                        </div>
                      ) : (
                        <>
                          <button 
                            onClick={() => {
                              const clearCamp: MarketingCampaign = {
                                id: `CAMP-${Math.floor(100 + Math.random() * 900)}`,
                                name: "Silk Brocade Liquidation Flash",
                                goal: "Release Capital",
                                budget: 15000,
                                channel: "Marketplace Push",
                                audience: "High-volume wholesale textile purchasers",
                                status: "Active",
                                predictedROAS: 4.5,
                                confidence: "94%",
                                adCopyHook: "Direct clearance offer on premium Silk Brocade weavers",
                                adCopyBody: "Exclusive wholesale discounts on our gold zari woven brocade. Strictly limited stocks.",
                                targetInterests: ["Distributors", "High Volume", "Clearance"],
                                dateCreated: new Date().toISOString().split("T")[0]
                              };
                              setCampaigns(prev => [clearCamp, ...prev]);
                              setDecisionActions(prev => ({ ...prev, liquidate: "approved" }));
                            }}
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Approve 15% Clearance Campaign
                          </button>
                          <button 
                            onClick={() => setDecisionActions(prev => ({ ...prev, liquidate: "disregarded" }))}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            Disregard
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* CENTER AREA: CHARTS & AI RECOMMENDATION CARD */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual Sales Trends */}
                <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">Revenue Overview</h4>
                      <p className="text-[11px] text-slate-400">Aggregated fabric order statements</p>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded tracking-wide font-mono">
                      Real-time update
                    </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={role === "ADMIN" ? "#6366f1" : "#14b8a6"} stopOpacity={0.4}/>
                            <stop offset="95%" stopColor={role === "ADMIN" ? "#6366f1" : "#14b8a6"} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} labelStyle={{ color: "#94a3b8" }} />
                        <Area type="monotone" dataKey="revenue" stroke={role === "ADMIN" ? "#6366f1" : "#14b8a6"} fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* AI INSIGHTS CARD (Fitted with real live responses!) */}
                <div className="border border-indigo-950/40 bg-gradient-to-b from-slate-900/40 to-indigo-950/20 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 pb-4">
                      <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <BrainCircuit size={16} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">Gemini AI Intelligence</h4>
                        <p className="text-[10px] text-indigo-300">Live operational predictions</p>
                      </div>
                    </div>

                    {isInsightsLoading ? (
                      <div className="space-y-3 py-6">
                        <div className="h-4 bg-slate-800 rounded animate-pulse w-3/4"></div>
                        <div className="h-3 bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 bg-slate-800 rounded animate-pulse w-5/6"></div>
                        <div className="h-12 bg-slate-800 rounded animate-pulse mt-4"></div>
                      </div>
                    ) : insightsResult ? (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-300 italic leading-relaxed">
                          "{insightsResult.summary}"
                        </p>
                        
                        <div className="space-y-3 pt-2">
                          {insightsResult.recommendations?.slice(0, 2).map((rec: any, idx: number) => (
                            <div key={rec.id || idx} className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                              <div className="flex items-start justify-between">
                                <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                                  Recommendation
                                </span>
                                <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                                  {rec.confidence}% Confidence
                                </span>
                              </div>
                              <h5 className="font-display font-bold text-xs text-white mt-1">{rec.title}</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{rec.text}</p>
                              <div className="mt-2 text-[10px] font-bold text-teal-400 flex items-center space-x-1">
                                <Sparkles size={10} />
                                <span>Impact: {rec.impact}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-400">
                          Configure your Gemini API Key in the Settings to fetch custom live business insights for this role.
                        </p>
                        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                          <h5 className="text-xs font-bold text-white">Predicted Sales (Eid Season)</h5>
                          <p className="text-[11px] text-slate-400 mt-1">Jamdani fabric sales are predicted to increase by 230% in next 15 days.</p>
                        </div>
                        <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800">
                          <h5 className="text-xs font-bold text-white">Stock Alert</h5>
                          <p className="text-[11px] text-slate-400 mt-1">Linen fabric stock is running low. Restock before Monsoon spikes demand.</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => setCurrentTab("insights")}
                    className="w-full mt-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Open Analytics & Insight Hub</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {/* BOTTOM ROW: TOP PRODUCTS & RECENT ORDERS SUMMARY */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Top Products */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl">
                  <h4 className="font-display font-bold text-sm text-white pb-3 border-b border-slate-800 flex items-center justify-between">
                    <span>Top-Performing Materials</span>
                    <span className="text-xs text-slate-500 font-medium font-sans">By Transaction Volume</span>
                  </h4>
                  <div className="divide-y divide-slate-800/80 mt-3">
                    {products.slice(0, 4).map((p) => (
                      <div key={p.id} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-slate-800" />
                          <div>
                            <p className="text-xs font-bold text-white leading-tight">{p.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{p.id} • {p.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-white">BDT {p.price.toLocaleString()}</p>
                          <span className="text-[10px] text-emerald-400 font-bold font-mono">+{Math.floor(Math.random() * 20 + 5)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Order Status Pie Chart Summary */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                  <h4 className="font-display font-bold text-sm text-white pb-3 border-b border-slate-800">
                    Order Dispatch Ratios
                  </h4>
                  <div className="h-44 w-full flex items-center justify-center py-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={orderStatusCounts}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {orderStatusCounts.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value} orders`} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Compact list */}
                    <div className="space-y-1.5 ml-4 shrink-0">
                      {orderStatusCounts.map((item) => (
                        <div key={item.name} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          <span>{item.name}: <strong className="text-white font-mono">{item.value}</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-medium">Currently processing 1,245 orders in total queue</span>
                  </div>
                </div>

                {/* AI Coach Score Visualizer (Shown primarily for suppliers to mimic mockups) */}
                <div className="border border-teal-950/30 bg-slate-900/40 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                  <h4 className="font-display font-bold text-sm text-white pb-3 border-b border-slate-800 flex items-center justify-between">
                    <span>AI Coach Listing Health</span>
                    <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      Supplier score
                    </span>
                  </h4>
                  <div className="py-4 flex items-center space-x-4">
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center bg-slate-900 rounded-full border-4 border-teal-500/30 border-t-teal-400">
                      <div className="text-center">
                        <span className="font-display font-black text-2xl text-white">85</span>
                        <span className="text-[10px] text-slate-400 block font-mono">/ 100</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="font-display font-bold text-xs text-teal-300">"Excellent Product Visuals"</h5>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Your metadata coverage is solid. Improve your Cotton 3 Piece keyword count to reach 95.
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setCurrentTab("products")}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-bold text-slate-300 transition-all"
                  >
                    View Materials & Coach Suggestions
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              03: PRODUCT MANAGEMENT (ADMIN & SUPPLIER GRID)
              ======================================================== */}
          {currentTab === "products" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Material & Product Catalog
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {role === "ADMIN" 
                      ? "Verify incoming fabric listings, enforce catalog standards, and manage approvals." 
                      : "Add your latest weaves, configure color/pattern variants, and query the AI Coach."}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {role === "SUPPLIER" && (
                    <button
                      onClick={() => {
                        setNewProductStep(1);
                        setCoachResult(null);
                        setNewProductData({
                          name: "",
                          category: "Jamdani",
                          price: "",
                          stock: "",
                          colors: [],
                          sizes: [],
                          patterns: [],
                          description: "",
                          image: ""
                        });
                        // Move to virtual step add inside products or simple switch view
                        setNewProductStep(1);
                        // Open add product modal simulation
                        setNewProductStep(11); // special view index for Add Product
                      }}
                      className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-lg transition-colors flex items-center space-x-1.5"
                    >
                      <Plus size={14} />
                      <span>Register Fabric</span>
                    </button>
                  )}
                </div>
              </div>

              {/* TABLE CONTAINER */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                    <Filter size={14} />
                    <span>Active Directory Catalog ({filteredProducts.length} entries)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Showing real-time stock balances from Enterprise DB
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/25 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-3.5 px-4">Fabric Spec & Details</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Manufacturer / Supplier</th>
                        <th className="py-3.5 px-4 text-right">Wholesale Price</th>
                        <th className="py-3.5 px-4 text-center">Available Stock</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-xs">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover border border-slate-800" />
                              <div>
                                <span className="font-mono text-[9px] text-indigo-400 font-bold block">{p.id}</span>
                                <span className="font-bold text-white block">{p.name}</span>
                                <span className="text-[10px] text-slate-400 block mt-0.5 max-w-xs truncate">{p.description}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-semibold text-slate-300">
                            {p.category}
                          </td>
                          <td className="py-4 px-4 text-slate-400">
                            {p.supplierName}
                          </td>
                          <td className="py-4 px-4 text-right font-mono font-bold text-white">
                            BDT {p.price.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-center font-mono text-slate-300">
                            {p.stock}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              p.status === "Approved" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : p.status === "Pending"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center space-x-1.5">
                              {role === "ADMIN" && p.status === "Pending" && (
                                <>
                                  <button
                                    onClick={() => handleProductStatusChange(p.id, "Approved")}
                                    className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white transition-colors"
                                    title="Approve Fabric"
                                  >
                                    <Check size={14} />
                                  </button>
                                  <button
                                    onClick={() => handleProductStatusChange(p.id, "Rejected")}
                                    className="p-1 rounded bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors"
                                    title="Reject Fabric"
                                  >
                                    <X size={14} />
                                  </button>
                                </>
                              )}
                              
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1 rounded bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                                title="Remove Listing"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              04: PRODUCT ADD / EDIT WORKFLOW (SUPPLIER PERSPECTIVE)
              ======================================================== */}
          {currentTab === "products" && newProductStep === 11 && (
            <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-extrabold text-xl text-white">
                  Add New Material to FabricFlow BD
                </h2>
                <button
                  onClick={() => setNewProductStep(1)}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Back to Catalog
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Form Inputs Steps */}
                <div className="lg:col-span-3 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  {/* Step indicators */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400">Step Progress</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((s) => (
                        <span 
                          key={s} 
                          className={`w-5 h-1 rounded ${
                            newProductStep === s ? "bg-teal-500" : "bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* STEP 1: Basic Info */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Fabric Title Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Traditional Rajshahi Silk Sharee (Dual-Tone)"
                        value={newProductData.name}
                        onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Category Classification</label>
                      <select
                        value={newProductData.category}
                        onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                      >
                        <option value="Jamdani">Jamdani Silk</option>
                        <option value="Cotton">Premium Cotton</option>
                        <option value="Linen">Fine Linen</option>
                        <option value="Silk">Mulberry Silk</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Wholesale Price (BDT)</label>
                        <input
                          type="number"
                          placeholder="e.g. 8500"
                          value={newProductData.price}
                          onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Available Stock (Yards/Pcs)</label>
                        <input
                          type="number"
                          placeholder="e.g. 150"
                          value={newProductData.stock}
                          onChange={(e) => setNewProductData({ ...newProductData, stock: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Fabric Specifications / Description</label>
                      <textarea
                        rows={3}
                        placeholder="Outline the thread counts, loom origins, and maintenance guidelines..."
                        value={newProductData.description}
                        onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    {/* Quick presets for Colors / Sizes */}
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-[10px] uppercase font-bold text-slate-400">Variant Details</label>
                      <div className="flex flex-wrap gap-1.5">
                        {["Crimson", "Ocean Blue", "Pure Gold", "Emerald"].map((c) => {
                          const hasColor = newProductData.colors.includes(c);
                          return (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                const nextColors = hasColor 
                                  ? newProductData.colors.filter(col => col !== c)
                                  : [...newProductData.colors, c];
                                setNewProductData({ ...newProductData, colors: nextColors });
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${
                                hasColor 
                                  ? "bg-teal-500/10 text-teal-400 border-teal-500/40" 
                                  : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                              }`}
                            >
                              {c}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Image Placeholder */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Asset Reference Image URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        value={newProductData.image}
                        onChange={(e) => setNewProductData({ ...newProductData, image: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                      />
                      <span className="text-[9px] text-slate-500 block mt-1">Leave blank to use default marketplace placeholder card.</span>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          // Validate & Push
                          if (!newProductData.name || !newProductData.price) {
                            alert("Please fill in the Fabric Title Name and Price.");
                            return;
                          }
                          const finalizedItem: Product = {
                            id: `PROD-${Math.floor(108 + Math.random() * 90)}`,
                            name: newProductData.name,
                            category: newProductData.category,
                            supplierName: "Dhaka Fabrics Ltd.",
                            price: Number(newProductData.price),
                            status: "Pending", // Starts as pending admin approval
                            colors: newProductData.colors.length > 0 ? newProductData.colors : ["Indigo"],
                            sizes: ["Standard 5.5m"],
                            patterns: ["Floral Print"],
                            stock: Number(newProductData.stock) || 100,
                            description: newProductData.description || "Authentic marketplace fabric submission.",
                            image: newProductData.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300",
                            addedDate: new Date().toISOString().split("T")[0]
                          };
                          setProducts(prev => [finalizedItem, ...prev]);
                          setNewProductStep(1); // switch back to grid
                        }}
                        className="flex-1 py-2 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                      >
                        Submit to Admin Approval Pipeline
                      </button>
                    </div>

                  </div>
                </div>

                {/* AI COACH FEEDBACK SIDE PANEL */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="border border-indigo-950/45 bg-indigo-950/10 p-5 rounded-xl shadow-xl space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <Award size={16} />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-white">AI Coach Pre-Submission Optimizer</h4>
                        <p className="text-[10px] text-indigo-300">Predict listing readiness scores</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Run the real-time AI evaluation to refine your fabric listing copy, optimize wholesale margins, and generate high-traffic SEO keywords before submitting to admin approval.
                    </p>

                    <button
                      type="button"
                      onClick={fetchAiCoachFeedback}
                      disabled={isCoachLoading || !newProductData.name}
                      className="w-full py-2 bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded-lg text-xs font-bold border border-indigo-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-40"
                    >
                      <RefreshCw size={13} className={isCoachLoading ? "animate-spin" : ""} />
                      <span>{isCoachLoading ? "Analyzing Weave Specs..." : "Run AI Coach Analysis"}</span>
                    </button>
                  </div>

                  {/* AI COACH ANALYSIS RESULTS */}
                  {coachResult && (
                    <div className="border border-teal-900/40 bg-teal-950/10 p-5 rounded-xl shadow-xl space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-display">Optimization Output</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-[10px] text-slate-400">Coach Score:</span>
                          <span className="px-2 py-0.5 rounded text-xs font-black bg-teal-500/15 text-teal-400 border border-teal-500/20">
                            {coachResult.score} / 100
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <h5 className="font-bold text-teal-300 text-[10px] uppercase">Market Intelligence Insight:</h5>
                          <p className="text-slate-300 mt-1 leading-relaxed text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800">
                            {coachResult.marketInsights}
                          </p>
                        </div>

                        <div>
                          <h5 className="font-bold text-teal-300 text-[10px] uppercase">Suggestions to Increase Conversions:</h5>
                          <ul className="list-disc list-inside space-y-1 mt-1 text-[11px] text-slate-300">
                            {coachResult.suggestions?.map((s: string, i: number) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-bold text-indigo-300 text-[10px] uppercase">Optimized Title Suggestion:</h5>
                          <p className="text-white mt-1 italic font-display text-[11px]">
                            "{coachResult.suggestedTitle}"
                          </p>
                        </div>

                        <div>
                          <h5 className="font-bold text-indigo-300 text-[10px] uppercase">Target SEO Meta Tags:</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {coachResult.seoKeywords?.map((k: string, i: number) => (
                              <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-900 text-slate-400 font-mono border border-slate-800">
                                {k}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            // Apply optimization results to form!
                            setNewProductData({
                              ...newProductData,
                              name: coachResult.suggestedTitle || newProductData.name,
                              description: coachResult.suggestedDescription || newProductData.description
                            });
                          }}
                          className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-teal-400 font-semibold text-[11px] rounded border border-slate-800 mt-2 transition-all text-center"
                        >
                          Auto-Apply AI Suggested Copy
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              05: B2B ORDER MANAGEMENT HUB (WITH INTEGRATED DETAILS PANEL)
              ======================================================== */}
          {currentTab === "orders" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    B2B Order Logistics Portal
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Verify escrow payout statuses, track dispatch timelines, and configure shipping metadata.
                  </p>
                </div>
              </div>

              {/* TABLE LIST */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                
                {/* Main list */}
                <div className="xl:col-span-2 border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Aggregate Purchase Orders ({filteredOrders.length} records)</span>
                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">
                      Real-time updates
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                          <th className="py-3 px-4">Order Ref</th>
                          <th className="py-3 px-4">Material Details</th>
                          <th className="py-3 px-4">Buyer Boutique</th>
                          <th className="py-3 px-4 text-right">Order Total</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-center">Escrow Pay</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-xs">
                        {filteredOrders.map((o) => (
                          <tr 
                            key={o.id} 
                            onClick={() => setSelectedOrder(o)}
                            className={`hover:bg-slate-900/40 cursor-pointer transition-colors ${
                              selectedOrder?.id === o.id ? "bg-slate-900/65" : ""
                            }`}
                          >
                            <td className="py-4 px-4 font-mono font-bold text-white">
                              {o.id}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-bold text-slate-200 block">{o.productName}</span>
                              <span className="text-[10px] text-slate-500 block">Qty: {o.qty} Yards</span>
                            </td>
                            <td className="py-4 px-4 text-slate-400">
                              {o.customerName}
                            </td>
                            <td className="py-4 px-4 text-right font-mono font-bold text-white">
                              BDT {o.total.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                o.status === "Delivered" 
                                  ? "bg-emerald-500/15 text-emerald-400" 
                                  : o.status === "Shipped"
                                  ? "bg-indigo-500/15 text-indigo-400"
                                  : o.status === "Confirmed"
                                  ? "bg-blue-500/15 text-blue-400"
                                  : o.status === "Cancelled"
                                  ? "bg-rose-500/15 text-rose-400"
                                  : "bg-amber-500/15 text-amber-400"
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className={`text-[10px] font-medium ${o.paymentStatus === "Paid" ? "text-emerald-400" : "text-amber-400"}`}>
                                {o.paymentStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DETAILS PANEL / SLIDE-OVER MIMIC */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-5">
                  {selectedOrder ? (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h4 className="font-display font-bold text-sm text-white">Purchase Order Spec</h4>
                        <span className="font-mono text-xs text-slate-400 font-bold">{selectedOrder.id}</span>
                      </div>

                      {/* Timeline status indicator */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Fulfillment Progress</span>
                        <div className="grid grid-cols-4 gap-1 text-center text-[9px] text-slate-400">
                          <span className="bg-emerald-500/10 text-emerald-400 py-1 rounded font-bold border border-emerald-500/20">Pending</span>
                          <span className={`py-1 rounded font-bold ${["Confirmed", "Shipped", "Delivered"].includes(selectedOrder.status) ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-900 border border-slate-800"}`}>Confirmed</span>
                          <span className={`py-1 rounded font-bold ${["Shipped", "Delivered"].includes(selectedOrder.status) ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-900 border border-slate-800"}`}>Shipped</span>
                          <span className={`py-1 rounded font-bold ${selectedOrder.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-900 border border-slate-800"}`}>Delivered</span>
                        </div>
                      </div>

                      {/* Main parameters */}
                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Buyer Entity</span>
                          <span className="text-white font-medium">{selectedOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Product Material</span>
                          <span className="text-white font-medium">{selectedOrder.productName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Quantity Ordered</span>
                          <span className="text-white font-medium font-mono">{selectedOrder.qty} units</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Escrow Value</span>
                          <span className="text-white font-bold font-mono">BDT {selectedOrder.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Payment Channel</span>
                          <span className="text-teal-400 font-medium">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Logistics Courier</span>
                          <span className="text-indigo-400 font-medium">Pathao Business (Standard)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800/40">
                          <span className="text-slate-400">Tracking Number</span>
                          <span className="text-white font-mono bg-slate-900 px-1 rounded border border-slate-800 text-[11px]">{selectedOrder.trackingNo}</span>
                        </div>
                        <div className="pt-1.5">
                          <span className="text-slate-400 block mb-0.5">Shipping Address</span>
                          <p className="text-[11px] text-slate-300 leading-normal bg-slate-900/60 p-2 rounded border border-slate-800/80">
                            {selectedOrder.shippingAddress}
                          </p>
                        </div>
                      </div>

                      {/* Management Controls (Direct state mutations!) */}
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">Dispatch Control Console</span>
                        <div className="grid grid-cols-3 gap-1">
                          <button
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Confirmed")}
                            className="py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded transition-all"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Shipped")}
                            className="py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] rounded transition-all"
                          >
                            Ship
                          </button>
                          <button
                            onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Delivered")}
                            className="py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded transition-all"
                          >
                            Deliver
                          </button>
                        </div>
                        <button
                          onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Cancelled")}
                          className="w-full py-1.5 bg-slate-900 hover:bg-rose-950 hover:text-rose-400 text-slate-400 font-semibold text-[10px] rounded border border-slate-800 transition-all"
                        >
                          Cancel Order Execution
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center space-y-2">
                      <ShoppingBag size={24} className="text-slate-700" />
                      <p>Select a purchase order row on the left to review shipping addresses, change status, and retrieve tracking tokens.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              06: COMMISSION MANAGEMENT (LEDGER & STATEMENT RULES)
              ======================================================== */}
          {currentTab === "commissions" && role === "ADMIN" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Escrow & Commission Management
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Control marketplace transaction deductions, track payout balances, and export ledger.
                  </p>
                </div>

                <div className="flex space-x-2 shrink-0">
                  <button
                    onClick={handleExportLedger}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold rounded-lg text-slate-300 hover:text-white transition-all flex items-center space-x-1.5"
                  >
                    <Download size={14} />
                    <span>Download Ledger</span>
                  </button>

                  <button
                    onClick={() => {
                      // Trigger new payout
                      const newPay: Payout = {
                        id: `PAY-${Math.floor(505 + Math.random() * 50)}`,
                        supplierName: "Dhaka Fabrics Ltd.",
                        amount: 32000,
                        date: new Date().toISOString().split("T")[0],
                        status: "Pending",
                        paymentMethod: "City Bank EFT"
                      };
                      setPayouts(prev => [newPay, ...prev]);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-lg text-white transition-all flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>Trigger Payout</span>
                  </button>
                </div>
              </div>

              {/* Commission rules list */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {commissionRules.map((rule) => (
                  <div key={rule.id} className="border border-slate-800 bg-slate-900/40 p-4 rounded-xl shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800/50">
                        <span className="text-[10px] font-bold text-slate-500 font-mono">{rule.id}</span>
                        <span className="text-[10px] text-indigo-400 uppercase font-semibold font-mono">Commission</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-white mt-2">{rule.category}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Minimum order: BDT {rule.minOrderValue.toLocaleString()}</p>
                    </div>

                    <div className="pt-4 flex items-baseline justify-between">
                      <span className="text-2xl font-display font-black text-white">{rule.rate}%</span>
                      <span className="text-[9px] text-slate-500">Last updated: {rule.lastUpdated}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payouts list */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-400 flex items-center justify-between">
                  <span>Merchant Escrow Payout Timeline Statements</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Payout Ref</th>
                        <th className="py-3 px-4">Supplier Entity</th>
                        <th className="py-3 px-4">Payout Date</th>
                        <th className="py-3 px-4">Settlement Channel</th>
                        <th className="py-3 px-4 text-right">Amount (BDT)</th>
                        <th className="py-3 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {payouts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/30 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-white">{p.id}</td>
                          <td className="py-3 px-4 text-slate-300 font-semibold">{p.supplierName}</td>
                          <td className="py-3 px-4 text-slate-400">{p.date}</td>
                          <td className="py-3 px-4 text-slate-400">{p.paymentMethod}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-white">BDT {p.amount.toLocaleString()}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              p.status === "Paid" 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                : p.status === "Processing"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              07: AI CAMPAIGN BUILDER (CREATIVE CAMPAIGN ADVISOR)
              ======================================================== */}
          {currentTab === "campaigns" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    AI Marketing Campaign Suite
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Design multi-channel advertisements, predict conversion performance, and draft copy with Gemini.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* Inputs card */}
                <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                    <Megaphone className="text-indigo-400" size={18} />
                    <span className="font-display font-bold text-sm text-white">Campaign Parameters</span>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Campaign Strategy Name</label>
                      <input
                        type="text"
                        value={campaignForm.name}
                        onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Campaign Conversion Goal</label>
                      <select
                        value={campaignForm.goal}
                        onChange={(e) => setCampaignForm({ ...campaignForm, goal: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none"
                      >
                        <option>Increase Sales</option>
                        <option>Lead Generation</option>
                        <option>Brand Awareness</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Estimated Ad Spend Budget (BDT)</label>
                      <input
                        type="number"
                        value={campaignForm.budget}
                        onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Primary Ad Channel</label>
                      <select
                        value={campaignForm.channel}
                        onChange={(e) => setCampaignForm({ ...campaignForm, channel: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white focus:outline-none"
                      >
                        <option>Facebook Ads</option>
                        <option>Google Search (Intent)</option>
                        <option>Instagram Influencers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Target Audience Insights</label>
                      <textarea
                        rows={3}
                        value={campaignForm.audience}
                        onChange={(e) => setCampaignForm({ ...campaignForm, audience: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white leading-normal"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={generateAiCampaign}
                      disabled={isCampaignLoading || !campaignForm.name}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 disabled:opacity-40 shadow-lg shadow-indigo-600/10"
                    >
                      <Sparkles size={14} className={isCampaignLoading ? "animate-spin" : ""} />
                      <span>{isCampaignLoading ? "Generating Campaign via Gemini..." : "Synthesize AI Campaign Advice"}</span>
                    </button>
                  </div>
                </div>

                {/* Response Visualizers (Generated content) */}
                <div className="lg:col-span-3 space-y-4">
                  
                  {campaignResult ? (
                    <div className="border border-indigo-950/40 bg-indigo-950/5 p-6 rounded-xl shadow-xl space-y-5 animate-fade-in">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <div>
                          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Predicted ROI Insights</span>
                          <h4 className="font-display font-extrabold text-base text-white mt-0.5">{campaignForm.name}</h4>
                        </div>
                        
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">Predicted ROAS</span>
                          <span className="font-display font-black text-2xl text-teal-400">{campaignResult.predictedROAS}x</span>
                        </div>
                      </div>

                      {/* ROAS Indicator Gauge representation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Ad Engine Confidence</span>
                          <div className="flex items-center space-x-2 mt-1.5">
                            <span className="px-2 py-0.5 text-xs font-bold bg-indigo-500/10 text-indigo-400 rounded">
                              {campaignResult.confidence}
                            </span>
                            <span className="text-[11px] text-slate-400">High precision match</span>
                          </div>
                        </div>

                        <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 uppercase font-bold block">Budget Recommendation</span>
                          <p className="text-[11px] text-slate-300 mt-1 font-medium leading-tight">{campaignResult.budgetRecommendation}</p>
                        </div>
                      </div>

                      {/* Generated ad copy */}
                      <div className="space-y-3.5">
                        <div className="bg-indigo-950/15 p-4 rounded-lg border border-indigo-900/30">
                          <span className="text-[10px] uppercase font-bold text-indigo-300 block mb-1">Generated Hook Line (Headline)</span>
                          <p className="text-xs font-display font-bold text-white italic">"{campaignResult.adCopyHook}"</p>
                        </div>

                        <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-xs">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Generated Post Copy (Body)</span>
                          <p className="text-slate-300 leading-relaxed font-mono text-[11px] whitespace-pre-wrap">{campaignResult.adCopyBody}</p>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">Interest Targeting Strategy (Audience Expansion)</span>
                          <div className="flex flex-wrap gap-1.5">
                            {campaignResult.targetInterests?.map((item: string, idx: number) => (
                              <span key={idx} className="px-2 py-1 rounded text-[10px] font-bold bg-slate-900 text-teal-400 border border-slate-800 font-mono">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-800 bg-[#0d1222]/40 p-8 rounded-xl shadow-xl text-center text-slate-500 flex flex-col items-center justify-center space-y-3 min-h-[350px]">
                      <Megaphone size={36} className="text-slate-700 animate-bounce-slow" />
                      <p className="text-xs max-w-sm">Enter your target metrics and click "Synthesize AI Campaign Advice" to trigger a direct Gemini optimization report containing ad copy, predicted ROAS multipliers, and targeted keywords.</p>
                    </div>
                  )}

                  {/* Historical Campaigns list */}
                  <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-3">
                    <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider border-b border-slate-800 pb-2">Active Campaign Logs</h4>
                    <div className="divide-y divide-slate-800/80">
                      {campaigns.map((c) => (
                        <div key={c.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-mono text-[9px] text-slate-500 block">{c.id} • {c.channel}</span>
                            <span className="font-semibold text-slate-200">{c.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Budget: BDT {c.budget.toLocaleString()}</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 uppercase tracking-wide">
                              {c.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              08: ANALYTICS & REPORTS (RECHARTS BAR & CONVERSION FUNNELS)
              ======================================================== */}
          {currentTab === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Business Intelligence & Funnels
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Track material conversion ratios, category popularity, and long-term transactional aggregates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Sales distribution across fabric categories */}
                <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                  <h4 className="font-display font-bold text-sm text-white pb-3 border-b border-slate-800">
                    Category Share Comparison
                  </h4>
                  <div className="h-72 w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryDistribution}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155" }} />
                        <Bar dataKey="value" fill={role === "ADMIN" ? "#818cf8" : "#2dd4bf"}>
                          {categoryDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Conversion Funnel Analysis */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <h4 className="font-display font-bold text-sm text-white pb-2 border-b border-slate-800">
                    B2B Marketplace Conversion Funnel
                  </h4>
                  <p className="text-xs text-slate-400">Visitor-to-purchase ratios during current summer festival peak season.</p>
                  
                  <div className="space-y-4 pt-2">
                    {[
                      { level: "Impressions (Organic Search)", count: "125,000", pct: 100, color: "bg-indigo-500" },
                      { level: "Fabric Specifications Views", count: "48,500", pct: 38.8, color: "bg-blue-500" },
                      { level: "Cart Additions (Quotes)", count: "18,200", pct: 14.5, color: "bg-teal-500" },
                      { level: "Successful Purchase Escrows", count: "2,456", pct: 2.0, color: "bg-emerald-500" }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-300">{step.level}</span>
                          <span className="font-mono text-white font-bold">{step.count} ({step.pct}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div className={`h-full ${step.color} rounded-full`} style={{ width: `${step.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-400 leading-normal mt-2">
                    <span className="font-bold text-white block">AI Optimization Target:</span>
                    Optimize product details using AI Coach suggestions to lift specification views to organic search conversion to 5% by Q3.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              09: AI INSIGHTS & DECISION ENGINE
              ======================================================== */}
          {currentTab === "insights" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    AI-Native Decision Engine & Advisor
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time high-confidence operational predictions generated directly by the Google Gemini model.
                  </p>
                </div>

                <button
                  onClick={fetchAiInsights}
                  disabled={isInsightsLoading}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold rounded-lg text-white transition-all flex items-center space-x-1.5"
                >
                  <RefreshCw size={14} className={isInsightsLoading ? "animate-spin" : ""} />
                  <span>{isInsightsLoading ? "Analyzing Marketplace..." : "Query Decision Intelligence"}</span>
                </button>
              </div>

              {/* DYNAMIC RESULTS DIRECT FROM SERVER GEMINI API */}
              {isInsightsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl animate-pulse space-y-4">
                      <div className="h-4 bg-slate-800 rounded w-1/3"></div>
                      <div className="h-6 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-800 rounded"></div>
                      <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                      <div className="h-8 bg-slate-800 rounded mt-4"></div>
                    </div>
                  ))}
                </div>
              ) : insightsResult ? (
                <div className="space-y-6">
                  
                  {/* Executive summary block */}
                  <div className="bg-gradient-to-r from-indigo-950/20 via-slate-900/40 to-teal-950/10 border border-slate-800 p-6 rounded-xl shadow-xl">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block font-display">Executive Summary</span>
                    <h3 className="text-sm font-medium text-slate-200 mt-2 leading-relaxed">
                      "{insightsResult.summary}"
                    </h3>
                  </div>

                  {/* Recommendations Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insightsResult.recommendations?.map((rec: any, idx: number) => (
                      <div key={rec.id || idx} className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                            <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">ID: {rec.id || `REC-${idx}`}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                              {rec.confidence}% Match
                            </span>
                          </div>

                          <h4 className="font-display font-extrabold text-sm text-white mt-3">{rec.title}</h4>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{rec.text}</p>
                        </div>

                        <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase font-bold">Estimated Impact</span>
                            <span className="text-xs font-bold text-emerald-400">{rec.impact}</span>
                          </div>
                          
                          <button
                            onClick={() => {
                              alert(`Executing system action matching strategy: "${rec.title}"`);
                            }}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold rounded text-slate-300 transition-all uppercase tracking-wider"
                          >
                            Execute Action
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Broader Market trends bullet points */}
                  <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl">
                    <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider pb-3 border-b border-slate-800 mb-4">
                      Broader Bangladesh Fabric Marketplace Signals & Raw Trends
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {insightsResult.marketTrends?.map((trend: string, i: number) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                          <p className="leading-relaxed">{trend}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="border border-slate-800 bg-[#0d1222]/30 p-8 rounded-xl shadow-xl text-center text-slate-500 flex flex-col items-center justify-center space-y-3">
                  <BrainCircuit size={40} className="text-slate-700 animate-pulse" />
                  <p className="text-xs max-w-sm">No live decision results fetched yet. Click "Query Decision Intelligence" to initiate full-stack analytical synthesis using the Gemini-3.5-flash model.</p>
                </div>
              )}

            </div>
          )}

          {/* ========================================================
              10: INTEGRATIONS & SYSTEM SETTINGS
              ======================================================== */}
          {currentTab === "settings" && (
            <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
              <div>
                <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                  Integrations & System Configs
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Control external databases, payment channels, MinIO storage credentials, and AI model defaults.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* MinIO Object Storage Setup */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                    <HardDrive size={18} className="text-teal-400" />
                    <span className="font-display font-bold text-sm text-white">MinIO Object Store Configuration</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal">
                    FabricFlow BD stores high-resolution fabric weave visuals, variant images, and merchant documents in localized MinIO Buckets.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Storage Endpoint URL</label>
                      <input 
                        type="text" 
                        defaultValue="https://minio.fabricflow.internal:9000" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Access Key ID</label>
                        <input 
                          type="text" 
                          defaultValue="fabricflow-admin-id" 
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Secret Access Key</label>
                        <input 
                          type="password" 
                          defaultValue="••••••••••••••••••••" 
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Storage Bucket Name</label>
                      <input 
                        type="text" 
                        defaultValue="fabric-spec-visuals" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                      />
                    </div>

                    <button 
                      onClick={() => alert("MinIO Object Storage connected and authenticated successfully!")}
                      className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold rounded-lg text-teal-400 hover:text-white transition-all text-center"
                    >
                      Verify Storage Connection
                    </button>
                  </div>
                </div>

                {/* Database Connectivity and Redis */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                    <Database size={18} className="text-indigo-400" />
                    <span className="font-display font-bold text-sm text-white">Relational SQL Server & Redis Config</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-normal">
                    Active state connection to Microsoft SQL Server via EF Core 9, with caching powered by Redis sentinel.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">SQL Connection String (Entity Framework)</label>
                      <input 
                        type="text" 
                        defaultValue="Server=sql-prod-1.fabricflow.bd,1433;Database=CommerceOS;User Id=sa;Password=••••••••;" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Redis Cache Endpoint</label>
                      <input 
                        type="text" 
                        defaultValue="redis-cache-cluster.internal:6379,password=••••••••" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono" 
                      />
                    </div>

                    <div className="p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-lg flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 text-indigo-300">
                        <ShieldCheck size={16} />
                        <span>SQL Connection Status:</span>
                      </div>
                      <span className="font-bold text-emerald-400 font-mono">Active (14ms latency)</span>
                    </div>

                    <button 
                      onClick={() => alert("SQL Connection pool reset. Caches flushed successfully.")}
                      className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold rounded-lg text-indigo-400 hover:text-white transition-all text-center"
                    >
                      Test Connection & Clear Caches
                    </button>
                  </div>
                </div>

                {/* Third Party Integrations: Payment Gateways & Courier Services */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4 md:col-span-2">
                  <div className="flex items-center space-x-2 pb-2 border-b border-slate-800">
                    <ExternalLink size={18} className="text-white" />
                    <span className="font-display font-bold text-sm text-white">External Payment & Logistics Integrations</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* bKash card */}
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white">bKash Merchant Pay</h5>
                        <p className="text-[10px] text-slate-400 mt-1">Escrow settlement & instant wallet payout API.</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-400">
                        <span>Status: Connected</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    {/* SSLCommerz card */}
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white">SSLCommerz</h5>
                        <p className="text-[10px] text-slate-400 mt-1">Accept Visa, Mastercard, and Rocket payments.</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-400">
                        <span>Status: Connected</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    {/* Pathao Logistics card */}
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white">Pathao Logistics</h5>
                        <p className="text-[10px] text-slate-400 mt-1">Automated shipping label generation & tracking API.</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-400">
                        <span>Status: Connected</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>

                    {/* Steadfast Courier card */}
                    <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg flex flex-col justify-between space-y-3">
                      <div>
                        <h5 className="text-xs font-bold text-white">Steadfast Courier</h5>
                        <p className="text-[10px] text-slate-400 mt-1">Alternative nationwide Cash On Delivery partner.</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-400">
                        <span>Status: Connected</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>

        {/* Elegant Dark Enterprise System Footer */}
        <footer className="px-6 py-3 bg-[#050507] border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-wider text-slate-500 uppercase font-semibold gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <button 
              onClick={() => setDevDiagnostics(!devDiagnostics)}
              className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-widest transition-colors ${
                devDiagnostics ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "bg-slate-800 text-slate-400 border border-slate-700/60"
              }`}
              title="Toggle Environment Diagnostics"
            >
              {devDiagnostics ? "ENV: DIAGNOSTICS" : "ENV: PRODUCTION"}
            </button>
            <span className="text-slate-800">|</span>
            {devDiagnostics ? (
              <div className="flex gap-3 flex-wrap items-center justify-center">
                <span>ASP.NET Core 9</span>
                <span className="text-slate-800">•</span>
                <span>SQL Server</span>
                <span className="text-slate-800">•</span>
                <span>Redis 7.2</span>
                <span className="text-slate-800">•</span>
                <span>MinIO 8.4</span>
                <span className="text-slate-800">•</span>
                <span>Build: 3.0.24-dev</span>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap items-center justify-center">
                <span>FabricFlow BD v3.0</span>
                <span className="text-slate-800">•</span>
                <span className="text-slate-400">Last Sync: 2 min ago</span>
              </div>
            )}
          </div>
          <div className="text-slate-600 font-mono">
            © 2026 Enterprise ERP
          </div>
        </footer>
      </div>

      {/* GLOBAL COMMAND PALETTE MODAL (Point 6) */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsCommandPaletteOpen(false)}
          />
          
          {/* Palette container */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl max-w-xl w-full overflow-hidden z-50 animate-fade-in flex flex-col max-h-[450px]">
            {/* Header / Search bar */}
            <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-[#070a12]">
              <Search className="text-indigo-400 shrink-0" size={18} />
              <input 
                type="text" 
                placeholder="Type a command or search materials/orders..."
                className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none"
                autoFocus
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />
              <button 
                onClick={() => setIsCommandPaletteOpen(false)}
                className="text-[9px] uppercase font-mono font-bold text-slate-500 hover:text-white border border-slate-800 rounded px-1.5 py-0.5"
              >
                ESC
              </button>
            </div>

            {/* Results / Navigation body */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              {/* Quick Jump Options */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-1">Navigation Shortcuts</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "dashboard", label: "Control Room Dashboard", key: "Alt+D" },
                    { id: "products", label: "Product Management", key: "Alt+P" },
                    { id: "orders", label: "Order Hub", key: "Alt+O" },
                    { id: "commissions", label: "Commission Center", key: "Alt+C" },
                    { id: "campaigns", label: "AI Campaign Builder", key: "Alt+M" },
                    { id: "analytics", label: "Analytics & Funnels", key: "Alt+A" },
                    { id: "settings", label: "Settings & System", key: "Alt+S" }
                  ].map((shortcut) => (
                    <button
                      key={shortcut.id}
                      onClick={() => {
                        setCurrentTab(shortcut.id);
                        setIsCommandPaletteOpen(false);
                      }}
                      className="w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-indigo-600/10 hover:border-indigo-500/30 text-left text-xs text-slate-300 hover:text-indigo-300 border border-slate-800/80 transition-all flex items-center justify-between"
                    >
                      <span>{shortcut.label}</span>
                      <kbd className="text-[9px] font-mono text-slate-500">{shortcut.key}</kbd>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic DB Filtering match results if search has length */}
              {globalSearch.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block px-1">Matching Resources</span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {/* Filtered Materials */}
                    {filteredProducts.slice(0, 3).map((prod) => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setCurrentTab("products");
                          setIsCommandPaletteOpen(false);
                        }}
                        className="w-full p-2.5 rounded-lg bg-[#070a12]/80 hover:bg-slate-800 text-left text-xs border border-slate-800/50 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-mono text-slate-500">{prod.id}</span>
                          <span className="text-white font-medium">{prod.name}</span>
                          <span className="text-[9px] text-slate-400 font-mono">({prod.category})</span>
                        </div>
                        <span className="font-mono text-indigo-400 font-bold">BDT {prod.price}</span>
                      </button>
                    ))}

                    {/* Filtered Orders */}
                    {filteredOrders.slice(0, 3).map((ord) => (
                      <button
                        key={ord.id}
                        onClick={() => {
                          setCurrentTab("orders");
                          setSelectedOrder(ord);
                          setIsCommandPaletteOpen(false);
                        }}
                        className="w-full p-2.5 rounded-lg bg-[#070a12]/80 hover:bg-slate-800 text-left text-xs border border-slate-800/50 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-mono text-slate-500">{ord.id}</span>
                          <span className="text-white font-medium">{ord.customerName}</span>
                          <span className="text-[9px] text-slate-400 font-mono">({ord.productName})</span>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${
                          ord.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}>{ord.status}</span>
                      </button>
                    ))}

                    {filteredProducts.length === 0 && filteredOrders.length === 0 && (
                      <div className="text-center py-4 text-xs text-slate-500 font-medium">
                        No resources found matching "{globalSearch}"
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Hint Footer */}
            <div className="p-3 border-t border-slate-800 bg-[#060811] flex items-center justify-between text-[9px] text-slate-500 font-semibold font-mono">
              <span>↑↓ navigation</span>
              <span>ENTER to select</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* AI ASSISTANT RIGHT DRAWER (Point 8) */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsAiDrawerOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="w-full max-w-md bg-[#0a0d1a] border-l border-slate-800 h-full shadow-2xl flex flex-col relative z-50 animate-slide-over">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#070912]">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <BrainCircuit size={18} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-white">FabricFlow AI Assistant</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Autonomous ERP Agent</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-3.5 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">Agent Greeting</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  স্বাগতম! I am your real-time Commerce OS partner. I have full cognitive read-access over your weaver profiles, purchase ledger, inventory metrics, and active marketing ROAS. 
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  What would you like me to analyze today? Choose an ERP shortcut or type a question.
                </p>
              </div>

              {/* Predefined prompt chips */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Predefined ERP Prompts</span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: "low-stock", text: "Show products with low stock" },
                    { id: "eid-camp", text: "Create Eid campaign" },
                    { id: "supplier-rep", text: "Generate supplier report" },
                    { id: "sales-drop", text: "Why did sales drop?" }
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleTriggerAiPrompt(chip.id)}
                      className="w-full p-2.5 rounded-lg bg-[#0d1127] hover:bg-indigo-950/40 text-left text-xs text-indigo-200 hover:text-indigo-100 border border-indigo-950/50 hover:border-indigo-500/30 transition-all font-sans font-medium"
                    >
                      {chip.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active response board */}
              {aiResponseOutput && (
                <div className="p-4 bg-[#0d1222] border border-indigo-950/40 rounded-xl space-y-3.5 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider">AI Cognitive Response</span>
                    <button 
                      onClick={() => setAiResponseOutput(null)}
                      className="text-[9px] text-slate-500 hover:text-slate-400 uppercase font-bold font-mono"
                    >
                      Reset
                    </button>
                  </div>
                  
                  {/* Custom HTML renderer */}
                  {aiResponseOutput}
                </div>
              )}
            </div>

            {/* Form Input footer */}
            <div className="p-4 border-t border-slate-800 bg-[#070912] space-y-2">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Ask FabricFlow AI anything..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTriggerAiPrompt("custom");
                    }
                  }}
                />
                <button 
                  onClick={() => handleTriggerAiPrompt("custom")}
                  className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  Ask
                </button>
              </div>
              <p className="text-[9px] text-slate-500 font-mono text-center">Powered by Gemini Pro on .NET Core 9 Cloud Cluster</p>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON TO LAUNCH CUSTOMER STOREFRONT FROM ERP */}
      {viewMode === "erp" && (
        <button 
          onClick={() => setViewMode("storefront")}
          className="fixed bottom-6 right-6 z-40 px-5 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-2xl hover:scale-105 transition-all flex items-center space-x-2 border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Go to Customer Storefront ✨</span>
        </button>
      )}
    </div>
  );
}
