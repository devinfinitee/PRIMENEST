import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const fadeIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.6,
      delay,
      ease: "power2.out",
    }
  );
};

export const scaleIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay,
      ease: "back.out(1.7)",
    }
  );
};

export const slideInLeft = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const slideInRight = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const staggerFadeInUp = (elements: HTMLElement[] | NodeListOf<Element>) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    }
  );
};

export const scrollTriggerFadeIn = (element: HTMLElement | null) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
};

export const hoverScale = (element: HTMLElement) => {
  const onEnter = () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
};

export const bounceIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.3,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: "elastic.out(1, 0.5)",
    }
  );
};

export const rotateIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      rotation: -180,
      scale: 0.5,
    },
    {
      opacity: 1,
      rotation: 0,
      scale: 1,
      duration: 1,
      delay,
      ease: "back.out(1.7)",
    }
  );
};

export const flipIn = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      rotationY: 90,
    },
    {
      opacity: 1,
      rotationY: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
    }
  );
};

export const staggerScaleIn = (elements: HTMLElement[] | NodeListOf<Element>) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(1.4)",
    }
  );
};

export const parallaxScroll = (element: HTMLElement | null, speed = 0.5) => {
  if (!element) return;
  
  gsap.to(element, {
    y: () => window.scrollY * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

export const scrollReveal = (element: HTMLElement | null, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
  if (!element) return;
  
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };
  
  const { x, y } = directions[direction];
  
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
      y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

export const staggerScrollReveal = (elements: HTMLElement[] | NodeListOf<Element>, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 50 },
    down: { x: 0, y: -50 },
  };
  
  const { x, y } = directions[direction];
  
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      x,
      y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: elements[0],
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );
};

export const hoverLift = (element: HTMLElement) => {
  const onEnter = () => {
    gsap.to(element, {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
  };
};

export const pulseAnimation = (element: HTMLElement | null) => {
  if (!element) return;
  
  gsap.to(element, {
    scale: 1.05,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
};

export const textReveal = (element: HTMLElement | null, delay = 0) => {
  if (!element) return;
  
  const text = element.textContent || '';
  element.textContent = '';
  
  const chars = text.split('');
  chars.forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  
  gsap.fromTo(
    element.children,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay,
      stagger: 0.03,
      ease: "power2.out",
    }
  );
};

export const numberCounter = (element: HTMLElement | null, endValue: number, duration = 2) => {
  if (!element) return;
  
  const obj = { value: 0 };
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: "power1.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};
