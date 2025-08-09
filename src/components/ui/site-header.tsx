/**
 * @file src/components/ui/site-header.tsx
 * @version 0.1.0
 * @description The main header and navigation for the portfolio.
 * @module UI
 *
 * @summary This component renders the fixed site header, which includes the logo,
 * navigation links, and a call-to-action button. It dynamically highlights the
 * active navigation link based on the user's scroll position.
 *
 * @dependencies
 * - react: For component rendering and hooks (useCallback).
 * - @/components/ui/aurora-button: For the "RESUME" button.
 *
 * @outputs
 * - React.Component: The SiteHeader component.
 *
 * @changelog
 * - 0.1.0 (2025-08-09): Initial creation.
 */
'use client';

import React, { memo, useCallback } from 'react';
import AuroraButton from './aurora-button';

interface SiteHeaderProps {
  activeSection: string;
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const SiteHeader = memo(({ activeSection, sectionRefs }: SiteHeaderProps) => {
  const scrollToSection = useCallback((sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      const topPos = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos,
        behavior: 'smooth',
      });
    }
  }, [sectionRefs]);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'philosophy', label: 'Philosophy' },
  ];

  return (
    <header className="site-header fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-10 p-2 px-6 rounded-2xl bg-[rgba(18,18,18,0.7)] backdrop-blur-md border border-[rgba(255,255,255,0.05)]">
      <div className="header-content grid grid-cols-[1fr_auto_1fr] items-center w-full">
        <div className="logo-container justify-self-start flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span className="logo-separator text-white font-light">|</span>
          <span className="logo-text text-white font-light tracking-wider">myPortfolio</span>
        </div>
        <nav className="main-nav justify-self-center hidden md:block">
          <div className="nav-links flex items-center gap-1 p-1 rounded-xl bg-[rgba(14,14,14,0.8)] border border-[rgba(255,255,255,0.05)]">
            {navLinks.map(link => (
              <button
                key={link.id}
                className={`nav-button px-3 py-1 rounded-lg bg-transparent border-none text-white font-light cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)] hover:text-white ${activeSection === link.id ? 'bg-[rgba(255,255,255,0.05)]' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="header-actions justify-self-end">
          <AuroraButton>RESUME</AuroraButton>
        </div>
      </div>
    </header>
  );
});

SiteHeader.displayName = 'SiteHeader';

export default SiteHeader;
