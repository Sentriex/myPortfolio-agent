/**
 * @file src/components/ui/expanding-pill.tsx
 * @version 0.1.0
 * @description An animated, expandable pill component, intended for the chat feature.
 * @module UI
 *
 * @summary This component renders a pill-shaped button that expands into a large panel
 * on click. It is intended to be the entry point for the AI chat interface. The animation
 * is controlled via CSS keyframes and component state.
 *
 * @dependencies
 * - react: For component rendering and hooks (useState).
 *
 * @outputs
 * - React.Component: The ExpandingPill component.
 *
 * @changelog
 * - 0.1.0 (2025-08-09): Initial creation.
 */
'use client';

import React, { useState, memo } from 'react';

// Custom CSS for the aurora effect needs to be defined.
// The keyframes `spin-spotlight-angle`, `open-pill`, `close-pill` should be in global.css
const pillStyles = `
  #expanding-pill {
    padding: 1px;
    overflow: hidden;
    background-color: transparent;
    position: relative;
  }
  #expanding-pill::after {
    content: '';
    position: absolute;
    z-index: -1;
    inset: -250%;
    background: conic-gradient(from var(--spotlight-angle), #8A2BE2, #6A0DAD, #4B0082, #6A0DAD, #8A2BE2);
    animation: spin-spotlight-angle 10s linear infinite;
  }
`;

const ExpandingPill = memo(() => {
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'opening', 'closing', 'open'

  const triggerAnimation = () => {
    if (animationState === 'opening' || animationState === 'closing') return;
    setAnimationState(animationState === 'idle' || animationState === 'closing' ? 'opening' : 'closing');
  };

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName === 'open-pill') {
      setAnimationState('open');
    } else if (event.animationName === 'close-pill') {
      setAnimationState('idle');
    }
  };

  const animationClasses: Record<string, string> = {
    opening: 'animate-[open-pill_var(--anim-total-duration)_forwards_cubic-bezier(0.85,0,0.15,1)]',
    closing: 'animate-[close-pill_var(--anim-total-duration)_forwards_cubic-bezier(0.85,0,0.15,1)]',
  };

  const baseClasses = 'fixed bottom-[var(--pill-bottom-offset)] left-0 right-0 mx-auto z-[5] shadow-lg';
  const stateClasses: Record<string, string> = {
    idle: 'w-[var(--pill-idle-width)] h-[var(--pill-idle-height)] rounded-[var(--pill-radius)] cursor-pointer',
    opening: 'w-[var(--pill-idle-width)] h-[var(--pill-idle-height)] rounded-[var(--pill-radius)] pointer-events-none',
    closing: 'w-[min(var(--pill-width-expanded),var(--pill-max-width))] h-[var(--panel-height)] rounded-[var(--panel-radius)] pointer-events-none',
    open: 'w-[min(var(--pill-width-expanded),var(--pill-max-width))] h-[var(--panel-height)] rounded-[var(--panel-radius)] cursor-default',
  }

  const currentAnimation = animationClasses[animationState] || '';
  const currentState = stateClasses[animationState] || '';

  return (
    <>
        <style>{pillStyles}</style>
        <div
            id="expanding-pill"
            className={`${baseClasses} ${currentState} ${currentAnimation}`}
            onAnimationEnd={handleAnimationEnd}
            onClick={animationState === 'open' || animationState === 'idle' ? triggerAnimation : undefined}
        >
            <div id="pill-content-mask" className="w-full h-full bg-[#121212] rounded-[inherit] flex items-center justify-center">
              {/* Content for the pill/panel will go here */}
            </div>
        </div>
    </>
  );
});

ExpandingPill.displayName = 'ExpandingPill';

export default ExpandingPill;
