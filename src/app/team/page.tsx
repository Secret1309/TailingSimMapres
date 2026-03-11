
import { Header } from "@/components/layout/Header";
import { ArrowLeft, User, GraduationCap, MapPin } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function TeamPage() {
    const researchers = [
        {
            name: "Muhammad Ilham Saripul Milah",
            role: "Lead Researcher & Full-Stack Developer",
            uni: "Institut Teknologi Bandung (ITB)",
            major: "Metallurgical Engineering - FTTM",
            img: "/assets/pp_ilham.jpg"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="container mx-auto max-w-6xl px-4 py-12">
                <Link href="/" className="mb-8 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-800">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>

                <div className="mb-12 text-center">
                    <span className="mb-2 block text-sm font-semibold uppercase tracking-widest text-gray-500">Pengembang</span>
                    <h1 className="text-4xl font-bold text-gray-900">Tim TAILINGSIM</h1>
                    <p className="mt-4 text-gray-600">Riset dan pengembangan platform simulasi pengolahan tailing untuk ekonomi sirkular.</p>
                </div>

                <div className="flex justify-center">
                    {researchers.map((res, i) => (
                        <div key={i} className="group w-full max-w-sm overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="relative h-72 w-full bg-gray-100">
                                <Image
                                    src={res.img}
                                    alt={res.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900">{res.name}</h3>
                                <p className="mb-4 text-sm font-medium text-gray-600">{res.role}</p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-start gap-2">
                                        <GraduationCap className="mt-0.5 h-4 w-4" />
                                        <span>{res.uni}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{res.major}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logos - ITB & FTTM */}
                <div className="mt-20 flex flex-col items-center justify-center space-y-6 opacity-60 grayscale transition-all hover:grayscale-0">
                    <h3 className="text-sm font-semibold uppercase text-gray-400">Supported By</h3>
                    <div className="flex items-center gap-12">
                        <div className="relative h-20 w-20">
                            <Image src="/assets/Logo_ITB.png" alt="ITB" fill className="object-contain" />
                        </div>
                        <Image src="/assets/Logo_FTTM.jpg" alt="FTTM ITB" width={112} height={80} className="h-20 w-auto" />
                    </div>
                </div>

            </main>
        </div>
    );
}
