
// Tailing Types
export const TAILING_TYPES = {
    GOLD: 'Tailing Emas (Gold Tailing)',
    COPPER: 'Tailing Tembaga (Copper Tailing)',
} as const;

export type TailingType = typeof TAILING_TYPES[keyof typeof TAILING_TYPES];

// Tailing composition (typical mineral content, % dry basis)
export interface TailingComposition {
    SiO2: number;   // Silica (%)
    Al2O3: number;  // Alumina (%)
    Fe2O3: number;  // Iron Oxide (%)
    CaO: number;    // Calcium Oxide (%)
    others: number; // MgO, K2O, Na2O, etc (%)
    qualityGrade: 'standard' | 'premium';
    productName: string;
}

export const DEFAULT_TAILING: Record<TailingType, TailingComposition> = {
    [TAILING_TYPES.GOLD]: {
        SiO2: 55.2,
        Al2O3: 12.8,
        Fe2O3: 8.5,
        CaO: 5.3,
        others: 18.2,
        qualityGrade: 'standard',
        productName: 'Batako Geopolimer Standar',
    },
    [TAILING_TYPES.COPPER]: {
        SiO2: 48.6,
        Al2O3: 18.4,
        Fe2O3: 12.1,
        CaO: 8.7,
        others: 12.2,
        qualityGrade: 'premium',
        productName: 'Paving Block Geopolimer Premium',
    }
};

// Economic Constants (IDR) for Tailing Upcycling Plant
export const ECONOMIC_DEFAULTS = {
    // CAPEX Reference: Equipment for small-medium scale brick factory
    CAPEX_MIXER_REF: 2_500_000_000,           // Rp 2.5 Miliar (Geopolymer Mixer)
    CAPEX_MOLDER_REF: 3_000_000_000,          // Rp 3.0 Miliar (Hydraulic Brick Press/Molder)
    CAPEX_CURING_CHAMBER_REF: 1_500_000_000,  // Rp 1.5 Miliar (Curing Chamber/Oven)
    CAPEX_SILO_CONVEYOR_REF: 1_000_000_000,   // Rp 1.0 Miliar (Silo + Conveyor System)
    CAPEX_REF_CAPACITY: 500,                   // ton/day (reference capacity)

    // Scaling Factor (Six-Tenths Rule)
    SCALING_FACTOR: 0.6,

    // Installation & Engineering Factors
    LANG_FACTORS: {
        INSTALLATION: 0.15,   // Pemasangan/Piping
        CIVIL: 0.12,          // Sipil/Bangunan/Pondasi
        ENGINEERING: 0.10,    // Desain & Engineering
        CONTINGENCY: 0.08,    // Kontingensi
    },

    // OPEX Components
    LABOR_COST_PER_YEAR: 1_800_000_000, // Rp 1.8 Miliar (Manajer + Operator + Staff)
    OPEX_FIXED_PERCENT: 0.04,           // 4% of CAPEX (Maintenance + Insurance)
    ELECTRICITY_COST_KWH: 1444,         // Rp/kWh (Tarif Industri PLN)

    // Binder Cost (Alkali Aktivator / Semen Portland)
    BINDER_COST_PER_KG: 3500,   // Rp 3.500/kg rata-rata (NaOH + Na2SiO3 blend)

    // Product Selling Price
    PRODUCT_PRICE_STANDARD: 850_000,  // Rp 850.000/ton (Batako Standar)
    PRODUCT_PRICE_PREMIUM: 1_200_000, // Rp 1.200.000/ton (Paving Block Premium)

    // Tipping Fee (revenue from accepting waste)
    TIPPING_FEE_PER_TON: 50_000,  // Rp 50.000/ton tailing diterima

    // Financial Parameters
    DISCOUNT_RATE: 0.10,   // 10% WACC
    TAX_RATE: 0.22,        // 22% PPh Badan
    PROJECT_YEARS: 10,     // Masa evaluasi proyek
};

// Energy calculation constants
export const ENERGY_CONSTANTS = {
    // Base energy consumption per ton product (kWh)
    MIXING_ENERGY_KWH_PER_TON: 25,       // Mixing process
    MOLDING_ENERGY_KWH_PER_TON: 15,      // Hydraulic press
    CONVEYOR_ENERGY_KWH_PER_TON: 5,      // Material handling

    // Curing energy (only for elevated temperatures)
    // At room temp (25°C) = 0, scales with temperature
    CURING_BASE_KWH_PER_TON_PER_DEG: 0.8, // kWh/ton per degree above 25°C

    // Operating days per year
    OPERATING_DAYS: 300,
};
