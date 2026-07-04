import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Compass, 
  Layers, 
  Lock, 
  Mail, 
  Phone, 
  Key, 
  Globe, 
  Heart, 
  ShoppingBag, 
  Eye, 
  EyeOff, 
  Bot, 
  ChevronRight, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Laptop,
  Flame,
  User,
  Users,
  Briefcase,
  Store,
  FileText,
  Clock,
  TrendingUp,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
  Percent,
  Activity,
  Database,
  BookOpen,
  CreditCard,
  Network
} from "lucide-react";

interface LandingAndAuthProps {
  onLoginSuccess: (
    role: "CUSTOMER" | "SUPPLIER" | "EMPLOYEE" | "ADMIN", 
    onboardingData?: any
  ) => void;
  onNavigateToStorefront: () => void;
  onSwitchToErp: (role: "ADMIN" | "SUPPLIER") => void;
}

export default function LandingAndAuth({ 
  onLoginSuccess, 
  onNavigateToStorefront,
  onSwitchToErp
}: LandingAndAuthProps) {
  
  // PRIMARY PAGES: "landing" | "about" | "login" | "onboarding"
  const [activeScreen, setActiveScreen] = useState<"landing" | "about" | "login" | "onboarding">("landing");
  
  // Theme state for the login portal only (elegant light vs dark)
  const [authTheme, setAuthTheme] = useState<"dark" | "light">("dark");
  
  // --- LOCALIZATION & ACCESSIBILITY STATES ---
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [readerAssist, setReaderAssist] = useState<boolean>(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState<boolean>(false);
  const [showStatusPage, setShowStatusPage] = useState<boolean>(false);

  const t = {
    en: {
      tag: "Next-Generation Commercial Textile Operating System",
      heroTitle: "Connecting rural looms directly to ",
      heroHighlight: "global boutiques.",
      heroSubtitle: "FabricFlow BD Commerce OS coordinates yarn procurement, weaver compensation, product authentication, smart campaign placement, and rapid wholesale logistics. Fair pricing meets enterprise tech.",
      exploreCatalog: "Explore Handloom Marketplace",
      enterOS: "Enter Commerce OS Portal",
      tagline1: "100% GI Authenticated",
      tagline2: "Integrated bKash / Bank Payouts",
      tagline3: "Instant AI Campaign Placement",
      supportedWeavers: "WEAVERS SUPPORTED",
      transactionValue: "TRANSACTION VALUE",
      catalogedItems: "CATALOGED ITEMS",
      clusterTitle: "Artisanal Looming Sourcing Clusters",
      clusterSubtitle: "Our system directly monitors and coordinates with registered handloom cooperatives across major regional hubs.",
      trustTitle: "Dhaka Luxury Heritage Trust Center",
      trustSubtitle: "We build secure trade rails protecting rural artisan cooperatives and wholesale boutiques alike.",
      pricingTitle: "Enterprise-Grade Platform Pricing",
      pricingSubtitle: "Unlock custom sourcing tiers, secure escrow contracts, and smart campaign analytics.",
      becomeSupplier: "Become a Partner Supplier",
      statusTitle: "FabricFlow BD Operational System Status",
      integrationsTitle: "Seamless API Integrations & Courier Gateways",
      integrationsSubtitle: "Connect your marketplace instantly with Dhaka's major logistics hubs and digital wallets.",
      documentationTitle: "Platform Technical Documentation",
    },
    bn: {
      tag: "পরবর্তী প্রজন্মের কমার্শিয়াল টেক্সটাইল অপারেটিং সিস্টেম",
      heroTitle: "তাতঁশিল্পীদের সরাসরি যুক্ত করুন ",
      heroHighlight: "বিশ্বমানের বুটিকের সাথে।",
      heroSubtitle: "ফ্যাব্রিকফ্লো বিডি কমার্স ওএস সুতা সংগ্রহ, তাঁতিদের সঠিক মজুরি, পণ্যের সত্যতা যাচাই, স্মার্ট ক্যাম্পেইন এবং দ্রুত পাইকারি লজিস্টিকস সমন্বয় করে। ন্যায্য মূল্যে আধুনিক প্রযুক্তির মিলন।",
      exploreCatalog: "হ্যান্ডলুম মার্কেটপ্লেস এক্সপ্লোর করুন",
      enterOS: "কমার্স ওএস পোর্টালে প্রবেশ করুন",
      tagline1: "১০০% জিআই প্রত্যয়িত ও খাঁটি",
      tagline2: "সরাসরি বিকাশ ও ব্যাংক পেমেন্ট",
      tagline3: "তাৎক্ষণিক এআই ক্যাম্পেইন প্লেসমেন্ট",
      supportedWeavers: "তাঁতিদের সংখ্যা",
      transactionValue: "লেনদেনের পরিমাণ",
      catalogedItems: "ক্যাটালগ পণ্যসমূহ",
      clusterTitle: "ঐতিহ্যবাহী তাঁতশিল্প ক্লাস্টারসমূহ",
      clusterSubtitle: "আমাদের সিস্টেম সরাসরি প্রধান আঞ্চলিক তাঁত সমবায় সমিতির সাথে যোগাযোগ ও কার্যক্রম পর্যবেক্ষণ করে।",
      trustTitle: "ঢাকা লাক্সারি হেরিটেজ ট্রাস্ট সেন্টার",
      trustSubtitle: "আমরা গ্রামীণ তাঁতি সমবায় এবং পাইকারি বুটিকদের নিরাপত্তা রক্ষায় নির্ভরযোগ্য ও নিরাপদ বাণিজ্যিক গেটওয়ে প্রদান করি।",
      pricingTitle: "এন্টারপ্রাইজ-গ্রেড প্ল্যাটফর্ম সাবস্ক্রিপশন",
      pricingSubtitle: "কাস্টম সোর্সিং টায়ার, নিরাপদ এসক্রো চুক্তি এবং স্মার্ট ক্যাম্পেইন বিশ্লেষণ আনলক করুন।",
      becomeSupplier: "পার্টনার সাপ্লায়ার হিসেবে আবেদন করুন",
      statusTitle: "ফ্যাব্রিকফ্লো বিডি অপারেশনাল সিস্টেম স্ট্যাটাস",
      integrationsTitle: "সহজ এপিআই ইন্টিগ্রেশন এবং কুরিয়ার গেটওয়ে",
      integrationsSubtitle: "ঢাকার প্রধান লজিস্টিক হাব এবং ডিজিটাল ওয়ালেটের সাথে আপনার বুটিককে তাৎক্ষণিকভাবে যুক্ত করুন।",
      documentationTitle: "প্ল্যাটফর্ম টেকনিক্যাল ডকুমেন্টেশন",
    }
  }[lang];
  
  // --- AUTH FORM STATES ---
  const [selectedUserType, setSelectedUserType] = useState<"CUSTOMER" | "SUPPLIER" | "EMPLOYEE" | "ADMIN">("CUSTOMER");
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | "google">("email");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isAccountRecovery, setIsAccountRecovery] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // --- ONBOARDING QUESTIONS STATES ---
  // Customer Interests
  const [customerInterests, setCustomerInterests] = useState<string[]>([]);
  // Supplier Specs
  const [supplierBusinessName, setSupplierBusinessName] = useState("");
  const [supplierTradeLicense, setSupplierTradeLicense] = useState("");
  const [supplierCategories, setSupplierCategories] = useState<string[]>([]);
  const [supplierAgreement, setSupplierAgreement] = useState(false);
  // Employee Specs
  const [employeeDept, setEmployeeDept] = useState("Logistics & Delivery");
  const [employeePermissions, setEmployeePermissions] = useState<string[]>(["Read-only Sourcing"]);

  // OTP Timer countdown
  useEffect(() => {
    let interval: any;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const triggerOtp = () => {
    if (!phone || phone.length < 9) {
      setFeedbackMsg({ type: "error", text: "Please provide a valid Bangladeshi mobile number." });
      return;
    }
    setOtpSent(true);
    setOtpTimer(60);
    setFeedbackMsg({ type: "success", text: "Simulated high-priority OTP code sent via bKash/SMS gateway." });
  };

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMsg(null);
    
    // Simple mock validations
    if (authMethod === "email") {
      if (!email.includes("@")) {
        setFeedbackMsg({ type: "error", text: "Please enter a valid business email address." });
        return;
      }
      if (password.length < 4) {
        setFeedbackMsg({ type: "error", text: "Password must be at least 4 characters long." });
        return;
      }
    } else if (authMethod === "phone") {
      if (!otpSent) {
        setFeedbackMsg({ type: "error", text: "Please request your OTP verification token first." });
        return;
      }
      if (otpCode !== "1234" && otpCode.length !== 4) {
        setFeedbackMsg({ type: "error", text: "Invalid verification code. Enter '1234' to bypass simulation securely." });
        return;
      }
    }

    setFeedbackMsg({ type: "success", text: "Authorization credentials approved! Initializing onboarding..." });
    
    // Proceed to role detection questionnaire
    setTimeout(() => {
      setActiveScreen("onboarding");
      setFeedbackMsg(null);
    }, 1000);
  };

  const submitOnboarding = () => {
    // Collect data depending on selectedUserType
    if (selectedUserType === "CUSTOMER") {
      onLoginSuccess("CUSTOMER", { interests: customerInterests });
    } else if (selectedUserType === "SUPPLIER") {
      if (!supplierBusinessName || !supplierTradeLicense) {
        setFeedbackMsg({ type: "error", text: "Please fill in all supplier registration fields." });
        return;
      }
      if (!supplierAgreement) {
        setFeedbackMsg({ type: "error", text: "You must agree to the commission percentage rate." });
        return;
      }
      onLoginSuccess("SUPPLIER", {
        businessName: supplierBusinessName,
        tradeLicense: supplierTradeLicense,
        categories: supplierCategories
      });
    } else if (selectedUserType === "EMPLOYEE") {
      onLoginSuccess("EMPLOYEE", {
        department: employeeDept,
        permissions: employeePermissions
      });
    } else {
      // ADMIN
      onLoginSuccess("ADMIN", { level: "Super Administrator" });
    }
  };

  const triggerGoogleSignIn = () => {
    setFeedbackMsg({ type: "success", text: "Connected safely via Google workspace OAuth provider." });
    setTimeout(() => {
      setActiveScreen("onboarding");
      setFeedbackMsg(null);
    }, 1000);
  };

  const toggleInterest = (interest: string) => {
    setCustomerInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const toggleSupplierCategory = (cat: string) => {
    setSupplierCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleEmployeePermission = (perm: string) => {
    setEmployeePermissions(prev => 
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

  // Weaver profile card updates for Landing about stories
  const fontClass = fontSize === "large" ? "text-lg" : fontSize === "xlarge" ? "text-xl" : "text-base";
  const themeClass = highContrast ? "bg-black text-white" : "bg-[#07070a] text-slate-100";

  return (
    <div className={`min-h-screen ${themeClass} ${fontClass} font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative`}>
      
      {/* --- BRAND HEADER NAVBAR --- */}
      <nav className={`border-b ${highContrast ? "border-white" : "border-slate-900/90"} bg-[#07070a]/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4`}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <button 
            onClick={() => { setActiveScreen("landing"); setShowStatusPage(false); }}
            className="flex flex-col items-start text-left group"
          >
            <span className="text-lg md:text-xl font-black uppercase tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              FABRIC<span className="text-indigo-500 font-serif italic tracking-normal lowercase">flow</span>
            </span>
            <span className="text-[7px] tracking-[0.25em] font-mono font-bold text-slate-500 uppercase">
              dhaka luxury heritage OS
            </span>
          </button>

          {/* Quick Language Toggle & Accessibility Toggle for Mobile */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setLang(l => l === "en" ? "bn" : "en")}
              className="text-[10px] font-mono font-bold px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-indigo-400 hover:text-indigo-300"
            >
              {lang === "en" ? "বাংলা" : "EN"}
            </button>
            <button 
              onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400"
              title="Accessibility"
            >
              ♿
            </button>
          </div>
        </div>

        {/* Desktop links */}
        <div className="flex items-center space-x-4 md:space-x-6 text-xs font-bold tracking-wider uppercase text-slate-400">
          <button 
            onClick={() => { setActiveScreen("landing"); setShowStatusPage(false); }} 
            className={`hover:text-white transition-colors ${activeScreen === "landing" && !showStatusPage ? "text-white underline underline-offset-4 decoration-indigo-500" : ""}`}
          >
            SaaS Platform
          </button>
          <button 
            onClick={() => { setActiveScreen("about"); setShowStatusPage(false); }} 
            className={`hover:text-white transition-colors ${activeScreen === "about" ? "text-white underline underline-offset-4 decoration-indigo-500" : ""}`}
          >
            Heritage Weavers
          </button>
          <button 
            onClick={() => { setShowStatusPage(true); setActiveScreen("landing"); }}
            className={`hover:text-white transition-colors flex items-center gap-1.5 ${showStatusPage ? "text-white underline underline-offset-4 decoration-indigo-500" : ""}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Status</span>
          </button>
          <button 
            onClick={onNavigateToStorefront} 
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Compass size={13} className="text-teal-400" />
            <span>Marketplace</span>
          </button>
        </div>

        {/* Actions & Accessibility Bar */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle (Desktop) */}
          <button 
            onClick={() => setLang(l => l === "en" ? "bn" : "en")}
            className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950 border border-slate-900 hover:border-slate-800 rounded-xl text-[10px] font-mono font-bold text-slate-300 hover:text-white transition-all"
            title="Switch Language / ভাষা পরিবর্তন করুন"
          >
            <Globe size={11} className="text-indigo-400" />
            <span>{lang === "en" ? "বাংলা (BN)" : "English (EN)"}</span>
          </button>

          {/* Accessibility Option (Desktop) */}
          <button 
            onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
            className={`hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold transition-all border ${
              showAccessibilityMenu 
                ? "bg-indigo-500/10 border-indigo-500 text-indigo-400" 
                : "bg-slate-950 border-slate-900 text-slate-300 hover:text-white hover:border-slate-800"
            }`}
            title="Accessibility Settings"
          >
            <span>♿</span>
            <span>A11y</span>
          </button>

          <button 
            onClick={() => { setSelectedUserType("ADMIN"); setActiveScreen("login"); setShowStatusPage(false); }}
            className="text-xs font-semibold text-slate-400 hover:text-white hidden lg:block"
          >
            Admin Entrance
          </button>
          <button 
            onClick={() => { setSelectedUserType("CUSTOMER"); setActiveScreen("login"); setShowStatusPage(false); }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:scale-103 transition-all"
          >
            Access Portal
          </button>
        </div>
      </nav>

      {/* --- FLOATING ACCESSIBILITY CONFIGURATION PANEL --- */}
      {showAccessibilityMenu && (
        <div className="fixed top-20 right-6 z-50 w-72 bg-slate-950 border border-indigo-500/30 p-5 rounded-2xl shadow-2xl space-y-4 animate-slide-down">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
            <h4 className="text-xs font-mono font-black uppercase text-indigo-400 flex items-center gap-1.5">
              <span>♿</span>
              <span>Accessibility Controls</span>
            </h4>
            <button 
              onClick={() => setShowAccessibilityMenu(false)}
              className="text-xs text-slate-500 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Scaling */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Text Scaling Assist</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "normal", label: "A (100%)" },
                  { id: "large", label: "A+ (115%)" },
                  { id: "xlarge", label: "A++ (130%)" }
                ].map((scale) => (
                  <button
                    key={scale.id}
                    onClick={() => setFontSize(scale.id as any)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all border ${
                      fontSize === scale.id 
                        ? "bg-indigo-600 border-indigo-500 text-white" 
                        : "bg-slate-900/60 border-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {scale.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast Mode */}
            <div className="flex items-center justify-between py-1 border-t border-slate-900/60 pt-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-200 block font-bold">High Contrast Mode</span>
                <p className="text-[9px] text-slate-500">Optimum luminance contrast</p>
              </div>
              <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${highContrast ? "bg-indigo-600" : "bg-slate-800"}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${highContrast ? "translate-x-4.5" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Screen Reader Assist Tips */}
            <div className="flex items-center justify-between py-1 border-t border-slate-900/60 pt-2.5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-slate-200 block font-bold">Screen Reader Assist</span>
                <p className="text-[9px] text-slate-500">Inject helpful aria landmarks</p>
              </div>
              <button 
                onClick={() => setReaderAssist(!readerAssist)}
                className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${readerAssist ? "bg-indigo-600" : "bg-slate-800"}`}
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${readerAssist ? "translate-x-4.5" : "translate-x-0"}`} />
              </button>
            </div>
          </div>

          {readerAssist && (
            <div className="p-2.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl text-[9px] text-indigo-300 font-mono leading-normal">
              ♿ <strong>Screen Reader Status:</strong> Landmarks injected. Press [Tab] to easily hop between Sourcing Clusters, Trust Center, and Pricing tiers.
            </div>
          )}
        </div>
      )}

      {/* --- CONTENT CONTAINER WITH SWITCH ROUTER --- */}
      <main className="flex-1 flex flex-col justify-center">

        {/* ==============================================
            0. PUBLIC STATUS PAGE (status.fabricflow.com.bd)
            ============================================== */}
        {showStatusPage && (
          <div className="max-w-4xl mx-auto px-6 py-12 text-left space-y-12 animate-fade-in w-full">
            <div className="border-b border-slate-900 pb-4 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-mono">
                  status.fabricflow.com.bd
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Real-time operational health telemetry of Dhaka's premium Commerce OS architecture.
              </p>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Global API Endpoint Gateway", status: "Operational", ping: "42ms", health: "100%" },
                { name: "Narayanganj & Dhaka DB Cluster", status: "Operational", ping: "8ms", health: "99.99%" },
                { name: "bKash & Bank Payout Handshake API", status: "Operational", ping: "124ms", health: "100%" },
                { name: "Pathao / Steadfast Logistics webhook queue", status: "Operational", ping: "89ms", health: "99.85%" },
                { name: "Gemini-3.5-Flash Sourcing Assistant", status: "Operational", ping: "340ms", health: "100%" },
                { name: "Escrow Ledger Lock Engine", status: "Operational", ping: "12ms", health: "100%" },
              ].map((sys, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-white block">{sys.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 block">Latency: {sys.ping} • SLA: {sys.health}</span>
                  </div>
                  <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated Live Telemetry Graph with CSS bars */}
            <div className="p-5 bg-slate-950 border border-slate-900 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <h3 className="text-xs font-mono font-black uppercase text-indigo-400">System Performance (Last 30 Days)</h3>
                <span className="text-[10px] font-mono text-slate-500">Uptime: 99.982%</span>
              </div>
              <div className="flex items-end justify-between h-16 pt-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const heights = ["h-10", "h-12", "h-14", "h-11", "h-13", "h-15", "h-16"];
                  const hClass = heights[i % heights.length];
                  return (
                    <div key={i} className="w-2.5 bg-indigo-500/80 rounded-t hover:bg-teal-400 transition-colors cursor-pointer group relative" title={`Day ${i+1}: 100% operational`}>
                      <div className={`${hClass} w-full`} />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">100%</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>30 Days Ago</span>
                <span>Active Systems Online</span>
                <span>Today (Live)</span>
              </div>
            </div>

            {/* Incidents logs */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Incident History</h3>
              <div className="bg-[#09090d] border border-slate-900 rounded-xl divide-y divide-slate-900/60 text-xs">
                <div className="p-4 flex items-start space-x-3">
                  <span className="p-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[9px] font-mono font-bold uppercase">Resolved</span>
                  <div className="space-y-1">
                    <strong className="text-white font-sans">bKash Payout Multi-factor Gateway Delay</strong>
                    <p className="text-[11px] text-slate-400 leading-relaxed">We noticed a temporary timeout response when communicating with external bKash staging certificates. Fixed within 12 minutes by routing telemetry queues.</p>
                    <span className="text-[10px] text-slate-500 block font-mono">July 4, 2026 - 11:24 UTC</span>
                  </div>
                </div>
                <div className="p-4 flex items-start space-x-3">
                  <span className="p-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono font-bold uppercase">Operational</span>
                  <div className="space-y-1">
                    <strong className="text-white font-sans">All Systems Operating Nominally</strong>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Database optimization and automated catalog caching complete.</p>
                    <span className="text-[10px] text-slate-500 block font-mono">July 3, 2026 - 04:12 UTC</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowStatusPage(false)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
            >
              ← Back to SaaS Platform Landing
            </button>
          </div>
        )}

        {/* ==============================================
            1. LANDING PAGE
            ============================================== */}
        {activeScreen === "landing" && !showStatusPage && (
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full space-y-16 animate-fade-in">
            
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={11} className="animate-spin-slow text-indigo-400" />
                  <span>{t.tag}</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-100 leading-[1.05]">
                  {t.heroTitle} <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">{t.heroHighlight}</span>
                </h1>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                  {t.heroSubtitle}
                </p>

                {/* Primary CTA panel with localized wording and a Become a Supplier trigger */}
                <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                  <button 
                    onClick={onNavigateToStorefront}
                    className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2 border border-indigo-500/30 transition-transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag size={14} />
                    <span>{t.exploreCatalog}</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={() => { setSelectedUserType("CUSTOMER"); setActiveScreen("login"); }}
                    className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-transform hover:-translate-y-0.5"
                  >
                    <Lock size={13} className="text-indigo-400" />
                    <span>{t.enterOS}</span>
                  </button>
                  
                  {/* Strategic "Become a Supplier" CTA */}
                  <button 
                    onClick={() => { 
                      setSelectedUserType("SUPPLIER"); 
                      setActiveScreen("login"); 
                      setFeedbackMsg({ type: "success", text: "Welcome to partner supplier registration. Authenticate below to initialize." });
                    }}
                    className="px-4 py-3 bg-teal-950/20 hover:bg-teal-950/40 border border-teal-500/30 text-teal-300 hover:text-teal-200 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center space-x-2 transition-transform hover:-translate-y-0.5"
                  >
                    <Store size={13} className="text-teal-400" />
                    <span>{t.becomeSupplier}</span>
                  </button>
                </div>

                {/* Micro badges with localized texts */}
                <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-[11px] font-mono font-semibold">
                  <span className="flex items-center gap-1">🛡️ {t.tagline1}</span>
                  <span className="flex items-center gap-1">🏦 {t.tagline2}</span>
                  <span className="flex items-center gap-1">⚡ {t.tagline3}</span>
                </div>
              </div>

              {/* Right Side: Interactive Commercial Investor Metrics Dash */}
              <div className="lg:col-span-5 bg-slate-950/80 border border-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
                
                <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Live Operating Status</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    HEALTHY 99.9%
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Metric 1 */}
                  <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">WEAVERS SUPPORTED</span>
                      <span className="text-lg font-black text-white">5,280 artisans</span>
                    </div>
                    <div className="text-right text-[10px] font-mono text-indigo-400 font-bold">
                      +12% MoM
                    </div>
                  </div>

                  {/* Metric 2 */}
                  <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">TRANSACTION VALUE</span>
                      <span className="text-lg font-black text-white">৳12,450,000</span>
                    </div>
                    <div className="text-right text-[10px] font-mono text-teal-400 font-bold">
                      Fair Wages Paid
                    </div>
                  </div>

                  {/* Metric 3 */}
                  <div className="p-4 bg-slate-900/60 border border-slate-900 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-500 block uppercase">CATALOGED ITEMS</span>
                      <span className="text-lg font-black text-white">18,520 fabrics</span>
                    </div>
                    <div className="text-right text-[10px] font-mono text-amber-400 font-bold">
                      Authenticity Tested
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-indigo-950/20 border border-indigo-900/25 rounded-2xl flex items-center space-x-3 text-xs text-slate-300">
                  <Bot size={18} className="text-indigo-400 shrink-0" />
                  <p className="leading-relaxed text-[11px]">
                    <strong>AI Sourcing Note:</strong> Heavy demands detected on Jamdani zari sarees from European and USA boutiques. Supply allocation optimized.
                  </p>
                </div>
              </div>
            </div>

            {/* Sourcing Hub Map Grid / Clusters */}
            <div className="space-y-6 pt-10">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-white tracking-tight uppercase">Artisanal Looming Sourcing Clusters</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Our system directly monitors and coordinates with registered handloom cooperatives across major regional hubs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Narayanganj Jamdani Hub", code: "GEO-BD-NY", loomCount: "2,400 weavers active", yarn: "Fine Cotton & Silk Thread", style: "Traditional Geometric Jaal", rating: "GI Authenticated" },
                  { name: "Rajshahi Silk Cluster", code: "GEO-BD-RJ", loomCount: "1,250 weavers active", yarn: "Pure Organic Mulberry", style: "Block-print & Satin", rating: "Pure Silk Certified" },
                  { name: "Tangail Handloom Guild", code: "GEO-BD-TG", loomCount: "1,630 weavers active", yarn: "Combed 80s High Density", style: "Fine Stripes & Block Prints", rating: "Cooperative Level A" }
                ].map((cluster, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-900 hover:border-slate-800 transition-colors rounded-2xl p-5 space-y-4 text-left relative overflow-hidden">
                    <span className="absolute top-4 right-4 font-mono text-[9px] text-slate-600 tracking-widest">{cluster.code}</span>
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg">
                        <Globe size={14} />
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">{cluster.name}</h4>
                    </div>
                    
                    <div className="space-y-1 text-slate-400 text-xs font-sans">
                      <p>👥 Capacity: <strong className="text-slate-200">{cluster.loomCount}</strong></p>
                      <p>🧵 Primary Yarn: <strong className="text-slate-200">{cluster.yarn}</strong></p>
                      <p>✨ Signature Style: <strong className="text-slate-200">{cluster.style}</strong></p>
                    </div>

                    <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono font-semibold">
                      <span className="text-teal-400 bg-teal-500/5 px-2 py-0.5 rounded border border-teal-500/10">{cluster.rating}</span>
                      <button 
                        onClick={() => { setSelectedUserType("CUSTOMER"); setActiveScreen("login"); }}
                        className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center space-x-0.5"
                      >
                        <span>Sourcing Catalog</span>
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dhaka Luxury Heritage Trust Center */}
            <div id="trust-center" className="p-8 bg-slate-950/90 border border-slate-900 rounded-3xl space-y-6 max-w-5xl mx-auto text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-900 pb-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center space-x-1.5 text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider">
                    <Shield size={10} />
                    <span>Secure Trade Safeguard</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                    {t.trustTitle}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                    {t.trustSubtitle}
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-2 rounded-xl">
                  <Activity size={14} className="text-indigo-400 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-indigo-300">Escrow Ledger Active</span>
                </div>
              </div>

              {/* Trust Safeguard Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {[
                  {
                    title: "100% GI Registry Check",
                    desc: "Every Tangail Cotton, Rajshahi Silk, or Jamdani saree is tagged with a physical tamper-evident micro-seal mapping directly to the weaver's digital certificate.",
                    badge: "Authenticity Ledger"
                  },
                  {
                    title: "Weaver Fair Wage Lock",
                    desc: "Our platform locks 70% of the wholesale purchase price directly into a secure escrow. Funds are automatically disbursed to weavers' bKash wallets upon courier pickup.",
                    badge: "Zero Intermediary"
                  },
                  {
                    title: "Global Buyer Dispute Escrow",
                    desc: "Ensures international wholesale buyers can secure shipments of handloom fabrics. Disputes are arbitrated by the Dhaka Luxury Heritage Co-operative board.",
                    badge: "Guaranteed Escrow"
                  }
                ].map((pillar, idx) => (
                  <div key={idx} className="space-y-2 bg-slate-900/40 p-4 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                    <span className="text-[8px] font-mono text-indigo-400 font-black uppercase tracking-wider block">{pillar.badge}</span>
                    <h4 className="text-xs font-bold text-white">{pillar.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-normal">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* API & Courier Integrations */}
            <div id="integrations" className="space-y-6 max-w-5xl mx-auto text-center">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                  {t.integrationsTitle}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto">
                  {t.integrationsSubtitle}
                </p>
              </div>

              {/* Integrations Row Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Pathao Fast Courier", type: "Logistics Hub", api: "v3.2 Sync", active: true },
                  { name: "Steadfast Courier", type: "Thana Delivery", api: "v1.8 Sync", active: true },
                  { name: "bKash Merchant Pay", type: "Mobile Wallet", api: "Web Checkout", active: true },
                  { name: "Bank Asia Gateway", type: "Clearing Ledger", api: "EFT Handshake", active: true },
                  { name: "RedX Logistics API", type: "Bulk Delivery", api: "Automated Webhooks", active: true }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-left space-y-2 hover:scale-102 transition-transform">
                    <div className="flex items-center justify-between">
                      <div className="p-1 bg-indigo-500/10 rounded">
                        <Network size={12} className="text-indigo-400" />
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block truncate">{item.name}</span>
                      <span className="text-[9px] font-mono text-slate-500 block">{item.type}</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-900 flex justify-between items-center text-[8px] font-mono text-slate-400">
                      <span>{item.api}</span>
                      <span className="text-emerald-400">Online</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Platform Pricing */}
            <div id="pricing" className="space-y-8 max-w-5xl mx-auto text-center pt-4">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest font-black">
                  <Percent size={10} />
                  <span>Transparent Pricing</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                  {t.pricingTitle}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto">
                  {t.pricingSubtitle}
                </p>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  {
                    tier: "Artisan Co-op",
                    price: "৳0",
                    term: "Free Forever for Registered Weavers",
                    desc: "Specially designed to keep rural looming families connected directly to the marketplace without setup barriers.",
                    features: [
                      "Uncapped weaver catalog listing",
                      "Automated bKash wallet payouts",
                      "Standard GI authenticity micro-sealing",
                      "Access to Yarn Procurement pool"
                    ],
                    cta: "Register as Weaver",
                    popular: false,
                    userRole: "SUPPLIER"
                  },
                  {
                    tier: "Growth Boutique",
                    price: "৳2,450",
                    term: "Per month, billed annually",
                    desc: "Perfect for local fashion houses and luxury boutiques based in Dhaka, Sylhet, and Chittagong scaling heritage catalogs.",
                    features: [
                      "Direct regional co-op communication",
                      "Instant custom escrow contracts",
                      "Simulated campaign metrics dashboard",
                      "Dedicated Pathao express pickups"
                    ],
                    cta: "Get Boutique Access",
                    popular: true,
                    userRole: "CUSTOMER"
                  },
                  {
                    tier: "Global Enterprise",
                    price: "৳12,500",
                    term: "Per month, custom volume",
                    desc: "Tailored for international luxury wholesalers, export agencies, and high-volume fashion conglomerates.",
                    features: [
                      "Custom white-glove export clearance",
                      "Dedicated multi-region database tenancy",
                      "Full API webhooks & custom logs integration",
                      "SLA-backed priority weaving allocations"
                    ],
                    cta: "Enterprise Sandbox",
                    popular: false,
                    userRole: "CUSTOMER"
                  }
                ].map((pkg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-6 rounded-3xl border flex flex-col justify-between relative overflow-hidden ${
                      pkg.popular 
                        ? "bg-gradient-to-b from-[#090915] to-[#0d0d26] border-indigo-500/40 shadow-xl shadow-indigo-950/20" 
                        : "bg-slate-950 border-slate-900 hover:border-slate-800 transition-all"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute top-4 right-4 bg-indigo-500 text-white text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-400 font-black uppercase tracking-wider block">{pkg.tier}</span>
                        <div className="flex items-baseline space-x-1.5 mt-1">
                          <span className="text-2xl md:text-3xl font-black text-white">{pkg.price}</span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold uppercase">{pkg.term}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{pkg.desc}</p>
                      </div>

                      <ul className="space-y-2 border-t border-slate-900 pt-4 text-xs text-slate-300">
                        {pkg.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start space-x-2">
                            <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => { setSelectedUserType(pkg.userRole as any); setActiveScreen("login"); }}
                      className={`w-full py-2.5 mt-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                        pkg.popular 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500" 
                          : "bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border-slate-800"
                      }`}
                    >
                      {pkg.cta}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Slogan Panel */}
            <div className="p-8 bg-gradient-to-r from-slate-950 to-indigo-950/20 border border-slate-900/80 rounded-3xl text-center space-y-4 max-w-4xl mx-auto">
              <Briefcase className="text-indigo-500 mx-auto" size={32} />
              <h3 className="text-xl font-bold text-white tracking-tight">Enterprise Infrastructure Built for National Heritage</h3>
              <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                By integrating micro-ledger transaction registries directly with leading mobile monetary networks (bKash, Nagad), 
                we ensure artisans are paid instantly upon catalog order completion. No delays, no missing commission checks, and full transparency.
              </p>
            </div>

          </div>
        )}

        {/* ==============================================
            2. ABOUT / HERITAGE PAGE
            ============================================== */}
        {activeScreen === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-12 text-left space-y-12 animate-fade-in">
            
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 text-indigo-400 rounded px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest border border-indigo-500/20">
                <span>Preserving Jamdani & Rajshahi Weavers</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight uppercase">Direct Sourcing, Authentic Heritage</h1>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                FabricFlow BD was founded with a singular, vital mission: to deliver technology equity to weavers 
                who form the backbone of Bangladesh's beautiful fashion legacy.
              </p>
            </div>

            {/* Loom-to-Store Timeline */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-widest text-center border-b border-slate-900 pb-3">
                Chronicle: The Loom-to-Boutique Ledger Flow
              </h3>

              <div className="space-y-8 relative before:absolute before:top-2 before:bottom-2 before:left-3.5 before:w-0.5 before:bg-slate-800">
                {[
                  { title: "Artisan Onboarding & ID Verification", desc: "Every rural loom gets registered with standard biometric-linked IDs and digital wallet information to guarantee secure directly-attributed financial payout pathways.", step: "STEP 1" },
                  { title: "Direct Raw Yarn & Zari Sourcing", desc: "Platform coordinates wholesale raw combed cotton and real gold-plated metal zari threads at cooperative rates directly to weavers, preventing local loan sharks from manipulating pricing.", step: "STEP 2" },
                  { title: "Hand-weaving & Production Logging", desc: "Artisans utilize traditional loom styles (e.g. geometric tapestry layout). Progress is logged onto the FabricFlow database for buyer tracking.", step: "STEP 3" },
                  { title: "GI Authentication & Smart Labeling", desc: "Experienced handloom guild inspects fabric counts, density, and dye composition, issuing an digital authenticity token and blockchain-backed label.", step: "STEP 4" },
                  { title: "B2B Sourcing Delivery Dispatch", desc: "Bulk wholesale orders are automatically cataloged, matched with international boutique requests, and shipped via integrated logistics partners.", step: "STEP 5" }
                ].map((item, index) => (
                  <div key={index} className="relative pl-10 space-y-1">
                    <span className="absolute left-0 top-1 w-7 h-7 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-[8px] font-mono font-black text-indigo-400">
                      {index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase block tracking-wider">{item.step}</span>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 max-w-xl leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Weavers showcase slider */}
            {(() => {
              const weaverStories = [
                { name: "Alim Uddin", region: "Rupganj, Narayanganj", fabric: "Jamdani Saree", count: "100 count cotton", wage: "Fair Trade Certified" },
                { name: "Sufia Khatun", region: "Rajshahi Cluster", fabric: "Mulberry Silk", count: "120 count pure silk", wage: "Direct Profit Pool" },
                { name: "Basudeb Debnath", region: "Tangail Sourcing", fabric: "Fine Tangail Cotton", count: "80s combed cotton", wage: "Artisan Co-op" }
              ];
              return (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center">Featured Cooperatives & Artisans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {weaverStories.map((weaver, i) => (
                      <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-indigo-400 font-bold">{weaver.region}</span>
                            <span className="text-slate-600">Active</span>
                          </div>
                          <h4 className="text-xs font-bold text-white">{weaver.name}</h4>
                          <p className="text-[11px] text-slate-400">Specialty: {weaver.fabric}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[9px] font-mono text-teal-400">
                          <span>{weaver.count}</span>
                          <span>{weaver.wage}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="text-center pt-4">
              <button 
                onClick={() => setActiveScreen("landing")}
                className="text-xs font-bold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center space-x-1.5 mx-auto"
              >
                <span>Back to SaaS Platform Home</span>
                <ArrowRight size={12} />
              </button>
            </div>

          </div>
        )}

        {/* ==============================================
            3. SPLIT-SCREEN AUTHENTICATION PAGE (Stripe / Microsoft / Azure style)
            ============================================== */}
        {activeScreen === "login" && (
          <div className={`w-full min-h-[85vh] flex items-stretch ${authTheme === "light" ? "bg-slate-50 text-slate-900" : "bg-[#07070a] text-slate-100"}`}>
            
            {/* Left Side Panel: Brand illustration & Moving textile background */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#090a12] border-r border-slate-900/80 p-12 relative flex-col justify-between overflow-hidden text-slate-200">
              
              {/* Animated Fabric weft/warp line background effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 animate-[pulse_6s_infinite]" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-[#090a12] to-teal-900/10 pointer-events-none" />

              {/* Logo branding top */}
              <div className="relative z-10">
                <span className="text-lg font-black tracking-tight uppercase text-white">
                  FABRIC<span className="text-indigo-500 font-serif italic tracking-normal lowercase">flow</span>
                </span>
                <span className="text-[8px] font-mono text-slate-500 tracking-[0.25em] block uppercase">dhaka luxury commerce engine</span>
              </div>

              {/* Central Illustration / Stats slider */}
              <div className="relative z-10 my-auto space-y-6 max-w-md">
                <div className="inline-flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                  <Sun size={10} className="animate-spin-slow" />
                  <span>Enterprise SaaS Weaving Network</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-white tracking-tight uppercase">
                    The Modern Fabric of Wholesale Trading.
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Connecting premium artisans to boutiques with robust automation. 
                    Configure custom sourcing tiers, manage dynamic pricing contracts, and automate dispatch networks from Narayanganj looms to global storefronts.
                  </p>
                </div>

                {/* Micro weaver trust quote */}
                <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl space-y-2">
                  <p className="text-[11px] italic text-slate-300 leading-relaxed">
                    \"By logging our Jamdani sarees directly on the FabricFlow ledger, our guild received bulk invoice payout in 10 minutes instead of waiting 60 days. It changed our weavers' lives.\"
                  </p>
                  <p className="text-[9px] font-mono text-slate-500 text-right">— Rupganj Handloom Cooperative Union</p>
                </div>
              </div>

              {/* Sourcing badges footer */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-900/60 pt-4">
                <span>SECURED AES-256</span>
                <span className="text-indigo-400">AUTHENTIC BD HERITAGE</span>
              </div>

            </div>

            {/* Right Side Panel: Actual Authentication Form (With beautiful Dark/Light toggle) */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 relative">
              
              {/* TOP LIGHT/DARK THEME SWITCHER TOGGLE FOR AUTH FORM (SaaS Aesthetic) */}
              <div className="absolute top-4 right-6 flex items-center space-x-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Theme:</span>
                <button 
                  onClick={() => setAuthTheme(prev => prev === "dark" ? "light" : "dark")}
                  className={`p-1.5 rounded-lg border transition-all flex items-center space-x-1 ${
                    authTheme === "light" 
                      ? "bg-slate-200 border-slate-300 text-slate-700 hover:bg-slate-300" 
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                  title="Toggle elegant dark/light theme"
                >
                  {authTheme === "light" ? (
                    <>
                      <Moon size={11} />
                      <span className="text-[9px] font-mono font-bold">Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun size={11} className="text-amber-400 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold">Light</span>
                    </>
                  )}
                </button>
              </div>

              <div className="max-w-md w-full mx-auto space-y-6">
                
                {/* Brand greeting depending on role */}
                <div className="space-y-1.5">
                  <h1 className="text-2xl font-black tracking-tight uppercase">
                    Connect to FabricFlow
                  </h1>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Secure single sign-on access to B2B catalogs, supplier payroll, and operational ledgers.
                  </p>
                </div>

                {/* --- USER ROLE SELECTOR TABS --- */}
                <div className={`p-1 border rounded-xl grid grid-cols-4 gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-center ${
                  authTheme === "light" ? "bg-slate-100 border-slate-200" : "bg-slate-950 border-slate-900"
                }`}>
                  {[
                    { id: "CUSTOMER", label: "Buyer", icon: User },
                    { id: "SUPPLIER", label: "Supplier", icon: Store },
                    { id: "EMPLOYEE", label: "Staff", icon: Users },
                    { id: "ADMIN", label: "Admin", icon: Briefcase }
                  ].map((roleOpt) => {
                    const Icon = roleOpt.icon;
                    return (
                      <button
                        key={roleOpt.id}
                        onClick={() => setSelectedUserType(roleOpt.id as any)}
                        className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
                          selectedUserType === roleOpt.id
                            ? "bg-indigo-600 text-white shadow"
                            : authTheme === "light" 
                            ? "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50" 
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
                        }`}
                      >
                        <Icon size={12} />
                        <span className="text-[9px]">{roleOpt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Alert/Feedback Notification */}
                {feedbackMsg && (
                  <div className={`p-3.5 rounded-xl border text-xs flex items-start space-x-2 animate-pulse ${
                    feedbackMsg.type === "success" 
                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" 
                      : "bg-rose-500/10 border-rose-500/25 text-rose-400"
                  }`}>
                    {feedbackMsg.type === "success" ? <Check size={14} className="shrink-0 mt-0.5" /> : <AlertCircle size={14} className="shrink-0 mt-0.5" />}
                    <span>{feedbackMsg.text}</span>
                  </div>
                )}

                {/* --- CHOOSE AUTHENTICATION METHOD --- */}
                <div className="flex border-b border-slate-900/60 pb-1.5 space-x-6 text-xs font-semibold text-slate-400">
                  <button 
                    onClick={() => { setAuthMethod("email"); setFeedbackMsg(null); }}
                    className={`pb-1.5 transition-all relative ${authMethod === "email" ? "text-indigo-500 font-bold" : ""}`}
                  >
                    Business Email
                    {authMethod === "email" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
                  </button>
                  <button 
                    onClick={() => { setAuthMethod("phone"); setFeedbackMsg(null); }}
                    className={`pb-1.5 transition-all relative ${authMethod === "phone" ? "text-indigo-500 font-bold" : ""}`}
                  >
                    Mobile & OTP
                    {authMethod === "phone" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
                  </button>
                  <button 
                    onClick={() => { setAuthMethod("google"); setFeedbackMsg(null); }}
                    className={`pb-1.5 transition-all relative ${authMethod === "google" ? "text-indigo-500 font-bold" : ""}`}
                  >
                    Google Workspace
                    {authMethod === "google" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
                  </button>
                </div>

                {/* --- ACTUAL METHOD FORM --- */}
                {authMethod === "email" && (
                  <div className="space-y-4 text-left">
                    {isForgotPassword ? (
                      <div className="space-y-4 animate-fade-in">
                        <div className="space-y-1.5 pb-1">
                          <h3 className="text-xs font-mono font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                            <Key size={13} className="text-indigo-400" />
                            <span>Commerce OS Recovery Portal</span>
                          </h3>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            To recover your login credentials, please verify your email address. We'll issue a temporary 6-digit recovery OTP instantly.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-mono font-bold uppercase text-slate-500">Recovery Email</label>
                            <div className="relative">
                              <Mail size={13} className="absolute left-3.5 top-3.5 text-slate-500" />
                              <input 
                                type="email"
                                placeholder="you@boutique.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                                  authTheme === "light" 
                                    ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                    : "bg-slate-950 border border-slate-900 text-slate-100 focus:bg-[#09090e]"
                                }`}
                              />
                            </div>
                          </div>

                          {otpSent ? (
                            <div className="space-y-3 animate-slide-down">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono font-bold uppercase text-emerald-400">Recovery OTP Code</label>
                                <input 
                                  type="text"
                                  maxLength={6}
                                  placeholder="728491"
                                  value={otpCode}
                                  onChange={(e) => setOtpCode(e.target.value)}
                                  className={`w-full text-center text-sm tracking-[0.4em] font-mono font-bold rounded-xl py-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                    authTheme === "light" 
                                      ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                      : "bg-slate-950 border border-slate-900 text-white focus:bg-[#09090e]"
                                  }`}
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] font-mono font-bold uppercase text-slate-500">New Password Signature</label>
                                <input 
                                  type="password"
                                  placeholder="Create strong password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className={`w-full text-xs rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                    authTheme === "light" 
                                      ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                      : "bg-slate-950 border border-slate-900 text-white focus:bg-[#09090e]"
                                  }`}
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  if (otpCode.length === 6 && password.length >= 6) {
                                    setFeedbackMsg({ type: "success", text: "Password reset complete. Your new security signature has been updated!" });
                                    setIsForgotPassword(false);
                                    setOtpSent(false);
                                  } else {
                                    setFeedbackMsg({ type: "error", text: "Please enter valid 6-digit OTP (728491) and a 6+ character password." });
                                  }
                                }}
                                className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                              >
                                Save Signature & Return to Login
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                if (email.includes("@")) {
                                  setOtpSent(true);
                                  setFeedbackMsg({ type: "success", text: "Security recovery token dispatched to your inbox (Simulation Code: 728491)." });
                                } else {
                                  setFeedbackMsg({ type: "error", text: "Please enter a valid registered email address." });
                                }
                              }}
                              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                            >
                              Dispatch OTP Code
                            </button>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => { setIsForgotPassword(false); setOtpSent(false); }}
                          className="text-center text-[10px] text-slate-500 hover:text-white block w-full mt-2"
                        >
                          ← Back to standard login
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleAuthentication} className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                            {selectedUserType === "CUSTOMER" ? "Boutique / Buyer Email" : "Enterprise SaaS Email Address"}
                          </label>
                          <div className="relative">
                            <Mail size={13} className="absolute left-3.5 top-3.5 text-slate-500" />
                            <input 
                              type="email" 
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={selectedUserType === "CUSTOMER" ? "you@boutique.com" : "name@fabricflow.com.bd"}
                              className={`w-full text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                                authTheme === "light" 
                                  ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                  : "bg-slate-950 border border-slate-900 text-slate-100 focus:bg-[#09090e]"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              Security Password
                            </label>
                            <button 
                              type="button" 
                              onClick={() => setIsForgotPassword(true)}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline"
                            >
                              Forgot password?
                            </button>
                          </div>
                          <div className="relative">
                            <Lock size={13} className="absolute left-3.5 top-3.5 text-slate-500" />
                            <input 
                              type={showPassword ? "text" : "password"} 
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••••••"
                              className={`w-full text-xs rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                                authTheme === "light" 
                                  ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                  : "bg-slate-950 border border-slate-900 text-slate-100 focus:bg-[#09090e]"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                            >
                              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                            </button>
                          </div>
                        </div>

                        {/* Devices / Two-Factor setup */}
                        <div className="flex items-center justify-between text-xs py-1">
                          <label className="flex items-center space-x-2 text-slate-400 cursor-pointer select-none">
                            <input 
                              type="checkbox" 
                              checked={rememberDevice}
                              onChange={(e) => setRememberDevice(e.target.checked)}
                              className="accent-indigo-500 h-3.5 w-3.5 rounded border-slate-800 bg-slate-950" 
                            />
                            <span>Remember this computer</span>
                          </label>

                          <button 
                            type="button"
                            onClick={() => setIsAccountRecovery(!isAccountRecovery)}
                            className="text-slate-400 hover:text-indigo-400 flex items-center gap-1 text-[11px]"
                          >
                            <Shield size={11} />
                            <span>Use 2FA Token</span>
                          </button>
                        </div>

                        {isAccountRecovery && (
                          <div className="space-y-1.5 p-3 bg-slate-950/40 border border-slate-900 rounded-xl animate-slide-down">
                            <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                              Enter Two-Factor Code
                            </label>
                            <div className="relative">
                              <Key size={12} className="absolute left-3 top-2.5 text-slate-500" />
                              <input 
                                type="text" 
                                placeholder="6-digit verification pin" 
                                value={twoFactorCode}
                                onChange={(e) => setTwoFactorCode(e.target.value)}
                                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-8 pr-3 text-white focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                            <p className="text-[9px] text-slate-500">Provides secondary authorization layer via Authenticator app.</p>
                          </div>
                        )}

                        <button 
                          type="submit"
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center space-x-1"
                        >
                          <span>Authorize Security Handshake</span>
                          <ChevronRight size={13} />
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {authMethod === "phone" && (
                  <div className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Bangladeshi Registered Mobile Number
                      </label>
                      <div className="flex space-x-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-400 px-3 py-3 rounded-xl text-xs font-mono font-bold flex items-center">
                          +880
                        </span>
                        <div className="relative flex-1">
                          <Phone size={13} className="absolute left-3.5 top-3.5 text-slate-500" />
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="17XXXXXXXX"
                            className={`w-full text-xs rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                              authTheme === "light" 
                                ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                : "bg-slate-950 border border-slate-900 text-slate-100 focus:bg-[#09090e]"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {!otpSent ? (
                      <button 
                        onClick={triggerOtp}
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
                      >
                        <Phone size={13} className="text-teal-400" />
                        <span>Send Verification OTP</span>
                      </button>
                    ) : (
                      <div className="space-y-4 animate-slide-down">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              Enter 4-Digit SMS Code
                            </label>
                            <span className="text-[10px] font-mono text-indigo-400">
                              Resend in {otpTimer}s
                            </span>
                          </div>
                          <input 
                            type="text" 
                            maxLength={4}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter 4-digit code (Use '1234' for simulation)"
                            className={`w-full text-center text-lg font-mono font-bold tracking-widest rounded-xl py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                              authTheme === "light" 
                                ? "bg-slate-100 border border-slate-200 text-slate-900 focus:bg-white" 
                                : "bg-slate-950 border border-slate-900 text-slate-100 focus:bg-[#09090e]"
                            }`}
                          />
                        </div>

                        <button 
                          onClick={handleAuthentication}
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center space-x-1"
                        >
                          <span>Confirm Handshake Login</span>
                          <Check size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {authMethod === "google" && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400 leading-relaxed text-left">
                      Single Sign-On is configured via Google Cloud Identity and OpenID Connect protocols. 
                      Please verify with your administrator if you do not have permission.
                    </p>
                    <button 
                      onClick={triggerGoogleSignIn}
                      className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 border border-slate-200 shadow-sm"
                    >
                      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 14.98.5 12 .5 7.42.5 3.51 3.12 1.6 6.94l3.85 2.99C6.34 6.98 9.01 5.04 12 5.04z" />
                        <path fill="#4285F4" d="M23.49 12.27c0-.84-.08-1.65-.21-2.43H12v4.61h6.44c-.28 1.46-1.11 2.69-2.35 3.52v2.93h3.8c2.22-2.05 3.5-5.06 3.5-8.63z" />
                        <path fill="#FBBC05" d="M5.45 14.93c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.6 7.42C.58 9.48 0 11.75 0 14s.58 4.52 1.6 6.58l3.85-3.65z" />
                        <path fill="#34A853" d="M12 23.5c3.24 0 5.97-1.07 7.96-2.91l-3.8-2.93c-1.05.71-2.4 1.13-4.16 1.13-2.99 0-5.66-1.94-6.55-4.89L1.6 16.85c1.91 3.82 5.82 6.65 10.4 6.65z" />
                      </svg>
                      <span>Sign In with Google G-Suite</span>
                    </button>
                  </div>
                )}

                {/* Sourcing credentials backup tips */}
                <div className={`p-4 rounded-xl text-xs text-left leading-relaxed ${
                  authTheme === "light" ? "bg-slate-100/80 text-slate-600" : "bg-slate-950 text-slate-400"
                }`}>
                  <HelpCircle size={14} className="text-indigo-400 inline mr-1.5 mb-0.5" />
                  <strong>Simulation note:</strong> Select any buyer or merchant role at the tabs above. 
                  Enter dummy email/mobile values and hit submit to bypass mock protocols instantly and configure your role-based onboarding parameters.
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ==============================================
            4. CUSTOMER / SUPPLIER / EMPLOYEE ONBOARDING WIZARD
            ============================================== */}
        {activeScreen === "onboarding" && (
          <div className="max-w-xl mx-auto px-6 py-12 text-left space-y-8 animate-fade-in bg-slate-950 border border-slate-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
            
            {/* Onboarding Intro */}
            <div className="space-y-2 border-b border-slate-900 pb-4">
              <span className="text-[9px] font-mono font-bold text-teal-400 uppercase tracking-widest">Secured Security Clearance</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                {selectedUserType === "CUSTOMER" && "Welcome, Saree Connoisseur"}
                {selectedUserType === "SUPPLIER" && "Establish Artisan Loom Hub"}
                {selectedUserType === "EMPLOYEE" && "Configure System Workspace"}
                {selectedUserType === "ADMIN" && "Verify Admin Access"}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure your personalized profile interests so the AI decision engine is custom-tailored.
              </p>
            </div>

            {/* A. CUSTOMER INTERESTS */}
            {selectedUserType === "CUSTOMER" && (
              <div className="space-y-5">
                <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider block">
                  Select your primary textile interests:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    { id: "Jamdani", name: "Jamdani Sarees", desc: "Authentic Narayanganj handloom cotton-silk weaves" },
                    { id: "Cotton", name: "Fine Tangail Cotton", desc: "Lightweight and breathable hot weather comfort wear" },
                    { id: "Silk", name: "Rajshahi Mulberry Silk", desc: "Premium cool satin-finish silk and golden zari trims" },
                    { id: "Wholesale", name: "Merchant Wholesale", desc: "Direct loom-level pricing contract orders" }
                  ].map((interest) => {
                    const isSelected = customerInterests.includes(interest.id);
                    return (
                      <div 
                        key={interest.id}
                        onClick={() => toggleInterest(interest.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 select-none ${
                          isSelected 
                            ? "bg-indigo-600/10 border-indigo-500 text-white" 
                            : "bg-slate-900/40 border-slate-900 text-slate-400 hover:border-slate-800"
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 bg-slate-950"
                        }`}>
                          {isSelected && <Check size={10} />}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-200">{interest.name}</h4>
                          <p className="text-[10px] text-slate-500 leading-snug">{interest.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* B. SUPPLIER BUSINESS SPECS */}
            {selectedUserType === "SUPPLIER" && (
              <div className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                      Business Loom Registered Name
                    </label>
                    <input 
                      type="text"
                      required
                      value={supplierBusinessName}
                      onChange={(e) => setSupplierBusinessName(e.target.value)}
                      placeholder="e.g. Sufia Traditional Weavers Ltd."
                      className="w-full text-xs bg-slate-950 border border-slate-900 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                      Weaving Trade License ID
                    </label>
                    <input 
                      type="text"
                      required
                      value={supplierTradeLicense}
                      onChange={(e) => setSupplierTradeLicense(e.target.value)}
                      placeholder="e.g. TR-2489-BD-DHK"
                      className="w-full text-xs bg-slate-950 border border-slate-900 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider block">
                      Supplied Fabric Categories
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Jamdani", "Silk", "Cotton", "Linen", "Katan"].map((cat) => {
                        const isSelected = supplierCategories.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleSupplierCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              isSelected 
                                ? "bg-teal-600/10 border-teal-500 text-teal-400" 
                                : "bg-slate-900/60 border-slate-900 text-slate-400 hover:text-white"
                            }`}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Commission agreement info checkbox */}
                  <div className="p-4 bg-slate-900/40 border border-slate-900 rounded-2xl">
                    <label className="flex items-start space-x-3 cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        required
                        checked={supplierAgreement}
                        onChange={(e) => setSupplierAgreement(e.target.checked)}
                        className="accent-teal-500 h-4 w-4 rounded border-slate-800 bg-slate-950 mt-0.5" 
                      />
                      <div className="space-y-1 text-xs">
                        <span className="font-bold text-slate-200">Agree to B2B Sourcing Commission</span>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          By enabling, you agree to FabricFlow's standard flat 8.0% commission fee per transaction. 
                          Includes secure payout processing and courier pickup integration.
                        </p>
                      </div>
                    </label>
                  </div>

                </div>
              </div>
            )}

            {/* C. EMPLOYEE REGISTRY */}
            {selectedUserType === "EMPLOYEE" && (
              <div className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                      Assigned Department Division
                    </label>
                    <select 
                      value={employeeDept}
                      onChange={(e) => setEmployeeDept(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-900 rounded-xl py-3 px-4 text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Logistics & Delivery">Logistics & Delivery Dispatch</option>
                      <option value="Textile Design Lab">Heritage Textile Design Lab</option>
                      <option value="Treasury & Finance">Treasury, Payments & bKash Audits</option>
                      <option value="AI Systems Sourcing">AI Campaign & Sourcing Analytics</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider block">
                      Request System Permissions
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Read-only Sourcing",
                        "Edit Weaver Ledgers",
                        "Approve Catalog Products",
                        "Formulate AI Marketing Hooks",
                        "Settle Financial Payouts"
                      ].map((perm) => {
                        const isSelected = employeePermissions.includes(perm);
                        return (
                          <div 
                            key={perm}
                            onClick={() => toggleEmployeePermission(perm)}
                            className={`p-3 rounded-lg border text-xs font-semibold cursor-pointer select-none transition-all flex items-center space-x-2.5 ${
                              isSelected 
                                ? "bg-indigo-600/10 border-indigo-500 text-indigo-300" 
                                : "bg-slate-900/60 border-slate-900 text-slate-400 hover:border-slate-800"
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                              isSelected ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-800 bg-slate-950"
                            }`}>
                              {isSelected && <Check size={10} />}
                            </div>
                            <span>{perm}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* D. ADMIN DIRECT CONFIRMATION */}
            {selectedUserType === "ADMIN" && (
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed">
                <Shield size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block uppercase text-[10px] tracking-wide font-mono mb-1">Super Administrator Security Clearance</strong>
                  Full administrative permissions. You will have write access to weaver catalogs, supplier payout approvals, commission configurations, and global diagnostic settings.
                </div>
              </div>
            )}

            {/* Onboarding Submit button */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-900">
              <button 
                type="button"
                onClick={() => setActiveScreen("login")}
                className="text-xs text-slate-500 hover:text-slate-300 font-mono"
              >
                ← Back to Login
              </button>

              <button 
                onClick={submitOnboarding}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all hover:scale-103 flex items-center space-x-1.5 shadow-xl border border-white/5"
              >
                <span>Launch Personalized Environment</span>
                <Sparkles size={13} className="text-white animate-pulse" />
              </button>
            </div>

          </div>
        )}

      </main>

      {/* --- AESTHETIC ENTERPRISE FOOTER --- */}
      <footer className="border-t border-slate-900/80 bg-[#060609] py-8 px-6 text-center text-xs text-slate-500 font-mono space-y-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © 2026 FabricFlow BD Inc. Built with luxury micro-sourcing protocols in Narayanganj & Dhaka.
          </p>
          <div className="flex items-center space-x-6">
            <button onClick={() => setActiveScreen("landing")} className="hover:text-slate-300 transition-colors">SaaS OS Terms</button>
            <button onClick={() => setActiveScreen("about")} className="hover:text-slate-300 transition-colors">Weavers Guild Integrity</button>
            <button onClick={() => { setSelectedUserType("ADMIN"); setActiveScreen("login"); }} className="hover:text-slate-300 transition-colors">System Registry</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
