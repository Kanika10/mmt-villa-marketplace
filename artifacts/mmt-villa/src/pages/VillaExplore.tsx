import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { villas } from "../data/mockData";
import { VillaCard } from "../components/VillaCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function VillaExplore() {
  const { countdown, cartVillas, compareVillas, removeFromCompare } = useAppContext();
  const [priceRange, setPriceRange] = useState([50000]);
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Layout>
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-3 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              defaultValue="Goa, June 15-18, 3 Guests" 
              className="pl-10 bg-gray-50 border-transparent focus-visible:ring-primary focus-visible:bg-white text-base h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12 md:hidden">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row gap-8 p-4 py-8 pb-32">
        <aside className="w-64 hidden md:block shrink-0 space-y-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Price per night</Label>
                <Slider 
                  defaultValue={[50000]} 
                  max={50000} 
                  step={1000}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₹2,000</span>
                  <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium mb-3 block">Property Type</Label>
                {['Luxe Villas', 'Standard Villas', 'Budget Stays'].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={`type-${type}`} />
                    <Label htmlFor={`type-${type}`} className="font-normal text-gray-600">{type}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium mb-3 block">Amenities</Label>
                {['Private Pool', 'AC', 'Kitchen', 'WiFi', 'Chef Available'].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox id={`amenity-${amenity}`} />
                    <Label htmlFor={`amenity-${amenity}`} className="font-normal text-gray-600">{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Villas in Goa</h2>
            <div className="text-sm text-gray-500">{villas.length} properties found</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {villas.map((villa, idx) => (
              <motion.div
                key={villa.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <VillaCard villa={villa} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {compareVillas.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-16 left-0 right-0 z-40 px-4 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-t-xl shadow-2xl p-4 flex items-center justify-between pointer-events-auto">
              <div className="flex gap-4">
                {compareVillas.map(v => (
                  <div key={v.id} className="bg-gray-800 rounded p-2 flex items-center gap-2 text-sm">
                    <span className="truncate max-w-[100px]">{v.name}</span>
                    <button onClick={() => removeFromCompare(v.id)} className="text-gray-400 hover:text-white"><X className="w-4 h-4"/></button>
                  </div>
                ))}
                {compareVillas.length < 3 && (
                  <div className="border border-dashed border-gray-700 rounded p-2 text-sm text-gray-500 flex items-center justify-center w-[120px]">
                    Add another
                  </div>
                )}
              </div>
              <Link href="/compare">
                <Button variant="secondary" className="font-semibold">Compare Now</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              {formatTime(countdown)} price lock active
            </div>
            {cartVillas.length > 0 && (
              <span className="text-sm font-medium text-gray-600">{cartVillas.length} villas selected</span>
            )}
          </div>
          <Link href="/checkout">
            <Button size="lg" className="px-8 shadow-md" disabled={cartVillas.length === 0}>
              View Cart {cartVillas.length > 0 && `(${cartVillas.length})`}
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
