import React from 'react';
import { FadeIn } from '../common/FadeIn';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Full Stack Development',
    description:
      'End-to-end web application development using React, Node.js, Express, and MongoDB, delivering dynamic, responsive, and data-driven solutions.',
  },
  {
    number: '02',
    name: 'Frontend Engineering',
    description:
      'Designing clean, interactive, and mobile-first user interfaces with React, modern JavaScript, Tailwind CSS, and smooth micro-animations.',
  },
  {
    number: '03',
    name: 'Backend & APIs',
    description:
      'Developing scalable server-side architectures, RESTful APIs, JWT authentication, and real-time bidirectional communication via Socket.io.',
  },
  {
    number: '04',
    name: 'Database Management',
    description:
      'Structuring, managing, and querying databases using MongoDB and SQL, ensuring data integrity, performance, and security.',
  },
  {
    number: '05',
    name: 'Software Engineering',
    description:
      'Modern version control with Git/GitHub, collaborative development, debugging, Leaflet maps integration, and cloud deployment.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none z-0"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-[#0C0C0C] text-center mb-16 sm:mb-20 md:mb-28 tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Skills & Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col w-full border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={30}
              className="w-full border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-[rgba(12,12,12,0.02)]"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-10 md:gap-16">
                {/* Number */}
                <div
                  className="font-black text-[#0C0C0C] leading-none select-none flex-shrink-0 min-w-[110px] sm:min-w-[150px] md:min-w-[180px]"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description stacked */}
                <div className="flex flex-col justify-center flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl mt-2 sm:mt-3"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
