"use client";

import { useState } from "react";
import { useSimulationStore } from "@/lib/store";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AreaChart, Area, BarChart, Bar } from 'recharts';
import { ReactorScene } from "./ReactorScene";

const formatRp = (value: number): string => {
    if (Math.abs(value) >= 1e12) return `Rp ${(value / 1e12).toFixed(2)} T`;
    if (Math.abs(value) >= 1e9) return `Rp ${(value / 1e9).toFixed(2)} M`;
    if (Math.abs(value) >= 1e6) return `Rp ${(value / 1e6).toFixed(1)} Jt`;
    return `Rp ${value.toLocaleString('id-ID')}`;
};

export function Dashboard() {
    const [activeTab, setActiveTab] = useState<'visual' | 'results' | 'economy'>('results');
    const { massBalanceResult, economicResults, inputMass, tailingType } = useSimulationStore();

    const COLORS = ['#374151', '#6b7280', '#9ca3af', '#d1d5db'];

    // Mass balance pie chart data
    const massDistribution = massBalanceResult ? [
        { name: 'Produk Jadi', value: massBalanceResult.dailyProductOutput },
        { name: 'Material Loss', value: massBalanceResult.dailyLoss },
    ] : [];

    // Input composition pie chart
    const inputComposition = massBalanceResult ? [
        { name: 'Tailing', value: massBalanceResult.dailyTailingInput },
        { name: 'Binder', value: massBalanceResult.dailyBinderInput },
    ] : [];

    // OPEX breakdown for bar chart
    const opexBreakdownData = economicResults ? [
        { name: 'Binder', value: +(economicResults.opexBreakdown.binderCost / 1e9).toFixed(2), fill: '#374151' },
        { name: 'Energi', value: +(economicResults.opexBreakdown.energyCost / 1e9).toFixed(2), fill: '#6b7280' },
        { name: 'Tenaga Kerja', value: +(economicResults.opexBreakdown.laborCost / 1e9).toFixed(2), fill: '#9ca3af' },
        { name: 'Pemeliharaan', value: +(economicResults.opexBreakdown.maintenance / 1e9).toFixed(2), fill: '#d1d5db' },
    ] : [];

    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-gray-100">
            {/* Tab Navigation */}
            <div className="flex overflow-x-auto border-b bg-white px-2 lg:px-6 no-scrollbar">
                <button
                    onClick={() => setActiveTab('visual')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors lg:px-6 lg:py-4 ${activeTab === 'visual' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Visualisasi Pabrik
                </button>
                <button
                    onClick={() => setActiveTab('results')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors lg:px-6 lg:py-4 ${activeTab === 'results' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Neraca Massa
                </button>
                <button
                    onClick={() => setActiveTab('economy')}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors lg:px-6 lg:py-4 ${activeTab === 'economy' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Dashboard Ekonomi
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* ====== MASS BALANCE TAB ====== */}
                {activeTab === 'results' && (
                    <div className="space-y-6">
                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Output Produk (Harian)</p>
                                <p className="text-2xl font-bold text-gray-800 font-mono">
                                    {massBalanceResult ? massBalanceResult.dailyProductOutput.toFixed(1) : '—'} <span className="text-sm font-sans">ton/hari</span>
                                </p>
                            </div>
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Product Yield</p>
                                <p className="text-2xl font-bold text-gray-700 font-mono">
                                    {massBalanceResult ? massBalanceResult.productYield.toFixed(1) : '—'}%
                                </p>
                            </div>
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Kuat Tekan Produk</p>
                                <p className="text-2xl font-bold text-gray-700 font-mono">
                                    {massBalanceResult ? massBalanceResult.compressiveStrength.toFixed(1) : '—'} <span className="text-sm font-sans">MPa</span>
                                </p>
                            </div>
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Output Tahunan</p>
                                <p className="text-2xl font-bold text-gray-800 font-mono">
                                    {massBalanceResult ? (massBalanceResult.annualProductOutput / 1000).toFixed(1) : '—'} <span className="text-sm font-sans">kton/tahun</span>
                                </p>
                            </div>
                        </div>

                        {/* Product Info Card */}
                        {massBalanceResult && (
                            <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Produk Output</p>
                                        <p className="text-lg font-bold text-gray-800">{massBalanceResult.productName}</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${
                                        massBalanceResult.qualityGrade === 'premium'
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}>
                                        {massBalanceResult.qualityGrade === 'premium' ? '⭐ Premium' : 'Standar'}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Input Composition */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-4 font-semibold text-gray-800">Komposisi Input</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={inputComposition}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                                outerRadius={100}
                                                fill="#374151"
                                                dataKey="value"
                                            >
                                                {inputComposition.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${Number(value).toFixed(1)} ton/hari`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Output Distribution */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-4 font-semibold text-gray-800">Distribusi Output</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={massDistribution}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(1)}%`}
                                                outerRadius={100}
                                                fill="#374151"
                                                dataKey="value"
                                            >
                                                {massDistribution.map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${Number(value).toFixed(2)} ton/hari`} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Sensitivity Analysis */}
                            {massBalanceResult && (
                                <div className="col-span-1 rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
                                    <h3 className="mb-4 font-semibold text-gray-800">Analisis Sensitivitas: Binder Ratio vs Output & Biaya</h3>
                                    <div className="h-[350px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={massBalanceResult.sensitivityData} margin={{ top: 5, right: 40, left: 25, bottom: 25 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="binderRatio" label={{ value: 'Binder Ratio (%)', position: 'insideBottom', offset: -10 }} />
                                                <YAxis yAxisId="left" width={70} label={{ value: 'Output (ton/th)', angle: -90, position: 'insideLeft', offset: 5 }} />
                                                <YAxis yAxisId="right" orientation="right" width={70} label={{ value: 'Biaya (Miliar)', angle: 90, position: 'insideRight', offset: 5 }} />
                                                <Tooltip />
                                                <Legend verticalAlign="top" />
                                                <Line yAxisId="left" type="monotone" dataKey="productOutput" stroke="#374151" name="Output Produk" strokeWidth={3} />
                                                <Line yAxisId="right" type="monotone" dataKey="binderCost" stroke="#9ca3af" name="Biaya Binder (M)" strokeWidth={2} strokeDasharray="5 5" />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ====== ECONOMY TAB ====== */}
                {activeTab === 'economy' && economicResults && (
                    <div className="space-y-6">
                        {/* Financial KPIs */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">NPV (10 Tahun)</p>
                                <p className={`text-2xl font-bold font-mono ${economicResults.metrics.npv > 0 ? 'text-green-700' : 'text-red-600'}`}>
                                    {formatRp(economicResults.metrics.npv)}
                                </p>
                            </div>
                            <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">IRR</p>
                                <p className={`text-2xl font-bold font-mono ${economicResults.metrics.irr > 10 ? 'text-green-700' : 'text-amber-600'}`}>
                                    {economicResults.metrics.irr.toFixed(1)}%
                                </p>
                            </div>
                            <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Payback Period</p>
                                <p className="text-2xl font-bold text-gray-800 font-mono">
                                    {economicResults.metrics.paybackPeriod < 100 ? economicResults.metrics.paybackPeriod.toFixed(1) : '> 10'} <span className="text-sm font-sans">Tahun</span>
                                </p>
                            </div>
                            <div className="rounded-xl border-2 border-gray-300 bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Gross Profit / Tahun</p>
                                <p className={`text-2xl font-bold font-mono ${economicResults.grossProfit > 0 ? 'text-green-700' : 'text-red-600'}`}>
                                    {formatRp(economicResults.grossProfit)}
                                </p>
                            </div>
                        </div>

                        {/* CAPEX & Revenue Summary */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">CAPEX Total</p>
                                <p className="text-xl font-bold text-gray-800">{formatRp(economicResults.capexTotal)}</p>
                            </div>
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Annual Revenue</p>
                                <p className="text-xl font-bold text-gray-800">{formatRp(economicResults.annualRevenue)}</p>
                            </div>
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Annual OPEX</p>
                                <p className="text-xl font-bold text-gray-800">{formatRp(economicResults.annualOpex)}</p>
                            </div>
                        </div>

                        {/* Cost Info */}
                        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-200">
                            <p>
                                <strong>Catatan:</strong><br />
                                • <strong>CAPEX</strong>: Investasi mesin Mixer, Pencetak Bata (Molder), Ruang Curing, Silo & Konveyor + instalasi.<br />
                                • <strong>OPEX</strong>: Biaya binder (NaOH/Na₂SiO₃) proporsional dengan Binder Ratio, energi listrik, tenaga kerja, dan pemeliharaan.<br />
                                • <strong>Revenue</strong>: Penjualan produk konstruksi + Tipping Fee penerimaan tailing (Rp {(50_000).toLocaleString('id-ID')}/ton).
                            </p>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* OPEX Breakdown */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-4 font-semibold text-gray-800">Komposisi OPEX (Miliar/Tahun)</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={opexBreakdownData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis label={{ value: 'Miliar IDR', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip formatter={(value) => `Rp ${value} M`} />
                                            <Bar dataKey="value" name="Biaya" radius={[8, 8, 0, 0]}>
                                                {opexBreakdownData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Cumulative Cash Flow */}
                            <div className="rounded-xl border bg-white p-6 shadow-sm">
                                <h3 className="mb-4 font-semibold text-gray-800">Arus Kas Kumulatif</h3>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={economicResults.metrics.cumulativeCashFlows.map((val, idx) => ({ year: idx, value: val / 1e9 }))}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" label={{ value: 'Tahun', position: 'insideBottom', offset: -5 }} />
                                            <YAxis label={{ value: 'Miliar IDR', angle: -90, position: 'insideLeft' }} />
                                            <Tooltip formatter={(value) => `Rp ${value} M`} />
                                            <Area type="monotone" dataKey="value" stroke="#374151" fill="#374151" fillOpacity={0.15} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Unit Economics */}
                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-semibold text-gray-800">Unit Economics</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                                    <p className="text-sm text-gray-500">Harga Jual Produk</p>
                                    <p className="text-xl font-bold text-gray-800 font-mono">{formatRp(economicResults.productPricePerTon)}<span className="text-sm font-sans">/ton</span></p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                                    <p className="text-sm text-gray-500">Biaya Produksi</p>
                                    <p className="text-xl font-bold text-gray-800 font-mono">{formatRp(Math.round(economicResults.costPerTonProduct))}<span className="text-sm font-sans">/ton</span></p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                                    <p className="text-sm text-gray-500">Margin per Ton</p>
                                    <p className={`text-xl font-bold font-mono ${(economicResults.productPricePerTon - economicResults.costPerTonProduct) > 0 ? 'text-green-700' : 'text-red-600'}`}>
                                        {formatRp(Math.round(economicResults.productPricePerTon - economicResults.costPerTonProduct))}<span className="text-sm font-sans">/ton</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ====== 3D VISUALIZATION TAB ====== */}
                {activeTab === 'visual' && (
                    <div className="h-full w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <ReactorScene />
                    </div>
                )}
            </div>
        </div>
    );
}
