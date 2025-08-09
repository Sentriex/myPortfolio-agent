/**
 * @file src/app/(main)/page.tsx
 * @version 0.1.0
 * @description The main homepage of the portfolio application.
 * @module Home
 *
 * @summary This component serves as the primary landing page. It orchestrates the display
 * of major content sections like "About," "Projects," and "Philosophy." It also includes
 * logic for tracking the active section based on scroll position to drive the navigation UI.
 *
 * @dependencies
 * - react: For component rendering and hooks (useState, useEffect, useRef).
 * - @/components/ui/site-header: The SiteHeader component will be used here.
 * - @/components/ui/expanding-pill: The ExpandingPill component will be used here.
 *
 * @outputs
 * - React.Component: The main page component.
 *
 * @changelog
 * - 0.1.0 (2025-08-09): Initial creation.
 */
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import SiteHeader from '@/components/ui/site-header';
import ExpandingPill from '@/components/ui/expanding-pill';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionRefs.current;
      const targetLine = window.innerHeight * 0.3;

      let closestSectionId = '';
      let smallestDistance = Infinity;

      Object.keys(sections).forEach(key => {
        const section = sections[key];
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top;
        const distance = Math.abs(sectionTop - targetLine);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestSectionId = section.id;
        }
      });

      setActiveSection(closestSectionId);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    window.addEventListener('scroll', debouncedHandleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return (
    <div className="app-container relative w-full bg-black text-white">
        <div className="portfolio-content max-w-[1000px] mx-auto px-8 pt-32 pb-8">
            <section
                id="about"
                className="content-section min-h-screen pt-24 border-b border-[rgba(255,255,255,0.1)]"
                ref={el => { sectionRefs.current.about = el; }}
            >
                <h2 className="text-5xl font-medium tracking-tighter mb-8 text-center">About Me</h2>
                <p className="text-lg font-normal leading-relaxed text-white max-w-[700px] mx-auto mb-8 text-center">I&apos;m a software engineer who builds for the web with a focus on creating intuitive, high-performance user experiences. My expertise lies in the modern JavaScript ecosystem, particularly with React and Next.js, and I&apos;m passionate about writing clean, scalable, and maintainable code.</p>
            </section>

            <section
                id="projects"
                className="content-section min-h-screen pt-24 border-b border-[rgba(255,255,255,0.1)]"
                ref={el => { sectionRefs.current.projects = el; }}
            >
                <h2 className="text-5xl font-medium tracking-tighter mb-8 text-center">Projects</h2>
                <div className="projects-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
                    <div className="project-card bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]">
                        <h3 className="text-2xl font-medium mb-2">Project One</h3>
                        <p className="text-base text-left mb-0 font-normal text-white">A description of a complex and interesting project. It should highlight the technologies used and the problems that were solved. This demonstrates practical application of skills.</p>
                    </div>
                    <div className="project-card bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]">
                        <h3 className="text-2xl font-medium mb-2">Project Two</h3>
                        <p className="text-base text-left mb-0 font-normal text-white">Another project description, perhaps focusing on a different area of expertise like UI/UX, backend integration, or performance optimization. Shows versatility.</p>
                    </div>
                    <div className="project-card bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.1)]">
                        <h3 className="text-2xl font-medium mb-2">Project Three</h3>
                        <p className="text-base text-left mb-0 font-normal text-white">A third project, maybe a personal passion project or a significant open-source contribution. This can reveal more about your interests and dedication to the craft.</p>
                    </div>
                </div>
            </section>

            <section
                id="philosophy"
                className="content-section min-h-screen pt-24"
                ref={el => { sectionRefs.current.philosophy = el; }}
            >
                <h2 className="text-5xl font-medium tracking-tighter mb-8 text-center">Philosophy</h2>
                <p className="text-lg font-normal leading-relaxed text-white max-w-[700px] mx-auto mb-8 text-center">I believe that the best software is born from a deep understanding of the user&apos;s needs and a relentless pursuit of simplicity. My approach is to deconstruct complex problems into their essential components and build solutions that are not only functional but also elegant and enjoyable to use. I value collaboration, clear communication, and the constant refinement of my craft.</p>
            </section>
        </div>

        <div className="global-aurora fixed inset-0 z-[1] opacity-20"></div>
        <SiteHeader activeSection={activeSection} sectionRefs={sectionRefs} />
        <ExpandingPill />
    </div>
  );
}
