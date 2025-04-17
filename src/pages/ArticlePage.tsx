import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import { Clock, Share2, BookmarkPlus, ThumbsUp, MessageSquare, Twitter, Facebook, Linkedin, Apple as WhatsApp, ChevronRight, User } from 'lucide-react';

// Mock article data (replace with real data in production)
const article = {
  id: 1,
  category: "Inteligência Artificial",
  title: "GPT-4 Turbo: Nova IA da OpenAI promete revolução na geração de conteúdo",
  subtitle: "Modelo mais avançado da OpenAI traz melhorias significativas em compreensão de contexto e geração de texto, estabelecendo novo padrão para IAs generativas",
  coverImage: "https://images.unsplash.com/photo-1677442136019-21d903315402", // Placeholder - Use appropriate image URL
  author: {
    name: "João Silva",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", // Placeholder - Use appropriate image URL
    role: "Editor de Tecnologia"
  },
  publishedAt: "2024-03-10T14:30:00Z",
  readTime: "5 min",
  content: [
    {
      type: "paragraph",
      content: "A OpenAI surpreendeu mais uma vez o mundo da tecnologia com o anúncio do GPT-4 Turbo, uma evolução significativa em sua linha de modelos de linguagem. Esta nova versão promete não apenas melhorias incrementais, mas uma verdadeira revolução na forma como interagimos com a inteligência artificial."
    },
    {
      type: "subtitle",
      content: "Principais Avanços"
    },
    {
      type: "paragraph",
      content: "O novo modelo apresenta melhorias impressionantes em várias áreas-chave:"
    },
    {
      type: "list",
      items: [
        "Compreensão contextual aprimorada",
        "Maior precisão em respostas técnicas",
        "Suporte expandido para múltiplos idiomas",
        "Redução significativa de alucinações"
      ]
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485", // Placeholder - Use appropriate image URL
      caption: "Centro de processamento de dados da OpenAI, onde o GPT-4 Turbo foi treinado"
    },
    {
      type: "paragraph",
      content: "Uma das características mais impressionantes do GPT-4 Turbo é sua capacidade de manter conversas mais longas e coerentes, graças a um contexto expandido que permite ao modelo 'lembrar' de mais informações durante uma interação."
    },
    {
      type: "quote",
      content: "O GPT-4 Turbo representa um salto significativo em nossa compreensão de como os modelos de linguagem podem evoluir. Não é apenas uma atualização, é uma reimaginação do que é possível.",
      author: "Sam Altman, CEO da OpenAI"
    }
  ],
  tags: ["GPT-4", "OpenAI", "IA Generativa", "Tecnologia", "Inovação"],
  relatedArticles: [
    {
      id: 2,
      title: "Como o ChatGPT está transformando o mercado de trabalho em 2024",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984", // Placeholder - Use appropriate image URL
      category: "IA",
      readTime: "4 min"
    },
    {
      id: 3,
      title: "Anthropic lança Claude 3: O novo competidor do GPT-4",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485", // Placeholder - Use appropriate image URL
      category: "IA",
      readTime: "6 min"
    }
  ]
};

function ArticlePage() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [email, setEmail] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const shareArticle = (platform: string) => {
    console.log(`Sharing on ${platform}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <Header />

      {/* Aumentando o padding-top para criar mais espaço abaixo do Header */}
      <main className="container mx-auto px-4 pt-[220px] pb-16"> {/* Alterado de pt-[172px] para pt-[220px] */}
        <header className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-[#E63946] text-white text-sm font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center text-[#2B2B2B]/60">
              <Clock className="w-4 h-4 mr-1" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1D1D1D] mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-[#2B2B2B] mb-6">
            {article.subtitle}
          </p>

          <div className="flex items-center justify-between py-6 border-y border-[#E2E2E2]">
            <div className="flex items-center space-x-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-[#1D1D1D]">{article.author.name}</div>
                <div className="text-sm text-[#2B2B2B]/60">{article.author.role}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-[#E63946]/10 text-[#E63946]' : 'hover:bg-[#E2E2E2]'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full transition-colors ${
                  isSaved ? 'bg-[#E63946]/10 text-[#E63946]' : 'hover:bg-[#E2E2E2]'
                }`}
              >
                <BookmarkPlus className="w-5 h-5" />
              </button>
              <button
                onClick={() => {}}
                className="p-2 rounded-full hover:bg-[#E2E2E2] transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-[200px] space-y-4">
              <button
                onClick={() => shareArticle('twitter')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#1DA1F2] hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => shareArticle('facebook')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#4267B2] hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => shareArticle('linkedin')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#0077B5] hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => shareArticle('whatsapp')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <WhatsApp className="w-5 h-5" />
              </button>
            </div>
          </aside>

          <article className="lg:col-span-8">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-2xl mb-8"
            />

            <div className="prose prose-lg max-w-none">
              {article.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-[#2B2B2B] mb-6">
                        {block.content}
                      </p>
                    );
                  case 'subtitle':
                    return (
                      <h2 key={index} className="text-2xl font-bold text-[#1D1D1D] mt-8 mb-4">
                        {block.content}
                      </h2>
                    );
                  case 'list':
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-6">
                        {block.items?.map((item, i) => (
                          <li key={i} className="text-[#2B2B2B]">{item}</li>
                        ))}
                      </ul>
                    );
                  case 'image':
                    return (
                      <figure key={index} className="my-8">
                        <img
                          src={block.url}
                          alt={block.caption}
                          className="w-full rounded-xl"
                        />
                        <figcaption className="mt-2 text-center text-sm text-[#2B2B2B]/60">
                          {block.caption}
                        </figcaption>
                      </figure>
                    );
                  case 'quote':
                    return (
                      <blockquote key={index} className="border-l-4 border-[#E63946] pl-6 my-8">
                        <p className="text-xl italic text-[#2B2B2B] mb-2">{block.content}</p>
                        <cite className="text-sm text-[#2B2B2B]/60">— {block.author}</cite>
                      </blockquote>
                    );
                  default:
                    return null;
                }
              })}
            </div>

            <div className="flex flex-wrap gap-2 mt-8">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#E2E2E2] text-[#2B2B2B] rounded-full text-sm hover:bg-[#E2E2E2]/70 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg text-[#1D1D1D]">{article.author.name}</h3>
                  <p className="text-[#2B2B2B]/60">{article.author.role}</p>
                </div>
              </div>
              <p className="mt-4 text-[#2B2B2B]">
                Editor especializado em tecnologia e inteligência artificial, com mais de 8 anos de experiência cobrindo as últimas inovações do setor.
              </p>
            </div>

            <section className="mt-12">
              <h3 className="text-2xl font-bold text-[#1D1D1D] mb-6">Comentários</h3>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#E2E2E2] flex items-center justify-center">
                    <User className="w-6 h-6 text-[#2B2B2B]/60" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Deixe seu comentário..."
                      className="w-full p-4 rounded-lg border border-[#E2E2E2] focus:outline-none focus:ring-2 focus:ring-[#E63946]/50 resize-none"
                      rows={3}
                    />
                    <button className="mt-2 px-6 py-2 bg-[#E63946] text-white font-medium rounded-lg hover:bg-[#E63946]/90 transition-colors">
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </article>

          <aside className="lg:col-span-3 space-y-8">
            <section className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-[#1D1D1D] mb-6">Artigos Relacionados</h3>
              <div className="space-y-6">
                {article.relatedArticles.map((related) => (
                  <article key={related.id} className="group">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <span className="text-sm text-[#E63946] font-medium">{related.category}</span>
                    <h4 className="font-medium text-[#1D1D1D] group-hover:text-[#E63946] transition-colors">
                      {related.title}
                    </h4>
                    <div className="flex items-center text-sm text-[#2B2B2B]/60 mt-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {related.readTime}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="bg-[#1D1D1D] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Newsletter</h3>
              <p className="text-[#E2E2E2] text-sm mb-4">
                Receba as principais notícias do mundo da tecnologia diretamente no seu email.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#E63946]/50"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-[#E63946] text-white font-medium rounded-lg hover:bg-[#E63946]/90 transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ArticlePage;