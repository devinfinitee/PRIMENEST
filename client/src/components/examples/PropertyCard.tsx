import PropertyCard from '../PropertyCard'
import property1 from '@assets/generated_images/Luxury_beachfront_villa_exterior_cdc3f925.png'

export default function PropertyCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <PropertyCard
        id="1"
        image={property1}
        title="Luxury Villa"
        price="$1.2M"
        location="Miami, FL"
        bedrooms={4}
        bathrooms={3}
        area="2,800 sq ft"
        status="For Sale"
        featured={true}
      />
    </div>
  )
}
