import { Bed, Bath, Maximize, MapPin, Share2, Heart } from "lucide-react";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import AgentCard from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import property1 from '@assets/generated_images/Luxury_beachfront_villa_exterior_cdc3f925.png';
import property2 from '@assets/generated_images/Contemporary_family_villa_4a2973ee.png';
import property3 from '@assets/generated_images/Modern_luxury_condo_building_93c29a0b.png';
import agent1 from '@assets/generated_images/Female_real_estate_agent_e99fbd8d.png';

export default function PropertyDetail() {
  return (
    <ProtectedRoute>
      <PropertyDetailContent />
    </ProtectedRoute>
  );
}

function PropertyDetailContent() {
  const images = [property1, property2, property3, property1];

  const relatedProperties = [
    {
      id: "2",
      image: property2,
      title: "Modern Family Home",
      price: "$850K",
      location: "Austin, TX",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,200 sq ft",
      status: "For Sale" as const,
    },
    {
      id: "3",
      image: property3,
      title: "Downtown Luxury Condo",
      price: "$650K",
      location: "New York, NY",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,500 sq ft",
      status: "For Rent" as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <p className="text-muted-foreground text-sm mb-4">Home &gt; Properties &gt; Luxury Beachfront Condo</p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Luxury Beachfront Condo</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Miami, FL
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" data-testid="button-share">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" data-testid="button-favorite-detail">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <PropertyGallery images={images} title="Luxury Beachfront Condo" />

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">$1.8M</h2>
              <Badge className="bg-green-600 text-white">For Sale</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">4 Beds</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">3.5 Baths</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Maximize className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">2,800 sq ft</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience luxury beachfront living in this stunning villa. This meticulously designed home features
                breathtaking ocean views, modern amenities, and spacious living areas perfect for entertaining.
                The open-concept layout seamlessly blends indoor and outdoor spaces, offering a true coastal lifestyle.
                High-end finishes throughout, including marble countertops, hardwood floors, and designer fixtures.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
                <p className="text-muted-foreground">Map would be integrated here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Meet the Agent</h3>
              <AgentCard
                id="1"
                name="Jane Doe"
                title="PrimeNest Agent"
                photo={agent1}
                activeListings={15}
                experience="5 Years"
              />
              <Button className="w-full mt-4" size="lg" data-testid="button-schedule-tour">
                Schedule a Tour
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Related Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
