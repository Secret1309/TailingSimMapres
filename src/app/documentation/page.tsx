
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function Documentation() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="container mx-auto max-w-5xl px-4 py-12">
                <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>

                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">Dokumentasi & Logika Simulasi</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Penjelasan lengkap mengenai algoritma, model neraca massa, dan analisis tekno-ekonomi yang digunakan dalam TAILINGSIM.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* 1. Alur Simulasi */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">1</span>
                            Alur Kerja Simulasi
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                            <p>
                                Saat pengguna menekan tombol <strong>Jalankan Simulasi</strong>, sistem melakukan
                                komputasi sekuensial berikut secara real-time:
                            </p>
                            <ol className="mt-4 list-decimal space-y-2 pl-5">
                                <li>
                                    <strong>Input Parsing</strong>: Membaca parameter pengguna (Jenis Tailing, Kapasitas Produksi, Binder Ratio, Suhu Curing).
                                </li>
                                <li>
                                    <strong>Mass Balance Calculation</strong>: Menghitung neraca massa berdasarkan komposisi tailing dan rasio binder yang ditetapkan.
                                </li>
                                <li>
                                    <strong>Quality Estimation</strong>: Memperkirakan kuat tekan produk dan kualitas grade berdasarkan komposisi dan parameter proses.
                                </li>
                                <li>
                                    <strong>Economic Evaluation</strong>: Menghitung CAPEX, OPEX, Revenue, NPV, IRR, dan Payback Period.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* 2. Neraca Massa */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">2</span>
                            Model Neraca Massa
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Persamaan Dasar</h3>
                                <p className="text-gray-600 mb-2">Neraca massa sederhana dari proses geopolimerisasi tailing:</p>
                                <div className="rounded-lg bg-gray-900 p-4 font-mono text-yellow-400">
                                    M_product = M_tailing + M_binder - M_loss
                                </div>
                                <div className="mt-3 rounded-lg bg-gray-900 p-4 font-mono text-green-400">
                                    M_binder = M_tailing × (Binder_Ratio / 100)
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Faktor Kehilangan (Loss Factor)</h3>
                                <p className="text-gray-600 mb-2">
                                    Kehilangan material dipengaruhi oleh kualitas tailing, rasio binder, dan suhu curing:
                                </p>
                                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                                    <li>Tailing Emas: Base loss 4.0% (kualitas standar)</li>
                                    <li>Tailing Tembaga: Base loss 2.5% (lebih baik karena kandungan Al₂O₃ tinggi)</li>
                                    <li>Binder ratio tinggi: mengurangi loss hingga 1.5%</li>
                                    <li>Suhu curing optimal (40-60°C): mengurangi loss 0.5%</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Estimasi Kuat Tekan</h3>
                                <p className="text-gray-600 mb-2">Kuat tekan produk (MPa) ditentukan oleh:</p>
                                <div className="rounded-lg bg-gray-100 p-4 font-mono text-gray-800 border-l-4 border-gray-500">
                                    σ = σ_base + (BR × 0.8) + min((T - 25) × 0.15, 8) + (Al₂O₃ - 10) × 0.3
                                </div>
                                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5">
                                    <li>σ_base: 15 MPa (standar) atau 25 MPa (premium)</li>
                                    <li>BR: Binder Ratio meningkatkan kekuatan secara linier</li>
                                    <li>T: Suhu curing tinggi meningkatkan early-age strength (maks +8 MPa)</li>
                                    <li>Al₂O₃: Kandungan alumina tinggi memperbaiki geopolimerisasi</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 3. Jenis Tailing */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">3</span>
                            Komposisi Tailing
                        </h2>
                        <div className="overflow-hidden rounded-lg border">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Parameter</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Tailing Emas</th>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Tailing Tembaga</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">SiO₂</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">55.2%</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">48.6%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">Al₂O₃</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">12.8%</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">18.4%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">Fe₂O₃</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">8.5%</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">12.1%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">CaO</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">5.3%</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">8.7%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">Grade Produk</td>
                                        <td className="px-4 py-3 text-gray-900">Standar (Batako)</td>
                                        <td className="px-4 py-3 text-gray-900">Premium (Paving Block)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-gray-700">Harga Jual Produk</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">Rp 850.000/ton</td>
                                        <td className="px-4 py-3 font-mono text-gray-900">Rp 1.200.000/ton</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* 4. Model Ekonomi */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">4</span>
                            Analisis Tekno-Ekonomi (TEA)
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">CAPEX (Capital Expenditure)</h3>
                                <p className="text-gray-600 mb-2">Investasi awal pabrik upcycling tailing dihitung berdasarkan Six-Tenths Rule:</p>
                                <div className="rounded-lg bg-gray-900 p-4 font-mono text-yellow-400">
                                    CAPEX_scaled = CAPEX_ref × (Capacity / Capacity_ref)^0.6
                                </div>
                                <div className="mt-3 overflow-hidden rounded-lg border">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Komponen</th>
                                                <th className="px-4 py-3 text-left font-semibold text-gray-700">Referensi (500 ton/hari)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            <tr>
                                                <td className="px-4 py-3 text-gray-700">Geopolymer Mixer</td>
                                                <td className="px-4 py-3 font-mono text-gray-900">Rp 2,5 Miliar</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-700">Hydraulic Brick Molder</td>
                                                <td className="px-4 py-3 font-mono text-gray-900">Rp 3,0 Miliar</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-700">Curing Chamber</td>
                                                <td className="px-4 py-3 font-mono text-gray-900">Rp 1,5 Miliar</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-gray-700">Silo & Conveyor</td>
                                                <td className="px-4 py-3 font-mono text-gray-900">Rp 1,0 Miliar</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-lg border p-4">
                                    <h4 className="font-semibold text-gray-900">NPV</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Σ [CF_t / (1+r)^t] - I₀ dengan discount rate 10% (WACC) selama 10 tahun.
                                    </p>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <h4 className="font-semibold text-gray-900">IRR</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Internal Rate of Return dihitung menggunakan metode Newton-Raphson iteratif.
                                    </p>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <h4 className="font-semibold text-gray-900">Payback Period</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        CAPEX / Annual Cash Flow. Waktu pengembalian investasi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 5. OPEX */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">5</span>
                            Komponen Biaya Operasional (OPEX)
                        </h2>
                        <div className="space-y-6">
                            <div className="overflow-hidden rounded-lg border">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Komponen OPEX</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Kalkulasi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Biaya Binder</td>
                                            <td className="px-4 py-3 text-gray-600">M_binder (ton/hari) × 1000 × Rp 3.500/kg × 300 hari</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Biaya Energi</td>
                                            <td className="px-4 py-3 text-gray-600">Total kWh/tahun × Rp 1.444/kWh (tarif industri PLN)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Tenaga Kerja</td>
                                            <td className="px-4 py-3 text-gray-600">Rp 1,8 Miliar/tahun (Manajer + Operator + Staff)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Pemeliharaan</td>
                                            <td className="px-4 py-3 text-gray-600">4% dari CAPEX total</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-200">
                                <strong>Catatan:</strong> Limbah tailing diasumsikan gratis (Rp 0/ton) karena merupakan limbah industri tambang.
                                Bahkan, pabrik dapat menerima <strong>Tipping Fee</strong> sebesar Rp 50.000/ton untuk menerima tailing — menjadikan bahan baku justru menghasilkan pendapatan.
                            </div>
                        </div>
                    </section>

                    {/* 6. Energi */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm text-gray-700">6</span>
                            Konsumsi Energi
                        </h2>
                        <div className="space-y-6">
                            <p className="text-gray-600">
                                Konsumsi energi dihitung berdasarkan tahapan proses dan suhu curing yang dipilih:
                            </p>
                            <div className="overflow-hidden rounded-lg border">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Tahap Proses</th>
                                            <th className="px-4 py-3 text-left font-semibold text-gray-700">Konsumsi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Mixing</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">25 kWh/ton produk</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Molding (Hydraulic Press)</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">15 kWh/ton produk</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Material Handling</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">5 kWh/ton input</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 text-gray-700">Curing (jika {'>'}25°C)</td>
                                            <td className="px-4 py-3 font-mono text-gray-900">0.8 kWh/ton/°C di atas 25°C</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 border border-gray-200">
                                <strong>Penting:</strong> Curing pada suhu ruang (25°C) tidak memerlukan energi tambahan. 
                                Namun, curing pada suhu tinggi (60-80°C) akan meningkatkan biaya utilitas secara signifikan.
                                Trade-off: suhu curing tinggi menghasilkan kuat tekan lebih baik namun OPEX naik.
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
