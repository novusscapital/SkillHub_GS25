function Careers() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Carreiras em Alta
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore profissões que estão moldando o futuro do trabalho. Cada carreira mostra
            as habilidades essenciais e uma breve descrição para te ajudar a escolher seu caminho.
          </p>
        </div>

        {/* Grid de Carreiras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Desenvolvedor Front-End */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Desenvolvedor Front-End
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Cria interfaces modernas e responsivas usando React, HTML e JavaScript.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['HTML', 'CSS', 'JavaScript', 'React'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Engenheiro de Dados */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-green-100 dark:border-green-800">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                  Engenheiro de Dados
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Projeta e gerencia pipelines de dados, garantindo qualidade e escalabilidade.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['Python', 'SQL', 'ETL', 'BigQuery'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cientista de Dados */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                  Cientista de Dados
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Transforma dados em insights estratégicos usando estatística e machine learning.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['Python', 'Pandas', 'Machine Learning', 'Estatística'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* UX/UI Designer */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-orange-100 dark:border-orange-800">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
                  UX/UI Designer
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Cria experiências digitais intuitivas e acessíveis, focando em empatia e usabilidade.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['Figma', 'Design Thinking', 'Prototipagem', 'Pesquisa de Usuário'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Analista de Segurança da Informação */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-blue-700 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  Analista de Segurança
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Protege sistemas e redes contra ataques, garantindo a integridade dos dados.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['Cybersecurity', 'Firewall', 'Pentest', 'SIEM'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Especialista em IA Aplicada */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg group hover:shadow-xl transition-all duration-300 border border-teal-100 dark:border-teal-800">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
                  Especialista em IA
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Desenvolve soluções de Inteligência Artificial para automação e análise de dados.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Habilidades Essenciais:
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {['Python', 'TensorFlow', 'NLP', 'IA Ética'].map((skill, index) => (
                    <li key={index}>
                      <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Pronto para Iniciar Sua Jornada?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Conecte-se com profissionais dessas áreas e descubra oportunidades reais de carreira.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
              Explorar Profissionais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Careers;