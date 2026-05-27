import React from "react";
import { Layout } from "../components/Layout";
import { useAppContext } from "../context/AppContext";
import { Link } from "wouter";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "../components/ui/button";

export default function VillaCompare() {
  const { compareVillas, addToCart } = useAppContext();

  if (compareVillas.length === 0) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No villas to compare</h2>
            <Link href="/explore">
              <Button>Go back to search</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const features = [
    { label: "Price / night", key: "pricePerNight", format: (v: any) => `₹${v.toLocaleString('en-IN')}` },
    { label: "Rooms", key: "rooms", format: (v: any) => `${v} Bedrooms` },
    { label: "Max Guests", key: "maxGuests", format: (v: any) => `Up to ${v} guests` },
    { label: "Rating", key: "rating", format: (v: any) => `${v} ★` },
    { label: "Beach Distance", key: "distanceFromBeach", format: (v: any) => v },
  ];

  const booleanFeatures = ["Pool", "AC", "Kitchen", "WiFi", "Parking", "Chef"];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto w-full p-4 py-8">
        <Link href="/explore" className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Search
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Compare Villas</h1>
        
        <div className="overflow-x-auto pb-8">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="w-1/4 p-4 text-left border-b-2 border-gray-200">Features</th>
                {compareVillas.map(villa => (
                  <th key={villa.id} className="w-1/4 p-4 border-b-2 border-gray-200 align-bottom">
                    <div className="h-32 w-full rounded-lg mb-3" style={{ background: villa.imageGradient }}></div>
                    <div className="text-lg font-bold text-gray-900">{villa.name}</div>
                    <div className="text-sm font-normal text-gray-500 mb-4">{villa.location}</div>
                    <Button 
                      className="w-full" 
                      onClick={() => addToCart(villa)}
                    >
                      Select
                    </Button>
                  </th>
                ))}
                {Array.from({ length: Math.max(0, 3 - compareVillas.length) }).map((_, i) => (
                  <th key={`empty-${i}`} className="w-1/4 p-4 border-b-2 border-gray-200 align-bottom">
                    <div className="h-32 w-full rounded-lg mb-3 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                      Empty Slot
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={feature.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-100">{feature.label}</td>
                  {compareVillas.map(villa => (
                    <td key={villa.id} className="p-4 text-center border-b border-gray-100 font-semibold text-gray-900">
                      {feature.format((villa as any)[feature.key])}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareVillas.length) }).map((_, i) => (
                    <td key={`empty-cell-${i}`} className="p-4 border-b border-gray-100"></td>
                  ))}
                </tr>
              ))}
              
              <tr>
                <td colSpan={4} className="p-4 font-bold text-gray-900 bg-gray-100">Amenities</td>
              </tr>
              
              {booleanFeatures.map((amenity, i) => (
                <tr key={amenity} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-100">{amenity}</td>
                  {compareVillas.map(villa => (
                    <td key={villa.id} className="p-4 text-center border-b border-gray-100">
                      {villa.amenities.includes(amenity) ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareVillas.length) }).map((_, i) => (
                    <td key={`empty-bool-${i}`} className="p-4 border-b border-gray-100"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
