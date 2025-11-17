import { Bed, Bath, Maximize, MapPin, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { hoverLift } from "@/lib/animations";
import { getPropertyImage } from "@/lib/unsplash";

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: "For Sale" | "For Rent";
  featured?: boolean;
}

export default function PropertyCard({
  id,
  image,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  area,
  status,
  featured = false,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imgSrc, setImgSrc] = useState(image);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      return hoverLift(cardRef.current);
    }
  }, []);

  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      // Use Unsplash as fallback
      setImgSrc(getPropertyImage(id, 'house'));
    }
  };

  return (
    <Link href={`/property/${id}`}>
      <Card ref={cardRef} className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg cursor-pointer" data-testid={`card-property-${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <Badge className="bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          <Badge className={status === "For Sale" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
            {status}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="secondary"
          className={`absolute top-3 right-3 rounded-full ${isFavorited ? "bg-primary text-primary-foreground" : ""}`}
          onClick={() => {
            setIsFavorited(!isFavorited);
            console.log(`Property ${id} ${isFavorited ? 'unfavorited' : 'favorited'}`);
          }}
          data-testid={`button-favorite-${id}`}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="font-semibold text-xl mb-1" data-testid={`text-title-${id}`}>{title}</h3>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </p>
        </div>
        <p className="text-2xl font-bold text-primary mb-4" data-testid={`text-price-${id}`}>{price}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{area}</span>
          </div>
        </div>
      </CardContent>
      </Card>
    </Link>
  );
}
