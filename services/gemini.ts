
/**
 * iGROWTHIC Local Strategy Engine
 * Provides high-end marketing advice without external API dependencies.
 */

interface StrategyTip {
  keywords: string[];
  tips: string[];
}

const LOCAL_KNOWLEDGE_BASE: StrategyTip[] = [
  {
    keywords: ['real estate', 'property', 'home', 'realty'],
    tips: [
      "Cinematic First-Person Tours: Utilize high-retention drone footage for property walkthroughs.",
      "Hyper-Local Targeting: Deploy radius-based Meta ads focusing on high-net-worth zip codes.",
      "Lifestyle Branding: Shift from 'selling rooms' to 'selling a future lifestyle' through curated Reels."
    ]
  },
  {
    keywords: ['fashion', 'clothing', 'apparel', 'style', 'boutique'],
    tips: [
      "Influencer Seeding: Focus on 'micro-luxury' creators for authentic community trust.",
      "Visual Storytelling: Implement 'Behind the Stitch' content to show craftsmanship and value.",
      "Conversion Optimization: Streamline mobile checkout and utilize Pinterest for visual discovery."
    ]
  },
  {
    keywords: ['tech', 'software', 'saas', 'app', 'it'],
    tips: [
      "Educational Authority: Publish weekly deep-dives into industry pain points via LinkedIn.",
      "Product-Led Growth: Use interactive short-form demos instead of traditional static explainers.",
      "Feature-to-Benefit Mapping: Transition all copy from 'What it does' to 'What you save'."
    ]
  },
  {
    keywords: ['food', 'restaurant', 'cafe', 'beverage', 'dining'],
    tips: [
      "Sensory Marketing: High-frame-rate 'Food Porn' content optimized for late-evening scroll times.",
      "Google Maps Mastery: Aggressively manage reviews and local SEO for 'near me' discovery.",
      "Limited Time Offers: Create 'Viral Scarcity' through Instagram-only secret menu items."
    ]
  }
];

const DEFAULT_TIPS = [
  "Multi-Channel Synergy: Ensure your brand voice is consistent across Reels, LinkedIn, and Email.",
  "Data-Driven Iteration: Use weekly engagement analytics to cut underperforming content pillars immediately.",
  "Psychological Pricing: Structure your offers to emphasize high-value transformation over commodity cost."
];

export const getMarketingStrategy = async (businessInfo: string): Promise<string> => {
  // Simulate a brief "thinking" period for UX premium feel
  await new Promise(resolve => setTimeout(resolve, 1200));

  const lowerInput = businessInfo.toLowerCase();
  
  // Find matching strategy based on keywords
  const matchedStrategy = LOCAL_KNOWLEDGE_BASE.find(item => 
    item.keywords.some(keyword => lowerInput.includes(keyword))
  );

  const tips = matchedStrategy ? matchedStrategy.tips : DEFAULT_TIPS;
  
  return tips.join('\n');
};
