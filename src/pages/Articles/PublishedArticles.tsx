import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  TrendingUp,
  Calendar,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Command,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Sidebar from '../../components/Dashboard/Sidebar';

function TrendIndicator({ trend }: { trend: number }) {
  const isPositive = trend >= 0;
  return (
    <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
      <span>{Math.abs(trend)}%</span>
    </div>
  );
}

interface PublishedArticle {
  id: string;
  title: string;
  date: Date;
  views: number;
  trend: number;
  category: string;
}

function ArticleCard({ article }: { article: PublishedArticle }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">{article.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {format(article.date, "d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Eye className="w-4 h-4" />
            <span>{article.views}</span>
          </div>
          <TrendIndicator trend={article.trend} />
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-gray-600">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function PublishedArticles() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 6;

  const articles: PublishedArticle[] = [
    {
      id: '1',
      title: 'Como melhorar sua produtividade no trabalho',
      date: new Date('2024-01-15'),
      views: 1234,
      trend: 12,
      category: 'Produtividade'
    },
    {
      id: '2',
      title: 'Dicas para uma alimentação saudável',
      date: new Date('2024-01-14'),
      views: 856,
      trend: -5,
      category: 'Saúde'
    },
    {
        id: '3',
        title: 'Introdução ao React Hooks',
        date: new Date('2024-01-13'),
        views: 2500,
        trend: 25,
        category: 'Tecnologia'
    },
    {
        id: '4',
        title: 'Guia de Viagem para a Europa',
        date: new Date('2024-01-12'),
        views: 550,
        trend: 8,
        category: 'Viagem'
    },
    {
        id: '5',
        title: 'Como investir seu dinheiro com segurança',
        date: new Date('2024-01-11'),
        views: 1800,
        trend: 15,
        category: 'Finanças'
    },
    {
        id: '6',
        title: 'Receitas fáceis para o jantar',
        date: new Date('2024-01-10'),
        views: 950,
        trend: -2,
        category: 'Culinária'
    },
    {
        id: '7',
        title: 'Exercícios para fazer em casa',
        date: new Date('2024-01-09'),
        views: 1100,
        trend: 10,
        category: 'Saúde'
    },
  ];

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return b.date.getTime() - a.date.getTime();
        } else if (sortBy === 'views') {
          return b.views - a.views;
        } else if (sortBy === 'trend') {
          return b.trend - a.trend;
        }
        return 0;
      });
  }, [articles, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredArticles.slice(start, end);
  }, [filteredArticles, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
    }
  };

  const handlePendingArticlesClick = () => {
    navigate('/admin/dashboard/articles-pendentes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Artigos Publicados</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-transparent"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 focus:border-transparent bg-white appearance-none"
              >
                <option value="date">Data</option>
                <option value="views">Visualizações</option>
                <option value="trend">Tendência</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedArticles.length === 0 ? (
              <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm">
                Nenhum artigo encontrado {searchTerm ? `para "${searchTerm}"` : ''}.
              </div>
            ) : (
              paginatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))
            )}
          </div>

          {filteredArticles.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <button
            onClick={handlePendingArticlesClick}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="fixed bottom-8 right-8 flex items-center gap-2 bg-[#E63946] hover:bg-[#dc2d3a] text-white px-6 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 group z-50"
            aria-label="Ver artigos pendentes"
          >
            <FileText className={`w-5 h-5 transition-all duration-300 ${isButtonHovered ? 'rotate-12' : ''}`} />
            <span className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
              isButtonHovered ? 'max-w-xs px-1 opacity-100' : 'max-w-0 px-0 opacity-0'
            }`}>
              Artigos Pendentes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishedArticles;