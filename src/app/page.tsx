
import Link from 'next/link';
import { Header } from "@/components/layout/Header";
import { ArrowRight, Factory, LineChart, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <span className="inline-block rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
              MAPRES ITB 2026
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl leading-tight">
              Platform Simulasi Web untuk Optimalisasi Tekno-Ekonomi Pengolahan Tailing
            </h2>

            <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
              Decision Support System untuk menghitung neraca massa metalurgi dan kelayakan finansial
              (NPV, IRR, Payback Period) dari upcycling limbah <strong>tailing pertambangan</strong> menjadi
              <strong> produk konstruksi</strong> (geopolimer/batako) berbasis ekonomi sirkular.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:gap-4">
              <Link
                href="/simulation"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gray-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-gray-700 hover:shadow-gray-300 sm:w-auto"
              >
                Mulai Simulasi <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
              >
                Metodologi
              </Link>
              <Link
                href="/documentation"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
              >
                Dokumentasi
              </Link>
              <Link
                href="/team"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
              >
                Tim Pengembang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-gray-700">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Neraca Massa Metalurgi</h3>
              <p className="text-gray-600">Simulasi neraca massa pengolahan tailing menjadi produk konstruksi geopolimer dengan variabel binder ratio dan tipe tailing.</p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-gray-700">
                <Factory className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Visualisasi Pabrik 3D</h3>
              <p className="text-gray-600">Visualisasi 3D interaktif pabrik upcycling tailing: Silo, Mixer Geopolimer, dan Ruang Curing secara real-time.</p>
            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-gray-700">
                <LineChart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Analisis Tekno-Ekonomi</h3>
              <p className="text-gray-600">Analisis kelayakan ekonomi lengkap: NPV, IRR, Payback Period, CAPEX/OPEX untuk skala industri pertambangan.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
