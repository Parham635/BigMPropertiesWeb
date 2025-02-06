import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: properties, isLoading } = useQuery({
    queryKey: ["/api/properties"],
  });

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#00274C]">
          Find Your Perfect Home Near Campus
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Premium student housing options near the University of Michigan
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[16/9] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties?.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      )}
    </div>
  );
}
