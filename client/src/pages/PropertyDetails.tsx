import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ImageGallery from "@/components/ImageGallery";
import { Bed, Bath, Ruler, DollarSign, Check } from "lucide-react";

export default function PropertyDetails() {
  const [, params] = useRoute("/property/:id");
  const id = params?.id;

  const { data: property, isLoading } = useQuery({
    queryKey: [`/api/properties/${id}`],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="aspect-[16/9] w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="space-y-6">
      <ImageGallery images={property.images} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#00274C]">{property.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{property.address}</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#00274C]" />
              <span className="text-xl font-semibold">
                {property.price.toLocaleString()}/mo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-[#00274C]" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-[#00274C]" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-[#00274C]" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#00274C]">Description</h2>
            <p className="mt-2 text-muted-foreground">{property.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#00274C]">Features</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#00274C]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold text-[#00274C]">
            Interested in this property?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Contact us to schedule a viewing or learn more about this property.
          </p>
          <Link href="/contact">
            <Button className="mt-4 w-full bg-[#00274C] hover:bg-[#00274C]/90">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
