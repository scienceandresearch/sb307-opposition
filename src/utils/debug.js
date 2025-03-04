// File: src/utils/debug.js

/**
 * Debug utility for the SB307 campaign site
 * Add this to your main layout or page component to help identify issues
 */

export const debugLayout = () => {
    if (typeof window === 'undefined') return; // Skip during SSR
    
    console.log('==== SB307 Layout Debug ====');
    
    // Check if Tailwind is loaded
    const tailwindLoaded = document.querySelectorAll('[data-tailwind]').length > 0 || 
                           document.querySelector('style')?.textContent.includes('tailwind');
    console.log('Tailwind CSS loaded:', tailwindLoaded ? 'Yes' : 'Possibly No');
    
    // Check viewport dimensions
    console.log('Viewport:', {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio
    });
    
    // Check for rendering containers
    const mainContent = document.querySelector('main');
    console.log('Main content container:', mainContent ? 'Found' : 'Missing');
    
    // Check components
    const components = {
      header: document.querySelector('header'),
      footer: document.querySelector('footer'),
      hero: document.querySelector('section:first-of-type'),
      addressForm: document.querySelector('#find-reps')
    };
    
    console.log('Components found:', 
      Object.entries(components)
        .map(([name, el]) => `${name}: ${el ? 'Yes' : 'No'}`)
        .join(', ')
    );
    
    // Check for JS errors
    const jsErrors = window.onerror;
    console.log('JS errors detected:', jsErrors ? 'Yes' : 'None');
    
    console.log('==== Debug Complete ====');
    
    // Return a small visual indicator that debugging is active
    return true;
  };
  
  // Use this to debug specific components
  export const debugComponent = (componentName, element) => {
    if (typeof window === 'undefined') return; // Skip during SSR
    
    console.log(`==== Debugging ${componentName} ====`);
    console.log('Element:', element);
    
    if (element) {
      console.log('Size:', {
        width: element.offsetWidth,
        height: element.offsetHeight,
        rect: element.getBoundingClientRect()
      });
      
      console.log('Styles:', window.getComputedStyle(element));
      console.log('Children:', element.children.length);
    } else {
      console.log('Element not found in DOM');
    }
    
    console.log(`==== ${componentName} Debug Complete ====`);
  };
  
  // Add this to your layout file
  export const addDebugListener = () => {
    if (typeof window === 'undefined') return;
    
    // Press Ctrl+Shift+D to activate debug mode
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        debugLayout();
        
        // Highlight DOM elements with outlines
        document.querySelectorAll('header, section, footer').forEach(el => {
          el.style.outline = '2px solid rgba(255, 0, 0, 0.5)';
          setTimeout(() => {
            el.style.outline = '';
          }, 2000);
        });
      }
    });
  };