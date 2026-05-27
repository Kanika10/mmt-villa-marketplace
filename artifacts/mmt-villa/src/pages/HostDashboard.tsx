import React from "react";
import { Layout } from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { hostBookings } from "../data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Shield, TrendingUp, Calendar as CalIcon, Star, CheckCircle2 } from "lucide-react";

const chartData = [
  { month: "Jan", earnings: 45000 },
  { month: "Feb", earnings: 52000 },
  { month: "Mar", earnings: 48000 },
  { month: "Apr", earnings: 61000 },
  { month: "May", earnings: 75000 },
  { month: "Jun", earnings: 84000 },
];

export default function HostDashboard() {
  return (
    <Layout>
      <div className="bg-gray-900 text-white pb-24 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, Raj!</h1>
              <p className="text-gray-400 mt-1">Stunning Sea-View Villa · Candolim Beach</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div> Listing Live
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-md border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                <TrendingUp className="w-5 h-5 text-green-500" /> This Month
              </div>
              <div className="text-3xl font-bold text-gray-900">₹84,000</div>
              <div className="text-sm text-green-600 mt-2 font-medium">+12% vs last month</div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                <CalIcon className="w-5 h-5 text-blue-500" /> Occupancy Rate
              </div>
              <div className="text-3xl font-bold text-gray-900">78%</div>
              <div className="text-sm text-gray-500 mt-2">18 of 23 days booked</div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                <Shield className="w-5 h-5 text-orange-500" /> Upcoming
              </div>
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-500 mt-2">Bookings next 14 days</div>
            </CardContent>
          </Card>
          <Card className="shadow-md border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-gray-500 mb-2 font-medium">
                <Star className="w-5 h-5 text-yellow-500" /> Avg Rating
              </div>
              <div className="text-3xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-500 mt-2">Based on 42 reviews</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-6">Earnings History</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                      <Tooltip 
                        cursor={{fill: '#f3f4f6'}}
                        formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Earnings']}
                      />
                      <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                        <th className="pb-3 font-medium">Guest</th>
                        <th className="pb-3 font-medium">Dates</th>
                        <th className="pb-3 font-medium text-right">Amount (Net)</th>
                        <th className="pb-3 font-medium text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hostBookings.map((b) => (
                        <tr key={b.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4 font-medium text-gray-900">{b.guest}</td>
                          <td className="py-4 text-gray-600">{b.dates}</td>
                          <td className="py-4 text-right font-semibold">₹{b.amount.toLocaleString('en-IN')}</td>
                          <td className="py-4 text-center">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                              b.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Pricing Autonomy Active</h3>
                    <p className="text-sm text-gray-600">Base rate: ₹15,000</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Last week, MMT funded ₹12,500 in customer discounts. You received 100% of your base rate for all bookings.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Property Shield Active</h3>
                    <p className="text-sm text-gray-600">Up to ₹50 Lakh coverage</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500" /> Accidental damage covered</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 className="w-4 h-4 text-green-500" /> Liability protection included</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
