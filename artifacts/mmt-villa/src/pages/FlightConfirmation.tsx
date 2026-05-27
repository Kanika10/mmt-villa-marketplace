import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { flightBooking } from "../data/mockData";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Lock, Clock, Calendar, Users, ChevronRight, AlertCircle } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function FlightConfirmation() {
  const { countdown, setCheckoutStep } = useAppContext();
  const [, setLocation] = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressValue = (countdown / (15 * 60)) * 100;
  const isUrgent = countdown < 5 * 60;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-full p-4 py-8">

        {/* Price Lock Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center mb-4"
          >
            <Lock className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Price Locked!</h1>
          <p className="text-gray-500 max-w-sm">
            Your seats are held — complete your booking before the lock expires.
          </p>
        </div>

        {/* Countdown bar */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl border px-5 py-3 mb-6 flex items-center justify-between gap-4 ${
            isUrgent
              ? "bg-red-50 border-red-200"
              : "bg-orange-50 border-orange-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {isUrgent
              ? <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              : <Clock className="w-4 h-4 text-primary shrink-0" />
            }
            <span className={`text-sm font-medium ${isUrgent ? "text-red-700" : "text-orange-700"}`}>
              {isUrgent ? "Hurry! Lock expiring soon" : "Price lock active — seats held for you"}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-32 h-1.5 rounded-full bg-orange-200 overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-colors ${isUrgent ? "bg-red-500" : "bg-primary"}`}
                style={{ width: `${progressValue}%` }}
              />
            </div>
            <span className={`text-lg font-bold tabular-nums ${isUrgent ? "text-red-600" : "text-primary"}`}>
              {formatTime(countdown)}
            </span>
          </div>
        </motion.div>

        {/* Flight details card */}
        <Card className="mb-6 overflow-hidden border-t-4 border-t-primary">
          <CardContent className="p-0">
            <div className="px-5 py-3 bg-orange-50/60 border-b border-orange-100 flex items-center gap-2">
              <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Flight Summary</span>
              <span className="ml-auto text-xs text-orange-600 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Price locked
              </span>
            </div>
            <div className="p-6 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                  6E
                </div>
                <div>
                  <div className="font-semibold">{flightBooking.airline}</div>
                  <div className="text-sm text-gray-400">{flightBooking.flightNumber} · {flightBooking.seatClass}</div>
                </div>
              </div>

              <div className="flex-1 w-full flex items-center justify-between px-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">DEL</div>
                  <div className="text-sm text-gray-500">{flightBooking.departure}</div>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-200 relative">
                    <Plane className="w-5 h-5 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white" />
                  </div>
                  <div className="text-xs text-gray-400 mt-2">2h 45m</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">GOI</div>
                  <div className="text-sm text-gray-500">{flightBooking.arrival}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {flightBooking.date}
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> {flightBooking.passengers} Passengers
              </div>
              <div className="ml-auto font-semibold text-gray-900">
                ₹{flightBooking.price.toLocaleString("en-IN")}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Villa discovery modal — slides up */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary/20"
            >
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    <Clock className="w-3 h-3" /> Explore safely — your price is locked for {formatTime(countdown)}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                    Where will your group stay?
                  </h2>
                  <p className="text-gray-500 mb-6">
                    MMT has 413 villas in Goa. Browse and add one — then complete checkout in one go.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/explore">
                      <Button size="lg" className="w-full sm:w-auto text-base px-8 shadow-md" data-testid="btn-explore-villas">
                        Explore Villas &amp; Stays
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full sm:w-auto text-gray-500"
                      data-testid="btn-continue-checkout"
                      onClick={() => {
                        setCheckoutStep(0);
                        setLocation("/checkout");
                      }}
                    >
                      Continue to Checkout
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex w-40 h-40 rounded-2xl bg-gradient-to-br from-primary to-amber-400 rotate-3 shadow-lg items-center justify-center text-white relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="text-center z-10 p-4">
                    <div className="text-3xl font-bold mb-1">413</div>
                    <div className="text-sm font-medium">Villas in Goa</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
}
