import React, { useState } from 'react';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Add your authentication logic here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1D1D1D] px-8 py-12 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-12 h-12 text-[#E63946]" />
              </div>
              <h1 className="text-2xl font-bold text-white text-center mb-2">
                Painel Administrativo
              </h1>
              <p className="text-[#E2E2E2]/70 text-center text-sm">
                Faça login para acessar o painel de controle
              </p>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#1D1D1D]">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F7F7F7] rounded-lg pl-11 text-[#1D1D1D] placeholder-[#1D1D1D]/40 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
                    placeholder="seu@email.com"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1D1D1D]/40" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#1D1D1D]">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F7F7F7] rounded-lg pl-11 text-[#1D1D1D] placeholder-[#1D1D1D]/40 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1D1D1D]/40" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#E63946] text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 
                  ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:bg-[#E63946]/90'} 
                  transition-all duration-300`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-[#E2E2E2]">
              <a 
                href="/"
                className="text-[#1D1D1D]/60 text-sm hover:text-[#E63946] transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Voltar para o site</span>
              </a>
            </div>
          </div>
        </div>

        {/* Developed by */}
        <div className="mt-8 text-center">
          <a 
            href="https://conexaocode.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#1D1D1D]/60 text-sm hover:text-[#E63946] transition-colors flex items-center justify-center gap-2"
          >
            Desenvolvido por Conexão Code
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;