import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  BookOpen,
  Calendar,
  Search,
  SlidersHorizontal,
  Command,
  Star,
  Eye,
  X,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  FileText, // Import FileText for the new button icon
  CheckSquare // Import CheckSquare for the new button icon (alternative)
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, Transition } from '@headlessui/react';
import Sidebar from '../../components/Dashboard/Sidebar';

interface ArticleData {
  id: string;
  title: string;
  submittedAt: Date;
  score: number;
  category: string;
  author: string;
  content: string;
}

interface ArticleModalProps {
  article: ArticleData | null;
  isOpen: boolean;
  onClose: () => void;
}

const API_BASE_URL = 'http://localhost:3000';
const ITEMS_PER_PAGE = 6;

function ScoreIndicator({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 bg-green-50';
    if (score >= 60) return 'text-blue-500 bg-blue-50';
    if (score >= 40) return 'text-yellow-500 bg-yellow-50';
    return 'text-red-500 bg-red-50';
  };

  return (
    <div className={`flex items-center ${getScoreColor(score)} rounded-full px-3 py-1`}>
      <Star className="w-4 h-4 mr-1.5" />
      <span className="font-medium">{score}</span>
    </div>
  );
}

function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  if (!article) return null;

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-8">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                    {article.title}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                    <span className="sr-only">Fechar</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 bg-gray-50 p-4 rounded-xl">
                  <span className="text-sm text-[#E63946] font-medium bg-[#E63946]/10 px-4 py-1.5 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      {format(article.submittedAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <ScoreIndicator score={article.score} />
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Autor: {article.author}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 bg-white p-6 rounded-xl border border-gray-100">
                  <p className="whitespace-pre-line">{article.content}</p>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition-colors"
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl text-sm font-medium bg-[#E63946] text-white hover:bg-[#E63946]/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E63946] transition-colors"
                  >
                    Aprovar Artigo
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function ArticleCard({
  article,
  onView
}: {
  article: ArticleData;
  onView: (article: ArticleData) => void;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="p-3 bg-[#E63946]/10 rounded-xl group-hover:bg-[#E63946]/20 transition-colors duration-300">
            <BookOpen className="w-6 h-6 text-[#E63946]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#E63946] font-medium bg-[#E63946]/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <ScoreIndicator score={article.score} />
            </div>
            <h3 className="font-semibold text-[#1D1D1D] group-hover:text-[#E63946] transition-colors duration-300 text-lg mb-2">
              {article.title}
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span className="text-sm">
                  {format(article.submittedAt, "d 'de' MMMM", { locale: ptBR })}
                </span>
              </div>
              <div className="flex items-center text-gray-500">
                <BookOpen className="w-4 h-4 mr-1.5" />
                <span className="text-sm">{article.author}</span>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onView(article)}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-[#E63946] transition-colors"
          aria-label="Visualizar artigo"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E63946] to-[#E63946]/80 transition-all duration-300"
          style={{ width: `${article.score}%` }}
          role="progressbar"
          aria-valuenow={article.score}
          aria-valuemin={0}
          aria-valuemax={100}
        />
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
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-[#E63946] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function PendingArticles() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPublishedButtonHovered, setIsPublishedButtonHovered] = useState(false); // State for the new button
  const navigate = useNavigate(); // Initialize navigate

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/pending`);
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Erro ${response.status}: ${errorData || response.statusText}`);
      }
      const dataFromApi = await response.json();

      if (!Array.isArray(dataFromApi)) {
        throw new Error("Formato de dados inesperado recebido da API.");
      }

      const formattedData: ArticleData[] = dataFromApi.map((item: any) => ({
        id: item.id || `temp-id-${Math.random()}`, // Add fallback ID
        title: item.title || 'Sem Título',
        submittedAt: item.submittedAt ? new Date(item.submittedAt) : new Date(), // Use current date as fallback
        score: typeof item.score === 'number' ? item.score : 0,
        category: item.category || 'Indefinido',
        author: item.author || 'Desconhecido',
        content: item.content || 'Sem conteúdo',
      }));

      setArticles(formattedData);
    } catch (err: any) {
      console.error("Erro ao buscar artigos:", err);
      setError(err.message || 'Falha ao conectar com o servidor.');
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'date':
        default:
          const timeA = a.submittedAt instanceof Date ? a.submittedAt.getTime() : 0;
          const timeB = b.submittedAt instanceof Date ? b.submittedAt.getTime() : 0;
          return timeB - timeA;
      }
    });
  }, [articles, sortBy]);

  const filteredArticles = useMemo(() => {
    if (!searchTerm) {
      return sortedArticles;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return sortedArticles.filter(article =>
      article.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      article.category.toLowerCase().includes(lowerCaseSearchTerm) ||
      article.author.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [sortedArticles, searchTerm]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const handleViewArticle = useCallback((article: ArticleData) => {
    setSelectedArticle(article);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedArticle(null);
  }, []);

  const handlePageChange = useCallback((page: number) => {
     if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
     }
  }, [totalPages]);

  const handlePublishedArticlesClick = () => { // Handler for the new button
    navigate('/admin/dashboard/articles');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8 relative pb-24"> {/* Add relative positioning and padding-bottom */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Command className="w-8 h-8 text-[#E63946]" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1D1D1D] to-[#4A4A4A] bg-clip-text text-transparent">
                  Artigos Pendentes
                </h1>
              </div>
              <p className="text-gray-500">Revise e aprove artigos submetidos</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 transition-all duration-300 w-64"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 transition-all duration-300 appearance-none bg-white w-48"
                >
                  <option value="date">Mais recentes</option>
                  <option value="score">Maior pontuação</option>
                </select>
                <SlidersHorizontal className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 text-[#E63946] animate-spin" />
              <span className="ml-3 text-gray-600">Carregando artigos...</span>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
              <p className="text-red-700 font-medium mb-1">Ocorreu um erro</p>
              <p className="text-red-600 text-sm">{error}</p>
              <button
                onClick={fetchArticles}
                className="mt-4 px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedArticles.length === 0 ? (
                  <div className="col-span-1 md:col-span-2 text-center text-gray-500 py-10 bg-white rounded-xl shadow-sm">
                    Nenhum artigo pendente encontrado {searchTerm ? `para "${searchTerm}"` : ''}.
                  </div>
                ) : (
                  paginatedArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onView={handleViewArticle}
                    />
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
            </>
          )}

          {/* New Button for Published Articles */}
          <button
            onClick={handlePublishedArticlesClick}
            onMouseEnter={() => setIsPublishedButtonHovered(true)}
            onMouseLeave={() => setIsPublishedButtonHovered(false)}
            className="fixed bottom-8 right-8 flex items-center gap-2 bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 group z-50"
            aria-label="Ver artigos publicados"
          >
            <CheckSquare className={`w-5 h-5 transition-all duration-300 ${isPublishedButtonHovered ? 'rotate-12' : ''}`} />
            <span className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
              isPublishedButtonHovered ? 'max-w-xs px-1 opacity-100' : 'max-w-0 px-0 opacity-0'
            }`}>
              Artigos Publicados
            </span>
          </button>

        </div>
      </div>

      <ArticleModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default PendingArticles;