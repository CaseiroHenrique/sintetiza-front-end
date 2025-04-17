import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock, 
  MousePointer, 
  Share2,
  BookOpen,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  MessageSquare,
  Search,
  Command
} from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';

// Mock data for analytics
const analyticsData = {
  dailyClicks: {
    current: 2547,
    previous: 2100,
    change: 21.3
  },
  weeklyClicks: {
    current: 15234,
    previous: 14100,
    change: 8.0
  },
  monthlyClicks: {
    current: 64321,
    previous: 58900,
    change: 9.2
  },
  activeUsers: {
    current: 1234,
    previous: 1100,
    change: 12.2
  },
  avgTimeOnSite: {
    current: "4:32",
    previous: "4:15",
    change: 6.7
  },
  bounceRate: {
    current: 42.3,
    previous: 45.8,
    change: -7.6
  }
};

const popularArticles = [
  {
    id: 1,
    title: "GPT-4 Turbo: Nova IA da OpenAI promete revolução",
    views: 12543,
    trend: 23.5
  },
  {
    id: 2,
    title: "Como o ChatGPT está transformando o mercado",
    views: 10234,
    trend: 15.2
  },
  {
    id: 3,
    title: "Apple Vision Pro: O futuro da computação espacial",
    views: 8765,
    trend: -5.8
  }
];

const recentActivity = [
  {
    id: 1,
    type: "view",
    content: "Novo pico de visualizações no artigo sobre IA",
    time: "5 minutos atrás"
  },
  {
    id: 2,
    type: "share",
    content: "Artigo compartilhado 50 vezes no LinkedIn",
    time: "15 minutos atrás"
  },
  {
    id: 3,
    type: "comment",
    content: "Novo comentário em destaque",
    time: "30 minutos atrás"
  }
];

function StatCard({ 
  title, 
  value, 
  previousValue, 
  change, 
  icon: Icon 
}: {
  title: string;
  value: string | number;
  previousValue: string | number;
  change: number;
  icon: React.ElementType;
}) {
  const isPositive = change >= 0;
  const progressWidth = Math.min(Math.abs(change), 100);

  return (
    <div className="stat-card glass-effect rounded-xl p-6 hover-scale">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-xl ${
            isPositive ? 'bg-green-100/80 text-green-600' : 'bg-red-100/80 text-red-600'
          } backdrop-blur-sm transition-transform duration-300 hover:scale-110`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-gray-500 font-medium">{title}</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="stat-value text-3xl font-bold">{value}</h3>
        <div className="flex items-center mt-2">
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-600 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-600 mr-1" />
          )}
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(change)}%
          </span>
          <span className="text-gray-500 text-sm ml-1">vs. anterior</span>
        </div>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="progress-bar" 
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
}

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Command className="w-8 h-8 text-[#E63946]" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1D1D1D] to-[#4A4A4A] bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
              <p className="text-gray-500">Bem-vindo de volta! Aqui está o resumo dos seus dados.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 transition-all duration-300 w-64"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              <select className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 transition-all duration-300 appearance-none bg-white">
                <option value="today">Hoje</option>
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Cliques Hoje"
              value={analyticsData.dailyClicks.current.toLocaleString()}
              previousValue={analyticsData.dailyClicks.previous}
              change={analyticsData.dailyClicks.change}
              icon={MousePointer}
            />
            <StatCard
              title="Cliques na Semana"
              value={analyticsData.weeklyClicks.current.toLocaleString()}
              previousValue={analyticsData.weeklyClicks.previous}
              change={analyticsData.weeklyClicks.change}
              icon={TrendingUp}
            />
            <StatCard
              title="Cliques no Mês"
              value={analyticsData.monthlyClicks.current.toLocaleString()}
              previousValue={analyticsData.monthlyClicks.previous}
              change={analyticsData.monthlyClicks.change}
              icon={BarChart3}
            />
            <StatCard
              title="Usuários Ativos"
              value={analyticsData.activeUsers.current.toLocaleString()}
              previousValue={analyticsData.activeUsers.previous}
              change={analyticsData.activeUsers.change}
              icon={Users}
            />
            <StatCard
              title="Tempo Médio"
              value={analyticsData.avgTimeOnSite.current}
              previousValue={analyticsData.avgTimeOnSite.previous}
              change={analyticsData.avgTimeOnSite.change}
              icon={Clock}
            />
            <StatCard
              title="Taxa de Rejeição"
              value={`${analyticsData.bounceRate.current}%`}
              previousValue={analyticsData.bounceRate.previous}
              change={analyticsData.bounceRate.change}
              icon={TrendingDown}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-effect rounded-xl p-6 hover-scale">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-[#E63946]" />
                  <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D1D1D] to-[#4A4A4A] bg-clip-text text-transparent">
                    Artigos Populares
                  </h2>
                </div>
                <button className="px-4 py-2 rounded-xl text-[#E63946] text-sm hover:bg-[#E63946]/5 font-medium transition-all duration-300">
                  Ver todos
                </button>
              </div>
              <div className="space-y-4">
                {popularArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/50 transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 bg-[#E63946]/10 rounded-xl group-hover:bg-[#E63946]/20 transition-colors duration-300">
                        <BookOpen className="w-5 h-5 text-[#E63946]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#1D1D1D] mb-1 group-hover:text-[#E63946] transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500">{article.views.toLocaleString()} visualizações</p>
                      </div>
                    </div>
                    <div className={`flex items-center space-x-2 ${article.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="px-3 py-1 rounded-full bg-opacity-10 bg-current">
                        <div className="flex items-center">
                          {article.trend >= 0 ? (
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">{Math.abs(article.trend)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-effect rounded-xl p-6 hover-scale">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#E63946]" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D1D1D] to-[#4A4A4A] bg-clip-text text-transparent">
                  Atividade Recente
                </h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item flex items-start space-x-4 group cursor-pointer">
                    <div className="p-2.5 bg-[#E63946]/10 rounded-xl group-hover:bg-[#E63946]/20 transition-colors duration-300">
                      {activity.type === 'view' && <BookOpen className="w-5 h-5 text-[#E63946]" />}
                      {activity.type === 'share' && <Share2 className="w-5 h-5 text-[#E63946]" />}
                      {activity.type === 'comment' && <MessageSquare className="w-5 h-5 text-[#E63946]" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1D1D1D] group-hover:text-[#E63946] transition-colors duration-300">
                        {activity.content}
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;