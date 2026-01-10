
import { GoogleGenAI } from "@google/genai";

/**
 * iGROWTHIC Strategy Engine
 * Powered by Google Gemini for high-impact digital growth strategies.
 */

const STRATEGY_DATABASE: Record<string, string[]> = {
  general: [
    "Multi-Channel Synergy: Ensure your brand voice is consistent across Reels, LinkedIn, and Email.",
    "Data-Driven Iteration: Use weekly engagement analytics to cut underperforming content pillars immediately.",
    "Psychological Pricing: Structure your offers to emphasize high-value transformation over commodity cost."
  ],
  realestate: [
    "Hyper-Local Dominance: Create neighborhood-specific 'POV' reels showing the luxury lifestyle of specific pin codes.",
    "Zero-Click Authority: Optimize your content for Google's 'Search Generative Experience' by answering niche price-point queries directly.",
    "Agent Authenticity: Transition from 'Listing Focused' to 'Lifestyle Focused' content to build human trust."
  ],
  tech: [
    "Founder-Led Authority: Scale the personal brand of your leadership to humanize complex technical solutions.",
    "Feature-to-Benefit Transformation: Use 3D motion graphics to visualize 'invisible' tech advantages in 15 seconds.",
    "Community Flywheel: Build a gated Discord or newsletter ecosystem that turns casual viewers into loyal product advocates."
  ],
  lifestyle: [
    "Cinematic Narrative: Shift from products to stories. Show the aspiration, not just the item.",
    "Influencer Amplification: Use 'Whitelisted Ads' to run performance marketing through trusted creator profiles.",
    "Scarcity Engineering: Utilize drop-based marketing cycles to create artificial but effective engagement peaks."
  ]
};

// Fix: Replaced mock logic with official @google/genai SDK implementation
export const getMarketingStrategy = async (businessInfo: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Business Sector/Info: ${businessInfo}. 
      Location: Mumbai, India.
      Goal: Digital growth and viral branding.
      
      Generate exactly 3 actionable marketing strategy pillars. 
      Return each pillar on a new line without bullets, numbering, or prefixes.`,
      config: {
        systemInstruction: "You are the Lead Growth Strategist at iGROWTHIC, Mumbai's premier digital agency. You specialize in viral cinematic content and data-driven performance marketing. Your advice is concise and high-impact.",
        temperature: 0.8,
      }
    });

    const text = response.text;
    if (text && text.trim().length > 0) {
      return text.trim();
    }
  } catch (error) {
    console.error("Gemini API Error in getMarketingStrategy:", error);
    // Fallback to deterministic local logic if API is unavailable or fails
  }

  const query = businessInfo.toLowerCase().trim();
  
  if (query.includes('real estate') || query.includes('property') || query.includes('home')) {
    return STRATEGY_DATABASE.realestate.join('\n');
  }
  if (query.includes('tech') || query.includes('software') || query.includes('saas') || query.includes('app')) {
    return STRATEGY_DATABASE.tech.join('\n');
  }
  if (query.includes('lifestyle') || query.includes('fashion') || query.includes('gym') || query.includes('health')) {
    return STRATEGY_DATABASE.lifestyle.join('\n');
  }

  return STRATEGY_DATABASE.general.join('\n');
};
