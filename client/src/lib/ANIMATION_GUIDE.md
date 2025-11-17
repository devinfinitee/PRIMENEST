# Animation Guide - Quick Reference

## Available Animations

### Entrance Animations

#### fadeInUp
```typescript
fadeInUp(element, delay?)
```
- Fades in from bottom (50px)
- Duration: 0.8s
- Use for: Headers, sections

#### fadeIn
```typescript
fadeIn(element, delay?)
```
- Simple opacity fade
- Duration: 0.6s
- Use for: Subtle reveals

#### scaleIn
```typescript
scaleIn(element, delay?)
```
- Scales from 0.8 to 1.0
- Duration: 0.6s
- Use for: Cards, buttons

#### bounceIn
```typescript
bounceIn(element, delay?)
```
- Elastic bounce from 0.3 scale
- Duration: 0.8s
- Use for: Playful elements, badges

#### rotateIn
```typescript
rotateIn(element, delay?)
```
- Rotates from -180° with scale
- Duration: 1.0s
- Use for: Icons, special elements

#### flipIn
```typescript
flipIn(element, delay?)
```
- 3D flip on Y-axis
- Duration: 0.8s
- Use for: Cards, images

### Directional Animations

#### slideInLeft
```typescript
slideInLeft(element, delay?)
```
- Slides from left (-100px)
- Duration: 0.8s

#### slideInRight
```typescript
slideInRight(element, delay?)
```
- Slides from right (100px)
- Duration: 0.8s

### Stagger Animations

#### staggerFadeInUp
```typescript
staggerFadeInUp(elements)
```
- Multiple elements fade up
- Stagger: 0.1s
- Use for: Lists, grids

#### staggerScaleIn
```typescript
staggerScaleIn(elements)
```
- Multiple elements scale in
- Stagger: 0.15s
- Use for: Card grids

### Scroll Animations

#### scrollReveal
```typescript
scrollReveal(element, direction?)
// direction: 'left' | 'right' | 'up' | 'down'
```
- Triggers at 85% viewport
- Duration: 1.0s
- Use for: Sections on scroll

#### staggerScrollReveal
```typescript
staggerScrollReveal(elements, direction?)
```
- Multiple elements on scroll
- Stagger: 0.1s
- Use for: Card grids on scroll

#### scrollTriggerFadeIn
```typescript
scrollTriggerFadeIn(element)
```
- Basic scroll trigger
- Triggers at 80% viewport

#### parallaxScroll
```typescript
parallaxScroll(element, speed?)
// speed: 0.5 = half scroll speed
```
- Parallax effect
- Use for: Background elements

### Hover Animations

#### hoverScale
```typescript
const cleanup = hoverScale(element)
// Returns cleanup function
```
- Scales to 1.05 on hover
- Duration: 0.3s

#### hoverLift
```typescript
const cleanup = hoverLift(element)
```
- Lifts 10px + scales 1.02
- Enhanced shadow
- Duration: 0.3s

### Special Animations

#### pulseAnimation
```typescript
pulseAnimation(element)
```
- Infinite pulse (1.05 scale)
- Duration: 1.0s loop
- Use for: CTA buttons

#### textReveal
```typescript
textReveal(element, delay?)
```
- Character-by-character reveal
- Stagger: 0.03s per char
- Use for: Headlines

#### numberCounter
```typescript
numberCounter(element, endValue, duration?)
```
- Counts from 0 to endValue
- Duration: 2.0s default
- Use for: Statistics

## Common Patterns

### Page Load Sequence
```typescript
useEffect(() => {
  fadeInUp(headerRef.current, 0.1);
  fadeInUp(contentRef.current, 0.3);
  scaleIn(ctaRef.current, 0.5);
}, []);
```

### Card Grid
```typescript
useEffect(() => {
  if (gridRef.current && items.length > 0) {
    const cards = gridRef.current.querySelectorAll('[data-testid^="card"]');
    staggerScaleIn(cards);
  }
}, [items.length]);
```

### Scroll Section
```typescript
useEffect(() => {
  scrollReveal(sectionRef.current, 'up');
}, []);
```

### Interactive Card
```typescript
const cardRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (cardRef.current) {
    return hoverLift(cardRef.current);
  }
}, []);
```

## Timing Guidelines

### Delays
- **0.1s** - First element
- **0.2s** - Second element
- **0.3s** - Third element
- **0.4s+** - Additional elements

### Durations
- **0.3s** - Hover effects
- **0.6s** - Quick entrances
- **0.8s** - Standard entrances
- **1.0s** - Dramatic entrances

### Stagger
- **0.03s** - Text characters
- **0.1s** - Standard grid items
- **0.15s** - Larger elements

## Best Practices

### ✅ Do
- Use consistent timing across similar elements
- Add cleanup for hover animations
- Check if element exists before animating
- Use stagger for multiple items
- Trigger scroll animations at 80-85% viewport

### ❌ Don't
- Animate too many elements at once
- Use long durations (>1.5s)
- Forget to add opacity-0 class for initial state
- Animate on every re-render
- Use animations that distract from content

## Element Setup

### For Entrance Animations
```tsx
<div ref={elementRef} className="opacity-0">
  Content
</div>
```

### For Scroll Animations
```tsx
<section ref={sectionRef} className="opacity-0">
  Content
</section>
```

### For Hover Animations
```tsx
<div ref={cardRef}>
  Content
</div>
```

## Performance Tips

1. Use transforms (translateY, scale) over position/size
2. Avoid animating width/height
3. Use will-change sparingly
4. Clean up hover listeners
5. Use GSAP's optimized rendering

## Easing Reference

- **power3.out** - Smooth deceleration (default)
- **power2.out** - Quick deceleration
- **back.out** - Overshoot effect
- **elastic.out** - Bouncy effect
- **power1.inOut** - Smooth in and out

## Example Component

```typescript
import { useEffect, useRef } from 'react';
import { fadeInUp, staggerScaleIn, hoverLift } from '@/lib/animations';

export default function MyComponent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Title animation
    fadeInUp(titleRef.current, 0.1);

    // Grid stagger
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.card');
      staggerScaleIn(cards);
    }

    // Hover effects
    const cleanups = cardRefs.current.map(card => 
      card ? hoverLift(card) : undefined
    );

    return () => {
      cleanups.forEach(cleanup => cleanup?.());
    };
  }, []);

  return (
    <div>
      <h1 ref={titleRef} className="opacity-0">Title</h1>
      <div ref={gridRef}>
        {items.map((item, i) => (
          <div 
            key={item.id}
            ref={el => cardRefs.current[i] = el!}
            className="card"
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
```
