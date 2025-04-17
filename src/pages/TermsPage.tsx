import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import { Scroll } from 'lucide-react';

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <Header />
      
      {/* Adiciona mt-[172px] para empurrar o conteúdo para baixo do Header */}
      <main className="flex-1 container mx-auto px-4 py-24 mt-[172px]">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <Scroll className="w-12 h-12 text-[#E63946]" />
            </div>
            <h1 className="text-4xl font-bold text-[#1D1D1D] mb-4">
              Termos de Uso
            </h1>
            <p className="text-[#2B2B2B]/60">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">1. Aceitação dos Termos</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Ao acessar e utilizar o site Sintetiza.tech, você concorda com estes Termos de Uso e se compromete a cumpri-los. Se você não concordar com qualquer parte destes termos, solicitamos que não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">2. Descrição dos Serviços</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                O Sintetiza.tech é um portal de notícias especializado em tecnologia, games e inovação, oferecendo conteúdo jornalístico, análises, reviews e informações sobre o mercado tecnológico.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">3. Propriedade Intelectual</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Todo o conteúdo publicado no Sintetiza.tech, incluindo textos, imagens, vídeos, logotipos, marcas registradas e design, é de propriedade exclusiva do Sintetiza.tech ou de seus licenciadores. É proibida a reprodução, distribuição ou modificação sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">4. Uso do Conteúdo</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                O conteúdo do site é disponibilizado apenas para uso pessoal e não comercial. Você pode compartilhar nosso conteúdo em redes sociais, desde que mantenha os créditos e links originais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">5. Responsabilidades do Usuário</h2>
              <p className="text-[#2B2B2B] leading-relaxed mb-4">
                Ao utilizar nosso site, você concorda em:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#2B2B2B]">
                <li>Não violar direitos de propriedade intelectual</li>
                <li>Não publicar conteúdo ofensivo ou ilegal</li>
                <li>Não utilizar meios automatizados para acessar o site</li>
                <li>Não interferir no funcionamento do site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">6. Limitação de Responsabilidade</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                O Sintetiza.tech se esforça para manter as informações precisas e atualizadas, mas não garante a ausência de erros. Não nos responsabilizamos por decisões tomadas com base em nosso conteúdo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">7. Modificações dos Termos</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através do site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">8. Lei Aplicável</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais da cidade de São Paulo, SP.
              </p>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-[#2B2B2B]/60 text-sm">
                Para dúvidas sobre estes termos, entre em contato através do email: contato@sintetiza.tech
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsPage;