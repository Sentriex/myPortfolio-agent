/**
 * @file src/components/ui/aurora-button.tsx
 * @version 0.1.0
 * @description A reusable button component with a glowing aurora effect.
 * @module UI
 *
 * @summary This component renders a button with a distinctive animated gradient border that
 * creates a "spotlight" or "aurora" effect. It is designed to be used for primary
 * calls-to-action, like the "RESUME" button in the site header.
 *
 * @dependencies
 * - react: For component rendering.
 *
 * @outputs
 * - React.Component: The AuroraButton component.
 *
 * @changelog
 * - 0.1.0 (2025-08-09): Initial creation.
 */
import React, { memo } from 'react';

// Custom CSS for the aurora effect needs to be defined.
// The keyframes `spin-spotlight-angle` should be in global.css
const auroraButtonStyles = `
  .aurora-button {
    padding: 1px;
    overflow: hidden;
    background-color: transparent;
    position: relative;
    border: none;
    cursor: pointer;
    border-radius: 0.625rem; /* 10px */
  }
  .aurora-button::after {
    content: '';
    position: absolute;
    z-index: -1;
    inset: -250%;
    background: conic-gradient(from var(--spotlight-angle), #8A2BE2, #6A0DAD, #4B0082, #6A0DAD, #8A2BE2);
    animation: spin-spotlight-angle 10s linear infinite;
  }
`;

const AuroraButton = memo(({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <>
      <style>{auroraButtonStyles}</style>
      <button className={`aurora-button ${className || ''}`} {...props}>
        <div className="aurora-button-mask bg-[#161616] px-4 py-1.5 rounded-[9px] transition-colors duration-300 ease-in-out hover:bg-[#131313]">
          <span className="aurora-button-text text-sm font-light text-white transition-colors duration-300 ease-in-out">
            {children}
          </span>
        </div>
      </button>
    </>
  );
});

AuroraButton.displayName = 'AuroraButton';

export default AuroraButton;
