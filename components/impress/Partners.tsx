'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const partners = [
  { id: '1', name: 'Astra Wireless', logo: '/logo/astra.png', url: 'https://astrawireless.net' },
  { id: '2', name: 'AstraDrive', logo: '/logo/astra.png', url: 'https://astradrive.net' },
  // { id: '3', name: 'Exicom', logo: '/logo/exicom.jpeg', url: 'https://exicom.co.in' },
  { id: '4', name: 'Mimosa Networks', logo: '/logo/mimosa.svg', url: 'https://mimosa.co' },
  { id: '5', name: 'NetPoint Antennas', logo: '/logo/netpoint.jpeg', url: 'https://www.netpointantennas.com/' },
  { id: '6', name: 'ALGcom', logo: '/logo/alg.svg', url: 'https://www.algcom.com.br/' },
  { id: '7', name: 'QNTM Networks', logo: '/logo/quantm.svg', url: 'https://www.qntmnet.com/' },
  { id: '8', name: 'RADWIN', logo: '/logo/radwin.png', url: 'https://www.radwin.com/' },
  { id: '9', name: 'Silvus Technologies', logo: '/logo/silvis.jpeg', url: 'https://silvustechnologies.com/' },
];

export default function Partners() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative overflow-hidden bg-black py-20 md:py-32">
        <div className="container relative z-10 mx-auto px-6">
          <div className="mb-20 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-bold text-green-400">
              Trusted Partners
            </span>
            <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Technology Partners
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              Collaborating with world-class organizations
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-green-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-6 py-3 text-sm font-bold text-green-400">
            Trusted Partners
          </span>
          <h2 className="bg-gradient-to-r from-white via-green-100 to-purple-100 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Industry-Leading<br /><span className="text-green-400">Technology Partners</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
            Collaborating with world-class organizations to deliver cutting-edge wireless solutions
          </p>
        </div>

        {/* PERFECT INFINITE MARQUEE — NO JUMP EVER */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-r from-black to-transparent md:w-64" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-32 bg-gradient-to-l from-black to-transparent md:w-64" />

          <div className="overflow-hidden">
            <div className="flex animate-custom-marquee whitespace-nowrap">
              {/* First set */}
              {partners.map((p) => (
                <PartnerCard key={p.id} partner={p} />
              ))}
              {/* Duplicate set — makes it truly infinite */}
              {partners.map((p) => (
                <PartnerCard key={`dup-${p.id}`} partner={p} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="mb-8 text-lg text-gray-500">Interested in becoming a partner?</p>
          <a
            href="/#demo-form"
            className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-5 font-bold text-white shadow-2xl shadow-green-500/20 transition-all hover:scale-105 hover:shadow-green-500/40"
          >
            Get in Touch
            <svg className="h-6 w-6 transition-transform hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function PartnerCard({ partner }: { partner: any }) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group mx-8 flex flex-shrink-0 flex-col items-center gap-6 rounded-2xl px-8 py-10 transition-all duration-500 hover:bg-white/5 md:mx-12"
    >
      <div className="relative h-28 w-56 md:h-32 md:w-64 lg:h-36 lg:w-72">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          className="object-contain brightness-0 invert transition-all duration-700 group-hover:brightness-100 group-hover:invert-0 group-hover:drop-shadow-[0_0_30px_rgba(34,197,94,0.8)]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        {/* Fallback if image fails */}
        <div className="hidden flex h-full w-full items-center justify-center rounded-xl bg-gray-900">
          <span className="text-5xl font-black text-green-500">{partner.name[0]}</span>
        </div>
      </div>
      <p className="text-center text-base font-semibold text-gray-400 transition-colors group-hover:text-green-400 md:text-lg">
        {partner.name}
      </p>
    </a>
  );
}
