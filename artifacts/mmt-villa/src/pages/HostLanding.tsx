import React from "react";
import { Layout } from "../components/Layout";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Zap, ShieldCheck, Settings, ChevronRight } from "lucide-react";

export default function HostLanding() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400"></span> MMT for Hosts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            List your villa in 5 minutes <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              powered by Smart AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join India's largest travel network. We bring you verified guests from their flight bookings, ensuring higher occupancy than any other platform.
          </p>
          <Link href="/host/onboard">
            <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl border-none">
              Start Listing Your Property <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 mb-24">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col md:flex-row justify-around gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="px-4 py-2">
            <div className="text-4xl font-bold text-gray-900 mb-1">2,400+</div>
            <div className="text-gray-500 font-medium">Active Hosts</div>
          </div>
          <div className="px-4 py-2">
            <div className="text-4xl font-bold text-gray-900 mb-1">₹1.2Cr+</div>
            <div className="text-gray-500 font-medium">Paid out monthly</div>
          </div>
          <div className="px-4 py-2">
            <div className="text-4xl font-bold text-gray-900 mb-1">4.7<span className="text-yellow-400 text-3xl">★</span></div>
            <div className="text-gray-500 font-medium">Avg host rating</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why host with MakeMyTrip?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg bg-white overflow-hidden group">
            <div className="h-2 bg-blue-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Speed</h3>
              <p className="text-gray-600">Our Smart AI scans your photos to instantly write descriptions and detect amenities. Go live in under 5 minutes.</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg bg-white overflow-hidden group">
            <div className="h-2 bg-orange-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Settings className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Autonomy</h3>
              <p className="text-gray-600">You set your base price. MMT funds all customer discounts from our margin — you always get exactly what you ask for.</p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-lg bg-white overflow-hidden group">
            <div className="h-2 bg-green-500 w-full transform origin-left transition-transform group-hover:scale-x-100"></div>
            <CardContent className="p-8">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Shield</h3>
              <p className="text-gray-600">Every booking includes our ₹50 Lakh property protection insurance automatically, covering accidental damage.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
