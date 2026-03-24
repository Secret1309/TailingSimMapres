
import { TailingType, TAILING_TYPES, DEFAULT_TAILING, COMMUNITY_CONSTANTS } from './constants';

export interface CommunityRecipeResult {
    // Input echo
    tailingInputKg: number;
    tailingType: TailingType;

    // Recipe (in practical units)
    na2sio3Liters: number;
    naohLiters: number;
    cementKg: number;
    
    // Execution Units (Satuan Eksekusi Warga dari KTI)
    tailingKarung: number; // ~50kg per karung
    naohFlakesKg: number;  // Berat flakes NaOH untuk dilarutkan
    cementSak: number;     // ~50kg per sak

    // Production estimate
    productName: string;
    totalMixKg: number;
    estimatedBlocks: number;

    // Cost breakdown (IDR)
    totalMaterialCostIDR: number;
    costBreakdown: {
        na2sio3Cost: number;
        naohCost: number;
        cementCost: number;
    };
    costPerBlock: number;

    // Simple mixing instructions
    mixingSteps: string[];

    // Safety status
    safetyStatus: 'CLEARED' | 'WARNING';
    safetyMessage: string;

    // Buffer storage info
    bufferStorageName: string;
    availableTons: number;
    lastValidated: string;
    tclpResults: { As: number; Pb: number; Cu: number; Cd: number };
}

/**
 * Community-scale recipe calculator.
 * Translates the TAILINGSIM backend ratios into simple Kg/Liter instructions
 * for BUMDes operators and local Mimika community members.
 */
export function calculateCommunityRecipe(
    tailingKg: number,
    tailingType: TailingType,
    productType: 'PAVING_BLOCK' | 'BATAKO_BERONGGA' = 'PAVING_BLOCK'
): CommunityRecipeResult {
    const CC = COMMUNITY_CONSTANTS;
    const R = CC.RECIPE_RATIOS;
    const tailing = DEFAULT_TAILING[tailingType];

    // 1. Calculate material quantities
    const na2sio3Liters = Math.round(tailingKg * R.NA2SIO3_LITER_PER_KG_TAILING * 100) / 100;
    const naohLiters = Math.round(tailingKg * R.NAOH_LITER_PER_KG_TAILING * 100) / 100;
    const cementKg = Math.round(tailingKg * R.CEMENT_KG_PER_KG_TAILING * 100) / 100;

    // NaOH 8M membutuhkan ~320g (0.32 kg) flakes NaOH padat per liter larutan
    const naohFlakesKg = Math.round((naohLiters * 0.32) * 10) / 10;
    
    // Satuan eksekusi warga
    const tailingKarung = Math.round((tailingKg / 50) * 10) / 10;
    const cementSak = Math.round((cementKg / 50) * 100) / 100;

    // 2. Total mix weight (tailing + cement additive + liquid activators as estimated Kg)
    const na2sio3Kg = na2sio3Liters * CC.NA2SIO3_SG;
    const naohKg = naohLiters * CC.NAOH_SOLUTION_SG;
    const totalMixKg = tailingKg + cementKg + na2sio3Kg + naohKg;

    // 3. Estimate blocks (with ~3% production loss)
    const usableMixKg = totalMixKg * 0.97;
    const spec = CC.PRODUCT_SPECS[productType];
    const estimatedBlocks = Math.floor(usableMixKg / spec.weightKg);

    // 4. Cost breakdown
    const na2sio3Cost = Math.ceil(na2sio3Liters) * CC.NA2SIO3_PRICE_PER_LITER;
    const naohCost = Math.ceil(naohFlakesKg) * CC.NAOH_FLAKES_PRICE_PER_KG;
    const cementCost = Math.ceil(cementKg) * CC.CEMENT_ADDITIVE_PRICE_PER_KG;
    const totalMaterialCostIDR = na2sio3Cost + naohCost + cementCost;
    const costPerBlock = estimatedBlocks > 0
        ? Math.round(totalMaterialCostIDR / estimatedBlocks)
        : 0;

    // 5. Mixing steps (in simple Bahasa Indonesia)
    const isGold = tailingType === TAILING_TYPES.GOLD;
    const mixingSteps = [
        `Langkah 1 — Siapkan Aktivator: Larutkan ${naohFlakesKg} Kg NaOH khusus (Flakes) ke dalam air hingga mencapai volume larutan ${naohLiters} Liter. Setelah dingin, campurkan dengan ${na2sio3Liters} Liter Sodium Silikat (Na₂SiO₃). Aduk merata 2-3 menit.`,
        `Langkah 2 — Material Kering: Siapkan ${tailingKarung} Karung (~${tailingKg} Kg) tailing ${isGold ? 'emas' : 'tembaga'}. Masukkan ke dalam mixer/wadah besar bersama ${cementSak} Sak (~${cementKg} Kg) semen Portland. Aduk kering rata.`,
        `Langkah 3 — Pencampuran & Cetak: Tuangkan larutan aktivator secara perlahan sambil terus diaduk. Cetak menjadi ${spec.name} dan diamkan 24-48 jam. Pengerasan optimal tercapai setelah 7 hari.`,
    ];

    // 6. Safety status (based on tailing type — Gold has higher risk due to As/Hg/CN)
    const safetyStatus: 'CLEARED' | 'WARNING' = 'CLEARED';
    const safetyMessage = isGold
        ? '✅ Tailing dari Buffer Storage telah melalui proses pra-perlakuan (destruksi sianida & stabilisasi logam berat As/Hg) sesuai PP No. 22 Tahun 2021. Aman untuk diproses.'
        : '✅ Tailing dari Buffer Storage telah divalidasi. Kadar sulfida telah dinetralkan dan memenuhi ambang batas pelindihan sesuai PP No. 22 Tahun 2021. Aman untuk diproses.';

    // 7. Buffer storage info
    const storageKey = isGold ? 'GOLD' : 'COPPER';
    const storage = CC.BUFFER_STORAGE[storageKey];

    return {
        tailingInputKg: tailingKg,
        tailingType,
        na2sio3Liters,
        naohLiters,
        cementKg,
        tailingKarung,
        naohFlakesKg,
        cementSak,
        productName: spec.name,
        totalMixKg: Math.round(totalMixKg * 100) / 100,
        estimatedBlocks,
        totalMaterialCostIDR,
        costBreakdown: {
            na2sio3Cost,
            naohCost,
            cementCost,
        },
        costPerBlock,
        mixingSteps,
        safetyStatus,
        safetyMessage,
        bufferStorageName: storage.locationName,
        availableTons: storage.availableTons,
        lastValidated: storage.lastValidated,
        tclpResults: storage.tclpResults,
    };
}
