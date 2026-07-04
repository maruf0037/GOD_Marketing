import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI SDK safely
let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Middleware to guard AI routes - simplified to allow fallback simulation under all conditions
const apiGuard = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
};

// --- API ENDPOINTS ---

// 1. AI Coach - Feedback on supplier products
app.post("/api/ai/coach", apiGuard, async (req, res) => {
  const { name, category, description, price, colors, sizes, patterns } = req.body;
  try {
    const ai = getAiClient();
    if (!ai) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    
    const prompt = `You are "FabricFlow BD AI Coach", a retail and fabric industry expert specializing in Bangladesh's textile/garment ecosystem (e.g. Jamdani, Cotton, Linen, Silk, etc.).
Evaluate the following product listing:
Name: ${name || "Untitled Fabric"}
Category: ${category || "General Fabric"}
Description: ${description || "No description provided"}
Price: BDT ${price || "0"}
Variants: Colors: [${colors || "None"}], Sizes: [${sizes || "None"}], Patterns: [${patterns || "None"}]

Provide constructive feedback to maximize wholesale & retail sales, optimization tips for description & title, search keywords, and a coaching score (0-100). Return your response strictly in the specified JSON structure.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Coaching score out of 100 representing readiness and retail strength."
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 constructive suggestions to improve the listing."
            },
            seoKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Recommended search terms and meta keywords for a textile marketplace."
            },
            suggestedTitle: {
              type: Type.STRING,
              description: "An optimized product title."
            },
            suggestedDescription: {
              type: Type.STRING,
              description: "An optimized, high-converting product description."
            },
            marketInsights: {
              type: Type.STRING,
              description: "Short, specialized market insight for this category (e.g., trend data, regional demand)."
            }
          },
          required: ["score", "suggestions", "seoKeywords", "suggestedTitle", "suggestedDescription", "marketInsights"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ ...data, isSimulated: false });
  } catch (error: any) {
    console.warn("AI Coach Warning (Serving hyper-realistic simulation due to API limit or configuration):", error.message || error);
    
    // High-fidelity fallback simulated response
    const fallbackCoach = {
      score: 88,
      suggestions: [
        `Enhance the description with specific heritage weaving history to highlight GI authenticity.`,
        `Specify the exact thread count (e.g. 100 count pure cotton yarn) for wholesale buyers looking for premium quality.`,
        `Upload higher contrast photography showing close-ups of the selvedge (paar) and ornamental pallu (aanchal) patterns.`
      ],
      seoKeywords: [
        category ? `${category} Wholesale` : "Heritage Jamdani",
        "Dhaka Luxury Cotton",
        "Fair Trade Artisans Bangladesh",
        "Premium Traditional Weaving"
      ],
      suggestedTitle: name ? `Premium Authentic ${name} (GI Certified)` : "Premium Authentic Traditional Handloom Weave (GI Certified)",
      suggestedDescription: description 
        ? `${description} - Exquisitely hand-crafted by verified artisan co-operatives in the Narayanganj textile cluster. Features pre-washed high thread-count cotton fibers designed for premium heritage collections.` 
        : "Exquisitely hand-crafted by verified artisan co-operatives in the Narayanganj textile cluster. Features pre-washed high thread-count cotton fibers designed for premium heritage collections.",
      marketInsights: `Demand for authentic ${category || "handloom"} is up 18.5% this quarter, driven by upscale boutique buyers looking for traceable craft stories and premium thread counts.`,
      isSimulated: true
    };
    res.json(fallbackCoach);
  }
});

// 2. AI Campaign Builder - Suggests copy & predicts ROAS
app.post("/api/ai/campaign", apiGuard, async (req, res) => {
  const { campaignName, campaignGoal, budget, channel, audience } = req.body;
  try {
    const ai = getAiClient();
    if (!ai) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const prompt = `You are "FabricFlow BD AI Marketing engine", an AI marketing specialist in Bangladesh.
Evaluate this campaign concept:
Campaign Name: ${campaignName || "Eid Special Collection"}
Campaign Goal: ${campaignGoal || "Increase Sales"}
Budget: BDT ${budget || "10,000"}
Channel: ${channel || "Facebook Ads"}
Target Audience: ${audience || "Retailers, Boutique owners, Women aged 18-45"}

Generate high-converting ad copy, predict ROAS (Return on Ad Spend) for this channel, assign a confidence level, target interests for Facebook/Google, and give budget optimization advice. Return strictly in JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            predictedROAS: {
              type: Type.NUMBER,
              description: "Predicted Return on Ad Spend (e.g. 4.2)."
            },
            confidence: {
              type: Type.STRING,
              description: "Confidence rating: High, Medium, or Low."
            },
            adCopyHook: {
              type: Type.STRING,
              description: "A hook or headline for the ad."
            },
            adCopyBody: {
              type: Type.STRING,
              description: "Detailed description or body copy for the ad post."
            },
            targetInterests: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Ad platform interests to target (e.g., 'Boutique Shopping', 'Jamdani Saree')."
            },
            budgetRecommendation: {
              type: Type.STRING,
              description: "Suggestions to optimize budget distribution."
            }
          },
          required: ["predictedROAS", "confidence", "adCopyHook", "adCopyBody", "targetInterests", "budgetRecommendation"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ ...data, isSimulated: false });
  } catch (error: any) {
    console.warn("AI Campaign Warning (Serving hyper-realistic simulation due to API limit or configuration):", error.message || error);
    
    const fallbackCampaign = {
      predictedROAS: 4.6,
      confidence: "High",
      adCopyHook: `✨ Tradition Meets Modern Luxury: Authentic GI Handloom Collections Direct From Bangladesh's Master Artisans ✨`,
      adCopyBody: `🚀 Elevate your boutique's catalog with premium, certified ${campaignName || "Heritage Weaves"}. Hand-crafted using generations-old techniques. Secure wholesale escrow and rapid Pathao tracking enabled. Tap to source now!`,
      targetInterests: [
        "Traditional Boutique Owners",
        "Heritage Fashion Lovers",
        "High-end South Asian Couture",
        "Slow Fashion & Fair Trade"
      ],
      budgetRecommendation: `Allocate 65% of the BDT ${budget || "10,000"} budget to Meta Carousel Ads showing weavers' stories, and 35% on Google Smart Shopping queries targeting boutique inventory keywords.`,
      isSimulated: true
    };
    res.json(fallbackCampaign);
  }
});

// 3. AI Insights / Decision Engine - Multi-role optimization suggestions
app.post("/api/ai/insights", apiGuard, async (req, res) => {
  const { role } = req.body; // "admin" or "supplier"
  try {
    const ai = getAiClient();
    if (!ai) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const prompt = `You are the "FabricFlow BD Commerce intelligence engine", powering an AI-Native B2B fabric marketplace and ERP operating in Bangladesh.
Generate 3 distinct data-driven business recommendations, confidence scores, and market summaries suitable for the selected role: "${role}".
Recommendations must feel hyper-realistic, mentioning items like Jamdani fabric, Cotton 3 Piece, Linen fabric, Silk Sharees, seasonal factors (Eid-ul-Fitr, Monsoon, wedding season), supply chain alerts, and pricing updates. Return strictly in JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A 1-2 sentence executive overview of current market and catalog performance."
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "Simple identifier (e.g., insight-1)" },
                  title: { type: Type.STRING, description: "A punchy, clear recommendation title." },
                  text: { type: Type.STRING, description: "Elaborated context and specific actionable advice." },
                  impact: { type: Type.STRING, description: "Estimated financial/volume impact (e.g., 'Potential revenue increase: BDT 45,000' or 'Save BDT 15k on storage')." },
                  confidence: { type: Type.INTEGER, description: "Percent confidence score (e.g. 92)." }
                },
                required: ["id", "title", "text", "impact", "confidence"]
              }
            },
            marketTrends: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Bullet points of broader market insights."
            }
          },
          required: ["summary", "recommendations", "marketTrends"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ ...data, isSimulated: false });
  } catch (error: any) {
    console.warn("AI Insights Warning (Serving hyper-realistic simulation due to API limit or configuration):", error.message || error);
    
    if (role === "supplier") {
      const fallbackInsightsSupplier = {
        summary: "Seasonal demand is peaking for premium Jamdani fabrics and Rajshahi Silk ahead of the upcoming festival catalogs.",
        recommendations: [
          {
            id: "insight-1",
            title: "Transition to 100-count Cotton Yarn Sourcing",
            text: "Wholesale boutique demand has shifted from standard cotton to premium 100-count. Procure high-grade raw yarn from the Tangail Cooperative Depot to secure higher profit margins.",
            impact: "Potential revenue increase: BDT 45,000",
            confidence: 94
          },
          {
            id: "insight-2",
            title: "Activate Digital Authenticity Micro-Seal",
            text: "Flagship buyers in Dhaka are actively filtering for certified GI products. Attaching our tamper-evident micro-seals increases visibility in the storefront by 30%.",
            impact: "Increase sales volume by up to 25%",
            confidence: 89
          },
          {
            id: "insight-3",
            title: "Pre-schedule Steadfast Express Pickup",
            text: "Rainy season transport delays are expected. Pre-scheduling bulk pickups via our unified Steadfast Courier integration avoids 48-hour transit wait times.",
            impact: "Saves BDT 12,500 in logistics penalties",
            confidence: 95
          }
        ],
        marketTrends: [
          "Monsoon wedding season queries are up by 22% compared to last year.",
          "Boutique inventory requests are focused heavily on organic indigo and madder root natural dyes."
        ],
        isSimulated: true
      };
      res.json(fallbackInsightsSupplier);
    } else {
      const fallbackInsightsAdmin = {
        summary: "SaaS platform volume is healthy. Artisan payout ledger escrow cycles are averaging 2.4 hours.",
        recommendations: [
          {
            id: "insight-1",
            title: "Onboard Additional Narayanganj Weavers",
            text: "Jamdani boutique queries exceed registered supplier supply by 32%. Deploying outreach personnel to the Rupganj cluster will ease sourcing bottlenecks.",
            impact: "Increase platform transaction volume by BDT 180,000",
            confidence: 91
          },
          {
            id: "insight-2",
            title: "Optimize bKash Merchant Payout Thresholds",
            text: "Weavers are executing smaller, high-frequency withdrawals. Lowering the minimum threshold to BDT 1,000 reduces manual payout approval overhead.",
            impact: "Reduces administrative load by 40%",
            confidence: 96
          },
          {
            id: "insight-3",
            title: "Deploy Target Ad Campaign for Rajshahi Silk",
            text: "Unsold silk inventory levels are rising. Deploying a targeted wholesale promotion to export boutiques will quickly clear supplier stocks.",
            impact: "Estimated BDT 110,000 in cleared sales",
            confidence: 88
          }
        ],
        marketTrends: [
          "Active cooperatives have grown by 12% over the last month.",
          "Integrated RedX / Pathao courier webhooks are operating at a 99.8% uptime SLA."
        ],
        isSimulated: true
      };
      res.json(fallbackInsightsAdmin);
    }
  }
});

// --- VITE MIDDLEWARE / STATIC ASSETS ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FabricFlow BD Commerce OS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
