
import { GoogleGenAI } from "@google/genai";

/**
 * iGROWTHIC Strategy Engine
 * Powered by Google Gemini API for high-end marketing intelligence.
 */

const DEFAULT_TIPS = [
  "Multi-Channel Synergy: Ensure your brand voice is consistent across Reels, LinkedIn, and Email.",
  "Data-Driven Iteration: Use weekly engagement analytics to cut underperforming content pillars immediately.",
  "Psychological Pricing: Structure your offers to emphasize high-value transformation over commodity cost."
];

export const getMarketingStrategy = async (businessInfo: string): Promise<string> => {
  // Always create a new instance right before the call to ensure it uses the current environment context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate 3 elite, cinematic, and data-driven marketing strategy pillars for a business in the niche: "${businessInfo}". 
      Each pillar must be a concise, high-impact sentence optimized for the 2026 digital ecosystem.`,
      config: {
        systemInstruction: "You are the Senior Strategic Architect at iGROWTHIC Mumbai. You provide visionary, high-end marketing advice. Your tone is authoritative, professional, and innovative.",
        temperature: 0.8,
      },
    });

    // Access the text property directly as per Gemini API guidelines
    const text = response.text;
    if (!text) return DEFAULT_TIPS.join('\n');

    return text;
  } catch (error) {
    console.error("iGROWTHIC Gemini Engine Error:", error);
    // Return a subset of local knowledge as fallback
    return DEFAULT_TIPS.join('\n');
  }
};
