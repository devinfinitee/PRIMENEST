import PropertyGallery from '../PropertyGallery'
import property1 from '@assets/generated_images/Luxury_beachfront_villa_exterior_cdc3f925.png'
import property2 from '@assets/generated_images/Contemporary_family_villa_4a2973ee.png'
import property3 from '@assets/generated_images/Modern_luxury_condo_building_93c29a0b.png'

export default function PropertyGalleryExample() {
  const images = [property1, property2, property3, property1]
  
  return (
    <div className="p-8 max-w-3xl">
      <PropertyGallery images={images} title="Luxury Property" />
    </div>
  )
}
