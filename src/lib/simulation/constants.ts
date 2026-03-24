
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
    chemicalProfile: string;
    preTreatmentCostPerTon: number; // IDR/ton
    biogeopolymerProductionImpact: string;
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
        chemicalProfile: 'Kandungan silika/alumina bervariasi, terkontaminasi logam berat (As, Hg) dan sisa Sianida (CN-).',
        preTreatmentCostPerTon: 45_000,
        biogeopolymerProductionImpact: 'Fokus produksi pada Solidification/Stabilization (S/S). Penambahan biopolimer berfungsi mengurangi porositas matriks untuk mencegah pelindihan (leaching) logam berat yang terenkapsulasi.',
    },
    [TAILING_TYPES.COPPER]: {
        SiO2: 48.6,
        Al2O3: 18.4,
        Fe2O3: 12.1,
        CaO: 8.7,
        others: 12.2,
        qualityGrade: 'premium',
        productName: 'Paving Block Geopolimer Premium',
        chemicalProfile: 'Kaya akan mineral sulfida (Pirit/FeS2), berpotensi tinggi menghasilkan Air Asam Tambang (AMD), reaktivitas prekursor lebih rendah.',
        preTreatmentCostPerTon: 15_000,
        biogeopolymerProductionImpact: 'Aktivator alkali tinggi mutlak diperlukan untuk menetralisir sulfida. Membutuhkan tambahan prekursor (fly ash/slag) dan biopolimer untuk meningkatkan kuat tekan (compressive strength) karena reaktivitas bawaan yang rendah.',
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
    TIPPING_FEE_PER_TON: 0,  // Rp 0/ton (Tailing ModADA disuplai CSR PTFI - Tabel 3)

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

// Community-Scale Constants (for Empowerment / BUMDes Calculator)
export const COMMUNITY_CONSTANTS = {
    // Tabel 3: Database Harga Eceran Komponen OPEX (Konteks Mimika, Rata-rata)
    NAOH_FLAKES_PRICE_PER_KG: 42_500,    // Rp 42.500/Kg (Rata-rata dari 35rb-50rb)
    NA2SIO3_PRICE_PER_LITER: 21_500,     // Rp 21.500/L (Rata-rata dari 18rb-25rb)
    CEMENT_PRICE_PER_SAK: 90_000,        // Rp 90.000/Sak 50Kg (Rata-rata 80rb-100rb) -> Rp 1.800/Kg
    CEMENT_ADDITIVE_PRICE_PER_KG: 1_800, // Kalkulasi otomatis dari harga Sak

    // Tabel 1: Parameter Konversi Satuan Fisis (Massa Jenis Ruah & Specific Gravity)
    TAILING_BULK_DENSITY: 1.5,           // kg/Liter (1 Karung ~ 50 kg)
    NAOH_SOLUTION_SG: 1.33,              // kg/Liter (larutan 8M)
    NA2SIO3_SG: 1.40,                    // kg/Liter
    CEMENT_BULK_DENSITY: 1.35,           // kg/Liter (Sak 50 kg)

    // Tabel 4: Parameter Safety Flag (Baku Mutu TCLP Lingkungan PP No. 22/2021 Lamp. XI)
    TCLP_LIMITS: {
        As: 0.5,    // Arsen (mg/L)
        Pb: 0.5,    // Timbal (mg/L)
        Cu: 10.0,   // Tembaga (mg/L)
        Cd: 0.15,   // Kadmium (mg/L)
    },

    // Tabel 2: Data Konversi Dimensi & Berat Produk Akhir (SNI)
    PRODUCT_SPECS: {
        PAVING_BLOCK: {
            name: 'Paving Block (Bata Beton)',
            sni: 'SNI 03-0691-1996',
            dimensions: '21 cm x 10,5 cm x 6 cm',
            weightKg: 3.1, // Rata-rata dari 3.0 - 3.2 kg
        },
        BATAKO_BERONGGA: {
            name: 'Batako Berongga (Hollow Block)',
            sni: 'SNI 03-0349-1989',
            dimensions: '40 cm x 20 cm x 10 cm',
            weightKg: 9.0, // Rata-rata dari 8.0 - 10.0 kg
        }
    },

    // Rasio resep standar geopolimer untuk >20 MPa
    // (diturunkan dari database TAILINGSIM mass balance, binder ratio ~15%)
    RECIPE_RATIOS: {
        NA2SIO3_LITER_PER_KG_TAILING: 0.12,  // 0.12 L per Kg tailing
        NAOH_LITER_PER_KG_TAILING: 0.05,     // 0.05 L per Kg tailing
        CEMENT_KG_PER_KG_TAILING: 0.08,      // 0.08 Kg per Kg tailing (8% additive)
    },

    // Buffer Storage status (simulated static data dengan nilai validasi uji)
    BUFFER_STORAGE: {
        GOLD: { 
            locationName: 'Buffer Storage ModADA - Zona Emas', availableTons: 1250, lastValidated: '2026-03-20',
            tclpResults: { As: 0.28, Pb: 0.12, Cu: 8.5, Cd: 0.05 } // Lulus threshold
        },
        COPPER: { 
            locationName: 'Buffer Storage ModADA - Zona Tembaga', availableTons: 890, lastValidated: '2026-03-18',
            tclpResults: { As: 0.05, Pb: 0.21, Cu: 9.8, Cd: 0.02 } // Lulus threshold
        },
    },
};
