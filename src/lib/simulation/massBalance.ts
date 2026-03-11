
import { TailingComposition, ENERGY_CONSTANTS } from './constants';

export interface MassBalanceState {
    time: number;         // Process step (0 = input, 1 = mixing, 2 = molding, 3 = curing, 4 = product)
    tailingMass: number;  // ton
    binderMass: number;   // ton
    totalMass: number;    // ton
    productMass: number;  // ton
    lossMass: number;     // ton
}

export interface MassBalanceResult {
    // Daily values
    dailyTailingInput: number;    // ton/day
    dailyBinderInput: number;     // ton/day
    dailyTotalInput: number;      // ton/day
    dailyProductOutput: number;   // ton/day
    dailyLoss: number;            // ton/day
    productYield: number;         // %

    // Annual values
    annualTailingInput: number;   // ton/year
    annualBinderInput: number;    // ton/year
    annualProductOutput: number;  // ton/year

    // Quality
    qualityGrade: 'standard' | 'premium';
    productName: string;
    compressiveStrength: number;  // MPa

    // Energy
    dailyEnergyKWh: number;
    annualEnergyKWh: number;

    // Process simulation data for charts
    processData: MassBalanceState[];

    // Sensitivity analysis (binder ratio vs product output)
    sensitivityData: { binderRatio: number, productOutput: number, binderCost: number }[];
}

export const runMassBalance = (
    tailing: TailingComposition,
    inputMassTonPerDay: number,
    binderRatioPercent: number,
    curingTempC: number,
): MassBalanceResult => {

    // 1. Daily Mass Balance
    const dailyTailingInput = inputMassTonPerDay;
    const dailyBinderInput = dailyTailingInput * (binderRatioPercent / 100);
    const dailyTotalInput = dailyTailingInput + dailyBinderInput;

    // Loss factor depends on process quality and binder ratio
    // Higher binder ratio = less loss (better binding), but diminishing returns
    // Base loss: 3-5% for gold tailing, 2-4% for copper (higher Al2O3 = better geopolymerization)
    let baseLossPercent = tailing.qualityGrade === 'premium' ? 2.5 : 4.0;

    // Binder ratio effect: higher binder reduces loss (better cohesion)
    const binderEffect = Math.min(binderRatioPercent / 30, 1.0); // Normalized 0-1
    baseLossPercent -= binderEffect * 1.5; // Can reduce loss by up to 1.5%
    baseLossPercent = Math.max(1.0, baseLossPercent); // Minimum 1% loss

    // Curing temperature effect: optimal curing reduces loss slightly
    if (curingTempC > 40 && curingTempC <= 60) {
        baseLossPercent -= 0.5; // Optimal curing range
    } else if (curingTempC > 60) {
        baseLossPercent -= 0.3; // Good but slightly less efficient than optimal
    }
    baseLossPercent = Math.max(0.5, baseLossPercent);

    const dailyLoss = dailyTotalInput * (baseLossPercent / 100);
    const dailyProductOutput = dailyTotalInput - dailyLoss;
    const productYield = (dailyProductOutput / dailyTotalInput) * 100;

    // 2. Annual values
    const opDays = ENERGY_CONSTANTS.OPERATING_DAYS;
    const annualTailingInput = dailyTailingInput * opDays;
    const annualBinderInput = dailyBinderInput * opDays;
    const annualProductOutput = dailyProductOutput * opDays;

    // 3. Compressive Strength estimation (MPa)
    // Depends on: binder ratio; tailing composition (Al2O3 content); curing temperature
    let baseStrength = tailing.qualityGrade === 'premium' ? 25 : 15; // MPa
    // Binder ratio effect: more binder = stronger
    baseStrength += binderRatioPercent * 0.8;
    // Curing temperature effect: higher temp (up to ~60°C) improves early strength
    if (curingTempC > 30) {
        baseStrength += Math.min((curingTempC - 25) * 0.15, 8); // Up to +8 MPa
    }
    // Al2O3 content effect: higher alumina = better geopolymerization
    baseStrength += (tailing.Al2O3 - 10) * 0.3;
    const compressiveStrength = Math.max(5, Math.min(60, baseStrength));

    // 4. Energy calculation
    const mixingEnergy = dailyProductOutput * ENERGY_CONSTANTS.MIXING_ENERGY_KWH_PER_TON;
    const moldingEnergy = dailyProductOutput * ENERGY_CONSTANTS.MOLDING_ENERGY_KWH_PER_TON;
    const conveyorEnergy = dailyTotalInput * ENERGY_CONSTANTS.CONVEYOR_ENERGY_KWH_PER_TON;
    // Curing energy only if above room temperature
    const curingEnergy = curingTempC > 25
        ? dailyProductOutput * (curingTempC - 25) * ENERGY_CONSTANTS.CURING_BASE_KWH_PER_TON_PER_DEG
        : 0;
    const dailyEnergyKWh = mixingEnergy + moldingEnergy + conveyorEnergy + curingEnergy;
    const annualEnergyKWh = dailyEnergyKWh * opDays;

    // 5. Process simulation data (step-by-step for visualization)
    const processData: MassBalanceState[] = [
        {
            time: 0,
            tailingMass: dailyTailingInput,
            binderMass: 0,
            totalMass: dailyTailingInput,
            productMass: 0,
            lossMass: 0,
        },
        {
            time: 1,
            tailingMass: dailyTailingInput,
            binderMass: dailyBinderInput,
            totalMass: dailyTotalInput,
            productMass: 0,
            lossMass: 0,
        },
        {
            time: 2,
            tailingMass: dailyTailingInput,
            binderMass: dailyBinderInput,
            totalMass: dailyTotalInput,
            productMass: dailyTotalInput * 0.5,
            lossMass: dailyLoss * 0.3,
        },
        {
            time: 3,
            tailingMass: dailyTailingInput,
            binderMass: dailyBinderInput,
            totalMass: dailyTotalInput,
            productMass: dailyTotalInput * 0.85,
            lossMass: dailyLoss * 0.7,
        },
        {
            time: 4,
            tailingMass: dailyTailingInput,
            binderMass: dailyBinderInput,
            totalMass: dailyTotalInput,
            productMass: dailyProductOutput,
            lossMass: dailyLoss,
        },
    ];

    // 6. Sensitivity analysis: binder ratio vs product output & cost
    const binderRatioPoints = [5, 8, 10, 12, 15, 18, 20, 25, 30];
    const sensitivityData = binderRatioPoints.map(br => {
        const bMass = dailyTailingInput * (br / 100);
        const totalIn = dailyTailingInput + bMass;
        let lp = tailing.qualityGrade === 'premium' ? 2.5 : 4.0;
        const be = Math.min(br / 30, 1.0);
        lp -= be * 1.5;
        lp = Math.max(1.0, lp);
        const loss = totalIn * (lp / 100);
        const prodOut = (totalIn - loss) * opDays;
        const bCost = bMass * 1000 * 3500 * opDays; // kg * Rp/kg * days

        return {
            binderRatio: br,
            productOutput: Math.round(prodOut),
            binderCost: Math.round(bCost / 1e9 * 100) / 100, // In Miliar (Billion)
        };
    });

    return {
        dailyTailingInput,
        dailyBinderInput,
        dailyTotalInput,
        dailyProductOutput,
        dailyLoss,
        productYield,
        annualTailingInput,
        annualBinderInput,
        annualProductOutput,
        qualityGrade: tailing.qualityGrade,
        productName: tailing.productName,
        compressiveStrength,
        dailyEnergyKWh,
        annualEnergyKWh,
        processData,
        sensitivityData,
    };
};
