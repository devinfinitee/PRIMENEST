import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { staggerScaleIn, fadeInUp } from "@/lib/animations";
import type { Property } from "@shared/schema";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Properties() {
  return (
    <ProtectedRoute>
      <PropertiesContent />
    </ProtectedRoute>
  );
}

function PropertiesContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<{ city?: string; status?: string; propertyType?: string }>({});
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const { data: properties = [], isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", filters],
  });

  useEffect(() => {
    fadeInUp(headerRef.current, 0.1);
    fadeInUp(sidebarRef.current, 0.2);
    
    if (gridRef.current && properties.length > 0) {
      const cards = gridRef.current.querySelectorAll('[data-testid^="card-property"]');
      staggerScaleIn(cards);
    }
  }, [properties.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div ref={headerRef} className="mb-8 opacity-0">
        <h1 className="text-3xl font-bold mb-2">Explore PrimeNest Listings</h1>
        <p className="text-muted-foreground">Home &gt; Properties</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside ref={sidebarRef} className="lg:w-80 flex-shrink-0 opacity-0">
          <FilterSidebar onFilterChange={setFilters} />
        </aside>

        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Available Properties <span className="font-semibold text-foreground">({properties.length} Results)</span>
            </p>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                data-testid="button-view-grid"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                data-testid="button-view-list"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div 
              ref={gridRef}
              className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}
            >
              {properties.map((property) => (
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

          <div className="flex justify-center gap-2 mt-12">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button>1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </main>
      </div>
    </div>
  );
}
