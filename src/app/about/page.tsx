
import { Header } from "@/components/layout/Header";
import { ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="container mx-auto max-w-5xl px-4 py-12">
                <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>

                <div className="space-y-12">
                    {/* Section 1: Introduction */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-3xl font-bold text-gray-900">Metodologi Penelitian</h2>
                        <p className="mb-6 text-lg text-gray-600">
                            Penelitian ini mengembangkan platform simulasi web berbasis Decision Support System (DSS) untuk mengoptimalkan
                            proses pengolahan limbah tailing pertambangan menjadi produk konstruksi bernilai ekonomi tinggi melalui pendekatan
                            Geopolimerisasi dan Ekonomi Sirkular.
                        </p>

                        <div className="rounded-xl bg-gray-50 p-6 border border-gray-200">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">Geopolimerisasi Tailing</h3>
                            <p className="text-gray-700">
                                Geopolimerisasi adalah proses kimia yang mengonversi material aluminosilikat (seperti tailing pertambangan)
                                menjadi binder polimer anorganik menggunakan aktivator alkali (NaOH/Na₂SiO₃). Proses ini menghasilkan
                                produk konstruksi seperti paving block dan batako geopolimer dengan kekuatan tekan yang memadai.
                                Tailing sebagai limbah industri tambang dapat dimanfaatkan sebagai bahan baku utama,
                                mengurangi volume limbah sekaligus menciptakan nilai ekonomis.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Process Flow */}
                    <section className="space-y-8">
                        <div className="rounded-2xl border bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Alur Proses Upcycling Tailing</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl bg-gray-50 p-6 border border-gray-200 text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-xl">1</div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Penerimaan Tailing</h4>
                                    <p className="text-sm text-gray-600">Tailing dari proses pengolahan mineral (emas/tembaga) ditampung di silo penyimpanan.</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 p-6 border border-gray-200 text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-xl">2</div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Mixing & Molding</h4>
                                    <p className="text-sm text-gray-600">Tailing dicampur dengan binder (semen/alkali aktivator) sesuai rasio optimal, lalu dicetak.</p>
                                </div>
                                <div className="rounded-xl bg-gray-50 p-6 border border-gray-200 text-center">
                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-gray-700 font-bold text-xl">3</div>
                                    <h4 className="font-semibold text-gray-800 mb-2">Curing & Produk</h4>
                                    <p className="text-sm text-gray-600">Produk dikeringkan pada suhu terkontrol (25–80°C) untuk mencapai kekuatan optimal.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Mass Balance */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Model Neraca Massa</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <p className="mb-4 text-gray-600">
                                    Model neraca massa yang digunakan menghitung distribusi material dari input tailing
                                    hingga output produk konstruksi jadi. Variabel utama meliputi:
                                </p>
                                <ul className="ml-5 list-disc space-y-2 text-gray-600">
                                    <li><strong>Input:</strong> Massa Tailing (ton/hari)</li>
                                    <li><strong>Binder:</strong> Semen/Alkali Aktivator (% terhadap massa tailing)</li>
                                    <li><strong>Output:</strong> Produk Konstruksi (Paving Block/Geopolymer Brick)</li>
                                    <li><strong>Loss:</strong> Kehilangan material dalam proses (~2-5%)</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-900 p-6 font-mono text-gray-100">
                                <p className="mb-2">Neraca Massa:</p>
                                <p className="text-xl text-yellow-400">M_product = M_tailing + M_binder - M_loss</p>
                                <div className="my-4 h-px w-full bg-gray-700"></div>
                                <p className="mb-2">Binder Mass:</p>
                                <p className="text-xl text-green-400">M_binder = M_tailing × (BR / 100)</p>
                                <div className="my-4 h-px w-full bg-gray-700"></div>
                                <p className="mb-2">Yield Produk:</p>
                                <p className="text-xl text-blue-400">η = M_product / (M_tailing + M_binder) × 100%</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Economic Model */}
                    <section className="rounded-2xl border bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Model Analisis Ekonomi</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <p className="mb-4 text-gray-600">
                                    Analisis tekno-ekonomi komprehensif mencakup perhitungan kelayakan investasi
                                    pabrik upcycling tailing:
                                </p>
                                <ul className="ml-5 list-disc space-y-2 text-gray-600">
                                    <li><strong>CAPEX:</strong> Investasi mesin mixer, pencetak bata, ruang curing</li>
                                    <li><strong>OPEX:</strong> Biaya binder, energi (curing), tenaga kerja</li>
                                    <li><strong>Revenue:</strong> Penjualan produk konstruksi (Rp/ton)</li>
                                    <li><strong>NPV:</strong> Net Present Value (10 tahun)</li>
                                    <li><strong>IRR:</strong> Internal Rate of Return</li>
                                    <li><strong>PBP:</strong> Payback Period</li>
                                </ul>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-lg bg-gray-900 p-6 font-mono text-gray-100">
                                <p className="mb-2">Net Present Value:</p>
                                <p className="text-lg text-yellow-400">NPV = Σ [CF_t / (1+r)^t] - I₀</p>
                                <div className="my-4 h-px w-full bg-gray-700"></div>
                                <p className="mb-2">Internal Rate of Return:</p>
                                <p className="text-lg text-green-400">IRR: NPV(IRR) = 0</p>
                                <div className="my-4 h-px w-full bg-gray-700"></div>
                                <p className="mb-2">Payback Period:</p>
                                <p className="text-lg text-blue-400">PBP = CAPEX / Annual Cash Flow</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
