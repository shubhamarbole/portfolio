import React from 'react';
import { FadeIn } from '../common/FadeIn';
import { Magnet } from '../common/Magnet';
import { ContactButton } from '../common/ContactButton';

export const HeroSection: React.FC = () => {
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0C0C0C] select-none">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-20">
        <nav className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Hero Heading Container */}
      <div className="w-full flex items-center justify-center flex-1 z-0 px-2 sm:px-4 md:px-6">
        <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
          <h1
            className="hero-heading font-black uppercase tracking-tight text-center select-none w-full max-w-full leading-[0.9] sm:leading-none text-[clamp(2.4rem,13vw,4.2rem)] sm:text-[clamp(3.8rem,9.4vw,185px)] mt-2 sm:mt-0 md:-mt-4"
          >
            <span className="inline-block">SHUBHAM</span>{' '}
            <span className="inline-block">ARBOLE</span>
          </h1>
        </FadeIn>
      </div>

      {/* Hero Portrait with Magnet */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full h-full flex items-end justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="w-full flex items-end justify-center"
          >
            <img
              src="/shubham.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/shubham-original.png';
              }}
              alt="Shubham Portrait"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              loading="eager"
            />
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a software developer driven by crafting clean, performant, and impactful web experiences
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton href="#contact" />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
