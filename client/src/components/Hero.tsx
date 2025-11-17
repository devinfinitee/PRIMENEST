import { useEffect, useRef, useState } from "react";
import PropertySearch from "./PropertySearch";
import { fadeInUp, slideInLeft, slideInRight, scaleIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHeroImage } from "@/lib/unsplash";

interface HeroProps {
  backgroundImages?: string[];
}

export default function Hero({ backgroundImages }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  
  // Default hero images if none provided
  const slides = backgroundImages || [
    getHeroImage(0),
    getHeroImage(1),
    getHeroImage(2),
    getHeroImage(3)
  ];

  useEffect(() => {
    // Animate background with zoom effect
    if (bgRef.current) {
      bgRef.current.style.transform = 'scale(1.1)';
      bgRef.current.style.transition = 'transform 0.8s ease-out';
      setTimeout(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = 'scale(1)';
        }
      }, 100);
    }

    // Stagger animations for content
    fadeInUp(titleRef.current, 0.2);
    slideInLeft(subtitleRef.current, 0.4);
    scaleIn(searchRef.current, 0.6);
  }, [currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((image, index) => (
        <div
          key={index}
          ref={index === currentSlide ? bgRef : null}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-8 w-8 sm:h-10 sm:w-10"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-8 w-8 sm:h-10 sm:w-10"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h1 
            ref={titleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 opacity-0 px-2"
          >
            The Smartest Way To Find
            <br />
            Your Dream Home
          </h1>
          <p 
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 opacity-0"
          >
            Browse by / For Sale / Commercial
          </p>
        </div>

        <div ref={searchRef} className="opacity-0">
          <PropertySearch />
        </div>
      </div>
    </section>
  );
}
