import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

function ComingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Main Content */}
      <main className="relative z-10">
        <div className={`min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Animated Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E63946]/5 rounded-full blur-[100px] animate-pulse" />

            {/* Logo and Content */}
            <div className="relative">
              {/* Logo */}
              <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-center space-x-3 mb-8">
                  <Sparkles className="w-10 h-10 text-[#E63946]" />
                  <h1 className="text-4xl font-bold text-black">Sintetiza</h1>
                </div>
              </div>

              {/* Main Message */}
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                  Algo extraordinário
                  <br />
                  está chegando
                </h2>
                
                <p className="text-xl text-black/60 max-w-lg mx-auto leading-relaxed">
                  Uma nova experiência que vai transformar sua maneira de ver e interagir com a tecnologia.
                </p>

                {/* Decorative Line */}
                <div className="flex justify-center">
                  <div className="w-24 h-1 bg-[#E63946]/20 rounded-full" />
                </div>

                {/* Launch Message */}
                <div className="inline-block">
                  <div className="px-8 py-4 bg-black/5 rounded-2xl backdrop-blur-sm">
                    <p className="text-lg text-black/60">
                      Em breve
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#E63946]/20" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ComingSoon;