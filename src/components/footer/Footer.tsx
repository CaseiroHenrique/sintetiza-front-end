import React from 'react';
// Importa o Link do react-router-dom
import { Link } from 'react-router-dom'; 
import { Mail, Rss, Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronRight, MapPin, Phone, Globe2, Gamepad2, Notebook as Robot, Building2, Star, TrendingUp, Zap, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const categories = [
    {
      title: 'Games & Cultura Pop',
      icon: <Gamepad2 className="w-4 h-4" />,
      links: [
        'Lançamentos & Reviews',
        'eSports & Competitivo',
        'Hardware Gaming',
        'Cultura Geek'
      ]
    },
    {
      title: 'IA & Tecnologia',
      icon: <Robot className="w-4 h-4" />,
      links: [
        'IA Generativa',
        'Machine Learning',
        'Automação',
        'Futuro da IA'
      ]
    },
    {
      title: 'Empresas Tech',
      icon: <Building2 className="w-4 h-4" />,
      links: [
        'Startups',
        'Big Tech',
        'Mercado',
        'Inovação'
      ]
    }
  ];

  const featuredArticles = [
    {
      title: 'O Impacto da IA no Futuro do Trabalho',
      category: 'Tecnologia',
      date: '2 horas atrás'
    },
    {
      title: 'Nova Geração de Consoles: O que Esperar',
      category: 'Games',
      date: '4 horas atrás'
    },
    {
      title: 'Web3 e o Futuro da Internet',
      category: 'Inovação',
      date: '6 horas atrás'
    }
  ];

  return (
    <footer className="bg-[#1D1D1D] border-t border-[#E63946]/10">
      {/* Newsletter Section */}
      <div className="border-b border-[#E63946]/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#E2E2E2] mb-3">
              Fique por dentro das últimas novidades
            </h2>
            <p className="text-[#E2E2E2]/70 mb-8">
              Receba as principais notícias sobre tecnologia, games e inovação diretamente no seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 bg-[#2B2B2B] rounded-lg text-[#E2E2E2] placeholder-[#E2E2E2]/50 focus:outline-none focus:ring-2 focus:ring-[#E63946]/20"
              />
              <button className="bg-[#E63946] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#E63946]/90 transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-[#E2E2E2] font-semibold mb-6 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#E63946]" />
              Sobre o Sintetiza
            </h3>
            <p className="text-[#E2E2E2]/70 text-sm leading-relaxed mb-6">
              O Sintetiza é um portal de notícias dedicado a trazer as últimas novidades do mundo da tecnologia, games e inovação de forma clara e objetiva.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-[#E2E2E2] font-semibold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#E63946]" />
              Categorias
            </h3>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.title}>
                  <div className="flex items-center gap-2 text-[#E2E2E2] mb-2">
                    {category.icon}
                    <span className="font-medium">{category.title}</span>
                  </div>
                  <ul className="space-y-2 pl-6">
                    {category.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-sm text-[#E2E2E2]/70 hover:text-[#E63946] transition-colors flex items-center gap-2"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Articles Section */}
          <div>
            <h3 className="text-[#E2E2E2] font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#E63946]" />
              Últimas Notícias
            </h3>
            <div className="space-y-4">
              {featuredArticles.map((article) => (
                <a
                  key={article.title}
                  href="#"
                  className="block group"
                >
                  <div className="text-sm text-[#E63946]">{article.category}</div>
                  <h4 className="text-[#E2E2E2] group-hover:text-[#E63946] transition-colors">
                    {article.title}
                  </h4>
                  <div className="text-xs text-[#E2E2E2]/50">{article.date}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#E2E2E2] font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#E63946]" />
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-[#E2E2E2]/70">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm">
                  Av. Tecnologia, 1000<br />
                  São Paulo, SP - Brasil
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#E2E2E2]/70">
                <Phone className="w-5 h-5" />
                <div className="text-sm">+55 11 9999-9999</div>
              </div>
              <div className="flex items-center gap-3 text-[#E2E2E2]/70">
                <Mail className="w-5 h-5" />
                <div className="text-sm">contato@sintetiza.com</div>
              </div>
              <div className="flex items-center gap-3 text-[#E2E2E2]/70">
                <Rss className="w-5 h-5" />
                <div className="text-sm">RSS Feed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E63946]/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#E2E2E2]/70 text-sm">
              © {currentYear} Sintetiza. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6">
              {/* Usa Link com o path definido no App.tsx */}
              <Link to="/privacidade" className="text-[#E2E2E2]/70 text-sm hover:text-[#E63946] transition-colors">
                Política de Privacidade
              </Link>
              {/* Usa Link com o path definido no App.tsx */}
              <Link to="/termos" className="text-[#E2E2E2]/70 text-sm hover:text-[#E63946] transition-colors">
                Termos de Uso
              </Link>
              <a 
                href="https://conexaocode.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#E2E2E2] text-sm font-medium hover:text-[#E63946] transition-colors flex items-center gap-2"
              >
                Desenvolvido por Conexão Code
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;