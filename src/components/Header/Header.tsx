import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, TrendingUp, TrendingDown, ChevronRight, Star, Sparkles, Zap, ArrowRight, Bookmark, Trophy, Rocket, Globe2, Cpu, Gamepad2, Notebook as Robot, Building2 } from 'lucide-react';
import { io, Socket } from "socket.io-client";
import logoImage from '../../imagens/logo.png';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  previousClose?: number;
  isUpdating?: boolean;
}

interface ExchangeRates {
  USDBRL: number | null;
  EURBRL: number | null;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  featured: string;
  subcategories: {
    name: string;
    highlight: string;
    icon: React.ReactNode;
  }[];
}

const BACKEND_URL = 'http://localhost:3000';
const RATE_UPDATE_INTERVAL_MS = 300000;
const TICKER_ANIMATION_INTERVAL_MS = 50;
const UPDATE_ANIMATION_DURATION_MS = 500;

const categories: Category[] = [
  {
    name: 'Games & Cultura Pop',
    icon: <Gamepad2 className="w-5 h-5" />,
    featured: 'O Futuro dos Games: Próxima Geração de Consoles e Gráficos',
    subcategories: [
      { name: 'Lançamentos & Hypes', highlight: 'Trailers, Análises de Jogos, Próximos Hits', icon: <Rocket className="w-4 h-4" /> },
      { name: 'eSports & Streamers', highlight: 'Campeonatos, Notícias de Times, Personalidades', icon: <Trophy className="w-4 h-4" /> },
      { name: 'Plataformas & Hardware', highlight: 'Consoles (PS, Xbox, Switch), PC Master Race, Mobile Gaming', icon: <Cpu className="w-4 h-4" /> },
      { name: 'Cultura Gamer', highlight: 'Filmes & Séries de Jogos, Eventos, Comunidade', icon: <Globe2 className="w-4 h-4" /> }
    ]
  },
  {
    name: 'Inteligência Artificial Agora',
    icon: <Robot className="w-5 h-5" />,
    featured: 'IA no Seu Bolso: Como Seu Celular Já Usa Inteligência Artificial',
    subcategories: [
      { name: 'IA Generativa', highlight: 'ChatGPT, Midjourney, Novidades e o Impacto Criativo', icon: <Sparkles className="w-4 h-4" /> },
      { name: 'Ferramentas & Apps', highlight: 'IA para Produtividade, Edição e Automação no Dia a Dia', icon: <Zap className="w-4 h-4" /> },
      { name: 'Impacto & Futuro', highlight: 'IA no Trabalho, Ética em Debate e os Próximos Passos', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Tutoriais', highlight: 'Aprenda a Usar as Ferramentas de IA Mais Populares', icon: <Bookmark className="w-4 h-4" /> }
    ]
  },
  {
    name: 'Gigantes da Tecnologia',
    icon: <Building2 className="w-5 h-5" />,
    featured: 'A Corrida Trilionária: Quem Vencerá a Batalha da IA entre as Big Techs?',
    subcategories: [
      { name: 'Apple & Google', highlight: 'Últimas Notícias do Ecossistema iOS e Android', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Meta & Redes Sociais', highlight: 'Novidades do Facebook, Instagram, WhatsApp e TikTok', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Amazon & Microsoft', highlight: 'Avanços em Cloud, E-commerce, Windows e Xbox', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Tesla, Nvidia & Outras', highlight: 'Carros Elétricos, Chips de Ponta e os Novos Disruptores', icon: <Cpu className="w-4 h-4" /> }
    ]
  },
  {
    name: 'Inovação & Mundo Digital',
    icon: <Globe2 className="w-5 h-5" />,
    featured: 'Web3 é o Futuro ou Bolha? Desvendando a Próxima Internet',
    subcategories: [
      { name: 'Web3 & Blockchain', highlight: 'Além das Criptomoedas: NFTs, DAOs e Contratos Inteligentes', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Metaverso & Realidade Virtual/Aumentada', highlight: 'Explorando Plataformas e Aplicações Imersivas', icon: <Globe2 className="w-4 h-4" /> },
      { name: 'Startups & Disrupção', highlight: 'Conheça as Novas Empresas e Tecnologias Emergentes', icon: <Rocket className="w-4 h-4" /> },
      { name: 'Ciência Tech', highlight: 'Avanços Científicos que Moldarão Nosso Futuro Tecnológico', icon: <Cpu className="w-4 h-4" /> }
    ]
  }
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [tickerPosition, setTickerPosition] = useState<number>(0);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ USDBRL: null, EURBRL: null });
  const [loadingStocks, setLoadingStocks] = useState<boolean>(true);
  const [loadingRates, setLoadingRates] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const tickerItemWidthRef = useRef<number>(220); // Default width helps prevent initial jumpiness
  const tickerContainerRef = useRef<HTMLDivElement>(null); // Ref for the container holding the items
  const socketRef = useRef<Socket | null>(null);
  const lastScrollY = useRef(0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchExchangeRates = async () => {
    setApiError(prevError => (prevError && !prevError.includes("câmbio")) ? prevError : null);
    setLoadingRates(true);
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
      if (!response.ok) {
        throw new Error(`Error ${response.status} fetching exchange rates`);
      }
      const data = await response.json();
      const newRates: ExchangeRates = { USDBRL: null, EURBRL: null };

      if (data.USDBRL?.bid) newRates.USDBRL = parseFloat(data.USDBRL.bid);
      if (data.EURBRL?.bid) newRates.EURBRL = parseFloat(data.EURBRL.bid);

      setExchangeRates(newRates);
    } catch (error: any) {
      console.error("Failed to fetch exchange rates:", error.message);
      if (!apiError) setApiError("Erro ao buscar taxas de câmbio.");
    } finally {
      setLoadingRates(false);
    }
  };

  useEffect(() => {
    socketRef.current = io(BACKEND_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server.');
      setIsConnected(true);
      setApiError(null);
      setLoadingStocks(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server.');
      setIsConnected(false);
      if (!apiError) {
        setApiError('Desconectado do servidor de atualizações.');
      }
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
      setApiError('Não foi possível conectar ao servidor de atualizações.');
      setLoadingStocks(false);
    });

    socket.on('stock_update', (data: Stock[]) => {
      if (Array.isArray(data)) {
        const updatedStocks = data.map(stock => ({ ...stock, isUpdating: true }));
        setStocks(updatedStocks);
        setApiError(null);
        setLoadingStocks(false);

        setTimeout(() => {
          setStocks(currentData => currentData.map(s => ({ ...s, isUpdating: false })));
        }, UPDATE_ANIMATION_DURATION_MS);
      } else {
        console.warn("Received non-array data for stock_update:", data);
      }
    });

    socket.on('stock_error', (errorMessage: string | null) => {
      console.error('Received stock_error:', errorMessage);
      if (errorMessage) {
        setApiError(errorMessage);
        setLoadingStocks(false);
        setStocks(currentData => currentData.map(s => ({ ...s, isUpdating: false })));
      } else {
        setApiError(null);
      }
    });

    return () => {
      if (socketRef.current) {
        console.log('Disconnecting WebSocket.');
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    fetchExchangeRates();
    const interval = setInterval(fetchExchangeRates, RATE_UPDATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

 useEffect(() => {
    // Function to measure the item width
    const measureItem = () => {
        // Find the first REAL item rendered (not the divider)
        const firstItem = tickerContainerRef.current?.querySelector('.stock-ticker-item');
        if (firstItem) {
            const width = firstItem.getBoundingClientRect().width;
             // Only update if the width is valid and different from the current ref (or if current ref is default)
            if (width > 0 && width !== tickerItemWidthRef.current) {
                tickerItemWidthRef.current = width;
                console.log("Measured ticker item width:", width);
                return true; // Indicate measurement happened
            }
        }
        return false; // Indicate no measurement
    }

    // Measure initially after render, especially if stocks load
    let measured = false;
    if (!loadingStocks && stocks.length > 0) {
       measured = measureItem();
    }

    // Animation logic starts only if we have stocks and a valid width
    if (tickerItemWidthRef.current <= 0 || stocks.length === 0 || loadingStocks) {
       // If stocks are loaded but measurement failed, retry after a short delay
       let retryTimeoutId: NodeJS.Timeout | null = null;
       if (!loadingStocks && stocks.length > 0 && !measured) {
           retryTimeoutId = setTimeout(() => {
               if(measureItem()){
                   // Force a re-render or state update if needed to trigger animation setup
                   setTickerPosition(p => p); // Simple way to trigger re-evaluation
               }
           }, 100);
       }
        return () => {
            if (retryTimeoutId) clearTimeout(retryTimeoutId);
        };
    }

    const calculateTotalWidth = () => {
        // Include dividers in the total width calculation
        // Width of item + width of divider (1px)
        return stocks.length * (tickerItemWidthRef.current + 1);
    }


    const animationInterval = setInterval(() => {
        setTickerPosition(prevPosition => {
            const totalWidth = calculateTotalWidth();
            if (totalWidth <= 0) return 0;

            let newPosition = prevPosition - 1; // Adjust speed if needed

            // Reset position when the first (real) set of items has scrolled completely out of view
            if (Math.abs(newPosition) >= totalWidth) {
                 // Reset closer to 0, accounting for the duplicated list ensuring seamless wrap
                 return newPosition + totalWidth;
            }
            return newPosition;
        });
    }, TICKER_ANIMATION_INTERVAL_MS); // Animation speed

    return () => {
        clearInterval(animationInterval);
    };
    // Re-run if stocks load or change, or if loading state changes.
}, [stocks, loadingStocks, tickerItemWidthRef.current]);



  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date().toLocaleDateString('pt-BR', options)
      .replace(/^\w/, c => c.toUpperCase());
  };

  const duplicatedStocks = stocks.length > 0 ? [...stocks, ...stocks] : [];

  const toggleMobileCategory = (categoryName: string) => {
    setExpandedMobileCategory(prev => prev === categoryName ? null : categoryName);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className={`bg-[#1D1D1D] border-b border-[#E63946]/10 transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 overflow-hidden pointer-events-none' : 'h-12 opacity-100'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-6">
              <span className="text-[#E2E2E2] text-xs font-medium tracking-wide">
                {getCurrentDate()}
              </span>
              <div className="h-3 w-px bg-[#E63946]/10"></div>
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-default">
                    <span className="text-[#E2E2E2] text-xs font-medium">USD/BRL</span>
                    {loadingRates ? (
                      <div className="h-4 w-16 bg-white/10 animate-pulse rounded"></div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-bold ${exchangeRates.USDBRL && exchangeRates.USDBRL > 5.0 ? 'text-green-400' : 'text-red-400'}`}>
                          {exchangeRates.USDBRL ? exchangeRates.USDBRL.toFixed(2) : 'N/A'}
                        </span>
                        {exchangeRates.USDBRL !== null && (
                          exchangeRates.USDBRL > 5.0 ? (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400" />
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-[#1D1D1D] border border-[#E63946]/20 text-[#E2E2E2] text-xs py-1 px-2.5 rounded shadow-lg whitespace-nowrap">
                      {loadingRates ? 'Carregando...' : `Atualizado: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-white/5 cursor-default">
                    <span className="text-[#E2E2E2] text-xs font-medium">EUR/BRL</span>
                    {loadingRates ? (
                      <div className="h-4 w-16 bg-white/10 animate-pulse rounded"></div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-bold ${exchangeRates.EURBRL && exchangeRates.EURBRL > 5.5 ? 'text-green-400' : 'text-red-400'}`}>
                          {exchangeRates.EURBRL ? exchangeRates.EURBRL.toFixed(2) : 'N/A'}
                        </span>
                        {exchangeRates.EURBRL !== null && (
                          exchangeRates.EURBRL > 5.5 ? (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400" />
                          )
                        )}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    <div className="bg-[#1D1D1D] border border-[#E63946]/20 text-[#E2E2E2] text-xs py-1 px-2.5 rounded shadow-lg whitespace-nowrap">
                      {loadingRates ? 'Carregando...' : `Atualizado: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </div>
                  </div>
                </div>
              </div>
              {!isConnected && apiError && apiError.includes('conect') && (
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                  </span>
                  <span className="text-yellow-400 text-xs">Reconectando...</span>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-[#E2E2E2] text-xs font-medium tracking-wide hover:text-[#E63946] transition-colors">
                Newsletter
              </a>
              <div className="h-3 w-px bg-[#E63946]/10"></div>
              <a href="#" className="bg-[#E63946] text-white text-xs font-semibold tracking-wide px-4 py-1.5 rounded hover:bg-[#E63946]/90 transition-colors">
                Assine
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className={`bg-[#1D1D1D] border-b border-[#E63946]/10 transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-20'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  src={logoImage}
                  alt="Sintetiza Logo"
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-[180px]' : 'h-[220px]'
                  } w-auto`}
                  style={{ objectFit: 'contain', objectPosition: 'left center' }}
                />
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group relative"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button 
                    className={`px-4 py-2 text-[#E2E2E2] text-sm font-medium tracking-wide hover:text-[#E63946] transition-all duration-300 ease-in-out flex items-center gap-2 group-hover:bg-[#E63946]/5 rounded-t-lg ${
                      hoveredCategory === category.name ? 'text-[#E63946] bg-[#E63946]/5' : ''
                    }`}
                  >
                    {category.icon}
                    {category.name}
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredCategory === category.name ? 'rotate-90' : 'group-hover:rotate-90'
                    }`} />
                  </button>
                  
                  <div 
                    className={`absolute top-full left-0 hidden group-hover:block transform transition-all duration-300 ease-in-out z-50
                    ${hoveredCategory === category.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                  >
                    <div className="bg-[#1D1D1D]/95 backdrop-blur-xl rounded-b-lg shadow-2xl border border-t-0 border-[#E63946]/10 p-6 min-w-[420px]">
                      <div className="mb-6 p-4 bg-gradient-to-br from-[#E63946]/10 via-[#2B2B2B] to-[#1D1D1D] rounded-lg border border-[#E63946]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#E63946]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-3">
                            <Star className="w-5 h-5 text-[#E63946]" />
                            <span className="text-[#E63946] text-xs font-semibold tracking-wider uppercase">Em Destaque</span>
                          </div>
                          <h3 className="text-[#E2E2E2] text-lg font-medium leading-snug">{category.featured}</h3>
                          <div className="mt-3 flex items-center text-[#E63946] text-sm hover:text-[#E63946]/80 transition-colors cursor-pointer group/featured">
                            <span>Leia mais</span>
                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover/featured:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {category.subcategories.map((sub) => (
                          <div 
                            key={sub.name}
                            className="group/item"
                          >
                            <a
                              href="#"
                              className="block p-3 rounded-lg transition-all duration-300 ease-in-out
                              hover:bg-gradient-to-br hover:from-[#E63946]/10 hover:to-transparent
                              border border-transparent hover:border-[#E63946]/20
                              relative overflow-hidden"
                            >
                              <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                  {sub.icon}
                                  <div className="font-medium text-[#E2E2E2] group-hover/item:text-[#E63946] transition-colors">
                                    {sub.name}
                                  </div>
                                </div>
                                <div className="text-sm text-[#E2E2E2]/60 group-hover/item:text-[#E63946]/60 transition-colors">
                                  {sub.highlight}
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/0 to-transparent opacity-0 group-hover/item:opacity-10 transition-opacity"></div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <div className={`relative transition-all duration-300 ease-in-out ${
                searchFocused ? 'w-72' : 'w-64'
              }`}>
                <input
                  type="text"
                  placeholder="Buscar notícias..."
                  className="w-full pl-5 pr-10 py-2.5 bg-[#2B2B2B] rounded-lg text-[#E2E2E2] text-sm placeholder-[#E2E2E2]/50 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 transition-all"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#E2E2E2]/50 pointer-events-none" size={18} />
              </div>
            </div>

            <button
              className="md:hidden p-2 hover:bg-[#E63946]/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X size={24} className="text-[#E63946]" />
              ) : (
                <Menu size={24} className="text-[#E2E2E2] hover:text-[#E63946] transition-colors" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#1D1D1D] py-4 border-t border-[#E63946]/10 shadow-lg z-40">
              <div className="space-y-2 container mx-auto px-4">
                {categories.map((category) => (
                  <div key={category.name} className="px-2">
                    <button 
                      className={`w-full flex items-center justify-between px-4 py-3 text-[#E2E2E2] font-medium tracking-wide rounded-lg transition-all duration-300 ${
                        expandedMobileCategory === category.name 
                          ? 'bg-[#E63946]/10 text-[#E63946]' 
                          : 'hover:bg-[#E63946]/5 hover:text-[#E63946]'
                      }`}
                      onClick={() => toggleMobileCategory(category.name)}
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                        expandedMobileCategory === category.name ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMobileCategory === category.name ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="mx-4 my-3 p-4 bg-gradient-to-br from-[#E63946]/10 via-[#2B2B2B] to-[#1D1D1D] rounded-lg border border-[#E63946]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-[#E63946]" />
                          <span className="text-[#E63946] text-xs font-semibold tracking-wide">Em Destaque</span>
                        </div>
                        <p className="text-[#E2E2E2] text-sm leading-snug">{category.featured}</p>
                        <div className="mt-3 flex items-center text-[#E63946] text-sm">
                          <span>Leia mais</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>

                      <div className="space-y-1 ml-4 mr-2">
                        {category.subcategories.map((sub) => (
                          <a
                            key={sub.name}
                            href="#"
                            className="block p-3 rounded-lg transition-all duration-300
                            hover:bg-[#E63946]/5 border border-transparent
                            hover:border-[#E63946]/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {sub.icon}
                              <span className="text-[#E2E2E2] font-medium">{sub.name}</span>
                            
                            </div>
                            <p className="text-sm text-[#E2E2E2]/60 pl-6">{sub.highlight}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="px-6 pt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar notícias..."
                      className="w-full pl-5 pr-10 py-3 bg-[#2B2B2B] rounded-lg text-[#E2E2E2] text-sm placeholder-[#E2E2E2]/50 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#E2E2E2]/50 pointer-events-none" size={18} />
                  </div>
                </div>

                <div className="px-6 pt-4 flex flex-col space-y-3">
                  <a href="#" className="text-[#E2E2E2] text-sm font-medium tracking-wide hover:text-[#E63946] transition-colors text-center py-2 rounded-lg hover:bg-[#E63946]/5">
                    Newsletter
                  </a>
                  <a href="#" className="bg-[#E63946] text-white text-sm font-semibold tracking-wide px-4 py-2.5 rounded-lg hover:bg-[#E63946]/90 transition-colors text-center">
                    Assine
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Ticker Section --- */}
      <div className={`bg-[#2B2B2B] overflow-hidden border-t border-[#E63946]/10 transition-all duration-300 ${
        isScrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-12 opacity-100'
      }`}>
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#2B2B2B] via-[#2B2B2B]/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#2B2B2B] via-[#2B2B2B]/80 to-transparent z-20 pointer-events-none"></div>

        <div className="container mx-auto h-full overflow-hidden relative">
          {/* Error Overlay */}
          {apiError && (
            <div className="absolute inset-0 flex items-center justify-center z-30 bg-red-900/80 backdrop-blur-sm">
              <p className="text-white text-xs font-semibold px-4 text-center">{apiError}</p>
            </div>
          )}

          {/* Loading Overlay */}
          {loadingStocks && !apiError && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-[#E2E2E2] text-xs font-semibold px-4 animate-pulse">Carregando cotações...</p>
            </div>
          )}

          {/* Ticker Content */}
          {!loadingStocks && stocks.length > 0 && tickerItemWidthRef.current > 0 && !apiError && (
            <div ref={tickerContainerRef} className="absolute top-0 left-0 flex items-center h-full z-10"> {/* Added ref here */}
              <div
                className="flex items-center whitespace-nowrap h-full"
                style={{
                  transform: `translateX(${tickerPosition}px)`,
                  willChange: 'transform', // Hint for browser optimization
                  transition: tickerPosition === 0 ? 'none' : `transform ${TICKER_ANIMATION_INTERVAL_MS / 1000}s linear`,
                }}
              >
                {duplicatedStocks.map((stock, index) => (
                   <React.Fragment key={`${stock.symbol}-${index}-${stock.price}-${stock.change}`}>
                    {/* Outer container with fixed width, used for measurement */}
                    <div
                      className="flex items-center h-full stock-ticker-item flex-shrink-0" // Padding REMOVED from here
                      style={{ width: `${tickerItemWidthRef.current}px` }}
                    >
                      {/* Inner container ADDS the padding */}
                      <div className="flex items-center justify-between w-full space-x-3 px-5">
                        <span className="text-sm font-semibold text-[#E63946] tracking-wide w-14 text-left flex-shrink-0 truncate" title={stock.name}>
                          {stock.symbol}
                        </span>
                        <span className={`text-sm font-medium text-[#E2E2E2] transition-opacity duration-300 ease-in-out flex-shrink-0 ${
                          stock.isUpdating ? 'opacity-40 animate-pulse' : 'opacity-100'
                        }`}>
                          ${stock.price != null ? stock.price.toFixed(2) : '---'}
                        </span>
                        <div className={`flex items-center space-x-1 transition-opacity duration-300 ease-in-out flex-shrink-0 w-[80px] justify-end ${
                          stock.isUpdating ? 'opacity-40 animate-pulse' : 'opacity-100'
                        } ${
                          stock.change == null ? 'text-gray-500' : stock.change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stock.change == null ? (
                            <span className="text-sm font-semibold">-%</span>
                          ) : stock.change >= 0 ? (
                            <>
                              <TrendingUp className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm font-semibold">+{stock.change.toFixed(2)}%</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm font-semibold">{stock.change.toFixed(2)}%</span>
                            </>
                          )}
                        </div>
                      </div> {/* End inner padding container */}
                    </div> {/* End outer fixed-width container */}

                    {/* Divider placed BETWEEN the fixed-width containers */}
                    {index < duplicatedStocks.length - 1 && (
                       <div className="h-6 w-px bg-[#E2E2E2]/10 self-center flex-shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* No Data Message */}
          {!loadingStocks && !apiError && stocks.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <p className="text-[#E2E2E2]/70 text-xs font-semibold px-4">Nenhum dado de cotação disponível.</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;