import React from "react";
import { Link } from "wouter";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              mmt
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                For Travellers
              </Link>
              <Link href="/host" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                For Hosts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              R
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
