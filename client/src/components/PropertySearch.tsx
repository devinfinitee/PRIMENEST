import { Search, MapPin, Home, DollarSign, Bed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function PropertySearch() {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
  });

  const handleSearch = () => {
    console.log("Search triggered with:", searchData);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-background rounded-2xl shadow-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="City, Neighborhood"
              className="pl-10"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              data-testid="input-location"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Property Type
          </label>
          <Select
            value={searchData.propertyType}
            onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}
          >
            <SelectTrigger data-testid="select-property-type">
              <Home className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Price Range
          </label>
          <Select
            value={searchData.priceRange}
            onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}
          >
            <SelectTrigger data-testid="select-price-range">
              <DollarSign className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500k">$0 - $500K</SelectItem>
              <SelectItem value="500k-1m">$500K - $1M</SelectItem>
              <SelectItem value="1m-2m">$1M - $2M</SelectItem>
              <SelectItem value="2m+">$2M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Bedrooms
          </label>
          <Select
            value={searchData.bedrooms}
            onValueChange={(value) => setSearchData({ ...searchData, bedrooms: value })}
          >
            <SelectTrigger data-testid="select-bedrooms">
              <Bed className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <Button
          className="w-full md:w-auto px-8"
          size="lg"
          onClick={handleSearch}
          data-testid="button-search"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </div>
  );
}
