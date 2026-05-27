export interface Villa {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rooms: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  amenities: string[];
  isLuxe: boolean;
  distanceFromBeach: string;
  imageGradient: string;
}

export const villas: Villa[] = [
  {
    id: "1",
    name: "The Azure Villa",
    location: "Candolim Beach, North Goa",
    pricePerNight: 12500,
    rooms: 3,
    maxGuests: 6,
    rating: 4.8,
    reviewCount: 124,
    amenities: ["Pool", "AC", "Kitchen", "WiFi", "Parking"],
    isLuxe: true,
    distanceFromBeach: "200m",
    imageGradient: "linear-gradient(135deg, #0ea5e9, #2563eb)",
  },
  {
    id: "2",
    name: "Seashell Cottage",
    location: "Baga, North Goa",
    pricePerNight: 8500,
    rooms: 2,
    maxGuests: 4,
    rating: 4.6,
    reviewCount: 89,
    amenities: ["AC", "Kitchen", "WiFi", "Parking"],
    isLuxe: false,
    distanceFromBeach: "500m",
    imageGradient: "linear-gradient(135deg, #14b8a6, #059669)",
  },
  {
    id: "3",
    name: "Bamboo Retreat",
    location: "Anjuna, North Goa",
    pricePerNight: 15000,
    rooms: 4,
    maxGuests: 8,
    rating: 4.9,
    reviewCount: 210,
    amenities: ["Pool", "AC", "Kitchen", "WiFi", "Parking", "Chef"],
    isLuxe: true,
    distanceFromBeach: "1km",
    imageGradient: "linear-gradient(135deg, #f59e0b, #d97706)",
  },
  {
    id: "4",
    name: "Palm Grove Stay",
    location: "Vagator, North Goa",
    pricePerNight: 5000,
    rooms: 1,
    maxGuests: 2,
    rating: 4.3,
    reviewCount: 45,
    amenities: ["AC", "WiFi"],
    isLuxe: false,
    distanceFromBeach: "2km",
    imageGradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  },
  {
    id: "5",
    name: "Sunset Mansion",
    location: "Morjim, North Goa",
    pricePerNight: 22000,
    rooms: 5,
    maxGuests: 10,
    rating: 4.9,
    reviewCount: 156,
    amenities: ["Pool", "AC", "Kitchen", "WiFi", "Parking", "Sea View"],
    isLuxe: true,
    distanceFromBeach: "50m",
    imageGradient: "linear-gradient(135deg, #ec4899, #e11d48)",
  },
  {
    id: "6",
    name: "Coconut Hideaway",
    location: "Calangute, North Goa",
    pricePerNight: 7500,
    rooms: 2,
    maxGuests: 4,
    rating: 4.5,
    reviewCount: 67,
    amenities: ["Pool", "AC", "WiFi"],
    isLuxe: false,
    distanceFromBeach: "1.5km",
    imageGradient: "linear-gradient(135deg, #10b981, #047857)",
  },
  {
    id: "7",
    name: "The White House",
    location: "Assagao, North Goa",
    pricePerNight: 18000,
    rooms: 4,
    maxGuests: 8,
    rating: 4.7,
    reviewCount: 92,
    amenities: ["Pool", "AC", "Kitchen", "WiFi", "Parking"],
    isLuxe: true,
    distanceFromBeach: "800m",
    imageGradient: "linear-gradient(135deg, #64748b, #475569)",
  },
  {
    id: "8",
    name: "Lotus Villa",
    location: "Candolim Beach, North Goa",
    pricePerNight: 9500,
    rooms: 3,
    maxGuests: 6,
    rating: 4.4,
    reviewCount: 53,
    amenities: ["AC", "Kitchen", "WiFi", "Parking"],
    isLuxe: false,
    distanceFromBeach: "600m",
    imageGradient: "linear-gradient(135deg, #f43f5e, #be123c)",
  },
  {
    id: "9",
    name: "Ocean Breeze",
    location: "Baga, North Goa",
    pricePerNight: 11000,
    rooms: 3,
    maxGuests: 6,
    rating: 4.6,
    reviewCount: 112,
    amenities: ["Pool", "AC", "WiFi"],
    isLuxe: false,
    distanceFromBeach: "100m",
    imageGradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    id: "10",
    name: "Royal Heritage",
    location: "Saligao, North Goa",
    pricePerNight: 25000,
    rooms: 6,
    maxGuests: 12,
    rating: 4.9,
    reviewCount: 180,
    amenities: ["Pool", "AC", "Kitchen", "WiFi", "Parking", "Chef", "Gym"],
    isLuxe: true,
    distanceFromBeach: "3km",
    imageGradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
  }
];

export const flightBooking = {
  reference: "PNR-G8F9X2",
  route: "Delhi (DEL) → Goa (GOI)",
  date: "June 15, 2024",
  passengers: 3,
  price: 18750,
  airline: "IndiGo",
  flightNumber: "6E-342",
  departure: "08:30 AM",
  arrival: "11:15 AM",
  seatClass: "Economy"
};

export const hostBookings = [
  { id: "B1", guest: "Aarav S.", dates: "12 Jun - 15 Jun", amount: 37500, status: "Confirmed" },
  { id: "B2", guest: "Priya M.", dates: "18 Jun - 22 Jun", amount: 50000, status: "Upcoming" },
  { id: "B3", guest: "Rohan K.", dates: "01 Jul - 05 Jul", amount: 45000, status: "Upcoming" },
  { id: "B4", guest: "Sneha R.", dates: "10 Jul - 12 Jul", amount: 25000, status: "Pending" }
];
