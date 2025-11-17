import CityCard from '../CityCard'
import london from '@assets/generated_images/London_city_skyline_628ef94b.png'

export default function CityCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <CityCard
        id="1"
        name="London"
        country="United Kingdom"
        image={london}
        properties={245}
      />
    </div>
  )
}
