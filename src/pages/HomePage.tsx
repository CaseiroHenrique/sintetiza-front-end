import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import { TrendingUp, Star, ChevronRight, Newspaper, Mail, Clock, Siren as Fire, PlayCircle, Book, UserCircle, Calendar, Bitcoin, ThumbsUp } from 'lucide-react';

// Mock data for news articles
const featuredNews = [
  {
    id: 1,
    category: "Inteligência Artificial",
    title: "GPT-4 Turbo: Nova IA da OpenAI promete revolução na geração de conteúdo",
    image: "https://images.unsplash.com/photo-1677442136019-21d903315402",
    excerpt: "Modelo mais avançado da OpenAI traz melhorias significativas em compreensão de contexto e geração de texto.",
    readTime: "5 min",
    publishedAt: "2024-03-10T14:30:00Z",
    tags: ["GPT-4", "OpenAI", "IA Generativa"]
  },
  {
    id: 2,
    category: "Games",
    title: "GTA 6: Rockstar Games confirma data de lançamento para 2025",
    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf",
    excerpt: "Novo título da franquia promete revolucionar os jogos open-world com gráficos hiper-realistas.",
    readTime: "4 min",
    publishedAt: "2024-03-10T12:00:00Z",
    tags: ["GTA 6", "Rockstar Games", "Games"]
  },
  {
    id: 3,
    category: "Tecnologia",
    title: "Apple Vision Pro: O futuro da computação espacial chega em 2024",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d",
    excerpt: "Novo dispositivo da Apple promete revolucionar a forma como interagimos com conteúdo digital.",
    readTime: "6 min",
    publishedAt: "2024-03-10T10:15:00Z",
    tags: ["Apple", "VR", "AR"]
  }
];

const latestNews = [
  {
    id: 4,
    category: "Hardware",
    title: "AMD anuncia nova geração de processadores Ryzen com arquitetura Zen 5",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
    publishedAt: "2024-03-10T09:00:00Z",
    readTime: "4 min"
  },
  {
    id: 5,
    category: "Cibersegurança",
    title: "Nova vulnerabilidade crítica descoberta em sistemas Windows",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
    publishedAt: "2024-03-10T08:30:00Z",
    readTime: "3 min"
  },
  {
    id: 6,
    category: "Mobile",
    title: "Samsung inicia testes do Android 15 para linha Galaxy",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    publishedAt: "2024-03-10T08:00:00Z",
    readTime: "3 min"
  }
];

const popularNews = [
  {
    id: 7,
    title: "Como o ChatGPT está mudando o mercado de trabalho em 2024",
    views: 150000,
    category: "IA"
  },
  {
    id: 8,
    title: "Review: Testamos o novo MacBook Pro com chip M3 Max",
    views: 120000,
    category: "Reviews"
  },
  {
    id: 9,
    title: "10 tendências de programação que dominarão 2024",
    views: 98000,
    category: "Desenvolvimento"
  }
];

const techStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 175.43, change: 2.5 },
  { symbol: "MSFT", name: "Microsoft", price: 325.12, change: 1.8 },
  { symbol: "GOOGL", name: "Alphabet", price: 134.99, change: -0.5 },
  { symbol: "AMZN", name: "Amazon", price: 127.12, change: 1.2 },
  { symbol: "META", name: "Meta", price: 298.67, change: 3.1 }
];

const cryptoMarket = [
  { symbol: "BTC", name: "Bitcoin", price: 67234.12, change: 4.2 },
  { symbol: "ETH", name: "Ethereum", price: 3892.45, change: 2.8 }
];

const reviews = [
  {
    id: 10,
    title: "iPhone 15 Pro Max: 3 meses de uso intenso",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1696446702183-abd8e6a2438f",
    excerpt: "O melhor iPhone já feito, mas será que vale o investimento?"
  },
  {
    id: 11,
    title: "Nvidia RTX 4090: A placa gráfica definitiva?",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    excerpt: "Testamos o monstro da Nvidia em jogos e IA"
  }
];

const upcomingEvents = [
  {
    id: 12,
    title: "Apple WWDC 2024",
    date: "2024-06-10",
    type: "Evento"
  },
  {
    id: 13,
    title: "Samsung Galaxy Z Fold 6",
    date: "2024-07-15",
    type: "Lançamento"
  }
];

const categoryNews = {
  "Hardware": [
    {
      id: 14,
      title: "Intel apresenta nova geração de processadores",
      image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
      excerpt: "Chips prometem revolucionar o mercado com eficiência energética"
    }
  ],
  "Cibersegurança": [
    {
      id: 15,
      title: "Ataques ransomware aumentam 300% em 2024",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      excerpt: "Empresas investem cada vez mais em segurança digital"
    }
  ]
};

const featuredVideos = [
  {
    id: 16,
    title: "Unboxing: Testamos o Vision Pro",
    thumbnail: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d",
    duration: "12:34"
  },
  {
    id: 17,
    title: "Review: MacBook Air M3",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca4",
    duration: "15:45"
  }
];

function HomePage() {
  const [email, setEmail] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />

      {/* Ad Banner - Top */}
      <div className="w-full bg-[#E2E2E2] h-24 flex items-center justify-center mt-[172px] mb-8">
        <div className="text-[#1D1D1D]/50 text-sm">Espaço Publicitário</div>
      </div>

      <main className="container mx-auto px-4 pb-16">
        {/* Featured News Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredNews.map((news, index) => (
              <div
                key={news.id}
                className={`relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-[1.02] ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={`${news.image}?auto=format&fit=crop&w=${index === 0 ? '800' : '400'}&q=80`}
                    alt={news.title}
                    className={`w-full object-cover ${index === 0 ? 'h-96' : 'h-48'}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-[#E63946] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {news.category}
                      </span>
                      <span className="text-white/80 text-sm">{news.readTime}</span>
                    </div>
                    <h2 className={`text-white font-bold mb-2 ${
                      index === 0 ? 'text-3xl' : 'text-xl'
                    }`}>{news.title}</h2>
                    <p className="text-white/80 text-sm line-clamp-2">{news.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {news.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-[#E63946]" />
              <h2 className="text-2xl font-bold text-[#1D1D1D]">Últimas Notícias</h2>
            </div>
            <a href="#" className="text-[#E63946] font-medium hover:text-[#E63946]/80 flex items-center space-x-2">
              <span>Ver todas</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <article key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`${news.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#E63946] text-sm font-medium">{news.category}</span>
                    <span className="text-[#2B2B2B]/60 text-sm">{formatDate(news.publishedAt)}</span>
                  </div>
                  <h3 className="text-[#1D1D1D] font-bold text-lg mb-2 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center text-sm text-[#2B2B2B]/60">
                    <Clock className="w-4 h-4 mr-1" />
                    {news.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Section */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-[#E63946]" />
                  <h2 className="text-2xl font-bold text-[#1D1D1D]">Mercado Tech</h2>
                </div>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 rounded-lg bg-[#E63946]/10 text-[#E63946] font-medium">
                    Ações
                  </button>
                  <button className="px-4 py-2 rounded-lg hover:bg-[#E63946]/10 text-[#2B2B2B] font-medium">
                    Crypto
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {techStocks.map((stock) => (
                  <div key={stock.symbol} className="p-4 rounded-lg border border-[#E2E2E2] hover:border-[#E63946]/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#E63946]">{stock.symbol}</span>
                      <span className={`text-sm font-semibold ${
                        stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stock.change > 0 ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                    <div className="text-[#2B2B2B] font-medium">${stock.price}</div>
                    <div className="text-[#2B2B2B]/60 text-sm truncate">{stock.name}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Category Sections */}
            {Object.entries(categoryNews).map(([category, news]) => (
              <section key={category} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#1D1D1D]">{category}</h2>
                  <a href="#" className="text-[#E63946] text-sm hover:text-[#E63946]/80">
                    Ver mais
                  </a>
                </div>
                <div className="space-y-4">
                  {news.map((item) => (
                    <article key={item.id} className="flex gap-4">
                      <img
                        src={`${item.image}?auto=format&fit=crop&w=200&q=80`}
                        alt={item.title}
                        className="w-32 h-24 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div>
                        <h3 className="font-bold text-[#1D1D1D] mb-2">{item.title}</h3>
                        <p className="text-sm text-[#2B2B2B]/60 line-clamp-2">{item.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            {/* Reviews Section */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-[#E63946]" />
                  <h2 className="text-2xl font-bold text-[#1D1D1D]">Análises & Reviews</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <article key={review.id} className="bg-[#F7F7F7] rounded-xl overflow-hidden">
                    <img
                      src={`${review.image}?auto=format&fit=crop&w=400&q=80`}
                      alt={review.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(review.rating)
                                ? 'text-[#E63946] fill-[#E63946]'
                                : 'text-[#E2E2E2]'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium text-[#2B2B2B]">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-[#1D1D1D] mb-2">{review.title}</h3>
                      <p className="text-sm text-[#2B2B2B]/60">{review.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Popular News */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <Fire className="w-6 h-6 text-[#E63946]" />
                <h2 className="text-xl font-bold text-[#1D1D1D]">Em Alta</h2>
              </div>
              <div className="space-y-4">
                {popularNews.map((news, index) => (
                  <article key={news.id} className="flex items-start space-x-4">
                    <span className="text-2xl font-bold text-[#E63946]/20">
                      #{index + 1}
                    </span>
                    <div>
                      <span className="text-xs text-[#E63946] font-medium mb-1 block">
                        {news.category}
                      </span>
                      <h3 className="font-medium text-[#1D1D1D] line-clamp-2">
                        {news.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1 text-sm text-[#2B2B2B]/60">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{(news.views / 1000).toFixed(1)}k views</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Featured Videos */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <PlayCircle className="w-6 h-6 text-[#E63946]" />
                <h2 className="text-xl font-bold text-[#1D1D1D]">Vídeos</h2>
              </div>
              <div className="space-y-4">
                {featuredVideos.map((video) => (
                  <article key={video.id} className="group relative">
                    <div className="relative">
                      <img
                        src={`${video.thumbnail}?auto=format&fit=crop&w=400&q=80`}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors rounded-lg" />
                      <PlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <h3 className="mt-2 font-medium text-[#1D1D1D]">{video.title}</h3>
                  </article>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-6 h-6 text-[#E63946]" />
                <h2 className="text-xl font-bold text-[#1D1D1D]">Próximos Eventos</h2>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#E63946]/10 rounded-lg flex items-center justify-center">
                      <span className="text-[#E63946] font-bold">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#1D1D1D]">{event.title}</h3>
                      <span className="text-sm text-[#2B2B2B]/60">{event.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1D1D1D] to-[#2B2B2B] p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557264337-e8a93017fe92?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Newspaper className="w-6 h-6 text-[#E63946]" />
              <h2 className="text-2xl font-bold text-white">Newsletter Sintetiza</h2>
            </div>
            <p className="text-[#E2E2E2] mb-8">
              Receba as principais notícias do mundo da tecnologia diretamente na sua caixa de entrada.
              Sem spam, apenas conteúdo relevante selecionado por nossa equipe.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E63946]/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#E63946] text-white font-medium rounded-lg hover:bg-[#E63946]/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Inscrever-se</span>
              </button>
            </form>
          </div>
        </section>

        {/* Side Ad */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <div className="bg-[#E2E2E2] w-[160px] h-[600px] rounded-lg flex items-center justify-center">
            <span className="text-[#1D1D1D]/50 text-sm">Anúncio</span>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default HomePage;