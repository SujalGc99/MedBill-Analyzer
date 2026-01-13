export const DEMO_DATA = {
    USA: {
        items: [
            {
                name: "Emergency Room Visit (Level 4)",
                chargedPrice: 3500.00,
                fairPriceMin: 800.00,
                fairPriceMax: 1200.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Level 4 ER visits typically range from $800-$1,200 according to CMS fee schedules. The charged amount is nearly 3x the market rate."
            },
            {
                name: "CT Scan - Abdomen (w/ Contrast)",
                chargedPrice: 4200.00,
                fairPriceMin: 550.00,
                fairPriceMax: 950.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Diagnostic imaging centers typically charge $550-$950. Hospital-based imaging is often mark-up significantly."
            },
            {
                name: "IV Saline Solution (1L)",
                chargedPrice: 180.00,
                fairPriceMin: 25.00,
                fairPriceMax: 45.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "The cost of saline bags is negligible. A fair charge including administration is typically under $50."
            },
            {
                name: "Pharmacy - Tylenol (500mg)",
                chargedPrice: 35.00,
                fairPriceMin: 0.50,
                fairPriceMax: 2.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Over-the-counter medication charged at extreme hospital markup rates."
            }
        ],
        originalTotal: 7915.00,
        optimizedTotal: 2197.00,
        totalSavings: 5718.00,
        overallAnalysis: "This bill reflects common hospital overcharging patterns seen in the US healthcare system. Specifically, the CT Scan and 'Room & Board' equivalent charges (ER Level 4) are inflated by over 300%. The pharmacy charges for generic medications like Tylenol are also excessive. You have strong grounds to negotiate this bill down to the fair market rate using the provided data.",
        _detectionData: {
            detectedCountry: "USA",
            detectedCurrency: "USD",
            confidence: "high",
            evidence: ["Currency symbol '$'", "CPT Codes", "English Language"]
        }
    },
    INDIA: {
        items: [
            {
                name: "Consultation - Chief Cardiologist",
                chargedPrice: 2000.00,
                fairPriceMin: 1200.00,
                fairPriceMax: 1500.00,
                status: "overpriced",
                confidence: "medium",
                reasoning: "Senior consultant fees in metro hospitals typically cap at ₹1,500 unless emergency visit."
            },
            {
                name: "2D Echo Test",
                chargedPrice: 3500.00,
                fairPriceMin: 2000.00,
                fairPriceMax: 2500.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Standard diagnostic centers charge between ₹2,000-₹2,500 for Echo Cardiography."
            },
            {
                name: "TMT (Treadmill Test)",
                chargedPrice: 2800.00,
                fairPriceMin: 2200.00,
                fairPriceMax: 2600.00,
                status: "fair",
                confidence: "medium",
                reasoning: "Slightly higher than average but within acceptable range for premium hospitals."
            },
            {
                name: "Blood Investigations (Lipid Profile)",
                chargedPrice: 1200.00,
                fairPriceMin: 800.00,
                fairPriceMax: 1000.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Comprehensive Lipid Profile typically costs ₹800-₹1,000 at NABL accredited labs."
            }
        ],
        originalTotal: 9500.00,
        optimizedTotal: 7600.00,
        totalSavings: 1900.00,
        overallAnalysis: "While the bill is not excessively predatory, there is a consistent 20-30% markup on diagnostic tests compared to standalone NABL labs. The consultation fee is also on the higher side. Requesting a package rate for the cardiac evaluation could reduce the total significantly.",
        _detectionData: {
            detectedCountry: "India",
            detectedCurrency: "INR",
            confidence: "high",
            evidence: ["Currency symbol '₹'", "Hospital Format", "English/Hindi Context"]
        }
    },
    NEPAL: {
        items: [
            {
                name: "MRI Scan (Brain) 1.5T",
                chargedPrice: 15000.00,
                fairPriceMin: 11000.00,
                fairPriceMax: 13000.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Market average for 1.5T MRI Brain in Kathmandu is approx NPR 11,000 - 13,000."
            },
            {
                name: "Bed Charge (General Ward) - 2 Days",
                chargedPrice: 6000.00,
                fairPriceMin: 3000.00,
                fairPriceMax: 4000.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Daily ward charges are typically NPR 1,500-2,000. Charged NPR 3,000/day is high for general ward."
            },
            {
                name: "Pharmacy / Medicines",
                chargedPrice: 4500.00,
                fairPriceMin: 4000.00,
                fairPriceMax: 4500.00,
                status: "fair",
                confidence: "medium",
                reasoning: "Medicine prices are regulated (MRP). Seems consistent."
            },
            {
                name: "Nursing Charge",
                chargedPrice: 1500.00,
                fairPriceMin: 500.00,
                fairPriceMax: 1000.00,
                status: "overpriced",
                confidence: "medium",
                reasoning: "Nursing charges are often bundled or capped lower."
            }
        ],
        originalTotal: 27000.00,
        optimizedTotal: 22500.00,
        totalSavings: 4500.00,
        overallAnalysis: "The MRI and Nursing charges stand out as potential overcharges. In Nepal, bed charges also vary significantly, and NPR 3,000/day for a General Ward is above the norm for most private hospitals. You could negotiate the Bed and Nursing components.",
        _detectionData: {
            detectedCountry: "Nepal",
            detectedCurrency: "NPR",
            confidence: "high",
            evidence: ["Currency 'NPR'", "Hospital Names", "Context"]
        }
    },
    GENERAL: {
        items: [
            {
                name: "MRI Scan",
                chargedPrice: 500.00,
                fairPriceMin: 350.00,
                fairPriceMax: 450.00,
                status: "overpriced",
                confidence: "high",
                reasoning: "Average cost for a standard MRI scan in this region is typically between $350-$450."
            },
            {
                name: "Consultation",
                chargedPrice: 150.00,
                fairPriceMin: 100.00,
                fairPriceMax: 150.00,
                status: "fair",
                confidence: "high",
                reasoning: "Charged price falls exactly within the standard fair market range for specialist consultation."
            },
            {
                name: "Lab Fees",
                chargedPrice: 75.00,
                fairPriceMin: 40.00,
                fairPriceMax: 60.00,
                status: "overpriced",
                confidence: "medium",
                reasoning: "Lab fees appear slightly elevated compared to standalone diagnostic centers."
            },
            {
                name: "Pharmacy",
                chargedPrice: 35.50,
                fairPriceMin: 15.00,
                fairPriceMax: 25.00,
                status: "overpriced",
                confidence: "medium",
                reasoning: "Hospital pharmacy markup detected on basic medications."
            }
        ],
        originalTotal: 760.50,
        optimizedTotal: 685.00,
        totalSavings: 75.50,
        overallAnalysis: "This bill from General City Hospital shows moderate overcharging, particularly on the MRI Scan and Pharmacy items. The Consultation fee is fair. You could negotiate the MRI cost down to the market average.",
        _detectionData: {
            detectedCountry: "USA",
            detectedCurrency: "USD",
            confidence: "high",
            evidence: ["Logo 'General City'", "Currency '$'", "English Language"]
        }
    }
};
