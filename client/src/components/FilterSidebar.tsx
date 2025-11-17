import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilterSidebarProps {
  onFilterChange?: (filters: { city?: string; status?: string; propertyType?: string }) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const propertyTypes = ["House", "Apartment", "Condo", "Villa", "Land"];

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApply = () => {
    onFilterChange?.({
      city: location || undefined,
      status: status || undefined,
      propertyType: selectedTypes.length > 0 ? selectedTypes[0] : undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location-filter" className="mb-2 block">Location</Label>
          <Input
            id="location-filter"
            placeholder="City, Neighborhood"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            data-testid="input-location-filter"
          />
        </div>

        <div>
          <Label htmlFor="status-filter" className="mb-2 block">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status-filter" data-testid="select-status-filter">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="For Sale">For Sale</SelectItem>
              <SelectItem value="For Rent">For Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-3 block">Property Type</Label>
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => toggleType(type)}
                  data-testid={`checkbox-${type.toLowerCase()}`}
                />
                <label
                  htmlFor={type}
                  className="text-sm cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="mb-3 block">
            Price Range: ${(priceRange[0] / 1000).toFixed(0)}K - ${(priceRange[1] / 1000).toFixed(0)}K
          </Label>
          <Slider
            min={0}
            max={5000000}
            step={100000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-2"
            data-testid="slider-price"
          />
        </div>

        <div>
          <Label htmlFor="bedrooms-filter" className="mb-2 block">Bedrooms</Label>
          <Select>
            <SelectTrigger id="bedrooms-filter" data-testid="select-bedrooms-filter">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="bathrooms-filter" className="mb-2 block">Bathrooms</Label>
          <Select>
            <SelectTrigger id="bathrooms-filter" data-testid="select-bathrooms-filter">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleApply} className="w-full" data-testid="button-apply-filters">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
