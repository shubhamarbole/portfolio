import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../common/FadeIn';
import { LiveProjectButton } from '../common/LiveProjectButton';
import { ContactButton } from '../common/ContactButton';
import { ProjectModal, ProjectModalData } from '../common/ProjectModal';
import { FileDown, Github, Linkedin, Instagram, Mail, ExternalLink, Info } from 'lucide-react';

interface ProjectItem extends ProjectModalData {
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    number: '01',
    name: 'SmartGov Platform',
    category: 'Civic Tech / Full Stack',
    description:
      'A digital municipal coordination platform connecting citizens with city departments for real-time issue reporting, tracking, and resolution with Leaflet Maps and Socket.io.',
    overview:
      'A modern digital platform designed to streamline communication between municipal departments and empower citizens to report civic issues efficiently. Connects departments such as water, roads, and electricity through a centralized dashboard for faster coordination and service delivery.',
    features: [
      'Citizen issue reporting with image uploads and Leaflet map geolocation',
      'Real-time status updates and department notifications via Socket.io',
      'Complaint routing system for municipal engineers and field workers',
      'Secure role-based JWT Authentication for citizens and administrators',
      'Interactive metrics dashboard showing pending, in-progress, and resolved cases',
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Leaflet Maps', 'JWT', 'Render'],
    role: 'Full Stack Developer — Engineered frontend UI components in React, developed Node.js REST APIs with Socket.io real-time streaming, and integrated Leaflet interactive mapping.',
    liveUrl: 'https://municipal-frontend-9ovb.onrender.com',
    githubUrl: 'https://github.com/shubhamarbole',
    col1Img1: '/images/projects/smart-gov/smartgov-services.png',
    col1Img2: '/images/projects/smart-gov/smartgov-complaints.png',
    col2Img: '/images/projects/smart-gov/smartgov-dashboard.png',
    gallery: [
      {
        title: 'Municipal Dashboard - Administration',
        url: '/images/projects/smart-gov/smartgov-dashboard.png',
      },
      {
        title: 'Citizen Services Portal',
        url: '/images/projects/smart-gov/smartgov-services.png',
      },
      {
        title: 'Complaints & Grievances Management',
        url: '/images/projects/smart-gov/smartgov-complaints.png',
      },
      {
        title: 'Smart City Operations & Infrastructure',
        url: '/images/projects/smart-gov/smartgov-operations.png',
      },
    ],
  },
  {
    number: '02',
    name: 'StudyBuddy – Find Study Partners Around the World',
    category: 'EdTech / Social Learning',
    description:
      'A social learning platform that helps students discover study partners, connect with other learners, join study rooms, and collaborate online.',
    overview:
      'A social learning platform designed to help students discover study partners, connect with learners worldwide, create/join study rooms, and collaborate through online communication.',
    features: [
      'Topic-based study rooms for focused student collaboration (Python, Web Dev, Angular, etc.)',
      'Real-time room messaging and student peer interaction powered by WebSockets',
      'AI-driven automated message toxicity detection and safety moderation',
      'Personalized user profiles, custom avatars, bios, and topic interests',
      'Live participant presence and recent activity timeline',
      'RESTful API endpoints for study room discovery and topic filtering',
    ],
    techStack: ['Python', 'Django 4.2', 'Django REST Framework', 'WebSockets', 'Django Channels', 'Transformers & PyTorch', 'SQLite / PostgreSQL', 'HTML5 / CSS3 / JS', 'Render'],
    role: 'Full Stack Developer — Architected Django backend data models, implemented WebSockets via Django Channels for real-time room communication, integrated Hugging Face machine learning models for message safety moderation, and developed responsive user interfaces.',
    liveUrl: 'https://studybudy-x8z4.onrender.com/',
    githubUrl: 'https://github.com/shubhamarbole/studybudy',
    col1Img1: '/images/projects/studybuddy/studybuddy-dashboard.png',
    col1Img2: '/images/projects/studybuddy/studybuddy-chat.png',
    col2Img: '/images/projects/studybuddy/studybuddy-hero.png',
    gallery: [
      {
        title: 'StudyBuddy Platform',
        url: '/images/projects/studybuddy/studybuddy-hero.png',
      },
      {
        title: 'Study Dashboard / Study Room',
        url: '/images/projects/studybuddy/studybuddy-dashboard.png',
      },
      {
        title: 'Real-time Chat & Collaboration',
        url: '/images/projects/studybuddy/studybuddy-chat.png',
      },
      {
        title: 'Study Partner Community',
        url: '/images/projects/studybuddy/studybuddy-community.png',
      },
    ],
  },
  {
    number: '03',
    name: 'FixItNow Marketplace',
    category: 'Industrial / Services',
    description:
      'Full-featured service marketplace connecting enterprise clients with certified service vendors, featuring real-time quotes, booking pipelines, and job listings.',
    overview:
      'A professional service marketplace portal featuring robust UI to facilitate clients in discovering, booking, and managing premium industrial repairs, vendor listings, and equipment maintenance.',
    features: [
      'Comprehensive vendor directory and industrial equipment repair catalog',
      'Direct service inquiry, job posting, and quotation request workflow',
      'Filtering by industry, service type, and location',
      'Responsive enterprise UI optimized for field and desk operations',
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Python', 'SQL', 'Netlify'],
    role: 'Frontend & UI Developer — Crafted clean, responsive user interfaces and designed interactive customer booking experiences.',
    liveUrl: 'https://serviceindustries.netlify.app/',
    githubUrl: 'https://github.com/shubhamarbole',
    col1Img1: '/fixit-repair.jpg',
    col1Img2: '/fixit-machinery.jpg',
    col2Img: '/fixit-hero.jpg',
    gallery: [
      {
        title: 'Best Hero / Banner Image',
        url: '/fixit-hero.jpg',
      },
      {
        title: 'Best Industrial Repair Image',
        url: '/fixit-repair.jpg',
      },
      {
        title: 'Best Machinery / Equipment Image',
        url: '/fixit-machinery.jpg',
      },
      {
        title: 'Best Project / Work Image',
        url: '/fixit-work.jpg',
      },
    ],
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onOpenDetails: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, totalCards, onOpenDetails }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImg, setActiveImg] = useState(project.col2Img);

  React.useEffect(() => {
    setActiveImg(project.col2Img);
  }, [project.col2Img]);

  // Card stacking effect using useScroll and useTransform
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 relative shadow-[0_20px_60px_rgba(0,0,0,0.9)] will-change-transform"
      >
        {/* Top Row: Number, Category label, Project name, Tech Stack, and Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-7 border-b border-[#D7E2EA]/20">
          <div className="flex items-baseline sm:items-center gap-4 sm:gap-6 flex-wrap">
            <span
              className="font-black text-[#D7E2EA] leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 90px)' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60">
                ({project.category})
              </span>
              <h3
                onClick={() => onOpenDetails(project)}
                className="font-medium uppercase tracking-wide text-[#D7E2EA] mt-1 cursor-pointer hover:text-white transition-colors"
                style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.9rem)' }}
              >
                {project.name}
              </h3>
              {project.techStack && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.slice(0, 4).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-full bg-[#181A1E] border border-[#D7E2EA]/15 text-[10px] sm:text-xs text-[#D7E2EA]/75 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] sm:text-xs text-[#D7E2EA]/50 font-light">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="self-end sm:self-center flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => onOpenDetails(project)}
              className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-white/5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Info size={14} />
              Details
            </button>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub Repository"
                className="p-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Github size={16} />
              </a>
            )}

            <LiveProjectButton href={project.liveUrl} />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-5 sm:pt-7">
          {/* Left column (40% width): 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4">
            <div
              onClick={() => {
                setActiveImg(project.col1Img1);
              }}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#16181B] cursor-pointer group relative"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} visual 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-[11px] uppercase tracking-wider text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Click to view
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                setActiveImg(project.col1Img2);
              }}
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#16181B] cursor-pointer group relative"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} visual 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-[11px] uppercase tracking-wider text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Click to view
                </span>
              </div>
            </div>
          </div>

          {/* Right column (60% width): 1 tall image with gallery support */}
          <div className="md:col-span-7 flex relative">
            <div className="w-full min-h-[280px] md:min-h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#16181B] relative group">
              <img
                src={activeImg}
                alt={`${project.name} highlight showcase`}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 cursor-pointer"
                onClick={() => onOpenDetails(project)}
              />

              {/* Gallery Switcher Pills */}
              {project.gallery && project.gallery.length > 0 && (
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10 px-3">
                  <div className="flex gap-1.5 sm:gap-2 bg-[#0C0C0C]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D7E2EA]/20 shadow-xl max-w-full overflow-x-auto">
                    {project.gallery.map((gItem, imgIdx) => (
                      <button
                        key={imgIdx}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImg(gItem.url);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                          activeImg === gItem.url
                            ? 'bg-[#D7E2EA] text-[#0C0C0C] font-semibold scale-105 shadow-md'
                            : 'text-[#D7E2EA]/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {project.number === '01'
                          ? ['Dashboard', 'Services', 'Complaints', 'Operations'][imgIdx] || 'View'
                          : project.number === '02'
                          ? ['Hero', 'Dashboard', 'Chat', 'Community'][imgIdx] || 'View'
                          : ['Hero', 'Repair', 'Machinery', 'Work'][imgIdx] || 'View'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-4 sm:px-6 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto w-full mb-16 sm:mb-20 md:mb-24">
        {/* Heading: "Project" (singular) using .hero-heading gradient */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {/* 3 sticky stacking project cards */}
      <div className="w-full flex flex-col items-center">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            totalCards={PROJECTS_DATA.length}
            onOpenDetails={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Contact & Footer Section Anchor */}
      <div id="contact" className="mt-32 max-w-4xl mx-auto text-center pt-20 border-t border-[#D7E2EA]/10">
        <FadeIn delay={0.1} y={30}>
          <h3
            className="hero-heading font-black uppercase tracking-tight leading-none mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
          >
            Let&apos;s Connect
          </h3>
          <p className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm sm:text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Software Development Intern &amp; Full Stack Developer. Open for full-time opportunities and collaborative tech projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 flex-wrap mb-10">
            <ContactButton href="mailto:shubhamarbole@gmail.com" />
            <a
              href="/resume.pdf"
              download="Shubham_Arbole_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors duration-200"
            >
              <FileDown size={18} />
              Download Resume
            </a>
          </div>

          {/* Social Links from Old Portfolio */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href="https://www.linkedin.com/in/shubham-arbole/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-3 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/shubhamarbole"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-3 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.instagram.com/shubhammmm23?igsh=aGxwM21nODlvcWQ1&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram profile"
              className="p-3 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:shubhamarbole@gmail.com"
              aria-label="Send email"
              className="p-3 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA] hover:border-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-all duration-200"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Experience & Education Brief */}
          <div className="text-xs sm:text-sm font-light text-[#D7E2EA]/60 uppercase tracking-widest max-w-xl mx-auto mb-8 space-y-1">
            <p>VRIF, VTU Belagavi — Software Development Intern</p>
            <p>B.Tech Computer Science (2026) — Hirasugar Institute of Technology, Nidasoshi</p>
          </div>

          <div className="text-[#D7E2EA]/40 text-xs sm:text-sm font-light uppercase tracking-widest flex items-center justify-between flex-wrap gap-4 border-t border-[#D7E2EA]/10 pt-8">
            <span>&copy; {new Date().getFullYear()} SHUBHAM ARBOLE — ALL RIGHTS RESERVED</span>
            <span className="flex gap-6">
              <a href="#about" className="hover:text-[#D7E2EA] transition-colors">ABOUT</a>
              <a href="#services" className="hover:text-[#D7E2EA] transition-colors">SKILLS</a>
              <a href="#projects" className="hover:text-[#D7E2EA] transition-colors">PROJECTS</a>
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ProjectsSection;
