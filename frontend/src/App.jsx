import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Careers from "./components/Careers";
import CareersCards from "./components/CareersCards";

function App() {
  // estado do usuário logado (null = deslogado)
  const [user, setUser] = useState(null);

  // estados dos filtros (controlados)
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [tech, setTech] = useState("");
  const [q, setQ] = useState("");

  // objeto passado para os cards aleatórios
  const filters = { area, city, tech, q };

  return (
    <>
      {/* Header recebe user e setUser */}
      <Header user={user} setUser={setUser} />

      <div>
        <Careers />
      </div>

      <main className="min-h-screen bg-white dark:bg-gray-900 py-8 transition-colors duration-200">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Seção de Filtros e Busca */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
              {/* FILTROS */}
              <select 
                value={area} 
                onChange={(e) => setArea(e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
              >
                <option value="">Todas as Áreas</option>
                <option>Web</option>
                <option>Data</option>
                <option>Cloud</option>
                <option>Design</option>
                <option>Mobile</option>
                <option>Quality</option>
                <option>Product</option>
              </select>

              <select 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
              >
                <option value="">Todas as Cidades</option>
                <option>São Paulo</option>
                <option>Rio de Janeiro</option>
                <option>Belo Horizonte</option>
                <option>Curitiba</option>
                <option>Porto Alegre</option>
                <option>Recife</option>
                <option>Salvador</option>
                <option>Fortaleza</option>
                <option>Campinas</option>
                <option>Florianópolis</option>
              </select>

              <select 
                value={tech} 
                onChange={(e) => setTech(e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700"
              >
                <option value="">Qualquer Tecnologia</option>
                <option>React</option>
                <option>Tailwind</option>
                <option>Node</option>
                <option>Python</option>
                <option>SQL</option>
                <option>AWS</option>
                <option>Docker</option>
                <option>Figma</option>
              </select>

              {/* Busca por Nome */}
              <label className="relative">
                <input
                  type="text"
                  placeholder="Buscar Profissional"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pl-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </label>
            </div>

            {/* Botão de Limpar Filtros */}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setArea("");
                  setCity("");
                  setTech("");
                  setQ("");
                }}
                className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Limpar Filtros
              </button>
            </div>
          </div>

          <article className="animate-fade-in">
            {/* CARDS DE CARREIRAS */}
            <CareersCards filters={filters} />
          </article>

          {/* Call to Action */}
          <div className="text-center mt-12 py-8 border-t border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Não encontrou o profissional que procura?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Nossa plataforma está em constante crescimento. Cadastre-se para ser notificado quando novos profissionais da sua área se juntarem à nossa comunidade.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
              Cadastrar Interesse
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;