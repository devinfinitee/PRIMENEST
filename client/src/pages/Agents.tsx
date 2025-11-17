import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import AgentCard from "@/components/AgentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staggerScaleIn, fadeInUp, scaleIn } from "@/lib/animations";
import type { Agent } from "@shared/schema";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Agents() {
  return (
    <ProtectedRoute>
      <AgentsContent />
    </ProtectedRoute>
  );
}

function AgentsContent() {
  const [specialty, setSpecialty] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: agents = [], isLoading } = useQuery<Agent[]>({
    queryKey: ["/api/agents", specialty],
  });

  useEffect(() => {
    fadeInUp(headerRef.current, 0.1);
    scaleIn(searchRef.current, 0.3);
    
    if (gridRef.current && agents.length > 0) {
      const cards = gridRef.current.querySelectorAll('[data-testid^="card-agent"]');
      staggerScaleIn(cards);
    }
  }, [agents.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div ref={headerRef} className="text-center mb-12 opacity-0">
        <h1 className="text-4xl font-bold mb-4">Meet Our Expert Agents</h1>
        <p className="text-muted-foreground text-lg">
          Find a PrimeNest agent to help you buy, sell, or rent
        </p>
      </div>

      <div ref={searchRef} className="bg-card rounded-lg p-6 mb-12 opacity-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Name or Location"
              className="pl-10"
              data-testid="input-search-agents"
            />
          </div>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger data-testid="select-specialty">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Luxury">Luxury</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
          {agents.map((agent) => (
            <AgentCard key={agent.id} id={agent.id} name={agent.name} title={agent.title} photo={agent.photo} activeListings={agent.activeListings} experience={agent.experience} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-2 mt-12">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Button>1</Button>
        <Button variant="outline">2</Button>
        <Button variant="outline">Next</Button>
      </div>
    </div>
  );
}
