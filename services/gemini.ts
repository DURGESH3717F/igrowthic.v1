
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = (process.env as any).API_KEY;

export const getMarketingStrategy = async (businessInfo: string): Promise<string> => {
  // Check for offline status
  if (!navigator.onLine) {
    return "It looks like you're offline. AI Strategy requires a connection, but feel free to explore our services or message us on WhatsApp once you're back online!";
  }

  if (!API_KEY) return "AI services are currently unavailable. Please check configuration.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end digital marketing strategist for iGROWTHIC. A potential client is asking for advice. 
      Business Info: ${businessInfo}
      Provide 3 actionable, premium growth tips for this specific business in a professional, energetic, and concise tone. 
      Format: 3 short bullet points.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "I couldn't generate a strategy right now. Let's chat on WhatsApp!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Let's scale your business manually - contact us via WhatsApp!";
  }
};
