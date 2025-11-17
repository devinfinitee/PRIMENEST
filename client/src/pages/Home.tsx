import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import CityCard from "@/components/CityCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { fadeInUp, staggerFadeInUp, scrollReveal, staggerScrollReveal } from "@/lib/animations";
import type { Property } from "@shared/schema";
import heroImage from '@assets/generated_images/Hero_luxury_home_image_7f54862f.png';
import london from '@assets/generated_images/London_city_skyline_628ef94b.png';
import tokyo from '@assets/generated_images/Tokyo_city_skyline_08c175c0.png';

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const propertiesGridRef = useRef<HTMLDivElement>(null);
  const citiesRef = useRef<HTMLDivElement>(null);
  const citiesTitleRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  
  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  const cities = [
    {
      id: "1",
      name: "London",
      country: "United Kingdom",
      image: london,
      properties: 245,
    },
    {
      id: "2",
      name: "Tokyo",
      country: "Japan",
      image: tokyo,
      properties: 189,
    },
  ];

  useEffect(() => {
    if (sectionRef.current) {
      fadeInUp(sectionRef.current, 0.2);
    }
    if (propertiesGridRef.current && featuredProperties.length > 0) {
      const cards = propertiesGridRef.current.querySelectorAll('[data-testid^="card-property"]');
      staggerFadeInUp(cards);
    }
    
    // Scroll-triggered animations
    scrollReveal(citiesTitleRef.current, 'up');
    
    if (citiesRef.current) {
      const cityCards = citiesRef.current.querySelectorAll('[data-testid^="card-city"]');
      staggerScrollReveal(cityCards, 'up');
    }
    
    scrollReveal(ctaSectionRef.current, 'up');
  }, [featuredProperties.length]);

  return (
    <div>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={sectionRef}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Properties</h2>
            <p className="text-muted-foreground">Handpicked properties just for you</p>
          </div>
          <Link href="/properties">
            <Button variant="outline" data-testid="button-view-all">
              View All Properties
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={propertiesGridRef}>
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                id={property.id}
                image={property.images[0]}
                title={property.title}
                price={`$${Number(property.price).toLocaleString()}`}
                location={property.location}
                bedrooms={property.bedrooms}
                bathrooms={Number(property.bathrooms)}
                area={`${property.area.toLocaleString()} sq ft`}
                status={property.status as "For Sale" | "For Rent"}
                featured={property.featured}
              />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div ref={citiesTitleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl font-bold mb-2">Explore by City</h2>
          <p className="text-muted-foreground">Discover properties in popular locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" ref={citiesRef}>
          {cities.map((city) => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>
      </section>

      <section className="bg-muted py-20">
        <div ref={ctaSectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-0">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Connect with our expert agents and start your journey today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" data-testid="button-browse-properties">
                Browse Properties
              </Button>
            </Link>
            <Link href="/agents">
              <Button size="lg" variant="outline" data-testid="button-find-agent">
                Find an Agent
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
