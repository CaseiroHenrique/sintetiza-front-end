import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import { Shield } from 'lucide-react';

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <Header />
      
      {/* Adiciona mt-[172px] para empurrar o conteúdo para baixo do Header */}
      <main className="flex-1 container mx-auto px-4 py-24 mt-[172px]"> 
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-[#E63946]" />
            </div>
            <h1 className="text-4xl font-bold text-[#1D1D1D] mb-4">
              Política de Privacidade
            </h1>
            <p className="text-[#2B2B2B]/60">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">1. Introdução</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                O Sintetiza.tech está comprometido com a proteção da sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">2. Dados que Coletamos</h2>
              <p className="text-[#2B2B2B] leading-relaxed mb-4">
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#2B2B2B]">
                <li>Informações de cadastro (nome, email)</li>
                <li>Dados de navegação</li>
                <li>Cookies e tecnologias similares</li>
                <li>Informações de uso do site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">3. Como Usamos seus Dados</h2>
              <p className="text-[#2B2B2B] leading-relaxed mb-4">
                Utilizamos suas informações para:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#2B2B2B]">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Enviar newsletters (mediante opt-in)</li>
                <li>Personalizar sua experiência</li>
                <li>Análises estatísticas</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">4. Cookies</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Utilizamos cookies para melhorar sua experiência de navegação. Você pode controlar o uso de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Podemos compartilhar seus dados com parceiros de confiança para análise, publicidade e operação do site. Todos os parceiros são obrigados a manter a confidencialidade de suas informações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">6. Seus Direitos</h2>
              <p className="text-[#2B2B2B] leading-relaxed mb-4">
                Conforme a LGPD, você tem direito a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#2B2B2B]">
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar seu consentimento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">7. Segurança dos Dados</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D1D1D] mb-4">8. Contato</h2>
              <p className="text-[#2B2B2B] leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com nosso Encarregado de Proteção de Dados através do email: privacidade@sintetiza.tech
              </p>
            </section>

            <div className="pt-8 border-t border-gray-200">
              <p className="text-[#2B2B2B]/60 text-sm">
                Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPage;