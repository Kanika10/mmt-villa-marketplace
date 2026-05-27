import React from "react";
import { Villa } from "../data/mockData";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Waves, Utensils, Wifi, Car } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export const VillaCard = ({ villa }: { villa: Villa }) => {
  const { cartVillas, addToCart, removeFromCart, compareVillas, addToCompare } = useAppContext();
  
  const inCart = cartVillas.some(v => v.id === villa.id);
  const inCompare = compareVillas.some(v => v.id === villa.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const getIcon = (amenity: string) => {
    switch (amenity) {
      case "Pool": return <Waves className="w-3 h-3" />;
      case "AC": return <div className="text-[10px] font-bold">AC</div>;
      case "Kitchen": return <Utensils className="w-3 h-3" />;
      case "WiFi": return <Wifi className="w-3 h-3" />;
      case "Parking": return <Car className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 w-full relative" style={{ background: villa.imageGradient }}>
        {villa.isLuxe && (
          <Badge className="absolute top-3 left-3 bg-black/50 text-white backdrop-blur-sm border-none">
            Luxe
          </Badge>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
          {villa.rating} <span className="text-gray-500 font-normal">({villa.reviewCount})</span>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1">{villa.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {villa.location}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {villa.amenities.slice(0, 4).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-sm text-gray-600">
              {getIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {villa.amenities.length > 4 && (
            <div className="text-xs bg-gray-100 px-2 py-1 rounded-sm text-gray-600">
              +{villa.amenities.length - 4}
            </div>
          )}
        </div>
        
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900">{formatPrice(villa.pricePerNight)}<span className="text-xs font-normal text-gray-500">/night</span></div>
            <div className="text-xs text-gray-500">{formatPrice(villa.pricePerNight * 3)} total for 3 nights</div>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Button 
            className="flex-1" 
            variant={inCart ? "secondary" : "default"}
            onClick={() => inCart ? removeFromCart(villa.id) : addToCart(villa)}
          >
            {inCart ? "Added" : "Add to Trip"}
          </Button>
          <Button 
            variant="outline" 
            className={inCompare ? "bg-accent/10 text-accent border-accent/20" : ""}
            onClick={() => inCompare ? undefined : addToCompare(villa)}
            disabled={inCompare || compareVillas.length >= 3}
          >
            {inCompare ? "Comparing" : "Compare"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
