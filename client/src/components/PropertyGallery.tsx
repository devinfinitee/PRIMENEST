import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setLightboxOpen(true)}
          data-testid="img-main"
        />
        <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full"
          onClick={prevImage}
          data-testid="button-prev"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
          onClick={nextImage}
          data-testid="button-next"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className={`aspect-[4/3] rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
              currentIndex === index ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setCurrentIndex(index)}
            data-testid={`img-thumb-${index}`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 rounded-full"
            onClick={() => setLightboxOpen(false)}
            data-testid="button-close-lightbox"
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={images[currentIndex]}
            alt={`${title} - Full size`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
