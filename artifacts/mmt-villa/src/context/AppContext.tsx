import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Villa } from "../data/mockData";

interface AppContextType {
  cartVillas: Villa[];
  addToCart: (villa: Villa) => void;
  removeFromCart: (villaId: string) => void;
  compareVillas: Villa[];
  addToCompare: (villa: Villa) => void;
  removeFromCompare: (villaId: string) => void;
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
  countdown: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartVillas, setCartVillas] = useState<Villa[]>([]);
  const [compareVillas, setCompareVillas] = useState<Villa[]>([]);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [countdown, setCountdown] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCart = (villa: Villa) => {
    if (!cartVillas.find(v => v.id === villa.id)) {
      setCartVillas([...cartVillas, villa]);
    }
  };

  const removeFromCart = (villaId: string) => {
    setCartVillas(cartVillas.filter(v => v.id !== villaId));
  };

  const addToCompare = (villa: Villa) => {
    if (compareVillas.length < 3 && !compareVillas.find(v => v.id === villa.id)) {
      setCompareVillas([...compareVillas, villa]);
    }
  };

  const removeFromCompare = (villaId: string) => {
    setCompareVillas(compareVillas.filter(v => v.id !== villaId));
  };

  return (
    <AppContext.Provider value={{
      cartVillas, addToCart, removeFromCart,
      compareVillas, addToCompare, removeFromCompare,
      checkoutStep, setCheckoutStep,
      countdown
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
