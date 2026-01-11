// Reference medicine prices for Nepal (NPR - Nepalese Rupees)
// Source: Nepal Pharmacy Council & market data

export const NEPAL_MEDICINE_PRICES = {
    // Common Pain Relievers
    'Paracetamol 500mg': { min: 1.5, max: 3, per: 'tablet' },
    'Ibuprofen 400mg': { min: 3, max: 5, per: 'tablet' },
    'Aspirin 75mg': { min: 2, max: 4, per: 'tablet' },
    'Diclofenac 50mg': { min: 3, max: 6, per: 'tablet' },

    // Antibiotics
    'Amoxicillin 500mg': { min: 8, max: 15, per: 'capsule' },
    'Azithromycin 500mg': { min: 25, max: 40, per: 'tablet' },
    'Ciprofloxacin 500mg': { min: 10, max: 18, per: 'tablet' },
    'Metronidazole 400mg': { min: 4, max: 8, per: 'tablet' },

    // Antacids & Digestive
    'Omeprazole 20mg': { min: 5, max: 10, per: 'capsule' },
    'Ranitidine 150mg': { min: 3, max: 6, per: 'tablet' },
    'Pantoprazole 40mg': { min: 8, max: 15, per: 'tablet' },
    'ORS Powder': { min: 8, max: 15, per: 'sachet' },

    // Vitamins & Supplements
    'Vitamin C 500mg': { min: 2, max: 5, per: 'tablet' },
    'Multivitamin': { min: 5, max: 12, per: 'tablet' },
    'Calcium 500mg': { min: 4, max: 8, per: 'tablet' },
    'Vitamin D3 1000IU': { min: 3, max: 7, per: 'tablet' },

    // Cold & Flu
    'Cetirizine 10mg': { min: 2, max: 4, per: 'tablet' },
    'Loratadine 10mg': { min: 2, max: 5, per: 'tablet' },
    'Cough Syrup 100ml': { min: 80, max: 150, per: 'bottle' },
    'Paracetamol Syrup': { min: 40, max: 80, per: 'bottle' },

    // Diabetes
    'Metformin 500mg': { min: 2, max: 4, per: 'tablet' },
    'Glimepiride 2mg': { min: 4, max: 8, per: 'tablet' },

    // Blood Pressure
    'Amlodipine 5mg': { min: 3, max: 6, per: 'tablet' },
    'Atenolol 50mg': { min: 2, max: 5, per: 'tablet' },
    'Losartan 50mg': { min: 5, max: 10, per: 'tablet' },

    // Other Common Medicines
    'Antihistamine': { min: 2, max: 6, per: 'tablet' },
    'Antifungal Cream': { min: 60, max: 150, per: 'tube' },
    'Eye Drops': { min: 80, max: 200, per: 'bottle' },
    'Bandage': { min: 30, max: 80, per: 'roll' },
    'Cotton': { min: 40, max: 100, per: 'pack' },
    'Surgical Mask': { min: 5, max: 15, per: 'piece' },
    'Hand Sanitizer 100ml': { min: 60, max: 120, per: 'bottle' },
};

// Markup guidelines
export const PRICING_GUIDELINES = {
    GENERIC_DISCOUNT: 0.5, // Generic is typically 50% of branded
    MAX_FAIR_MARKUP: 1.2, // 20% markup is considered fair
    OVERPRICED_THRESHOLD: 1.3, // 30%+ markup is overpriced
    HOSPITAL_MARKUP: 1.15, // Hospital pharmacies can charge 15% more
};

export const getCurrency = (country) => {
    const currencies = {
        'Nepal': 'NPR',
        'India': 'INR',
        'Bangladesh': 'BDT',
        'Pakistan': 'PKR',
    };
    return currencies[country] || 'NPR';
};
