// AI Prompt templates for receipt analysis

export const ANALYSIS_PROMPT = (country = 'Nepal') => `You are a medical bill analyzer for ${country}. 
Analyze this receipt image and extract all items with prices.

CONTEXT:
- Currency: ${country === 'Nepal' ? 'NPR (Nepalese Rupees)' : 'Local currency'}
- Consider local market prices for ${country}
- Account for generic vs branded medicines
- Factor in typical pharmacy markup (10-20%)
- Be aware of handwritten vs printed text

TASK:
1. Extract all medicines/items with their prices
2. Classify each item as FAIR or OVERPRICED based on ${country} market rates
3. Provide a fair price range for each item
4. Calculate optimized total bill

OUTPUT FORMAT (JSON only, no markdown formatting):
{
  "items": [
    {
      "name": "Medicine/Item name with dosage",
      "chargedPrice": 000,
      "fairPriceMin": 000,
      "fairPriceMax": 000,
      "status": "fair" or "overpriced",
      "explanation": "Brief reasoning for the classification",
      "confidence": "high" or "medium" or "low"
    }
  ],
  "originalTotal": 0000,
  "optimizedTotal": 0000,
  "totalSavings": 0000,
  "savingsPercentage": 00,
  "overallAnalysis": "Brief summary of findings",
  "currency": "${country === 'Nepal' ? 'NPR' : 'Local Currency'}"
}

RULES:
- If text is unclear or confidence is low, mark confidence as "low"
- Consider medicine strength and dosage in pricing
- Account for quantity purchased
- Be conservative - only flag clear overcharges (>30% markup)
- Generic medicines should be 40-60% cheaper than branded
- Common medicines have standard price ranges
- Hospital pharmacies may charge 10-15% more than retail
`;

export const ERROR_MESSAGES = {
    NO_API_KEY: 'OpenRouter API key not configured. Please add it to your .env file.',
    INVALID_IMAGE: 'Please upload a valid image file (JPG, PNG, or WEBP).',
    FILE_TOO_LARGE: 'Image file is too large. Please upload an image under 5MB.',
    API_ERROR: 'Failed to analyze receipt. Please try again.',
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    PARSE_ERROR: 'Could not parse the analysis results. Please try again.',
    RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
};

export const SUCCESS_MESSAGES = {
    ANALYSIS_COMPLETE: 'Receipt analyzed successfully!',
    SAVED_TO_HISTORY: 'Receipt saved to history.',
    DELETED: 'Receipt deleted from history.',
    HISTORY_CLEARED: 'All receipts cleared from history.',
};

export const SUPPORTED_COUNTRIES = [
    { code: 'NP', name: 'Nepal', currency: 'NPR' },
    { code: 'IN', name: 'India', currency: 'INR' },
    { code: 'BD', name: 'Bangladesh', currency: 'BDT' },
    { code: 'PK', name: 'Pakistan', currency: 'PKR' },
];
