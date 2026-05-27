import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Link, useLocation } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Upload, Sparkles, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function HostOnboard() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleUpload = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      setTimeout(() => setStep(2), 1500);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-full p-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">List Your Property</h1>
          <div className="text-sm font-medium text-gray-500">Step {step} of 3</div>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold mb-2">Upload Photos</h2>
              <p className="text-gray-600">Our AI will scan them to build your listing automatically.</p>
            </div>

            {!scanning && !scanned ? (
              <Card className="border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer" onClick={handleUpload}>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Upload className="w-12 h-12 text-primary mb-4" />
                  <p className="font-semibold text-gray-900 mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">Upload at least 5 high-quality photos</p>
                </CardContent>
              </Card>
            ) : scanning ? (
              <Card className="border-2 border-primary overflow-hidden">
                <CardContent className="py-16 flex flex-col items-center justify-center relative">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                  <Sparkles className="w-12 h-12 text-primary animate-pulse mb-6 relative z-10" />
                  <h3 className="text-lg font-bold text-gray-900 mb-4 relative z-10">AI is analyzing your photos...</h3>
                  <div className="space-y-2 text-sm font-medium text-gray-600 relative z-10">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Detecting rooms</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Finding amenities</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Writing descriptions</motion.div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-green-500 bg-green-50">
                <CardContent className="py-12 flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-green-800">Scan Complete!</h3>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start mb-6">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">AI Generated Listing</h4>
                <p className="text-sm text-amber-700">We created this based on your photos. Review and edit as needed.</p>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Property Title</Label>
                  <Input defaultValue="Stunning Sea-View Villa with Private Pool" className="font-medium" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 border border-gray-200 rounded-md bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
                    defaultValue="Experience luxury in this beautiful 3-bedroom villa. Featuring a stunning private pool, modern kitchen, and breathtaking sea views right from your balcony."
                  />
                </div>
                <div>
                  <Label className="mb-3 block">Detected Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {['Private Pool', 'Air Conditioning (3)', 'Sea View', 'Full Kitchen', 'WiFi', 'Parking'].map(amenity => (
                      <div key={amenity} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {amenity}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="rounded-full h-8 border-dashed">
                      + Add more
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button size="lg" onClick={() => setStep(3)}>Looks good, continue</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-2xl font-bold mb-6">Set your pricing</h2>

            <Card className="border-2 border-primary/20 overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-5 h-5 text-primary" /> Protected Base Rate
                </div>
                <Switch defaultChecked />
              </div>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Label className="text-lg block mb-2">Base price per night</Label>
                  <div className="relative max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">₹</span>
                    <Input type="number" defaultValue="15000" className="pl-8 text-lg font-bold h-12" />
                  </div>
                </div>
                
                <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm mb-6 flex gap-3">
                  <RefreshCw className="w-5 h-5 shrink-0" />
                  <p><strong>Pricing Autonomy:</strong> MMT funds all customer discounts. If a customer books at ₹12,000 using a promo code, we pay you the full ₹15,000 base rate.</p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h4 className="font-semibold text-gray-500 uppercase text-xs tracking-wider mb-2">Estimated Monthly Earnings</h4>
                  <div className="text-3xl font-bold text-gray-900">₹3,15,000</div>
                  <div className="text-sm text-gray-500 mt-1">Based on 70% average occupancy in Goa</div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg px-8" onClick={() => setLocation("/host/dashboard")}>
                Publish Listing
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
