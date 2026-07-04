import React, { useState, useEffect } from "react";
import { 
  Heart, 
  ShoppingCart, 
  ShoppingBag,
  Search, 
  Sparkles, 
  Bot, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Truck, 
  ShieldCheck, 
  Percent, 
  User, 
  Store, 
  Compass, 
  Flame, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Filter,
  Check,
  MapPin,
  FileText,
  Lock,
  Tag,
  AlertCircle,
  HelpCircle,
  Plus,
  Minus,
  Trash2,
  ThumbsUp,
  Share2,
  Menu,
  X,
  ChevronDown,
  Play,
  Pause,
  Video,
  ZoomIn,
  Eye,
  RefreshCw,
  Sliders,
  Gauge
} from "lucide-react";
import { Product, Order } from "../types";

interface StorefrontViewProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onSwitchToErp: () => void;
  onNavigateToLanding?: () => void;
  onNavigateToLogin?: () => void;
}

interface CartItem {
  product: Product;
  qty: number;
  color: string;
  pattern: string;
  tier: "retail" | "wholesale";
}

export default function StorefrontView({
  products,
  setProducts,
  orders,
  setOrders,
  onSwitchToErp,
  onNavigateToLanding,
  onNavigateToLogin
}: StorefrontViewProps) {
  // --- CORE STOREFRONT NAVIGATION ---
  const [activePage, setActivePage] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isTierMenuOpen, setIsTierMenuOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>("Dhaka Fabrics Ltd.");
  const [selectedCategory, setSelectedCategory] = useState<string>("Jamdani");
  const [selectedBrand, setSelectedBrand] = useState<string>("Rajshahi weavers");
  const [trackingIdInput, setTrackingIdInput] = useState<string>("ORD-9201");
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<Order | null>(orders[0] || null);

  // --- STATE FOR COMMERCE ACTIONS ---
  const [userRole, setUserRole] = useState<"retail" | "boutique" | "wholesaler">("boutique");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["PROD-101", "PROD-104"]);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  
  // Flash Sale Timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- SHOPPING PARAMETERS ---
  const [productColor, setProductColor] = useState<string>("");
  const [productPattern, setProductPattern] = useState<string>("");
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  
  // --- RICH TEXTILE MEDIA INTERACTION STATES ---
  const [richMediaTab, setRichMediaTab] = useState<"image" | "video" | "360deg" | "texture" | "ai">("image");
  const [rotationDegrees, setRotationDegrees] = useState<number>(180);
  const [zoomLensPos, setZoomLensPos] = useState({ x: 50, y: 50 });
  const [isHoveringZoom, setIsHoveringZoom] = useState<boolean>(false);
  const [isPlayingFabricVideo, setIsPlayingFabricVideo] = useState<boolean>(true);
  const [isAnalyzingTextile, setIsAnalyzingTextile] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [textileMagnifyLevel, setTextileMagnifyLevel] = useState<number>(2.5);

  const [shippingForm, setShippingForm] = useState({
    fullName: "Ayesha Rahman",
    email: "ayesha.rahman@boutique.bd",
    phone: "+880 1712 345678",
    address: "House 24, Road 5, Dhanmondi",
    city: "Dhaka",
    postalCode: "1209",
    paymentMethod: "bKash"
  });

  // --- SMART SEARCH & CHAT ENGINE ---
  const [smartSearchQuery, setSmartSearchQuery] = useState<string>("");
  const [aiAssistantChat, setAiAssistantChat] = useState<Array<{ sender: "user" | "bot"; text: string; products?: Product[] }>>([
    { 
      sender: "bot", 
      text: "Shagotom! I am your luxury fabric concierge. I can recommend premium cotton, authentic silk, and hand-loomed Jamdani for boutique scaling. Try asking: 'Show me wedding collection Jamdanis' or 'Recommend high-durability linen for custom tailoring'." 
    }
  ]);
  const [aiInputText, setAiInputText] = useState<string>("");
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Default color setting for detailed view
  useEffect(() => {
    if (selectedProduct) {
      setProductColor(selectedProduct.colors[0] || "Natural");
      setProductPattern(selectedProduct.patterns[0] || "Solid");
      setRichMediaTab("image");
      setRotationDegrees(180);
      setIsHoveringZoom(false);
      setIsPlayingFabricVideo(true);
      setAnalysisResult(null);
    }
  }, [selectedProduct]);

  // --- RICH MEDIA INTERACTIVE OPERATIONS ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const runAiTactileAnalysis = () => {
    if (!selectedProduct) return;
    setIsAnalyzingTextile(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setIsAnalyzingTextile(false);
      const isJamdani = selectedProduct.category.toLowerCase().includes("jamdani");
      const isSilk = selectedProduct.category.toLowerCase().includes("silk");
      if (isJamdani) {
        setAnalysisResult(
          "🧵 THREAD-DENSITY REPORT: Checked warp density 98 threads/inch, weft density 112 threads/inch. Hand-woven using geometric discontinuous weft technique.\n\n" +
          "☁️ SKIN FEEL: Extremely lightweight, breathable cotton base with custom gold zari thread. Feel is light, airy, and crisp. Draping is structural yet highly fluid.\n\n" +
          "🏷️ AUTHENTICITY: 100% verified GI Jamdani loomed in Narayanganj. No synthetic polyester fillers detected."
        );
      } else if (isSilk) {
        setAnalysisResult(
          "🧵 THREAD-DENSITY REPORT: Checked warp density 140 threads/inch, weft 125 threads/inch. Premium Mulberry Silk threads woven into dense satin base.\n\n" +
          "✨ SKIN FEEL: Ultra-smooth, cool-to-touch handfeel with a buttery-soft glide. Luxurious fall drape that beautifully catches light at a dynamic angle.\n\n" +
          "🏷️ AUTHENTICITY: Rajshahi Certified pure mulberry silk weave, tested for thermal insulation & natural organic fibers."
        );
      } else {
        setAnalysisResult(
          "🧵 THREAD-DENSITY REPORT: Checked density 82 threads/inch. Pure organic handloom weave.\n\n" +
          "🍃 SKIN FEEL: High-breathability combed yarn, dry-touch feel with high moisture absorption. Extremely comfortable for all-day humid weather.\n\n" +
          "🏷️ AUTHENTICITY: Loom-mark verified artisan cooperative batch with native natural dyes."
        );
      }
    }, 1200);
  };

  // --- CART OPERATIONS ---
  const addToCart = (product: Product, quantity: number, color: string, pattern: string) => {
    const isWholesale = userRole === "wholesaler" || userRole === "boutique";
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.color === color && item.pattern === pattern
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { 
        product, 
        qty: quantity, 
        color, 
        pattern, 
        tier: isWholesale ? "wholesale" : "retail" 
      }]);
    }
    // Simple flash notice or feedback
    alert(`Added ${quantity} units of ${product.name} to your Shopping Bag!`);
  };

  const updateCartQty = (index: number, newQty: number) => {
    if (newQty <= 0) {
      const updated = cart.filter((_, i) => i !== index);
      setCart(updated);
    } else {
      const updated = [...cart];
      updated[index].qty = newQty;
      setCart(updated);
    }
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      setWishlist(prev => [...prev, productId]);
    }
  };

  // --- PRICE CALCULATOR WITH B2B TIER DISCOUNTS ---
  const getProductPrice = (product: Product) => {
    // Wholesalers get 20% discount on orders
    // Boutique owners get 10% discount
    // Retail customers pay baseline catalog prices
    const base = product.price;
    if (userRole === "wholesaler") return Math.round(base * 0.8);
    if (userRole === "boutique") return Math.round(base * 0.9);
    return base;
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + (getProductPrice(item.product) * item.qty), 0);
  };

  // --- ORDER PLACEMENT FLOW ---
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    // Create central DB Order
    const randomIdNum = Math.floor(9300 + Math.random() * 699);
    const newOrder: Order = {
      id: `ORD-${randomIdNum}`,
      customerName: `${shippingForm.fullName} (${userRole.toUpperCase()} Buyer)`,
      supplierName: cart[0].product.supplierName || "Independent Weaver Hub",
      productName: cart[0].product.name,
      category: cart[0].product.category,
      qty: cart.reduce((acc, item) => acc + item.qty, 0),
      total: getCartTotal() + 150, // subtotal + flat shipping
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      trackingNo: `PATH-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentStatus: shippingForm.paymentMethod === "COD" ? "Unpaid" : "Paid",
      paymentMethod: shippingForm.paymentMethod === "bKash" ? "bKash Premium Wallet" : "SSLCommerz Credit Card",
      shippingAddress: `${shippingForm.address}, ${shippingForm.city}, Zip: ${shippingForm.postalCode}`
    };

    // Add to main ERP DB
    setOrders(prev => [newOrder, ...prev]);
    setSelectedTrackingOrder(newOrder);
    setTrackingIdInput(newOrder.id);
    
    // Clear cart and show confirmation screen
    setCart([]);
    setCheckoutStep(3); // confirmation step
  };

  // --- SMART AI SEARCH AND ASSISTANT REPLY SYSTEM ---
  const triggerSmartSearch = (query: string) => {
    setSmartSearchQuery(query);
    setActivePage("search");
  };

  const handleAiAssistantSend = () => {
    if (!aiInputText.trim()) return;

    const userMessage = aiInputText;
    setAiAssistantChat(prev => [...prev, { sender: "user", text: userMessage }]);
    setAiInputText("");
    setIsAiTyping(true);

    // Dynamic pattern matching for luxury concierge replies
    setTimeout(() => {
      let responseText = "";
      let recommended: Product[] = [];

      const query = userMessage.toLowerCase();
      if (query.includes("jamdani") || query.includes("wedding") || query.includes("saree")) {
        responseText = "Our weavers in Narayanganj just uploaded fresh threads. I highly recommend the Premium Jamdani Sharee or Banarasi Georgette collection, crafted with pure gold zari. They carry traditional geometric motifs perfect for premium catalogs.";
        recommended = products.filter(p => p.category === "Jamdani" || p.category === "Silk");
      } else if (query.includes("cotton") || query.includes("summer") || query.includes("breathable")) {
        responseText = "For warm summers, our pure Cotton Voile and Rajshahi Silk provide excellent breathability. Wholesalers are currently bulk-sourcing the Eid Special Cotton 3 Piece because of its high consumer demand.";
        recommended = products.filter(p => p.category === "Cotton");
      } else if (query.includes("linen") || query.includes("shirt")) {
        responseText = "I've matched Pure Linen Shirting Fabric from Cotton World. It is Belgian-grade, fine slub texture, ideal for high-end boutique shirts.";
        recommended = products.filter(p => p.category === "Linen");
      } else if (query.includes("discount") || query.includes("cheap") || query.includes("b2b")) {
        responseText = `As a registered ${userRole.toUpperCase()}, you currently receive special trade pricing! Wholesalers receive 20% off all catalog inventory, and Boutique owners get 10%. Here are the best catalog margins:`;
        recommended = products;
      } else {
        responseText = "I scanned our weaver directory. Based on current textile indicators in Dhaka, our handloom silk and premium block-printed voiles have the highest search trends this week. Explore our verified weavers catalog:";
        recommended = products.slice(0, 3);
      }

      setAiAssistantChat(prev => [...prev, { 
        sender: "bot", 
        text: responseText,
        products: recommended
      }]);
      setIsAiTyping(false);
    }, 1100);
  };

  // Filtered lists for various storefront pages
  const flashSaleProducts = products.filter(p => p.price > 4000); // expensive ones are promotional flash deals
  const normalProducts = products.filter(p => p.status === "Approved");

  return (
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- STICKY STAGE DEVIATOR FOR FAST AUDITING (Point 15-pages checking) --- */}
      <div className="bg-[#0b0c16] border-b border-indigo-500/25 px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 z-40">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping shrink-0" />
          <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-400 uppercase">
            Storefront Stage Controller (15 requested views)
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "home", label: "1. Home" },
            { id: "listing", label: "2. Shop Products" },
            { id: "details", label: "3. Details Spec" },
            { id: "search", label: "4. AI Smart Search" },
            { id: "cart", label: "5. Cart Bag" },
            { id: "checkout", label: "6. Secure Checkout" },
            { id: "dashboard", label: "7. Customer Portal" },
            { id: "tracking", label: "8. Order Track" },
            { id: "wishlist", label: "9. Wishlist" },
            { id: "assistant", label: "10. AI Assistant" },
            { id: "supplier", label: "11. Supplier Store" },
            { id: "category", label: "12. Category Page" },
            { id: "brand", label: "13. Brand Heritage" },
            { id: "flash", label: "14. Flash Sale" },
            { id: "recommendations", label: "15. Recommendation Feed" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => {
                if (v.id === "assistant") {
                  setIsAiAssistantOpen(true);
                } else {
                  setActivePage(v.id);
                  if (v.id === "details" && !selectedProduct) {
                    setSelectedProduct(products[0]);
                  }
                }
              }}
              className={`px-2 py-1 rounded text-[9px] font-mono font-bold transition-all ${
                (activePage === v.id || (v.id === "assistant" && isAiAssistantOpen))
                  ? "bg-indigo-600 text-white border border-indigo-400" 
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        
        {/* Toggle back to Backoffice */}
        <button
          onClick={onSwitchToErp}
          className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-md border border-emerald-400/30 transition-all flex items-center gap-1.5"
        >
          <span>🛠️ Admin Backoffice</span>
          <ArrowRight size={10} />
        </button>
      </div>

      {/* --- ELITE DOUBLE-DECK UTILITY & NAVIGATION SYSTEM --- */}
      {/* 1. TOP UTILITY STRIP (Trade & Sourcing Tiers) */}
      <div className="bg-[#090a10] border-b border-slate-800/60 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 z-35 text-[11px] text-slate-300 font-sans tracking-wide">
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="inline-flex items-center justify-center bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest mr-1.5">Heritage Certified</span>
          <span className="truncate">✨ Direct artisan loom-to-boutique commercial trading hub.</span>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          {/* USER TIER SELECTOR DROP-DOWN (Highly polished, space saving) */}
          <div className="relative">
            <button 
              onClick={() => setIsTierMenuOpen(!isTierMenuOpen)}
              className="flex items-center space-x-1.5 hover:text-white transition-all py-1 px-2.5 bg-slate-950 border border-slate-800 rounded-lg hover:border-slate-700"
              title="Change trade volume pricing tier"
            >
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">Trade Level:</span>
              <span className="text-[10px] font-bold text-slate-200 capitalize">
                {userRole === "retail" ? "Retail Buyer" : userRole === "boutique" ? "Boutique Owner (10% Off)" : "Wholesaler (20% Off)"}
              </span>
              <ChevronDown size={11} className={`text-slate-400 transition-transform duration-200 ${isTierMenuOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isTierMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsTierMenuOpen(false)} />
                <div className="absolute right-0 mt-1.5 w-60 bg-[#0c0d14] border border-slate-800/95 rounded-xl shadow-2xl py-2 z-50 animate-fade-in text-left">
                  <div className="px-3.5 py-1.5 text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase border-b border-slate-800/60 pb-1.5 mb-1.5">
                    Configure B2B Catalog Tiers
                  </div>
                  {[
                    { id: "retail", label: "Retail Standard Price", discount: "Default consumer catalogs" },
                    { id: "boutique", label: "Boutique Proprietor", discount: "10% off automatically applied" },
                    { id: "wholesaler", label: "Wholesale Merchant", discount: "20% off high-volume trade orders" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setUserRole(opt.id as any);
                        setIsTierMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-[11px] transition-all flex flex-col gap-0.5 ${
                        userRole === opt.id 
                          ? "bg-indigo-600/15 text-indigo-300 border-l-2 border-indigo-500" 
                          : "text-slate-300 hover:bg-slate-900 hover:text-white border-l-2 border-transparent"
                      }`}
                    >
                      <span className="font-bold">{opt.label}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{opt.discount}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Back to SaaS Platform Landing */}
          {onNavigateToLanding && (
            <button 
              onClick={onNavigateToLanding}
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-all flex items-center space-x-1.5 hover:underline border-l border-slate-800 pl-4 py-0.5"
            >
              <span>🏛️ SaaS Landing</span>
            </button>
          )}

          {/* Quick login entrance */}
          {onNavigateToLogin && (
            <button 
              onClick={onNavigateToLogin}
              className="text-[10px] font-bold text-teal-400 hover:text-teal-300 transition-all flex items-center space-x-1.5 hover:underline border-l border-slate-800 pl-4 py-0.5"
            >
              <span>🔑 Login Portal</span>
            </button>
          )}

          {/* Quick link back to the Admin Backoffice */}
          <button 
            onClick={onSwitchToErp}
            className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-all flex items-center space-x-1 hover:underline border-l border-slate-800 pl-4 py-0.5"
          >
            <span>🛠️ Backoffice</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* 2. PRIMARY LUXURY NAVIGATION & BRANDING HEADER */}
      <header className="sticky top-0 z-30 bg-[#050507]/95 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          {/* Logo Mark */}
          <button 
            onClick={() => setActivePage("home")} 
            className="flex flex-col items-start text-left group"
          >
            <span className="text-xl md:text-2xl font-sans tracking-[-0.05em] font-black uppercase text-white group-hover:text-indigo-400 transition-colors">
              FABRIC<span className="text-indigo-500 font-serif italic font-medium tracking-normal lowercase">flow</span>
            </span>
            <span className="text-[7px] tracking-[0.25em] font-mono font-bold text-slate-500 uppercase mt-0.5">
              dhaka luxury heritage
            </span>
          </button>

          {/* Luxury menu (Centered/Left on large screen) */}
          <nav className="hidden lg:flex items-center space-x-6 text-[11px] font-bold tracking-[0.12em] uppercase text-slate-400">
            <button 
              onClick={() => setActivePage("home")} 
              className={`hover:text-white transition-colors relative py-1 ${activePage === "home" ? "text-white" : ""}`}
            >
              Collection
              {activePage === "home" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
            </button>
            <button 
              onClick={() => { setActivePage("category"); setSelectedCategory("Jamdani"); }} 
              className={`hover:text-white transition-colors relative py-1 ${activePage === "category" && selectedCategory === "Jamdani" ? "text-white" : ""}`}
            >
              Jamdani
              {activePage === "category" && selectedCategory === "Jamdani" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
            </button>
            <button 
              onClick={() => { setActivePage("category"); setSelectedCategory("Silk"); }} 
              className={`hover:text-white transition-colors relative py-1 ${activePage === "category" && selectedCategory === "Silk" ? "text-white" : ""}`}
            >
              Rajshahi Silk
              {activePage === "category" && selectedCategory === "Silk" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
            </button>
            <button 
              onClick={() => setActivePage("flash")} 
              className={`hover:text-rose-400 transition-colors flex items-center gap-1.5 relative py-1 ${activePage === "flash" ? "text-rose-400" : ""}`}
            >
              <Flame size={12} className="text-rose-500 animate-pulse" />
              <span>Flash Sale</span>
              {activePage === "flash" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 rounded-full" />}
            </button>
            <button 
              onClick={() => setActivePage("recommendations")} 
              className={`hover:text-indigo-400 transition-colors flex items-center gap-1.5 relative py-1 ${activePage === "recommendations" ? "text-indigo-400" : ""}`}
            >
              <Sparkles size={12} className="text-indigo-400" />
              <span>AI Tailored</span>
              {activePage === "recommendations" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full" />}
            </button>
          </nav>
        </div>

        {/* Global actions and search */}
        <div className="flex items-center space-x-3 md:space-x-4">
          
          {/* AI Intelligent Search Box in Header */}
          <div className="relative hidden md:block w-52 lg:w-60">
            <input 
              type="text" 
              placeholder="Ask concierge (e.g. Silk)..." 
              value={smartSearchQuery}
              onChange={(e) => setSmartSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") triggerSmartSearch(smartSearchQuery);
              }}
              className="w-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 transition-all"
            />
            <Search size={13} className="absolute left-3.5 top-3 text-slate-500" />
            <button 
              onClick={() => triggerSmartSearch(smartSearchQuery || "Show premium sarees")}
              className="absolute right-3 top-2.5 text-indigo-400 hover:text-indigo-300 transition-colors"
              title="AI Cognitive Search"
            >
              <Sparkles size={12} className="animate-pulse" />
            </button>
          </div>

          {/* User Shopper Icons Row */}
          <div className="flex items-center space-x-1.5">
            {/* Wishlist badge */}
            <button 
              onClick={() => setActivePage("wishlist")} 
              className={`p-2 rounded-full relative text-slate-400 hover:text-white transition-colors ${activePage === "wishlist" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/25" : "bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60"}`}
              title="My Wishlist"
            >
              <Heart size={14} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart badge */}
            <button 
              onClick={() => setActivePage("cart")} 
              className={`p-2 rounded-full relative text-slate-400 hover:text-white transition-colors ${activePage === "cart" ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/25" : "bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60"}`}
              title="Shopping Bag"
            >
              <ShoppingCart size={14} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono">
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </button>

            {/* Customer Dashboard icon */}
            <button 
              onClick={() => setActivePage("dashboard")} 
              className={`p-2 rounded-full text-slate-400 hover:text-white transition-colors ${activePage === "dashboard" ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/25" : "bg-slate-900/60 hover:bg-slate-900 border border-slate-800/60"}`}
              title="Customer Profile & Track Orders"
            >
              <User size={14} />
            </button>
          </div>

          {/* AI Shopping assistant drawer trigger */}
          <button 
            onClick={() => setIsAiAssistantOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all hover:scale-102 flex items-center space-x-1.5 border border-indigo-500/25"
          >
            <Bot size={14} className="text-indigo-200" />
            <span className="hidden sm:inline">Concierge</span>
          </button>

          {/* MOBILE NAVIGATION BURGER MENU BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 bg-slate-900/60 border border-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
            title="Open Menu"
          >
            {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>

        {/* --- MOBILE COLLAPSIBLE NAVIGATION DRAWER OVERLAY --- */}
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 top-[110px] sm:top-[74px] bg-black/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="absolute top-full left-0 w-full bg-[#08080c] border-b border-slate-800 shadow-2xl p-6 z-50 lg:hidden animate-slide-down space-y-6">
              
              {/* Mobile Search Input */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search via AI Concierge..." 
                  value={smartSearchQuery}
                  onChange={(e) => setSmartSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      triggerSmartSearch(smartSearchQuery);
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-9 pr-10 text-xs text-white"
                />
                <Search size={14} className="absolute left-3.5 top-3.5 text-slate-500" />
                <button 
                  onClick={() => {
                    triggerSmartSearch(smartSearchQuery || "Sarees");
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-3.5 top-3 text-indigo-400"
                >
                  <Sparkles size={13} />
                </button>
              </div>

              {/* Main links */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <button 
                  onClick={() => { setActivePage("home"); setIsMobileMenuOpen(false); }} 
                  className={`p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider ${activePage === "home" ? "border-indigo-500/50 text-white bg-indigo-500/5" : "text-slate-400"}`}
                >
                  Collections
                </button>
                <button 
                  onClick={() => { setActivePage("category"); setSelectedCategory("Jamdani"); setIsMobileMenuOpen(false); }} 
                  className={`p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider ${activePage === "category" && selectedCategory === "Jamdani" ? "border-indigo-500/50 text-white bg-indigo-500/5" : "text-slate-400"}`}
                >
                  Jamdani
                </button>
                <button 
                  onClick={() => { setActivePage("category"); setSelectedCategory("Silk"); setIsMobileMenuOpen(false); }} 
                  className={`p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider ${activePage === "category" && selectedCategory === "Silk" ? "border-indigo-500/50 text-white bg-indigo-500/5" : "text-slate-400"}`}
                >
                  Rajshahi Silk
                </button>
                <button 
                  onClick={() => { setActivePage("flash"); setIsMobileMenuOpen(false); }} 
                  className={`p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${activePage === "flash" ? "border-rose-500/50 text-rose-400 bg-rose-500/5" : "text-slate-400"}`}
                >
                  <Flame size={12} className="text-rose-500" />
                  <span>Flash Sale</span>
                </button>
                <button 
                  onClick={() => { setActivePage("recommendations"); setIsMobileMenuOpen(false); }} 
                  className={`p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider col-span-2 flex items-center justify-center gap-1.5 ${activePage === "recommendations" ? "border-indigo-500/50 text-indigo-300 bg-indigo-500/5" : "text-slate-400"}`}
                >
                  <Sparkles size={12} className="text-indigo-400" />
                  <span>AI Tailored Feed</span>
                </button>
              </div>

              {/* Utility shortcuts */}
              <div className="border-t border-slate-800/85 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Configure Sourcing:</span>
                <button 
                  onClick={() => { setIsTierMenuOpen(true); setIsMobileMenuOpen(false); }} 
                  className="font-bold text-indigo-400 underline"
                >
                  Change Sourcing Tier
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* --- MAIN PAGE ROUTER & DISPATCHER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* ==========================================
            1. HOME PAGE VIEW
            ========================================== */}
        {activePage === "home" && (
          <div className="space-y-12 animate-fade-in">
            {/* Elegant Hero Banner (Zara / Apple inspired) */}
            <div className="relative bg-black rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl min-h-[460px] flex items-center p-8 md:p-12 lg:p-16">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity hover:opacity-50 transition-opacity duration-1000"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
              
              <div className="relative max-w-xl space-y-6 z-10">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold font-mono tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                  Loom-Fresh Authentic Heritage
                </span>
                
                <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                  Premium B2B Fabric Sourcing. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Directly From Loom.</span>
                </h1>
                
                <p className="text-sm text-slate-400 leading-relaxed font-sans">
                  Connect directly with verified weavers from Narayanganj, Rajshahi, and Tangail. Standardized quality catalogs, smart trade escrow pricing, and nationwide Pathao B2B fulfillment tracking.
                </p>

                <div className="flex items-center gap-3.5 pt-2">
                  <button 
                    onClick={() => setActivePage("listing")}
                    className="px-6 py-3 bg-white text-black hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>Browse Loom Catalog</span>
                    <ArrowRight size={13} />
                  </button>
                  <button 
                    onClick={() => setActivePage("flash")}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Flame size={13} className="text-rose-500" />
                    <span>Monsoon Flash Deals</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Overlay Stat Widget */}
              <div className="absolute bottom-6 right-6 hidden xl:block bg-slate-900/90 border border-slate-800 p-4 rounded-xl max-w-xs backdrop-blur-md">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-800 mb-2">
                  <ShieldCheck size={14} className="text-teal-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">FabricFlow Verification</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  All listed weavers carry the **Heritage Registry Mark**. 100% genuine threads with bKash business escrow protection.
                </p>
              </div>
            </div>

            {/* CURATED GRID CATEGORIES (Point 12) */}
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-display font-extrabold text-white">Curated Collection Hubs</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Explore specific thread structures, thread counts, and weave regions.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: "Jamdani", desc: "Traditional geometric luxury from Narayanganj weavers", count: "45 designs", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400", tags: ["Zari motifs", "Cotton-silk"] },
                  { name: "Silk", desc: "Hand-reeled pure Mulberry silk from Rajshahi hubs", count: "18 designs", img: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=400", tags: ["Mulberry grade", "Natural glow"] },
                  { name: "Cotton", desc: "Highly breathable handlooms from Tangail and Sirajganj", count: "120 designs", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400", tags: ["Voile cotton", "Block prints"] },
                  { name: "Linen", desc: "Fine textured linen fabrics imported for bespoke tailor boutiques", count: "24 designs", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=400", tags: ["Fine slub", "Highly absorbable"] },
                ].map((cat) => (
                  <div 
                    key={cat.name} 
                    onClick={() => { setSelectedCategory(cat.name); setActivePage("category"); }}
                    className="group relative h-72 rounded-xl overflow-hidden border border-slate-800 bg-slate-900/40 cursor-pointer shadow-lg hover:border-indigo-500/30 transition-all flex flex-col justify-end p-5"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" 
                      style={{ backgroundImage: `url('${cat.img}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="relative space-y-2 z-10">
                      <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">{cat.count}</span>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-indigo-300 transition-colors">{cat.name} Collection</h3>
                      <p className="text-[10px] text-slate-400 leading-normal">{cat.desc}</p>
                      
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cat.tags.map(t => (
                          <span key={t} className="text-[8px] font-mono text-slate-500 bg-[#09090c] px-1.5 py-0.5 rounded border border-slate-800/80">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MONSOON FLASH SALE BANNER SHROUD (Point 14) */}
            <div className="bg-gradient-to-r from-rose-950/20 via-slate-900/60 to-rose-950/10 border border-rose-500/20 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase flex items-center gap-1">
                    <Flame size={10} /> Live Flash Deals
                  </span>
                  <span className="text-xs text-rose-300 font-medium">Limited Quantity Left</span>
                </div>
                <h3 className="text-lg font-display font-extrabold text-white">Weaver Clearance Event: Gold Zari Georgettess</h3>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  Genuine Banarasi and heavy woven silk drapes slashed up to 25% to release liquidity for Narayanganj looms before next winter schedules.
                </p>
              </div>

              {/* Live Countdown Clock */}
              <div className="flex items-center gap-4.5">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold">
                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-center w-12 shadow">
                    <span className="text-sm text-white block font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 block">HRS</span>
                  </div>
                  <span className="text-slate-600">:</span>
                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-center w-12 shadow">
                    <span className="text-sm text-white block font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 block">MIN</span>
                  </div>
                  <span className="text-slate-600">:</span>
                  <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-center w-12 shadow">
                    <span className="text-sm text-rose-400 block font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] uppercase tracking-widest text-slate-500 block">SEC</span>
                  </div>
                </div>

                <button 
                  onClick={() => setActivePage("flash")}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg"
                >
                  Enter Flash Arena
                </button>
              </div>
            </div>

            {/* RECOMMENDATIONS HEADER SHIELD (Point 15) */}
            <div className="space-y-4">
              <div className="flex items-end justify-between border-b border-slate-800/60 pb-3">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-indigo-400 font-bold font-mono uppercase tracking-wider">
                    <Sparkles size={13} />
                    <span>Autonomous AI Recommendation Feed</span>
                  </div>
                  <h2 className="text-xl font-display font-extrabold text-white mt-1">Deep Personalized Curates</h2>
                </div>
                <button 
                  onClick={() => setActivePage("recommendations")}
                  className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
                >
                  <span>Explore algorithm parameters</span>
                  <ChevronRight size={12} />
                </button>
              </div>

              {/* Horizontal recommendations cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id}
                    className="border border-slate-800/80 bg-slate-900/30 rounded-xl overflow-hidden shadow group hover:border-slate-700 transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-950">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-indigo-600/95 text-white text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {Math.floor(92 + Math.random() * 7)}% AI Match
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                        className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-900 rounded-full text-slate-300 hover:text-rose-500 border border-slate-800 transition-colors"
                      >
                        <Heart size={12} className={wishlist.includes(prod.id) ? "fill-rose-500 text-rose-500" : ""} />
                      </button>
                    </div>

                    <div className="p-4 space-y-2">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block">{prod.category} • {prod.supplierName}</span>
                      <h4 
                        onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                        className="font-display font-bold text-xs text-slate-200 hover:text-indigo-400 transition-colors cursor-pointer truncate"
                      >
                        {prod.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 leading-normal">{prod.description}</p>
                      
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800/40">
                        <div>
                          <span className="text-[8px] text-slate-500 block uppercase font-bold font-mono">B2B Tier Price</span>
                          <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        </div>
                        <button 
                          onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                          className="p-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-colors border border-indigo-500/10 text-[10px]"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REGISTERED WEAVER BRANDS HIGHLIGHT (Point 13) */}
            <div className="space-y-4 pt-4">
              <div className="border-t border-slate-800/80 pt-6">
                <h2 className="text-xl font-display font-extrabold text-white">Authentic Handloom Brand Partners</h2>
                <p className="text-xs text-slate-500 mt-0.5">Explore historic weaver families who have maintained legacy handlooms for generations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Rajshahi Mulberry weavers", slogan: "Royal silk reeling since 1952", location: "Sardah Hub, Rajshahi", trust: "Verified Heritage", count: 18, image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=300" },
                  { name: "Narayanganj Jamdani Guild", slogan: "Geometrical UNESCO craftsmanship", location: "Narayanganj Looms", trust: "Geographical Indication (GI) Verified", count: 45, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300" },
                  { name: "Tangail Cotton Handlooms", slogan: "Highly breathable daily comfort wear", location: "Tangail Weaver cluster", trust: "Loom-mark certified", count: 120, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300" }
                ].map((brand) => (
                  <div 
                    key={brand.name}
                    onClick={() => { setSelectedBrand(brand.name); setActivePage("brand"); }}
                    className="p-5 border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 rounded-xl hover:border-slate-700 cursor-pointer transition-all flex space-x-4 items-center"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                      <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="text-[8px] font-bold font-mono tracking-wider text-teal-400 uppercase bg-teal-500/10 px-1.5 py-0.5 rounded">{brand.trust}</span>
                      <h4 className="font-display font-bold text-xs text-white truncate">{brand.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{brand.slogan}</p>
                      <span className="text-[9px] font-mono text-slate-500 block">{brand.location} • {brand.count} looms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            2. PRODUCT LISTING PAGE VIEW
            ========================================== */}
        {activePage === "listing" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/60 pb-4 gap-4">
              <div>
                <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Enterprise Loom Catalog</h1>
                <p className="text-xs text-slate-400 mt-0.5">Explore authentic sarees and fabric yards straight from Narayanganj & Rajshahi.</p>
              </div>

              {/* Fast categorization filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">Category:</span>
                {["All", "Jamdani", "Silk", "Cotton", "Linen"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (cat === "All") {
                        setSelectedCategory("All");
                      } else {
                        setSelectedCategory(cat);
                        setActivePage("category");
                      }
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      (selectedCategory === cat || (cat === "All" && selectedCategory === "All"))
                        ? "bg-indigo-600 border-indigo-500 text-white" 
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {products.map((prod) => (
                <div 
                  key={prod.id} 
                  className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg group flex flex-col justify-between"
                >
                  <div className="relative aspect-square bg-slate-950 overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono font-black tracking-wider bg-slate-900/90 text-white border border-slate-800 uppercase">
                        {prod.id}
                      </span>
                      {prod.price > 10000 && (
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono font-black tracking-wider bg-rose-600/95 text-white uppercase">
                          Luxury Grade
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-slate-900 rounded-full text-slate-300 hover:text-rose-500 border border-slate-800 transition-colors"
                    >
                      <Heart size={14} className={wishlist.includes(prod.id) ? "fill-rose-500 text-rose-500" : ""} />
                    </button>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                        <span>{prod.category}</span>
                        <button 
                          onClick={() => { setSelectedSupplier(prod.supplierName); setActivePage("supplier"); }}
                          className="hover:text-indigo-400 font-bold underline cursor-pointer"
                        >
                          {prod.supplierName}
                        </button>
                      </div>
                      
                      <h3 
                        onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                        className="font-display font-bold text-sm text-slate-100 hover:text-indigo-400 cursor-pointer mt-1 leading-snug"
                      >
                        {prod.name}
                      </h3>
                      
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">{prod.description}</p>
                    </div>

                    <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] text-slate-500 uppercase block font-bold font-mono">B2B Trade Pricing</span>
                        <span className="text-sm font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        {userRole !== "retail" && (
                          <span className="text-[8px] text-emerald-400 block font-mono">Retail: BDT {prod.price.toLocaleString()}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <span>Specifications</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            3. PRODUCT DETAILS PAGE VIEW
            ========================================== */}
        {activePage === "details" && selectedProduct && (
          <div className="space-y-8 animate-fade-in">
            {/* Back to listings shortcut */}
            <button 
              onClick={() => setActivePage("listing")} 
              className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white font-semibold transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Loom Catalog</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Premium immersive rich media and tactile workspace */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* --- MEDIA TABS BAR --- */}
                <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider text-center">
                  {[
                    { id: "image", label: "Photo", icon: Eye },
                    { id: "video", label: "Video", icon: Video },
                    { id: "360deg", label: "360°", icon: RefreshCw },
                    { id: "texture", label: "Zoom", icon: ZoomIn },
                    { id: "ai", label: "Tactile AI", icon: Sparkles }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setRichMediaTab(tab.id as any)}
                        className={`py-2 px-1.5 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                          richMediaTab === tab.id
                            ? "bg-indigo-600/15 text-indigo-400 border border-indigo-500/25 shadow-lg"
                            : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/50"
                        }`}
                      >
                        <TabIcon size={12} className={richMediaTab === tab.id ? "text-indigo-400" : ""} />
                        <span className="hidden sm:inline text-[9px]">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* --- MEDIA VIEWER CANVAS CONTAINER --- */}
                <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative group shadow-2xl flex flex-col justify-between">
                  
                  {/* Floating Identifier */}
                  <div className="absolute top-4 left-4 z-20 bg-slate-900/90 border border-slate-800/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 flex items-center space-x-1.5 shadow-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Loom Code: {selectedProduct.id}</span>
                  </div>

                  {/* 1. PHOTO VIEW (Standard elegant visualization) */}
                  {richMediaTab === "image" && (
                    <div className="w-full h-full relative">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                        <p className="text-[10px] text-slate-300 font-mono">Premium master weaver photography cluster</p>
                      </div>
                    </div>
                  )}

                  {/* 2. DYNAMIC VIDEO WALKTHROUGH (Simulates loom operation & fabric drape motion) */}
                  {richMediaTab === "video" && (
                    <div className="w-full h-full bg-[#030305] relative flex flex-col justify-between p-4 overflow-hidden">
                      {/* Interactive scanning / pulsing effect */}
                      <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: `url(${selectedProduct.image})` }} />
                      
                      {/* Simulated continuous loom shuttle & weft warp action */}
                      {isPlayingFabricVideo ? (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-[pulse_3s_infinite] pointer-events-none" />
                      ) : null}

                      {/* Video graphic card details overlay */}
                      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center px-4 space-y-3">
                        <div className={`p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-full ${isPlayingFabricVideo ? "animate-pulse" : ""}`}>
                          <Video size={28} className="text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white tracking-wide">Live Loom Walkthrough Loop</h4>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                            {isPlayingFabricVideo 
                              ? "🔴 Currently broadcasting loom #4 in Jamdani Craft Cluster, Rupganj. High density cotton threads active." 
                              : "⏸️ Video walkthrough paused."
                            }
                          </p>
                        </div>

                        {/* Interactive loom audio simulator */}
                        <div className="py-1 px-3.5 bg-slate-900/90 border border-slate-800 rounded-lg text-[9px] font-mono text-teal-400 flex items-center space-x-1.5">
                          <span className="relative flex h-2 w-2">
                            {isPlayingFabricVideo && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlayingFabricVideo ? "bg-teal-500" : "bg-slate-700"}`}></span>
                          </span>
                          <span>{isPlayingFabricVideo ? "Audio Active: Rhythmic Shuttle Click" : "Audio Muted"}</span>
                        </div>
                      </div>

                      {/* Video control bottom bar */}
                      <div className="relative z-10 bg-slate-950/90 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between mt-auto">
                        <button 
                          onClick={() => setIsPlayingFabricVideo(!isPlayingFabricVideo)}
                          className="p-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors"
                        >
                          {isPlayingFabricVideo ? <Pause size={12} /> : <Play size={12} />}
                        </button>
                        
                        {/* Fake Seek bar */}
                        <div className="flex-1 mx-3 h-1 bg-slate-800 rounded-full overflow-hidden relative">
                          <div 
                            className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: isPlayingFabricVideo ? "78%" : "32%" }}
                          />
                        </div>

                        <span className="text-[9px] font-mono text-slate-400">0:14 / 0:30</span>
                      </div>
                    </div>
                  )}

                  {/* 3. 360° ROTATE SHEEN SIMULATOR (Drag / slider control for zari reflections) */}
                  {richMediaTab === "360deg" && (
                    <div className="w-full h-full bg-slate-950 relative flex flex-col justify-between p-6">
                      <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                        <div className="w-full h-full rounded-full border border-indigo-500/10 animate-[spin_40s_linear_infinite] absolute" />
                        <div className="w-4/5 h-4/5 rounded-full border border-slate-800/50 absolute" />
                      </div>

                      {/* Saree/Fabric graphic simulated based on angle of rotation */}
                      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                        <div 
                          className="w-56 h-56 rounded-2xl overflow-hidden border border-slate-800/60 shadow-inner relative transition-transform duration-300"
                          style={{ 
                            transform: `rotate(${rotationDegrees}deg)`,
                          }}
                        >
                          <img 
                            src={selectedProduct.image} 
                            alt="360 rotation" 
                            className="w-full h-full object-cover select-none"
                            referrerPolicy="no-referrer"
                          />
                          {/* Reflective light layer (simulating golden zari threads shining on handloom fabrics) */}
                          <div 
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-400/15 to-transparent pointer-events-none transition-all duration-300"
                            style={{
                              transform: `translateX(${(rotationDegrees - 180) / 2}px)`,
                              opacity: Math.max(0.1, Math.min(0.6, Math.sin(rotationDegrees * Math.PI / 180)))
                            }}
                          />
                        </div>

                        <div className="text-center mt-3.5 space-y-1 z-10">
                          <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                            <RefreshCw size={11} className="text-indigo-400 animate-spin-slow" />
                            <span>Angle: {rotationDegrees}° Sunlight Reflection</span>
                          </p>
                          <p className="text-[9px] text-slate-500">Rotate to witness warp & gold zari thread refraction</p>
                        </div>
                      </div>

                      {/* Degree Interactive Slider */}
                      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800/60 p-3 rounded-xl z-10">
                        <div className="flex justify-between text-[9px] font-mono text-slate-400">
                          <span>Left Loom (0°)</span>
                          <span className="text-amber-400 font-bold">Front drape (180°)</span>
                          <span>Right Loom (360°)</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="360"
                          value={rotationDegrees}
                          onChange={(e) => setRotationDegrees(Number(e.target.value))}
                          className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* 4. FABRIC TEXTURE ZOOM (Interactive magnifier lens) */}
                  {richMediaTab === "texture" && (
                    <div className="w-full h-full bg-[#050507] relative flex flex-col justify-between overflow-hidden">
                      {/* Zoom Region */}
                      <div 
                        className="flex-1 w-full h-full relative cursor-crosshair overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onTouchMove={(e) => {
                          if (e.touches[0]) {
                            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                            const x = ((e.touches[0].clientX - left) / width) * 100;
                            const y = ((e.touches[0].clientY - top) / height) * 100;
                            setZoomLensPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
                          }
                        }}
                        onMouseEnter={() => setIsHoveringZoom(true)}
                        onMouseLeave={() => setIsHoveringZoom(false)}
                      >
                        {/* Standard closeup display */}
                        <img 
                          src={
                            selectedProduct.category.toLowerCase().includes("jamdani") 
                              ? "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                              : selectedProduct.category.toLowerCase().includes("silk")
                              ? "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
                              : "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800"
                          } 
                          alt="closeup fabric" 
                          className="w-full h-full object-cover opacity-80 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />

                        {/* Guide Overlay when not hovering */}
                        {!isHoveringZoom && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-center p-6 space-y-2 pointer-events-none animate-fade-in">
                            <ZoomIn size={24} className="text-indigo-400 animate-pulse" />
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Tactile Micro-Zoom Area</h4>
                            <p className="text-[10px] text-slate-400 max-w-xs">
                              Hover your cursor or slide your finger across the fabric to zoom in on individual thread clusters and examine weavers count.
                            </p>
                          </div>
                        )}

                        {/* Magnifying Glass Lens */}
                        {isHoveringZoom && (
                          <div 
                            className="absolute w-44 h-44 rounded-full border-2 border-indigo-500 shadow-2xl pointer-events-none overflow-hidden bg-[#0c0c14]"
                            style={{
                              left: `calc(${zoomLensPos.x}% - 88px)`,
                              top: `calc(${zoomLensPos.y}% - 88px)`,
                            }}
                          >
                            <div 
                              className="w-full h-full scale-[1.05]"
                              style={{
                                backgroundImage: `url(${
                                  selectedProduct.category.toLowerCase().includes("jamdani") 
                                    ? "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800"
                                    : selectedProduct.category.toLowerCase().includes("silk")
                                    ? "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
                                    : "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=800"
                                })`,
                                backgroundPosition: `${zoomLensPos.x}% ${zoomLensPos.y}%`,
                                backgroundSize: `${textileMagnifyLevel * 100}%`,
                                backgroundRepeat: "no-repeat"
                              }}
                            />
                            {/* Weaver count hairline grid */}
                            <div className="absolute inset-0 border border-indigo-500/10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
                          </div>
                        )}
                      </div>

                      {/* Lens Zoom Power Settings */}
                      <div className="p-3 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Weaver Microscope Resolution:</span>
                        <div className="flex items-center space-x-1">
                          {[2, 3, 4, 5].map((lvl) => (
                            <button
                              key={lvl}
                              onClick={() => setTextileMagnifyLevel(lvl)}
                              className={`w-7 h-6 rounded text-[10px] font-mono font-black border transition-all ${
                                textileMagnifyLevel === lvl 
                                  ? "bg-indigo-600 border-indigo-500 text-white" 
                                  : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              }`}
                            >
                              {lvl}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. AI FABRIC EXPLANATION & COGNITIVE SCANNER */}
                  {richMediaTab === "ai" && (
                    <div className="w-full h-full bg-[#040406] p-5 flex flex-col justify-between overflow-y-auto space-y-4">
                      
                      {/* Interactive Sweeping Laser Scan Area */}
                      <div className="relative h-28 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden shrink-0 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none" style={{ backgroundImage: `url(${selectedProduct.image})` }} />
                        
                        {/* Horizontal scanning laser */}
                        {isAnalyzingTextile && (
                          <div className="absolute left-0 w-full h-1 bg-indigo-500 shadow-lg shadow-indigo-500/80 animate-[bounce_1.5s_infinite] z-10" />
                        )}

                        <div className="text-center relative z-10 space-y-1.5">
                          <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Cognitive Thread Analyzer</h4>
                          <p className="text-[9px] text-slate-500">Decodes weight, fiber stiffness, skin-friendliness, and loom authenticity index.</p>
                          
                          {!analysisResult && !isAnalyzingTextile && (
                            <button
                              onClick={runAiTactileAnalysis}
                              className="mt-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-mono font-bold rounded-lg transition-all hover:scale-103"
                            >
                              🚀 Click to Scan Fabric Feel
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Display analysis feedback or simple loom metrics */}
                      <div className="flex-1 bg-slate-950/60 border border-slate-900 rounded-xl p-4 min-h-0 overflow-y-auto">
                        {isAnalyzingTextile && (
                          <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-4">
                            <Sliders size={18} className="text-indigo-400 animate-spin" />
                            <span className="text-[10px] font-mono text-indigo-300 animate-pulse uppercase font-semibold">Running tactile algorithms on weavers warp...</span>
                          </div>
                        )}

                        {!isAnalyzingTextile && !analysisResult && (
                          <div className="h-full flex flex-col items-center justify-center text-center space-y-2 py-4 text-slate-500">
                            <Gauge size={16} />
                            <span className="text-[10px] font-mono">Sensory database ready. Launch scan above.</span>
                          </div>
                        )}

                        {!isAnalyzingTextile && analysisResult && (
                          <div className="text-[11px] text-slate-300 leading-relaxed font-sans space-y-2 animate-fade-in text-left">
                            {analysisResult.split("\n\n").map((para, i) => (
                              <p key={i}>
                                {para.startsWith("🧵") ? (
                                  <span className="font-mono text-indigo-400">{para}</span>
                                ) : para.startsWith("☁️") ? (
                                  <span className="text-teal-300">{para}</span>
                                ) : (
                                  para
                                )}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Back-end specs strip */}
                      <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-mono font-bold text-slate-400">
                        <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                          <span className="text-slate-500 block">LOOM SYSTEM</span>
                          <span className="text-white">COOPERATIVE MARK V</span>
                        </div>
                        <div className="p-2 bg-slate-900/60 border border-slate-800 rounded-lg">
                          <span className="text-slate-500 block">WARP MATERIAL</span>
                          <span className="text-white">80s COMBED REELED</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Aesthetic Footer Branding */}
                  <div className="p-3.5 bg-[#090a10]/95 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
                    <span>⚡ Realtime fiber simulation active</span>
                    <span className="text-indigo-400 font-bold uppercase">Jamdani Silk Guild DB</span>
                  </div>

                </div>

                {/* Micro weaver card trust */}
                <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase block font-bold font-mono">Verified Loom Node</span>
                    <button 
                      onClick={() => { setSelectedSupplier(selectedProduct.supplierName); setActivePage("supplier"); }}
                      className="font-display font-bold text-xs text-white hover:text-indigo-400 underline block mt-0.5"
                    >
                      {selectedProduct.supplierName}
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase border border-emerald-500/10">
                    Heritage GI Certified
                  </span>
                </div>
              </div>

              {/* Right Column: Spec definitions, reviews, pricing, bulk triggers */}
              <div className="lg:col-span-7 space-y-6 bg-[#090a12]/40 border border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-xl">
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-widest text-indigo-400 uppercase">{selectedProduct.category} Collection</span>
                  <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight mt-1">{selectedProduct.name}</h1>
                  
                  {/* Reviews rating mock */}
                  <div className="flex items-center space-x-1.5 mt-2">
                    <div className="flex text-amber-400">
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                    </div>
                    <span className="text-xs text-slate-400 font-semibold font-mono">4.9 (42 boutique logs)</span>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/20 border border-indigo-500/15 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">B2B Trade Member Pricing</span>
                    <span className="text-[9px] uppercase font-mono bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded">
                      {userRole.toUpperCase()} Tier
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2.5 pt-1">
                    <span className="text-2xl font-mono font-black text-white">BDT {getProductPrice(selectedProduct).toLocaleString()}</span>
                    {userRole !== "retail" && (
                      <span className="text-xs text-slate-500 line-through font-mono">BDT {selectedProduct.price.toLocaleString()}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-indigo-200/70 pt-1 leading-normal">
                    * Wholesaler prices are pre-negotiated by regional weaver contracts. High precision thread escrow applied automatically.
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedProduct.description}</p>

                {/* Configuration Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Color Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Shade Accent</label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.colors.map((col) => (
                        <button
                          key={col}
                          onClick={() => setProductColor(col)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            productColor === col 
                              ? "bg-slate-900 border-indigo-500 text-white shadow-md shadow-indigo-500/5" 
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pattern Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Woven Motif Pattern</label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.patterns.map((pat) => (
                        <button
                          key={pat}
                          onClick={() => setProductPattern(pat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            productPattern === pat 
                              ? "bg-slate-900 border-indigo-500 text-white shadow-md shadow-indigo-500/5" 
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          {pat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action button triggers */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="bg-slate-950 border border-slate-800 p-1.5 rounded-xl flex items-center justify-between sm:w-32 shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Stock: {selectedProduct.stock}</span>
                  </div>

                  <button
                    onClick={() => addToCart(selectedProduct, 1, productColor, productPattern)}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={14} />
                    <span>Add to Shopping Bag (BDT {getProductPrice(selectedProduct).toLocaleString()})</span>
                  </button>

                  <button 
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Heart size={16} className={wishlist.includes(selectedProduct.id) ? "fill-rose-500 text-rose-500" : ""} />
                  </button>
                </div>

                {/* Trust assurances block */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/60 text-[10px] text-slate-400 font-semibold font-mono">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-teal-400" />
                    <span>Loom-escrow Protect</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={12} className="text-indigo-400" />
                    <span>Nationwide dispatch</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} className="text-amber-400" />
                    <span>48h Quality Lock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            4. AI SMART SEARCH VIEW
            ========================================== */}
        {activePage === "search" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                <Bot className="text-indigo-400" />
                <span>AI Smart Search Results</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">Cognitive search results generated by FabricFlow AI indexing weavers database.</p>
            </div>

            {/* AI Answer Card */}
            <div className="p-5 border border-indigo-500/20 bg-[#0a0d1d]/60 rounded-2xl shadow-xl space-y-3">
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
                AI Synthesis Summary
              </span>
              <p className="text-xs text-slate-200 font-sans leading-relaxed">
                Found matching fabric indexes. The user is querying for: **"{smartSearchQuery}"**. Matching fabric textures under verified supplier accounts.
              </p>
              <div className="text-[10px] text-slate-400 leading-normal border-t border-indigo-950/40 pt-2 flex items-center gap-2">
                <CheckCircle size={11} className="text-teal-400 shrink-0" />
                <span>Query successfully filtered with zero-touch weaver logs. B2B discounts computed automatically.</span>
              </div>
            </div>

            {/* Smart matching items */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">Filtered Matches</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.filter(p => 
                  p.name.toLowerCase().includes(smartSearchQuery.toLowerCase()) || 
                  p.category.toLowerCase().includes(smartSearchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(smartSearchQuery.toLowerCase())
                ).map((prod) => (
                  <div 
                    key={prod.id} 
                    className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg group flex flex-col justify-between"
                  >
                    <div className="relative aspect-square bg-slate-950 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      <span className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 px-2 py-0.5 text-[8px] font-mono text-slate-400 rounded">
                        {prod.id}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.category} • {prod.supplierName}</span>
                      <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer">{prod.name}</h3>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{prod.description}</p>
                      
                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <div>
                          <span className="text-[8px] text-slate-500 block">B2B Tier</span>
                          <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        </div>
                        <button 
                          onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                          className="px-2.5 py-1.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-colors border border-indigo-500/10 text-[10px]"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {products.filter(p => 
                  p.name.toLowerCase().includes(smartSearchQuery.toLowerCase()) || 
                  p.category.toLowerCase().includes(smartSearchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(smartSearchQuery.toLowerCase())
                ).length === 0 && (
                  <div className="col-span-3 text-center py-8 border border-dashed border-slate-800 rounded-xl text-xs text-slate-500 flex flex-col items-center justify-center space-y-2">
                    <AlertCircle size={24} className="text-slate-700 animate-pulse" />
                    <p>No exact matched weaver logs. Try typing "Jamdani" or "Silk" in the search box above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            5. SHOPPING CART VIEW
            ========================================== */}
        {activePage === "cart" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Your Luxury Shopping Bag</h1>
              <p className="text-xs text-slate-400 mt-0.5">Manage added drapes, verify loom quantity bounds, and secure transaction discounts.</p>
            </div>

            {cart.length === 0 ? (
              <div className="border border-slate-800 bg-[#0d1222]/30 p-12 rounded-xl text-center flex flex-col items-center justify-center space-y-4">
                <ShoppingBag size={40} className="text-slate-700 animate-bounce-slow" />
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm text-slate-300">Your bag is empty</h3>
                  <p className="text-xs text-slate-500 max-w-sm">Explore our verified handloom products to stock up your boutique inventories.</p>
                </div>
                <button 
                  onClick={() => setActivePage("listing")}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cart list */}
                <div className="lg:col-span-8 border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider bg-[#060812]">
                    Cart Items Details
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {cart.map((item, index) => (
                      <div key={index} className="p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:bg-[#070912]/20 transition-all">
                        <div className="flex space-x-4 items-center">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest">{item.product.id}</span>
                            <h3 className="font-display font-bold text-sm text-slate-100 mt-0.5">{item.product.name}</h3>
                            <div className="flex flex-wrap gap-2 pt-1 text-[10px] text-slate-500 font-mono">
                              <span>Shade: <strong className="text-slate-300">{item.color}</strong></span>
                              <span>•</span>
                              <span>Motif: <strong className="text-slate-300">{item.pattern}</strong></span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity and Prices */}
                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div className="flex items-center space-x-1 border border-slate-800 bg-slate-950 p-1 rounded-lg">
                            <button 
                              onClick={() => updateCartQty(index, item.qty - 1)}
                              className="p-1 text-slate-500 hover:text-white"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="px-2.5 font-mono font-bold text-white text-xs">{item.qty}</span>
                            <button 
                              onClick={() => updateCartQty(index, item.qty + 1)}
                              className="p-1 text-slate-500 hover:text-white"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-mono font-black text-white block">BDT {(getProductPrice(item.product) * item.qty).toLocaleString()}</span>
                            <span className="text-[9px] text-slate-500 block">BDT {getProductPrice(item.product).toLocaleString()} / unit</span>
                          </div>

                          <button 
                            onClick={() => updateCartQty(index, 0)}
                            className="p-1.5 text-slate-600 hover:text-rose-500 border border-slate-800 rounded bg-[#09090c]"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart pricing summaries */}
                <div className="lg:col-span-4 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <h4 className="font-display font-bold text-sm text-white pb-2 border-b border-slate-800">Bag Summary</h4>
                  
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Total Units Selected</span>
                      <span className="font-mono text-slate-200">{cart.reduce((acc, item) => acc + item.qty, 0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Subtotal Value</span>
                      <span className="font-mono text-slate-200">BDT {getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Escrow Shipping fee</span>
                      <span className="font-mono text-slate-200">BDT 150</span>
                    </div>
                    <div className="border-t border-slate-800/80 pt-2.5 flex justify-between items-center text-sm font-bold">
                      <span className="text-white">Aggregate Total</span>
                      <span className="font-mono text-indigo-400">BDT {(getCartTotal() + 150).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-indigo-950/15 border border-indigo-500/10 p-3 rounded-lg text-[10px] text-indigo-300 font-medium leading-relaxed">
                    💡 **Member Benefit:** As a registered **{userRole.toUpperCase()}**, you saved **{userRole === "wholesaler" ? "20%" : userRole === "boutique" ? "10%" : "0%"}** on standard B2C prices with direct weaver sourcing.
                  </div>

                  <button 
                    onClick={() => { setCheckoutStep(1); setActivePage("checkout"); }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            6. CHECKOUT VIEW
            ========================================== */}
        {activePage === "checkout" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Secure Trade Checkout</h1>
              <p className="text-xs text-slate-400 mt-0.5">Finalize shipment routing parameters, escrow protection, and payout structures.</p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center space-x-4 text-xs font-semibold font-mono pb-2">
              <span className={`pb-1 border-b-2 transition-all ${checkoutStep >= 1 ? "border-indigo-500 text-white" : "border-transparent text-slate-500"}`}>1. Shipping details</span>
              <span className="text-slate-700">/</span>
              <span className={`pb-1 border-b-2 transition-all ${checkoutStep >= 2 ? "border-indigo-500 text-white" : "border-transparent text-slate-500"}`}>2. Escrow Payment</span>
              <span className="text-slate-700">/</span>
              <span className={`pb-1 border-b-2 transition-all ${checkoutStep === 3 ? "border-indigo-500 text-white" : "border-transparent text-slate-500"}`}>3. Confirmation receipt</span>
            </div>

            {checkoutStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <h3 className="font-display font-bold text-sm text-white pb-2 border-b border-slate-800">B2B Delivery Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Receiver Full Name</label>
                      <input 
                        type="text" 
                        value={shippingForm.fullName}
                        onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                      <input 
                        type="email" 
                        value={shippingForm.email}
                        onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Contact Phone No</label>
                      <input 
                        type="text" 
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Street Address</label>
                      <input 
                        type="text" 
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">City Region</label>
                      <input 
                        type="text" 
                        value={shippingForm.city}
                        onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Postal Code</label>
                      <input 
                        type="text" 
                        value={shippingForm.postalCode}
                        onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <span>Continue to Escrow Pay</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-4">
                  <h4 className="font-display font-bold text-xs text-white pb-2 border-b border-slate-800 uppercase">Order Breakdown</h4>
                  <p className="text-[11px] text-slate-400">Escrow verification will lock the funds safely until weavers hand over priority shipping boxes to Pathao Logistics.</p>
                </div>
              </div>
            )}

            {checkoutStep === 2 && (
              <div className="max-w-xl mx-auto border border-slate-800 bg-slate-900/40 p-6 rounded-xl shadow-xl space-y-6">
                <div>
                  <h3 className="font-display font-extrabold text-base text-white">Select Secure Trade Payment</h3>
                  <p className="text-xs text-slate-400 mt-1">Both channels protect your wholesale investments using the integrated loom escrow ledger.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "bKash", name: "bKash Premium Wallet", desc: "Pay with Bkash for instant quality protection handshake.", logo: "bKash" },
                    { id: "SSL", name: "SSLCommerz payment gateway", desc: "Accept major Visa, Mastercard, and Rocket bank accounts.", logo: "SSL" },
                    { id: "COD", name: "Cash On Delivery (Steadfast)", desc: "Requires 10% advance deposit to secure loom allocation.", logo: "COD" }
                  ].map((pay) => (
                    <div 
                      key={pay.id}
                      onClick={() => setShippingForm({ ...shippingForm, paymentMethod: pay.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        shippingForm.paymentMethod === pay.id 
                          ? "bg-indigo-950/20 border-indigo-500" 
                          : "bg-slate-950 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="space-y-1 text-xs">
                        <strong className="text-white block font-sans">{pay.name}</strong>
                        <p className="text-slate-400 leading-normal text-[11px]">{pay.desc}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase bg-[#09090c] px-2 py-1 rounded border border-slate-800">
                        {pay.logo}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <button 
                    onClick={() => setCheckoutStep(1)}
                    className="text-xs text-slate-400 hover:text-white font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to shipping</span>
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Authorize Escrow Payment (BDT {(getCartTotal() + 150).toLocaleString()})
                  </button>
                </div>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="max-w-md mx-auto text-center border border-slate-800 bg-slate-900/40 p-8 rounded-2xl shadow-xl space-y-6">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded">
                    Loom Escrow Initiated
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-white">Purchase Order Dispatched!</h2>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Thank you! Your boutique order was saved directly to the central DB. Our weavers will verify thread counts and package dispatches.
                  </p>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 text-xs text-left">
                  <div className="flex justify-between items-center text-slate-400">
                    <span>Assigned Order ID</span>
                    <span className="font-mono text-white font-bold">{selectedTrackingOrder?.id}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-t border-slate-800/40 pt-2">
                    <span>Fulfillment Courier</span>
                    <span className="font-mono text-indigo-400">Pathao Logistics</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 border-t border-slate-800/40 pt-2">
                    <span>Aggregate Total Paid</span>
                    <span className="font-mono text-white font-bold">BDT {selectedTrackingOrder?.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button 
                    onClick={() => setActivePage("tracking")}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Track Shipment Step
                  </button>
                  <button 
                    onClick={() => { setCart([]); setCheckoutStep(1); setActivePage("home"); }}
                    className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Return Home Shop
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            7. CUSTOMER DASHBOARD VIEW
            ========================================== */}
        {activePage === "dashboard" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Customer Sourcing Panel</h1>
              <p className="text-xs text-slate-400 mt-0.5">Configure your trade tier, track purchase orders, and audit loyalty metrics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Profile Card */}
              <div className="md:col-span-4 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-display font-extrabold text-lg text-indigo-400">
                    AR
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white">Ayesha Rahman</h3>
                    <p className="text-[10px] text-slate-500 font-mono uppercase font-bold">Dhaka Boutique Studio</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
                  <div className="flex justify-between items-center">
                    <span>Membership Tier</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black bg-indigo-500/10 text-indigo-400 uppercase tracking-wider">{userRole.toUpperCase()} member</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Loom-Point Balance</span>
                    <span className="font-mono text-white font-bold">12,450 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Escrow Hold Value</span>
                    <span className="font-mono text-teal-400 font-semibold">BDT 62,500</span>
                  </div>
                </div>
              </div>

              {/* Past orders list */}
              <div className="md:col-span-8 border border-slate-800 bg-slate-900/40 rounded-xl overflow-hidden shadow">
                <div className="p-4 border-b border-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-widest bg-[#060812]">
                  Your purchase ledger ({orders.length} orders)
                </div>
                <div className="divide-y divide-slate-800/60">
                  {orders.map((ord) => (
                    <div 
                      key={ord.id}
                      onClick={() => { setSelectedTrackingOrder(ord); setTrackingIdInput(ord.id); setActivePage("tracking"); }}
                      className="p-4 flex items-center justify-between text-xs hover:bg-[#070912]/20 cursor-pointer transition-all"
                    >
                      <div>
                        <span className="font-mono text-[9px] text-slate-500 block">{ord.id} • {ord.date}</span>
                        <h4 className="font-display font-bold text-slate-200 mt-0.5">{ord.productName}</h4>
                        <span className="text-[9px] text-slate-500">Qty: {ord.qty} units • Ship to: {ord.shippingAddress.split(",")[0]}</span>
                      </div>
                      <div className="text-right flex items-center space-x-3">
                        <div>
                          <span className="font-mono text-white font-bold block">BDT {ord.total.toLocaleString()}</span>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase tracking-widest ${
                            ord.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}>{ord.status}</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            8. ORDER TRACKING VIEW
            ========================================== */}
        {activePage === "tracking" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Purchase Order Tracking</h1>
              <p className="text-xs text-slate-400 mt-0.5">Audit loom dispatch sequences, transit handshakes, and delivery coordinates.</p>
            </div>

            {/* Tracking search bar */}
            <div className="bg-[#0b0c16]/50 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">Enter Order Reference:</span>
              <input 
                type="text" 
                value={trackingIdInput}
                onChange={(e) => setTrackingIdInput(e.target.value)}
                placeholder="e.g. ORD-9201"
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-600 font-mono focus:outline-none"
              />
              <button 
                onClick={() => {
                  const match = orders.find(o => o.id.toLowerCase() === trackingIdInput.toLowerCase());
                  if (match) {
                    setSelectedTrackingOrder(match);
                  } else {
                    alert(`Order reference ${trackingIdInput} not found in database.`);
                  }
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all"
              >
                Query Tracker
              </button>
            </div>

            {selectedTrackingOrder ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Visual Step-by-Step timeline */}
                <div className="lg:col-span-2 border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow-xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block font-mono">Fulfillment Status</span>
                      <h3 className="font-display font-bold text-sm text-white">Logistics Roadmap</h3>
                    </div>
                    <span className="px-2 py-1 rounded text-[9px] font-bold font-mono tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">
                      Courier: Pathao B2B
                    </span>
                  </div>

                  {/* High fidelity timeline */}
                  <div className="space-y-6 pl-4 relative before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {[
                      { title: "Escrow Deposit Confirmed", desc: "Funding successfully secured in central trust vault.", date: "July 01, 10:45 AM", completed: true },
                      { title: "Loom Allocation Checked", desc: "Weavers authenticated thread count and finished packing.", date: "July 02, 02:30 PM", completed: selectedTrackingOrder.status !== "Pending" },
                      { title: "Handover to Pathao B2B Courier", desc: "Consignment package picked up from weaver hub.", date: "July 03, 09:15 AM", completed: ["Shipped", "Delivered"].includes(selectedTrackingOrder.status) },
                      { title: "Consignment Arrived & Released", desc: "Consignment box reached customer boutique, locked funds released.", date: "July 04, 11:00 AM", completed: selectedTrackingOrder.status === "Delivered" },
                    ].map((step, idx) => (
                      <div key={idx} className="relative space-y-1">
                        <span className={`absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
                          step.completed ? "bg-emerald-500 border-emerald-400" : "bg-slate-950 border-slate-800"
                        }`} />
                        <div className="pl-3.5">
                          <h4 className={`text-xs font-bold ${step.completed ? "text-slate-100" : "text-slate-500"}`}>{step.title}</h4>
                          <p className="text-[10px] text-slate-400 leading-normal">{step.desc}</p>
                          <span className="text-[8px] font-mono text-slate-500 block pt-0.5">{step.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details sidecard info */}
                <div className="border border-slate-800 bg-slate-900/40 p-5 rounded-xl shadow space-y-4 text-xs">
                  <h4 className="font-display font-bold text-xs text-white pb-2 border-b border-slate-800 uppercase">Consignment details</h4>
                  
                  <div className="space-y-2 text-slate-400">
                    <div className="flex justify-between">
                      <span>Order Reference</span>
                      <strong className="text-white font-mono">{selectedTrackingOrder.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Purchased Fabric</span>
                      <span className="text-slate-300 font-medium">{selectedTrackingOrder.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Address</span>
                      <span className="text-slate-300 font-medium text-right max-w-xs truncate">{selectedTrackingOrder.shippingAddress}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-800/40">
                      <span>Track ID</span>
                      <span className="font-mono text-indigo-400">{selectedTrackingOrder.trackingNo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border border-slate-800 rounded-xl text-slate-500 text-xs">
                No active tracking order query selected. Use the search box above.
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            9. WISHLIST VIEW
            ========================================== */}
        {activePage === "wishlist" && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-800/60 pb-4">
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">Your Saved Favorites</h1>
              <p className="text-xs text-slate-400 mt-0.5">Keep track of fabrics and weaver catalogs you want to source for upcoming seasons.</p>
            </div>

            {wishlist.length === 0 ? (
              <div className="border border-slate-800 bg-[#0d1222]/30 p-12 rounded-xl text-center flex flex-col items-center justify-center space-y-4">
                <Heart size={40} className="text-slate-700 animate-bounce-slow" />
                <h3 className="font-display font-bold text-sm text-slate-300">Your wishlist is empty</h3>
                <button onClick={() => setActivePage("listing")} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all">Browse Loom Catalog</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.filter(p => wishlist.includes(p.id)).map((prod) => (
                  <div key={prod.id} className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col justify-between">
                    <div className="relative aspect-square bg-slate-950 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button 
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-3 right-3 p-1.5 bg-slate-900/80 hover:bg-slate-900 rounded-full text-rose-500 border border-slate-800 transition-colors"
                      >
                        <Heart size={14} className="fill-current" />
                      </button>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.category}</span>
                      <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer">{prod.name}</h3>
                      <div className="pt-2.5 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        <button 
                          onClick={() => { setSelectedProduct(prod); setActivePage("details"); }}
                          className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold"
                        >
                          Sourcing
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            11. SUPPLIER PUBLIC STORE VIEW
            ========================================== */}
        {activePage === "supplier" && (
          <div className="space-y-6 animate-fade-in">
            {/* Supplier Hero Card */}
            <div className="border border-slate-800 bg-[#0b0c16] rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-display font-extrabold text-xl">
                  DF
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-display font-extrabold text-white">{selectedSupplier}</h1>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold font-mono tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20 uppercase">Verified Heritage GI</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Narayanganj Weaver Cluster, Dhaka Division. Hand-weaving legendary geometric Jamdanis for over 70 years.</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs font-mono text-center shrink-0">
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">ACTIVE LOOMS</span>
                  <span className="text-sm font-black text-white">45 units</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">COMPLETED DELS</span>
                  <span className="text-sm font-black text-white">1,245+</span>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">GI RANK</span>
                  <span className="text-sm font-black text-teal-400">Class A</span>
                </div>
              </div>
            </div>

            {/* Catalog list for this supplier */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">Storefront Catalog</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.filter(p => p.supplierName === selectedSupplier).map((prod) => (
                  <div key={prod.id} className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow group flex flex-col justify-between">
                    <div className="relative aspect-square bg-slate-950 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.category}</span>
                      <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer mt-1 leading-snug">{prod.name}</h3>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{prod.description}</p>
                      
                      <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        <button onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">Configure</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            12. CATEGORY PAGE VIEW
            ========================================== */}
        {activePage === "category" && (
          <div className="space-y-6 animate-fade-in">
            {/* Curated Category Header */}
            <div className="relative bg-[#070913] rounded-2xl overflow-hidden border border-slate-800 p-8 flex items-center min-h-[180px]">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 to-transparent" />
              <div className="relative space-y-2">
                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">Category Curator</span>
                <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">{selectedCategory} Collections</h1>
                <p className="text-xs text-slate-400 max-w-lg leading-relaxed">Direct sourcing index filtered for premium weave, fiber count, and traditional color accents.</p>
              </div>
            </div>

            {/* Catalog Grid for this category */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {products.filter(p => p.category === selectedCategory).map((prod) => (
                <div key={prod.id} className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow flex flex-col justify-between">
                  <div className="relative aspect-square bg-slate-950 overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.supplierName}</span>
                    <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer">{prod.name}</h3>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{prod.description}</p>
                    <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                      <button onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">Configure</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            13. BRAND PAGE VIEW
            ========================================== */}
        {activePage === "brand" && (
          <div className="space-y-6 animate-fade-in">
            {/* Curated Heritage brand layout */}
            <div className="border border-slate-800 bg-[#090b14]/60 p-6 rounded-2xl space-y-4">
              <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded">Heritage brand dossier</span>
              <h1 className="text-2xl font-display font-extrabold text-white tracking-tight">{selectedBrand}</h1>
              <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-sans">
                Authenticity is woven deep into every millimeter of our fabrics. These brands operate standard handlooms in regional clusters under UNESCO protection guidelines. 100% hand-reeled Mulberry threads and organic vegetable dyes are sourced strictly.
              </p>
              <div className="text-[10px] text-teal-400 font-mono font-bold">
                ✓ UNESCO Craft Registry Mark • Geographical Indication (GI) Verified
              </div>
            </div>

            {/* Catalog Grid matching category or supplier */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest pl-1">Legacy Woven Inventory</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow flex flex-col justify-between">
                    <div className="relative aspect-square bg-slate-950 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.supplierName}</span>
                      <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer">{prod.name}</h3>
                      <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        <button onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">Configure</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            14. FLASH SALE PAGE VIEW
            ========================================== */}
        {activePage === "flash" && (
          <div className="space-y-6 animate-fade-in">
            {/* Live Count header */}
            <div className="border border-rose-500/25 bg-gradient-to-r from-rose-950/20 via-slate-900/60 to-rose-950/10 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest bg-rose-500/15 text-rose-400 border border-rose-500/20 uppercase flex items-center gap-1.5 w-max">
                  <Flame size={11} className="animate-pulse" /> Monsoon Sale Area
                </span>
                <h1 className="text-xl font-display font-extrabold text-white">Weaver Liquidation Lightning Deals</h1>
                <p className="text-xs text-slate-400">High-end sarees priced to release weaver capital quickly. Order limits strictly applied.</p>
              </div>

              {/* Clock count */}
              <div className="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold bg-slate-950/80 p-3 border border-slate-800 rounded-xl">
                <span>Timer: {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Catalog Grid with promotional deal labels */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {flashSaleProducts.map((prod) => (
                <div key={prod.id} className="bg-[#0b0a11] border border-rose-950/40 hover:border-rose-500/30 rounded-xl overflow-hidden shadow-lg group flex flex-col justify-between relative">
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded z-10">
                    Slashed 25%
                  </div>
                  <div className="relative aspect-square bg-slate-950 overflow-hidden">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.supplierName}</span>
                    <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-slate-200 hover:text-rose-400 cursor-pointer">{prod.name}</h3>
                    
                    {/* Stock level visual bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                        <span>Loom allocation remaining</span>
                        <strong className="text-rose-400 font-bold">Only {prod.stock} left</strong>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div className="h-full bg-rose-500 rounded-full" style={{ width: `${(prod.stock / 150) * 100}%` }} />
                      </div>
                    </div>

                    <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] text-slate-500 line-through block font-mono">BDT {prod.price.toLocaleString()}</span>
                        <span className="text-sm font-mono font-black text-rose-400">BDT {Math.round(prod.price * 0.75).toLocaleString()}</span>
                      </div>
                      <button onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold">Grab Sourcing</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            15. AI RECOMMENDATION FEED VIEW
            ========================================== */}
        {activePage === "recommendations" && (
          <div className="space-y-6 animate-fade-in">
            {/* Personalization overview header */}
            <div className="p-6 border border-indigo-500/20 bg-gradient-to-r from-[#0d0f1f] via-slate-900/80 to-[#0d0f1f] rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-xl">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h1 className="text-xl font-display font-extrabold text-white">AI Personalized Recommendation Feed</h1>
                  <p className="text-xs text-indigo-300">Cognitive indexing matching your purchase profile to weavers in the Dhaka Division.</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                FabricFlow uses autonomous operational data indexing. Based on your profile as a **{userRole.toUpperCase()}**, our algorithm recommends high thread-count Jamdanis and breathable Cotton voiles because of active summer retail indicators in Dhaka boutiques.
              </p>
            </div>

            {/* Catalog Grid matching recommendation scores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {products.map((prod, idx) => {
                const matchScore = 98 - (idx * 2);
                return (
                  <div key={prod.id} className="bg-slate-900/20 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden shadow flex flex-col justify-between">
                    <div className="relative aspect-square bg-slate-950 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[8px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        {matchScore}% Match Rate
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <span className="text-[8px] font-mono text-slate-500 uppercase block">{prod.category} • {prod.supplierName}</span>
                      <h3 onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="font-display font-bold text-xs text-white hover:text-indigo-400 cursor-pointer">{prod.name}</h3>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{prod.description}</p>
                      
                      <div className="pt-3.5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-white">BDT {getProductPrice(prod).toLocaleString()}</span>
                        <button onClick={() => { setSelectedProduct(prod); setActivePage("details"); }} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold">Source Now</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* --- INTEGRATED RIGHT ASSISTANT DRAWER PANEL (Point 10) --- */}
      {isAiAssistantOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsAiAssistantOpen(false)}
          />
          
          <div className="w-full max-w-md bg-[#0a0d1a] border-l border-slate-800 h-full shadow-2xl flex flex-col relative z-50 animate-slide-over">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#070912]">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-white">AI Sourcing Partner</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Cognitive loom matching</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAiAssistantOpen(false)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Chat list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiAssistantChat.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-3.5 rounded-xl border space-y-2.5 max-w-[90%] ${
                    msg.sender === "bot" 
                      ? "bg-slate-900/60 border-slate-800/80 mr-auto text-slate-300" 
                      : "bg-indigo-600/10 border-indigo-500/20 ml-auto text-indigo-200 text-right"
                  }`}
                >
                  <span className="text-[8px] font-bold uppercase tracking-widest font-mono text-slate-500 block">
                    {msg.sender === "bot" ? "FabricFlow Assistant" : "Your Query"}
                  </span>
                  <p className="text-xs leading-relaxed font-sans">{msg.text}</p>

                  {/* Inline product chip recommendations if matched */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="pt-2 border-t border-slate-800/40 space-y-1.5 text-left">
                      <span className="text-[8px] font-mono text-slate-500 uppercase font-semibold">Matched Weaver Products:</span>
                      <div className="space-y-1.5">
                        {msg.products.map((p) => (
                          <div 
                            key={p.id}
                            onClick={() => { setSelectedProduct(p); setActivePage("details"); setIsAiAssistantOpen(false); }}
                            className="p-2 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between hover:border-slate-700 cursor-pointer transition-all"
                          >
                            <span className="text-xs text-white font-medium truncate pr-2">{p.name}</span>
                            <span className="text-[10px] font-mono text-indigo-400 shrink-0 font-bold">BDT {getProductPrice(p).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isAiTyping && (
                <div className="p-3.5 bg-slate-900/40 border border-slate-800 rounded-xl max-w-xs animate-pulse text-xs text-slate-500 font-medium font-mono">
                  Concierge scanning loom index...
                </div>
              )}
            </div>

            {/* Predefined helpers */}
            <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-900 text-xs flex flex-wrap gap-1.5">
              {[
                { label: "Wedding Jamdanis", text: "Show me wedding collection Jamdanis" },
                { label: "Summer Cottons", text: "Show me breathable cotton fabrics" },
                { label: "Trade pricing benefits", text: "Explain B2B trade discount benefits" },
              ].map((h) => (
                <button
                  key={h.label}
                  onClick={() => { setAiInputText(h.text); }}
                  className="px-2 py-1 rounded text-[9px] font-medium bg-[#0f111c] hover:bg-[#161a2e] text-indigo-300 border border-indigo-950/40"
                >
                  {h.label}
                </button>
              ))}
            </div>

            {/* Input footer */}
            <div className="p-4 border-t border-slate-800 bg-[#070912] flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Ask our fabric concierge..."
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAiAssistantSend();
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-600"
              />
              <button 
                onClick={handleAiAssistantSend}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LUXURY BRAND SYSTEM FOOTER --- */}
      <footer className="border-t border-slate-800 bg-[#050507] py-8 px-6 mt-12 text-xs text-slate-500 font-semibold uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
            <span>© 2026 FabricFlow BD</span>
            <span>|</span>
            <span>Direct loom handshakes</span>
            <span>|</span>
            <span>bKash Escrow Secure</span>
          </div>
          
          <button
            onClick={onSwitchToErp}
            className="text-[10px] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 px-3 py-1.5 bg-[#09090c] rounded-md transition-all uppercase font-mono tracking-widest"
          >
            🛠️ Launch Admin ERP Backoffice
          </button>
        </div>
      </footer>

    </div>
  );
}
