import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface ShowcaseProject {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  liveUrl: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'fixitnow',
    title: 'FixItNow',
    subtitle: 'Premium Industrial Repairs',
    imageUrl: '/images/projects/fixitnow/fixitnow.png',
    liveUrl: 'https://serviceindustries.netlify.app/',
  },
  {
    id: 'studybuddy',
    title: 'StudyBuddy',
    subtitle: 'Find Study Partners Around the World',
    imageUrl: '/images/projects/studybuddy/studybuddy.png',
    liveUrl: 'https://studybudy-x8z4.onrender.com/',
  },
  {
    id: 'watch-together',
    title: 'Watch Together',
    subtitle: 'Real-time synchronized video watching and chat',
    imageUrl: '/images/projects/watch-together/watch-together.png',
    liveUrl: 'https://watch-together-cg6c.onrender.com/',
  },
  {
    id: 'smart-gov',
    title: 'Smart Gov',
    subtitle: 'Municipal Management Platform',
    imageUrl: '/images/projects/smart-gov/smart-gov.png',
    liveUrl: 'https://municipal-frontend-9ovb.onrender.com/',
  },
];

// Repeat 6 times so the row span is continuous across any ultra-wide screen
const REPEATED_PROJECTS_ROW1 = [
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
];

const REPEATED_PROJECTS_ROW2 = [
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
  ...SHOWCASE_PROJECTS,
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [autoOffset, setAutoOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Single 4-project cycle width on desktop: 4 * (420px card + 12px gap) = 1728px
  // Used for seamless modular wrapping
  const cycleWidth = 1728;

  // Track page scroll position
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      animationFrameId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setScrollOffset(currentOffset);
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Continuous auto-scrolling ticker with hover pause
  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();

    const ticker = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered) {
        setAutoOffset((prev) => (prev + delta * 45) % cycleWidth);
      }
      frameId = requestAnimationFrame(ticker);
    };

    frameId = requestAnimationFrame(ticker);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered, cycleWidth]);

  // Combined offset for seamless looping
  const combinedOffset = (scrollOffset + autoOffset) % cycleWidth;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none"
    >
      <div
        className="flex flex-col gap-3 w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Row 1: Moves RIGHT on scroll & auto-scroll */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${combinedOffset - 1200}px)`,
            willChange: 'transform',
          }}
        >
          {REPEATED_PROJECTS_ROW1.map((project, index) => (
            <a
              key={`r1-${project.id}-${index}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-[300px] sm:w-[360px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[270px] min-w-[300px] sm:min-w-[360px] md:min-w-[420px] rounded-2xl overflow-hidden bg-[#18191C] flex-shrink-0 shadow-lg relative cursor-pointer border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 transition-all duration-300"
            >
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl select-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Project Label Card Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/35 to-transparent p-4 sm:p-5 flex flex-col justify-end pointer-events-none">
                <p className="text-[10px] sm:text-xs text-[#D7E2EA]/75 font-light uppercase tracking-widest line-clamp-1 mb-0.5">
                  {project.subtitle}
                </p>
                <h4 className="text-white font-medium text-sm sm:text-base md:text-lg uppercase tracking-wide drop-shadow flex items-center justify-between">
                  <span>{project.title}</span>
                  <ExternalLink
                    size={15}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D7E2EA] ml-2 flex-shrink-0"
                  />
                </h4>
              </div>
            </a>
          ))}
        </div>

        {/* Row 2: Moves LEFT on scroll & auto-scroll */}
        <div
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translateX(${-(combinedOffset) - 600}px)`,
            willChange: 'transform',
          }}
        >
          {REPEATED_PROJECTS_ROW2.map((project, index) => (
            <a
              key={`r2-${project.id}-${index}`}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-[300px] sm:w-[360px] md:w-[420px] h-[190px] sm:h-[230px] md:h-[270px] min-w-[300px] sm:min-w-[360px] md:min-w-[420px] rounded-2xl overflow-hidden bg-[#18191C] flex-shrink-0 shadow-lg relative cursor-pointer border border-[#D7E2EA]/10 hover:border-[#D7E2EA]/40 transition-all duration-300"
            >
              <img
                src={project.imageUrl}
                alt={`${project.title} preview`}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl select-none transition-transform duration-700 group-hover:scale-105"
              />

              {/* Project Label Card Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/35 to-transparent p-4 sm:p-5 flex flex-col justify-end pointer-events-none">
                <p className="text-[10px] sm:text-xs text-[#D7E2EA]/75 font-light uppercase tracking-widest line-clamp-1 mb-0.5">
                  {project.subtitle}
                </p>
                <h4 className="text-white font-medium text-sm sm:text-base md:text-lg uppercase tracking-wide drop-shadow flex items-center justify-between">
                  <span>{project.title}</span>
                  <ExternalLink
                    size={15}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[#D7E2EA] ml-2 flex-shrink-0"
                  />
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
