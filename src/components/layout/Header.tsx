"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white/80 backdrop-blur-md">
            <div className="container relative mx-auto flex h-16 items-center justify-between px-2 lg:h-24 lg:px-4">

                {/* Logos Section - Left */}
                <div className="flex items-center gap-2 lg:gap-6">
                    <div className="relative h-[35px] w-[35px] overflow-hidden rounded-full border-2 border-slate-200 shadow-sm lg:h-[55px] lg:w-[55px]">
                        <Image
                            src="/assets/Logo_ITB.png"
                            alt="Logo ITB"
                            fill
                            className="object-contain p-1"
                        />
                    </div>
                    <Image
                        src="/assets/Logo_FTTM.jpg"
                        alt="Logo FTTM ITB"
                        width={70}
                        height={55}
                        className="h-[35px] w-auto lg:h-[55px]"
                    />
                </div>

                {/* Center Title - Absolutely Centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                    <Link href="/">
                        <h1 className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-400 bg-clip-text text-3xl font-extrabold tracking-[0.15em] text-transparent drop-shadow-sm transition-all hover:opacity-90 lg:text-5xl lg:tracking-[0.2em]">
                            TAILINGSIM
                        </h1>
                    </Link>
                </div>

                {/* Right Section - Hamburger Menu */}
                <div className="relative flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800 focus:outline-none"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-xl backdrop-blur-xl">
                            <Link
                                href="/simulation"
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Simulasi
                            </Link>
                            <Link
                                href="/about"
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Metodologi
                            </Link>
                            <Link
                                href="/documentation"
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dokumentasi
                            </Link>
                            <Link
                                href="/team"
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Tim Pengembang
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
