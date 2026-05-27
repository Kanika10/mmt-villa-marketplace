import React from "react";
import { Layout } from "../components/Layout";
import { Link, useLocation } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { useAppContext } from "../context/AppContext";
import { villas, flightBooking } from "../data/mockData";
import { CheckCircle2, CreditCard, ArrowLeft, Star, MapPin, Users, Plus, Check } from "lucide-react";

const TOP_PICKS = villas.filter(v => v.rating >= 4.7).slice(0, 3);

export default function Checkout() {
  const { cartVillas, addToCart, checkoutStep, setCheckoutStep } = useAppContext();
  const [, setLocation] = useLocation();
  const villa = cartVillas[0];

  const flightTotal = flightBooking.price;
  const villaTotal = villa ? villa.pricePerNight * 3 : 0;
  const grandTotal = flightTotal + villaTotal;

  const steps = ["Add a Stay", "Trip Summary", "Traveller Details", "Payment"];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto w-full p-4 py-8">

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-4 w-full h-0.5 bg-gray-200 -z-10"></div>
            <div
              className="absolute left-0 top-4 h-0.5 bg-primary -z-10 transition-all duration-500"
              style={{ width: `${(checkoutStep / (steps.length - 1)) * 100}%` }}
            ></div>
            {steps.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  checkoutStep > i ? "bg-primary text-white" :
                  checkoutStep === i ? "bg-primary text-white ring-4 ring-primary/20" :
                  "bg-gray-200 text-gray-500"
                }`}>
                  {checkoutStep > i ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <div className={`text-xs font-medium hidden sm:block whitespace-nowrap ${checkoutStep >= i ? "text-gray-900" : "text-gray-400"}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">

            {/* ── STEP 0: Add a Stay ── */}
            {checkoutStep === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full mb-3">
                    <Star className="w-3 h-3 fill-orange-500 text-orange-500" /> Combo saves up to ₹4,500
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Complete your Goa trip</h2>
                  <p className="text-gray-500 mt-1">Add a villa and check out everything in one go — flight + stay together.</p>
                </div>

                <div className="space-y-3">
                  {TOP_PICKS.map((v) => {
                    const isAdded = cartVillas.some(c => c.id === v.id);
                    return (
                      <Card key={v.id} className={`overflow-hidden transition-all border-2 ${isAdded ? "border-primary shadow-md" : "border-transparent hover:border-gray-200"}`}>
                        <CardContent className="p-0 flex">
                          <div
                            className="w-28 h-28 shrink-0"
                            style={{ background: v.imageGradient }}
                          />
                          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="font-semibold text-gray-900 truncate">{v.name}</div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                  <MapPin className="w-3 h-3" /> {v.location}
                                </div>
                              </div>
                              {v.isLuxe && <Badge variant="secondary" className="shrink-0 text-xs">Luxe</Badge>}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {v.rating} ({v.reviewCount})
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" /> up to {v.maxGuests}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="font-bold text-gray-900">₹{v.pricePerNight.toLocaleString("en-IN")}<span className="text-xs font-normal text-gray-400">/night</span></div>
                                  <div className="text-xs text-gray-400">₹{(v.pricePerNight * 3).toLocaleString("en-IN")} for 3 nights</div>
                                </div>
                                <Button
                                  size="sm"
                                  variant={isAdded ? "default" : "outline"}
                                  className={`shrink-0 w-20 ${isAdded ? "bg-primary" : ""}`}
                                  onClick={() => !isAdded && addToCart(v)}
                                  data-testid={`add-villa-${v.id}`}
                                >
                                  {isAdded ? (
                                    <><Check className="w-3 h-3 mr-1" /> Added</>
                                  ) : (
                                    <><Plus className="w-3 h-3 mr-1" /> Add</>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link href="/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Browse all villas
                  </Link>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="text-sm text-gray-400 hover:text-gray-600 underline-offset-2 hover:underline"
                      data-testid="skip-add-stay"
                    >
                      Skip, just pay for flight
                    </button>
                    {cartVillas.length > 0 && (
                      <Button size="lg" onClick={() => setCheckoutStep(1)} data-testid="continue-trip-summary">
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: Trip Summary ── */}
            {checkoutStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-2xl font-bold">Review your combined trip</h2>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-gray-400 uppercase text-xs tracking-wider">Flight (Already Booked)</h3>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg">{flightBooking.route}</div>
                        <div className="text-sm text-gray-500">{flightBooking.date} · {flightBooking.passengers} Passengers · {flightBooking.flightNumber}</div>
                      </div>
                      <div className="font-semibold">₹{flightTotal.toLocaleString("en-IN")}</div>
                    </div>
                  </CardContent>
                </Card>

                {villa ? (
                  <Card className="border-primary/50 shadow-md">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4 text-primary uppercase text-xs tracking-wider">Added Stay</h3>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg shrink-0" style={{ background: villa.imageGradient }} />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-bold text-lg">{villa.name}</div>
                            <div className="text-sm text-gray-500">{villa.location}</div>
                          </div>
                          <div className="flex justify-between items-end mt-2">
                            <div className="text-sm text-gray-400">3 Nights · {villa.rooms} Bedroom{villa.rooms > 1 ? "s" : ""}</div>
                            <div className="font-semibold">₹{villaTotal.toLocaleString("en-IN")}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="text-gray-400">No stay added yet</div>
                      <Button variant="outline" size="sm" onClick={() => setCheckoutStep(0)}>Add a Stay</Button>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setCheckoutStep(0)} data-testid="back-to-add-stay">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <Button size="lg" onClick={() => setCheckoutStep(2)} data-testid="continue-to-traveller">
                    Continue to Traveller Details
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Traveller Details ── */}
            {checkoutStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <Link href="/explore" className="text-sm text-primary flex items-center hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Browse more villas
                </Link>
                <h2 className="text-2xl font-bold">Primary Traveller</h2>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input defaultValue="Raj" data-testid="input-first-name" />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input defaultValue="Sharma" data-testid="input-last-name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" defaultValue="raj.sharma@example.com" data-testid="input-email" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input type="tel" defaultValue="+91 98765 43210" data-testid="input-phone" />
                    </div>
                    <div className="space-y-2">
                      <Label>Special Requests <span className="text-gray-400 font-normal">(optional)</span></Label>
                      <Input placeholder="e.g. early check-in, airport pickup..." data-testid="input-requests" />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setCheckoutStep(1)}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                  <Button size="lg" onClick={() => setCheckoutStep(3)} data-testid="continue-to-payment">Continue to Payment</Button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {checkoutStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <Link href="/explore" className="text-sm text-primary flex items-center hover:underline">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Browse more villas
                </Link>
                <h2 className="text-2xl font-bold">Payment Options</h2>

                <Card className="border-primary ring-1 ring-primary/20">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-orange-50/50">
                      <CreditCard className="text-primary w-5 h-5" />
                      <span className="font-semibold">Credit / Debit Card</span>
                      <div className="ml-auto w-4 h-4 rounded-full border-4 border-primary bg-white"></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="0000 0000 0000 0000" data-testid="input-card-number" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry (MM/YY)</Label>
                          <Input placeholder="MM/YY" data-testid="input-expiry" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="123" type="password" data-testid="input-cvv" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Name on Card</Label>
                        <Input placeholder="Raj Sharma" data-testid="input-card-name" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3 opacity-60 cursor-not-allowed">
                    <div className="font-bold text-gray-400 w-10 text-sm">UPI</div>
                    <span className="font-medium text-gray-500">Google Pay, PhonePe, Paytm</span>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3 opacity-60 cursor-not-allowed">
                    <div className="font-bold text-gray-400 w-10 text-sm">EMI</div>
                    <span className="font-medium text-gray-500">No Cost EMI on select cards</span>
                  </CardContent>
                </Card>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={() => setCheckoutStep(2)}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
                  <Button size="lg" className="px-10 text-lg shadow-lg" data-testid="pay-button">
                    Pay ₹{grandTotal.toLocaleString("en-IN")}
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Order Summary sidebar */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Flight (Paid)</span>
                    <span>₹{flightTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {villa ? (
                    <div className="flex justify-between text-gray-500">
                      <span>{villa.name} · 3 nights</span>
                      <span>₹{villaTotal.toLocaleString("en-IN")}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-gray-300 italic text-xs">
                      <span>No stay added</span>
                      <span>—</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {villa && checkoutStep >= 3 && (
                    <div className="mt-3 p-3 bg-green-50 text-green-700 text-xs rounded-lg border border-green-100 flex gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      You saved ₹4,500 with combo booking!
                    </div>
                  )}
                  {checkoutStep === 0 && (
                    <div className="mt-3 p-3 bg-orange-50 text-orange-700 text-xs rounded-lg border border-orange-100">
                      Add a stay and save up to ₹4,500 on this trip.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </Layout>
  );
}
