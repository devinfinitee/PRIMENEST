import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PrimeNest</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner in finding the perfect property. Making real estate simple and accessible.
            </p>
            <div className="flex gap-3">
              <button className="p-2 rounded-full bg-muted hover-elevate active-elevate-2" data-testid="button-facebook">
                <Facebook className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-full bg-muted hover-elevate active-elevate-2" data-testid="button-twitter">
                <Twitter className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-full bg-muted hover-elevate active-elevate-2" data-testid="button-instagram">
                <Instagram className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-full bg-muted hover-elevate active-elevate-2" data-testid="button-linkedin">
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/"><a className="hover:text-primary transition-colors">Home</a></Link></li>
              <li><Link href="/properties"><a className="hover:text-primary transition-colors">Properties</a></Link></li>
              <li><Link href="/agents"><a className="hover:text-primary transition-colors">Agents</a></Link></li>
              <li><Link href="/about"><a className="hover:text-primary transition-colors">About Us</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">For Sale</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">For Rent</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Commercial</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Residential</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe to get the latest property updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button size="default" data-testid="button-subscribe">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 PrimeNest. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
