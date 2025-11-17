import { Card, CardContent } from "@/components/ui/card";
import { Home, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Home, label: "Properties Sold", value: "2,500+" },
    { icon: Users, label: "Happy Clients", value: "5,000+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: TrendingUp, label: "Years Experience", value: "10+" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About PrimeNest</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your trusted partner in finding the perfect property
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            At PrimeNest, we believe that finding your dream home should be an exciting and seamless experience.
            Our mission is to connect people with properties that perfectly match their lifestyle, needs, and aspirations.
            We leverage cutting-edge technology and deep market expertise to make real estate simple and accessible for everyone.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Our experienced agents provide personalized support throughout your property journey.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Comprehensive Listings</h3>
                <p className="text-muted-foreground">
                  Access thousands of verified properties across multiple cities and neighborhoods.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Transparent Process</h3>
                <p className="text-muted-foreground">
                  We believe in complete transparency with no hidden fees or surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
