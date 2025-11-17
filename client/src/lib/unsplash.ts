// Unsplash image utility for property images
// Using Unsplash Source API for random images

export const getPropertyImage = (id: string, type: 'house' | 'apartment' | 'villa' | 'condo' = 'house'): string => {
  // Using Unsplash Source with specific queries for real estate
  const queries = {
    house: 'modern-house,luxury-home,residential',
    apartment: 'apartment,modern-apartment,city-apartment',
    villa: 'villa,luxury-villa,beachfront-villa',
    condo: 'condo,luxury-condo,modern-condo'
  };
  
  // Generate consistent images based on property ID
  const seed = id;
  return `https://source.unsplash.com/800x600/?${queries[type]}&sig=${seed}`;
};

export const getAgentImage = (id: string): string => {
  // Using Unsplash Source for professional portraits
  const seed = id;
  return `https://source.unsplash.com/400x400/?professional-portrait,business-person&sig=${seed}`;
};

export const getHeroImage = (index: number = 0): string => {
  // Hero images for slider - using direct Unsplash photo IDs for reliability
  const heroImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=80', // Modern luxury house
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80', // Contemporary villa
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop&q=80', // Luxury interior
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=80'  // Modern home exterior
  ];
  
  return heroImages[index % heroImages.length];
};

export const getCityImage = (cityName: string): string => {
  // City skyline images
  return `https://source.unsplash.com/800x600/?${cityName}-skyline,cityscape&sig=${cityName}`;
};

// Alternative: Use placeholder images with specific real estate themes
export const getPlaceholderImage = (width: number = 800, height: number = 600, type: string = 'house'): string => {
  return `https://placehold.co/${width}x${height}/1a1a1a/white?text=${type.toUpperCase()}`;
};
