import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CityCardProps {
  id: string;
  name: string;
  country: string;
  image: string;
  properties: number;
}

export default function CityCard({ id, name, country, image, properties }: CityCardProps) {
  return (
    <Card
      className="relative overflow-hidden h-64 cursor-pointer hover-elevate transition-all duration-300 hover:shadow-xl group"
      onClick={() => console.log(`Explore ${name}`)}
      data-testid={`card-city-${id}`}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-bold text-2xl mb-1" data-testid={`text-city-${id}`}>{name}</h3>
        <p className="text-sm text-white/90 mb-2">{country}</p>
        <p className="text-sm text-white/80 flex items-center gap-2">
          {properties} Properties
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Card>
  );
}
