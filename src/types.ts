export type Role = "ADMIN" | "SUPPLIER";

export interface Product {
  id: string;
  name: string;
  category: string;
  supplierName: string;
  price: number;
  status: "Pending" | "Approved" | "Rejected";
  colors: string[];
  sizes: string[];
  patterns: string[];
  stock: number;
  description: string;
  image: string;
  addedDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  supplierName: string;
  productName: string;
  category: string;
  qty: number;
  total: number;
  date: string;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  trackingNo: string;
  paymentStatus: "Paid" | "Unpaid";
  paymentMethod: string;
  shippingAddress: string;
}

export interface CommissionRule {
  id: string;
  category: string;
  rate: number; // percentage (e.g. 10 for 10%)
  type: "Percentage" | "Fixed";
  lastUpdated: string;
  minOrderValue: number;
}

export interface Payout {
  id: string;
  supplierName: string;
  amount: number;
  date: string;
  status: "Paid" | "Processing" | "Pending";
  paymentMethod: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  goal: string;
  budget: number;
  channel: string;
  audience: string;
  status: "Draft" | "Active" | "Completed";
  predictedROAS?: number;
  confidence?: string;
  adCopyHook?: string;
  adCopyBody?: string;
  targetInterests?: string[];
  dateCreated: string;
}

// Initial high-fidelity seed data for the ERP system (representing thousands of records)
export const initialProducts: Product[] = [
  {
    id: "PROD-101",
    name: "Premium Jamdani Sharee",
    category: "Jamdani",
    supplierName: "Dhaka Fabrics Ltd.",
    price: 12500,
    status: "Approved",
    colors: ["Deep Red", "Golden", "Royal Blue"],
    sizes: ["Standard 5.5m"],
    patterns: ["Traditional Geometric", "Floral Jaal"],
    stock: 45,
    description: "Authentic hand-woven Jamdani sharee crafted in Narayanganj. Features high thread count premium cotton-silk blend with intricate golden zari motifs.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-06-15"
  },
  {
    id: "PROD-102",
    name: "Eid Special Cotton 3 Piece",
    category: "Cotton",
    supplierName: "Jamdani House",
    price: 3200,
    status: "Approved",
    colors: ["Emerald Green", "Pastel Pink", "Lilac"],
    sizes: ["Unstitched"],
    patterns: ["Block Print", "Embroidery Neckline"],
    stock: 120,
    description: "Highly breathable premium Voile cotton with pure cotton dupatta. Perfectly styled for festive and comfort wear during warm Bangladeshi summers.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-06-20"
  },
  {
    id: "PROD-103",
    name: "Pure Linen Shirting Fabric",
    category: "Linen",
    supplierName: "Cotton World",
    price: 750,
    status: "Approved",
    colors: ["Off-White", "Sky Blue", "Olive Green", "Charcoal"],
    sizes: ["Per Meter"],
    patterns: ["Solid", "Fine Slub Texture"],
    stock: 240,
    description: "Imported Belgian-grade flax linen fabric. Highly sweat-absorbent, durable, and perfect for men's formal shirts and women's custom tunics.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-06-25"
  },
  {
    id: "PROD-104",
    name: "Traditional Rajshahi Silk Sharee",
    category: "Silk",
    supplierName: "Silk & Co.",
    price: 8500,
    status: "Approved",
    colors: ["Crimson Red", "Saffron Yellow", "Magenta"],
    sizes: ["Standard 5.5m"],
    patterns: ["Temple Border", "Sparsely Hand-painted"],
    stock: 18,
    description: "Genuinely hand-reeled Mulberry Silk from Rajshahi. Elegant natural shine, featherlight drape, and finished with rich traditional silk tassels.",
    image: "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-06-28"
  },
  {
    id: "PROD-105",
    name: "Block Printed Cotton Voile Fabric",
    category: "Cotton",
    supplierName: "Dhaka Fabrics Ltd.",
    price: 380,
    status: "Pending",
    colors: ["Indigo", "Mustard Yellow"],
    sizes: ["Per Yard"],
    patterns: ["Handmade Wooden Block Motif"],
    stock: 350,
    description: "Soft un-mercerized voile perfect for baby clothing, scarves, and lining materials. Crafted using eco-safe organic vegetable dyes.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-07-02"
  },
  {
    id: "PROD-106",
    name: "Banarasi Georgette Collection",
    category: "Silk",
    supplierName: "Jamdani House",
    price: 15500,
    status: "Pending",
    colors: ["Midnight Black", "Emerald Green", "Plum"],
    sizes: ["Standard 5.5m"],
    patterns: ["Heavy Golden Zari Jaal"],
    stock: 12,
    description: "Premium georgette base woven with heavy Banarasi style metallic gold thread. Designed for luxury evening and bridal ensembles.",
    image: "https://images.unsplash.com/photo-1610030470214-41d3d62fa221?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-07-03"
  },
  {
    id: "PROD-107",
    name: "Classic Khadi Panjabi Fabric",
    category: "Cotton",
    supplierName: "Cotton World",
    price: 450,
    status: "Rejected",
    colors: ["Natural Beige", "Khaki"],
    sizes: ["Per Meter"],
    patterns: ["Hand-spun Raw Texture"],
    stock: 80,
    description: "Traditional hand-spun cotton Khadi with a coarse, charming texture. Rejected by admin due to missing quality clearance logs.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300",
    addedDate: "2026-06-12"
  }
];

export const initialOrders: Order[] = [
  {
    id: "ORD-9201",
    customerName: "Ayesha Rahman (Boutique owner)",
    supplierName: "Dhaka Fabrics Ltd.",
    productName: "Premium Jamdani Sharee",
    category: "Jamdani",
    qty: 5,
    total: 62500,
    date: "2026-07-01",
    status: "Confirmed",
    trackingNo: "PATH-984210",
    paymentStatus: "Paid",
    paymentMethod: "bKash Business",
    shippingAddress: "House 24, Road 5, Dhanmondi, Dhaka"
  },
  {
    id: "ORD-9202",
    customerName: "Karim Textiles",
    supplierName: "Jamdani House",
    productName: "Eid Special Cotton 3 Piece",
    category: "Cotton",
    qty: 25,
    total: 80000,
    date: "2026-07-02",
    status: "Pending",
    trackingNo: "Pending Dispatch",
    paymentStatus: "Paid",
    paymentMethod: "SSLCommerz (Visa)",
    shippingAddress: "45/A Jubilee Road, Chattogram"
  },
  {
    id: "ORD-9203",
    customerName: "Sultana Fashion Hub",
    supplierName: "Cotton World",
    productName: "Pure Linen Shirting Fabric",
    category: "Linen",
    qty: 100,
    total: 75000,
    date: "2026-06-29",
    status: "Shipped",
    trackingNo: "STEAD-741029",
    paymentStatus: "Paid",
    paymentMethod: "Bank Transfer (City Bank)",
    shippingAddress: "Suite 4B, Sector 3, Uttara, Dhaka"
  },
  {
    id: "ORD-9204",
    customerName: "Rajshahi Boutique House",
    supplierName: "Silk & Co.",
    productName: "Traditional Rajshahi Silk Sharee",
    category: "Silk",
    qty: 2,
    total: 17000,
    date: "2026-07-03",
    status: "Delivered",
    trackingNo: "PATH-550192",
    paymentStatus: "Paid",
    paymentMethod: "bKash Personal",
    shippingAddress: "Alupatty Rail Crossing, Rajshahi"
  },
  {
    id: "ORD-9205",
    customerName: "Nusrat Craft Galleria",
    supplierName: "Dhaka Fabrics Ltd.",
    productName: "Block Printed Cotton Voile Fabric",
    category: "Cotton",
    qty: 50,
    total: 19000,
    date: "2026-07-03",
    status: "Pending",
    trackingNo: "Pending Verification",
    paymentStatus: "Unpaid",
    paymentMethod: "Cash On Delivery",
    shippingAddress: "Zilla School Road, Mymensingh"
  },
  {
    id: "ORD-9206",
    customerName: "Elegant Attire BD",
    supplierName: "Silk & Co.",
    productName: "Traditional Rajshahi Silk Sharee",
    category: "Silk",
    qty: 10,
    total: 85000,
    date: "2026-06-10",
    status: "Cancelled",
    trackingNo: "N/A",
    paymentStatus: "Unpaid",
    paymentMethod: "bKash Business",
    shippingAddress: "Bara Bazar, Sylhet"
  }
];

export const initialCommissionRules: CommissionRule[] = [
  {
    id: "RULE-01",
    category: "Jamdani",
    rate: 12.5,
    type: "Percentage",
    lastUpdated: "2026-05-01",
    minOrderValue: 5000
  },
  {
    id: "RULE-02",
    category: "Cotton",
    rate: 8.0,
    type: "Percentage",
    lastUpdated: "2026-05-15",
    minOrderValue: 2000
  },
  {
    id: "RULE-03",
    category: "Linen",
    rate: 10.0,
    type: "Percentage",
    lastUpdated: "2026-06-01",
    minOrderValue: 3000
  },
  {
    id: "RULE-04",
    category: "Silk",
    rate: 15.0,
    type: "Percentage",
    lastUpdated: "2026-06-10",
    minOrderValue: 5000
  }
];

export const initialPayouts: Payout[] = [
  {
    id: "PAY-501",
    supplierName: "Dhaka Fabrics Ltd.",
    amount: 145000,
    date: "2026-06-25",
    status: "Paid",
    paymentMethod: "City Bank EFT"
  },
  {
    id: "PAY-502",
    supplierName: "Jamdani House",
    amount: 82000,
    date: "2026-06-28",
    status: "Paid",
    paymentMethod: "bKash Merchant Payout"
  },
  {
    id: "PAY-503",
    supplierName: "Cotton World",
    amount: 55000,
    date: "2026-07-02",
    status: "Processing",
    paymentMethod: "Mutual Trust Bank EFT"
  },
  {
    id: "PAY-504",
    supplierName: "Silk & Co.",
    amount: 28000,
    date: "2026-07-04",
    status: "Pending",
    paymentMethod: "City Bank EFT"
  }
];

export const initialCampaigns: MarketingCampaign[] = [
  {
    id: "CAMP-001",
    name: "Jamdani Monsoon Elegance",
    goal: "Increase Sales",
    budget: 35000,
    channel: "Facebook Ads",
    audience: "Boutique Designers, Female fashion enthusiasts aged 24-50",
    status: "Active",
    predictedROAS: 4.8,
    confidence: "High",
    adCopyHook: "Elevate your Monsoon look with authentic premium hand-woven Jamdani!",
    adCopyBody: "Straight from the looms of Narayanganj, discover pure cotton-silk Jamdanis with traditional geometric motifs. Direct B2B pricing with secure Escrow. Wholesale bundle order available. Click Shop Now!",
    targetInterests: ["Boutique Shopping", "Jamdani Saree", "Saree Fashion", "Traditional Crafts"],
    dateCreated: "2026-06-20"
  },
  {
    id: "CAMP-002",
    name: "Premium Linen Launch B2B",
    goal: "Lead Generation",
    budget: 15000,
    channel: "Google Search (Intent)",
    audience: "Garment Factory Sourcing Managers, Men's wear brands",
    status: "Draft",
    dateCreated: "2026-07-01"
  }
];
