import React, { useState, useEffect } from "react";
import professionals from "../../../backend/data/professionals.json";

const CareersCards = ({ filters }) => {
  const [displayed, setDisplayed] = useState([]);
  const [selected, setSelected] = useState(null);

  const randomizeProfiles = () => {
    let filtered = [...professionals];

    if (filters.area) {filtered = filtered.filter((p) => p.area === filters.area);}
    if (filters.city) {filtered = filtered.filter((p) => p.city === filters.city);}
    if (filters.tech) {filtered = filtered.filter((p) => p.skills?.includes(filters.tech));}

    if (filters.q) {
      const search = filters.q.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search)
      );
    }

    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedThree = shuffled.slice(0, 3);

    setDisplayed(selectedThree);
  };

  useEffect(() => {
    randomizeProfiles();
  }, [filters]);
  
  const handleOpenProfile = (professional) => {setSelected(professional);};
  const handleCloseProfile = () => {setSelected(null);};
  const handleRecommend = () => {if (!selected) return;alert(`Você recomendou ${selected.name}.`); };
  const handleSendMessage = () => {if (!selected) return;alert(`Mensagem enviada para ${selected.name} (simulação).`);};

  // Ícones SVG
  const RefreshIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-12 h-12 text-gray-400 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const BuildingIcon = () => (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const EducationIcon = () => (
    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  );

  const BriefcaseIcon = () => (
    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
    </svg>
  );

  const SkillsIcon = () => (
    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const ThumbsUpIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  );

  const MessageIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  return (
    <section className="animate-fade-in">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Profissionais em Destaque
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Conheça talentos incríveis da nossa comunidade
          </p>
        </div>
        <button 
          type="button" 
          onClick={randomizeProfiles}
          className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 mt-4 sm:mt-0 flex items-center"
        >
          <RefreshIcon />
          Aleatorizar Perfis
        </button>
      </div>

      {/* Mensagem de Nenhum Resultado */}
      {displayed.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <SearchIcon />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Nenhum profissional encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Tente ajustar os filtros ou buscar por termos diferentes
          </p>
          <button 
            onClick={randomizeProfiles}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-200"
          >
            Mostrar Todos
          </button>
        </div>
      )}

      {/* GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.map((p) => (
          <article
            key={p.id}
            onClick={() => handleOpenProfile(p)}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl cursor-pointer group border-2 border-transparent hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300 p-6"
          >
            {/* Header do Card */}
            <div className="flex items-start space-x-4 mb-4">
              {p.photo && (
                <img
                  src={p.photo}
                  alt={p.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-teal-500 dark:group-hover:border-teal-400 transition-colors duration-300"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {p.name}
                </h3>
                <p className="text-teal-500 dark:text-teal-400 font-semibold">{p.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{p.city}</p>
              </div>
            </div>

            {/* Área e ID */}
            <div className="flex items-center justify-between mb-3">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {p.area || "Não informado"}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">ID: {p.id}</span>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Principais Skills:
              </h4>
              <div className="flex flex-wrap gap-1">
                {p.skills?.slice(0, 4).map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-purple-500 text-white px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {p.skills?.length > 4 && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    +{p.skills.length - 4} mais
                  </span>
                )}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center pt-3 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-teal-500 dark:text-teal-400 font-semibold group-hover:underline flex items-center justify-center">
                Ver perfil completo
                <ArrowRightIcon />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* MODAL DE PERFIL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          {/* Fundo do modal */}
          <div 
            className="absolute inset-0" 
            onClick={handleCloseProfile}
          ></div>

          {/* Conteúdo do modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header do Modal */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Perfil Profissional
                </h2>
                <button 
                  type="button" 
                  onClick={handleCloseProfile}
                  className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Informações Principais */}
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6 mb-8">
                {/* Foto */}
                {selected.photo && (
                  <div className="flex-shrink-0">
                    <img
                      src={selected.photo}
                      alt={selected.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-500 dark:border-teal-400 shadow-lg"
                    />
                  </div>
                )}

                {/* Dados Básicos */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {selected.name}
                  </h3>
                  <p className="text-xl text-teal-500 dark:text-teal-400 font-semibold mb-3">
                    {selected.role}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <LocationIcon />
                      <span className="text-gray-800 dark:text-white">{selected.city}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BuildingIcon />
                      <span className="text-gray-800 dark:text-white">{selected.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dados pessoais e acadêmicos */}
              <section className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <EducationIcon />
                  Dados Pessoais e Acadêmicos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-800 dark:text-white mb-2">
                      <strong className="text-gray-600 dark:text-gray-300">Bio:</strong><br/>
                      {selected.personal?.bio || "Não informado"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-white">
                      <strong className="text-gray-600 dark:text-gray-300">Formação:</strong> {selected.academic?.degree || "Não informado"}
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      <strong className="text-gray-600 dark:text-gray-300">Instituição:</strong> {selected.academic?.institution || "Não informado"}
                    </p>
                    <p className="text-gray-800 dark:text-white">
                      <strong className="text-gray-600 dark:text-gray-300">Status:</strong> {selected.academic?.status || "Não informado"}
                    </p>
                  </div>
                </div>
              </section>

              {/* Experiências e habilidades técnicas */}
              <section className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <BriefcaseIcon />
                  Experiências e Habilidades Técnicas
                </h4>

                {selected.experience && selected.experience.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    {selected.experience.map((exp, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold text-gray-800 dark:text-white">{exp.company}</p>
                        <p className="text-teal-500 dark:text-teal-400">{exp.role}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{exp.period}</p>
                        <p className="text-gray-800 dark:text-white mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 italic">Nenhuma experiência cadastrada.</p>
                )}

                <div>
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                    <SkillsIcon />
                    Skills Técnicas:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {(selected.technicalSkills || selected.skills || []).map((skill, index) => (
                      <span 
                        key={index}
                        className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Soft skills e hobbies */}
              <section className="mb-8">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <UserIcon />
                  Soft Skills e Hobbies
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Soft Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {(selected.softSkills || []).map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Hobbies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {(selected.hobbies || []).map((hobby, index) => (
                        <span 
                          key={index}
                          className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Botões de ação */}
              <section className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  type="button" 
                  onClick={handleRecommend}
                  className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex-1 text-center flex items-center justify-center"
                >
                  <ThumbsUpIcon />
                  Recomendar Profissional
                </button>
                <button 
                  type="button" 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg flex-1 text-center flex items-center justify-center"
                >
                  <MessageIcon />
                  Enviar Mensagem
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareersCards;