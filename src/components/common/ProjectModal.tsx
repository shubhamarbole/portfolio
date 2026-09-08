import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Sparkles, UserCheck, Eye } from 'lucide-react';

export interface ProjectModalData {
  number: string;
  name: string;
  category: string;
  description: string;
  overview?: string;
  features?: string[];
  techStack?: string[];
  role?: string;
  liveUrl: string;
  githubUrl?: string;
  gallery: {
    title: string;
    url: string;
  }[];
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setSelectedImage(null);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedImage, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0C0C0C] border-2 border-[#D7E2EA]/30 rounded-[32px] sm:rounded-[44px] md:rounded-[56px] p-5 sm:p-8 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 text-[#D7E2EA] font-sans"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              aria-label="Close project modal"
              className="absolute top-5 sm:top-8 right-5 sm:right-8 p-3 rounded-full bg-[#181A1E] border border-[#D7E2EA]/20 text-[#D7E2EA] hover:bg-white/10 hover:border-[#D7E2EA] transition-all duration-200 cursor-pointer z-20"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="border-b border-[#D7E2EA]/15 pb-6 sm:pb-8 pr-12">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-2">
                <span>PROJECT {project.number}</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-[#D7E2EA] leading-tight">
                {project.name}
              </h2>
            </div>

            {/* Content Body */}
            <div className="py-6 sm:py-8 space-y-8 sm:space-y-10">
              {/* Project Overview */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#D7E2EA]/70 mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#BBCCD7]" />
                  Project Overview
                </h3>
                <p className="text-base sm:text-lg text-[#D7E2EA]/90 leading-relaxed font-light">
                  {project.overview || project.description}
                </p>
              </div>

              {/* Key Features & Tech Stack Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div className="bg-[#141518] p-5 sm:p-7 rounded-[28px] border border-[#D7E2EA]/15">
                    <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#D7E2EA]/80 mb-4 flex items-center gap-2">
                      <Layers size={18} className="text-[#BBCCD7]" />
                      Key Features
                    </h3>
                    <ul className="space-y-2.5">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#D7E2EA]/80 font-light leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA] mt-1.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technology Stack & Role */}
                <div className="flex flex-col gap-6">
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="bg-[#141518] p-5 sm:p-7 rounded-[28px] border border-[#D7E2EA]/15 flex-1">
                      <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#D7E2EA]/80 mb-3 flex items-center gap-2">
                        <Layers size={18} className="text-[#BBCCD7]" />
                        Technology Stack
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-full bg-[#1F2228] border border-[#D7E2EA]/20 text-xs font-medium text-[#D7E2EA] uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.role && (
                    <div className="bg-[#141518] p-5 sm:p-6 rounded-[28px] border border-[#D7E2EA]/15">
                      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]/80 mb-1.5 flex items-center gap-2">
                        <UserCheck size={16} className="text-[#BBCCD7]" />
                        My Role
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D7E2EA]/75 font-light leading-relaxed">
                        {project.role}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#D7E2EA]/80 mb-4 flex items-center gap-2">
                    <Eye size={18} className="text-[#BBCCD7]" />
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {project.gallery.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(item.url)}
                        className="group relative overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#141518] border border-[#D7E2EA]/20 cursor-pointer"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-3.5 sm:p-4 bg-[#141518] border-t border-[#D7E2EA]/10 flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-medium text-[#D7E2EA] tracking-wide">
                            {idx + 1}. {item.title}
                          </span>
                          <span className="text-[10px] uppercase font-light tracking-widest text-[#D7E2EA]/60 group-hover:text-white transition-colors">
                            Click to expand
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-[#D7E2EA]/15">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base uppercase tracking-widest font-medium text-white transition-all duration-300 select-none shadow-lg cursor-pointer hover:brightness-110"
                  style={{
                    background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                    boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                    outline: '2px solid #FFFFFF',
                    outlineOffset: '-3px',
                  }}
                >
                  View Live Demo
                  <ExternalLink size={17} />
                </a>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-8 py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer select-none"
                  >
                    <Github size={18} />
                    View GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Image Lightbox Preview */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg cursor-zoom-out"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="relative max-w-6xl max-h-[92vh] overflow-hidden rounded-[28px] border border-white/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={selectedImage}
                    alt="Expanded preview"
                    className="w-full h-auto max-h-[85vh] object-contain rounded-[28px]"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    type="button"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
