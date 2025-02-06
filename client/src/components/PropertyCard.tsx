import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Ruler, DollarSign } from "lucide-react";
import { Link } from "wouter";

interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
}

export default function PropertyCard({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  images
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-[#00274C]">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{address}</p>
        
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-4 w-4" />
            <span>{sqft} sqft</span>
          </div>
        </div>

        <div className="mt-4 flex items-center text-xl font-bold text-[#00274C]">
          <DollarSign className="h-5 w-5" />
          {price.toLocaleString()}/mo
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link href={`/property/${id}`}>
          <Button className="w-full bg-[#00274C] hover:bg-[#00274C]/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
