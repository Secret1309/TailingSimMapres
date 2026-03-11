
import Papa from 'papaparse';
import { MassBalanceResult } from './simulation/massBalance';
import { EconomicResult } from './simulation/economics';

export const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportSimulationData = (result: MassBalanceResult) => {
    const formatted = [
        {
            Parameter: 'Daily Tailing Input',
            Value: result.dailyTailingInput.toFixed(2),
            Unit: 'ton/day',
        },
        {
            Parameter: 'Daily Binder Input',
            Value: result.dailyBinderInput.toFixed(2),
            Unit: 'ton/day',
        },
        {
            Parameter: 'Daily Total Input',
            Value: result.dailyTotalInput.toFixed(2),
            Unit: 'ton/day',
        },
        {
            Parameter: 'Daily Product Output',
            Value: result.dailyProductOutput.toFixed(2),
            Unit: 'ton/day',
        },
        {
            Parameter: 'Daily Loss',
            Value: result.dailyLoss.toFixed(2),
            Unit: 'ton/day',
        },
        {
            Parameter: 'Product Yield',
            Value: result.productYield.toFixed(2),
            Unit: '%',
        },
        {
            Parameter: 'Annual Tailing Input',
            Value: result.annualTailingInput.toFixed(2),
            Unit: 'ton/year',
        },
        {
            Parameter: 'Annual Binder Input',
            Value: result.annualBinderInput.toFixed(2),
            Unit: 'ton/year',
        },
        {
            Parameter: 'Annual Product Output',
            Value: result.annualProductOutput.toFixed(2),
            Unit: 'ton/year',
        },
        {
            Parameter: 'Product Quality Grade',
            Value: result.qualityGrade,
            Unit: '-',
        },
        {
            Parameter: 'Product Name',
            Value: result.productName,
            Unit: '-',
        },
        {
            Parameter: 'Compressive Strength',
            Value: result.compressiveStrength.toFixed(1),
            Unit: 'MPa',
        },
        {
            Parameter: 'Daily Energy Consumption',
            Value: result.dailyEnergyKWh.toFixed(2),
            Unit: 'kWh/day',
        },
        {
            Parameter: 'Annual Energy Consumption',
            Value: result.annualEnergyKWh.toFixed(2),
            Unit: 'kWh/year',
        },
    ];
    downloadCSV(formatted, `TAILINGSIM_Mass_Balance_${new Date().toISOString().slice(0, 10)}.csv`);
};

export const exportEconomicReport = (econ: EconomicResult) => {
    const metrics = [
        { Metric: 'CAPEX Total', Value: econ.capexTotal, Unit: 'IDR' },
        { Metric: 'CAPEX - Mixer', Value: econ.capexBreakdown.mixer, Unit: 'IDR' },
        { Metric: 'CAPEX - Molder', Value: econ.capexBreakdown.molder, Unit: 'IDR' },
        { Metric: 'CAPEX - Curing Chamber', Value: econ.capexBreakdown.curingChamber, Unit: 'IDR' },
        { Metric: 'CAPEX - Silo & Conveyor', Value: econ.capexBreakdown.siloConveyor, Unit: 'IDR' },
        { Metric: 'CAPEX - Installation', Value: econ.capexBreakdown.installation, Unit: 'IDR' },
        { Metric: 'Annual OPEX', Value: econ.annualOpex, Unit: 'IDR' },
        { Metric: 'OPEX - Binder Cost', Value: econ.opexBreakdown.binderCost, Unit: 'IDR' },
        { Metric: 'OPEX - Energy Cost', Value: econ.opexBreakdown.energyCost, Unit: 'IDR' },
        { Metric: 'OPEX - Labor Cost', Value: econ.opexBreakdown.laborCost, Unit: 'IDR' },
        { Metric: 'OPEX - Maintenance', Value: econ.opexBreakdown.maintenance, Unit: 'IDR' },
        { Metric: 'Annual Revenue', Value: econ.annualRevenue, Unit: 'IDR' },
        { Metric: 'Revenue - Product Sales', Value: econ.revenueBreakdown.productSales, Unit: 'IDR' },
        { Metric: 'Revenue - Tipping Fee', Value: econ.revenueBreakdown.tippingFee, Unit: 'IDR' },
        { Metric: 'Gross Profit', Value: econ.grossProfit, Unit: 'IDR' },
        { Metric: 'Net Profit', Value: econ.netProfit, Unit: 'IDR' },
        { Metric: 'NPV (10 Years)', Value: econ.metrics.npv, Unit: 'IDR' },
        { Metric: 'IRR', Value: econ.metrics.irr, Unit: '%' },
        { Metric: 'Payback Period', Value: econ.metrics.paybackPeriod, Unit: 'Years' },
        { Metric: 'Product Price', Value: econ.productPricePerTon, Unit: 'IDR/ton' },
        { Metric: 'Cost per Ton Product', Value: econ.costPerTonProduct, Unit: 'IDR/ton' },
    ];

    downloadCSV(metrics, `TAILINGSIM_Economic_Report_${new Date().toISOString().slice(0, 10)}.csv`);
};
