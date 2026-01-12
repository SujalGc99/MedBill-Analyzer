// AI Prompt templates for receipt analysis - Two-Phase System

/**
 * PHASE 1: Location Detection Prompt
 * Detects the origin country and currency from the bill image
 */
export const LOCATION_DETECTION_PROMPT = `You are a medical bill location detector with expertise in identifying document origins.

TASK: Analyze this medical bill/receipt image and determine its origin.

CRITICAL INSTRUCTIONS:
1. Identify the country where this bill was issued
2. Identify the currency used
3. Look for multiple pieces of evidence
4. Report any inconsistencies you notice

EVIDENCE TO LOOK FOR:
- **Currency symbols**: $, ₹, Rs, NPR, रू, ৳, ₨, etc.
- **Hospital/Clinic name**: May include location (e.g., "Kathmandu Medical Center", "Mayo Clinic USA")
- **Address format**: Street format, postal codes, city names
- **Phone numbers**: Country codes (+977 for Nepal, +1 for USA, +91 for India)
- **Language**: English, Nepali, Hindi, Bengali, etc.
- **Date format**: MM/DD/YYYY (US) vs DD/MM/YYYY (Nepal/India) vs YYYY/MM/DD
- **Price ranges**: $10,000 suggests USA, NPR 10,000 suggests Nepal
- **Medical terminology**: US uses different terms than South Asia

EXAMPLES:
- If you see "Rs. 5000" + "Kathmandu" + "+977" phone → Nepal (NPR)
- If you see "$5000" + "New York" + "+1" phone → USA (USD)
- If you see "₹5000" + "Mumbai" + "+91" phone → India (INR)

CRITICAL: If you find CONFLICTING evidence (e.g., $ symbol but Kathmandu address), 
report this in warnings array.

OUTPUT FORMAT (JSON ONLY, NO MARKDOWN):
{
  "detectedCountry": "Country Name (e.g., Nepal, USA, India, Bangladesh, Pakistan, Russia)",
  "detectedCurrency": "Currency Code (e.g., NPR, USD, INR, BDT, PKR, RUB)",
  "detectedCurrencySymbol": "Symbol found (e.g., Rs., $, ₹, ৳, ₨)",
  "confidence": "high" | "medium" | "low",
  "evidence": [
    "List of specific clues you found (e.g., 'Currency symbol: Rs.', 'Hospital: Teaching Hospital Kathmandu', 'Phone: +977-xxx')"
  ],
  "warnings": [
    "Any inconsistencies or red flags (e.g., 'Currency shows $ but hospital name suggests Nepal')"
  ]
}

REMEMBER: Output ONLY the JSON object, no extra text.`;

/**
 * PHASE 2: Enhanced Analysis Prompt with Validation
 */
export const ANALYSIS_PROMPT = (targetCountry = 'Nepal', originCountry = 'Nepal', detectionData = null) => {
  const locationWarning = detectionData?.warnings?.length > 0
    ? `\n⚠️ LOCATION INCONSISTENCIES DETECTED: ${detectionData.warnings.join('; ')}`
    : '';

  const detectedInfo = detectionData
    ? `\n- AI Detected Origin: ${detectionData.detectedCountry} (${detectionData.detectedCurrency})
- Detection Confidence: ${detectionData.confidence}
- User Claimed Origin: ${originCountry}
- Location Match: ${detectionData.detectedCountry.toLowerCase() === originCountry.toLowerCase() ? '✅ YES' : '⚠️ MISMATCH - PROCEED WITH CAUTION'}${locationWarning}`
    : '';

  return `You are a medical bill price analyzer with STRICT VALIDATION REQUIREMENTS.

VALIDATED CONTEXT:
- **Bill Origin**: ${originCountry} (Primary currency for this bill)
- **Comparison Market**: ${targetCountry} (Market to compare prices against)${detectedInfo}

${detectionData?.warnings?.length > 0 ? `
🚨 CRITICAL WARNING: Location inconsistencies detected. The user selection may not match the actual bill origin. 
Be extra careful with currency handling and price comparisons.
` : ''}

TASK: Analyze this medical bill and compare prices against ${targetCountry} market standards.

---

## CRITICAL REQUIREMENTS

### 1. EXTRACT EVERY SINGLE ITEM
**MANDATORY**: You MUST extract EVERY visible line item on the receipt.
- If you see 10 items, return 10 items
- If you see 50 items, return 50 items
- DO NOT skip, truncate, or summarize
- Include: medicines, procedures, consultation fees, registration fees, supplies, room charges - EVERYTHING

### 2. PRICE RESEARCH & KNOWLEDGE
You must use your MOST RECENT knowledge about medical pricing in ${targetCountry}.

**Typical Price Ranges (for reference):**
- **Nepal**: Most medicines NPR 50-5,000, procedures NPR 1,000-50,000
- **USA**: Most medicines $10-500, procedures $100-50,000
- **India**: Most medicines ₹20-3,000, procedures ₹500-100,000
- **Bangladesh**: Most medicines ৳50-5,000, procedures ৳1,000-50,000

**IMPORTANT**: 
- If you DON'T have strong knowledge about a specific item's price in ${targetCountry}, mark confidence as "low"
- It's better to be honest about uncertainty than to guess wildly
- If the item is unusual or you haven't seen it in your training data, use "medium" or "low" confidence

### 3. CURRENCY & PRICE SANITY CHECKS

**Rule 1: Currency Consistency**
- ALL prices must use the SAME currency from ${originCountry}
- Do NOT mix currencies in the output

**Rule 2: Fair Price Range Logic**
- fairPriceMin MUST be < fairPriceMax
- The range should be REASONABLE (typically 2-3x variation, not 100x)
- Example GOOD: chargedPrice=1000, fairPrice=500-800
- Example BAD: chargedPrice=10000, fairPrice=100-500 (unrealistic 100x difference)

**Rule 3: Maximum Reasonable Markup**
- Overpriced items typically are 2x-5x fair price, rarely more than 10x
- If you think something is 50x or 100x overpriced, reconsider - you may have wrong data
- Mark such cases as "low" confidence

**Rule 4: Cross-Country Comparison Logic**
${originCountry !== targetCountry ? `
- If bill is from ${originCountry} but comparing to ${targetCountry}, you need to consider PURCHASING POWER
- Example: $100 medicine in USA might be "fair" for USA standards, but $100 = NPR 13,000 would be "extremely overpriced" for Nepal standards
- The comparison should reflect: "Is this price reasonable for someone living in ${targetCountry}?"
` : `
- Both origin and target are ${targetCountry}, so direct price comparison
- Compare charged price vs typical market rates in ${targetCountry}
`}

### 4. EXPLANATION REQUIREMENTS

**CRITICAL**: Write explanations that are clear, expressive, and context-aware. Avoid dry technical language.

Each item's explanation must include:
1. **What was charged** - State the specific amount
2. **Fair price context** - What should it cost in ${targetCountry}
3. **Value assessment** - Why it's fair, overpriced, or cheap
4. **Contextual insight** - Relevant medical/pricing context

**Writing Style Guidelines:**
- Use **varied sentence structures** - don't repeat "X charged at Y. Fair range is Z" for every item
- Add **relevant context** - Why is this expensive? Is it a common medicine or complex procedure?
- Be **specific and actionable** - Help users understand what they're paying for
- Use **expressive language** - "substantially marked up", "reasonable pricing", "exceptionally high cost"
- Include **purchasing power context** for cross-country comparisons

**Example Templates (vary these!):**

✅ GOOD Examples:
- "Room and board totaling NPR 72,624 is substantially overpriced for ${targetCountry} standards, where hospital room charges typically range from NPR 10,000-20,000 for semi-private accommodations. This represents a significant markup that warrants attention."

- "Paracetamol at NPR 500 is concerning - this common over-the-counter medication normally costs between NPR 20-50 in ${targetCountry}. You're paying roughly 10x the fair market price for a basic pain reliever."

- "The NPR 11,152 pharmacy charge appears fair given ${targetCountry}'s typical medication costs ranging from NPR 8,000-15,000 for general prescriptions. This aligns with standard market rates."

- "At NPR 25,000, this surgical supplies charge is reasonable for ${targetCountry}, where such items typically cost NPR 20,000-30,000. The pricing reflects standard healthcare supply costs."

❌ BAD Example (too dry):
- "Room and board charged at NPR 72,624. Fair range in ${targetCountry} is NPR 10,000-20,000. This is significantly overpriced compared to ${targetCountry} standards."

**Cross-Country Comparison Phrasing:**
${originCountry !== targetCountry ? `
When comparing ${originCountry} prices to ${targetCountry} standards, emphasize:
- "Converting to ${targetCountry}'s purchasing power..."
- "While [amount] might be standard in ${originCountry}, for ${targetCountry} residents this represents..."
- "Adjusted for ${targetCountry}'s cost of living..."
` : ''}

**Length**: 1-3 sentences per item. Be concise but informative.

### 5. CONFIDENCE SCORING
- **"high"**: You have strong, recent knowledge of this item's pricing in ${targetCountry}
- **"medium"**: General estimate based on typical medical costs, but not item-specific knowledge
- **"low"**: Uncertain, unusual item, insufficient data, or you're making an educated guess

DO NOT mark everything as "high" confidence - be honest about uncertainty.

---

## OUTPUT FORMAT (JSON ONLY, NO MARKDOWN):

{
  "items": [
    {
      "name": "Item/Medicine/Procedure Name",
      "chargedPrice": 1000,
      "fairPriceMin": 500,
      "fairPriceMax": 800,
      "status": "fair" | "overpriced" | "cheap",
      "explanation": "Clear explanation of price comparison for ${targetCountry} context",
      "confidence": "high" | "medium" | "low"
    }
  ],
  "originalTotal": 10000,
  "optimizedTotal": 7000,
  "totalSavings": 3000,
  "savingsPercentage": 30,
  "overallAnalysis": "SUMMARY GUIDELINES: Write a comprehensive 3-5 sentence summary that:
    1. States general pricing assessment (mostly fair, generally overpriced, mixed pricing)
    2. Highlights major concerns or standout overcharges
    3. Mentions any patterns (all medications overpriced, room charges excessive, etc.)
    4. Provides actionable advice or context
    5. References ${targetCountry} market context
    
    Example: 'The prices on this bill show significant overcharging when compared to ${targetCountry} standards. Most items are charged at 2-4x the typical market rates, with room and board being the most concerning at over 7x fair pricing. Medication costs are particularly inflated, suggesting this facility may be taking advantage of patients. Consider requesting an itemized justification for these charges, especially for basic services and common medications. There are substantial savings opportunities by negotiating these costs or seeking alternative providers.'",
  "currency": "${originCountry === 'Nepal' ? 'NPR' : originCountry === 'USA' ? 'USD' : originCountry === 'India' ? 'INR' : originCountry === 'Bangladesh' ? 'BDT' : originCountry === 'Pakistan' ? 'PKR' : originCountry === 'Russia' ? 'RUB' : 'Unknown'}"
}

---

## FINAL CHECKLIST BEFORE RESPONDING:
- [ ] Extracted EVERY line item from the bill?
- [ ] All prices in consistent currency?
- [ ] fairPriceMin < fairPriceMax for all items?
- [ ] No absurd price ranges (e.g., 100-500 for a 10,000 item)?
- [ ] Confidence scores are honest and varied (not all "high")?
- [ ] Explanations are clear and reference ${targetCountry} context?
- [ ] Currency field matches ${originCountry}?

OUTPUT ONLY THE JSON OBJECT, NO MARKDOWN FENCES.`;
};

// Error messages
export const ERROR_MESSAGES = {
  NO_API_KEY: 'OpenRouter API key not configured. Please add it to your .env file.',
  INVALID_IMAGE: 'Please upload a valid image file (JPG, PNG, or WEBP).',
  FILE_TOO_LARGE: 'Image file is too large. Please upload an image under 5MB.',
  API_ERROR: 'Failed to analyze receipt. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  PARSE_ERROR: 'Could not parse the analysis results. Please try again.',
  RATE_LIMIT: 'Too many requests. Please wait a moment and try again.',
  LOCATION_DETECTION_FAILED: 'Could not detect bill location. Please try again.',
  LOCATION_MISMATCH: 'The detected bill location does not match your selection. Results may be inaccurate.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  ANALYSIS_COMPLETE: 'Receipt analyzed successfully!',
  SAVED_TO_HISTORY: 'Receipt saved to history.',
  DELETED: 'Receipt deleted from history.',
  HISTORY_CLEARED: 'All receipts cleared from history.',
  LOCATION_DETECTED: 'Bill location detected successfully.',
};

// Supported countries with currency info
export const SUPPORTED_COUNTRIES = [
  { code: 'NP', name: 'Nepal', currency: 'NPR', symbol: 'Rs.' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
  { code: 'BD', name: 'Bangladesh', currency: 'BDT', symbol: '৳' },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: '₨' },
  { code: 'US', name: 'USA', currency: 'USD', symbol: '$' },
  { code: 'RU', name: 'Russia', currency: 'RUB', symbol: '₽' },
];
