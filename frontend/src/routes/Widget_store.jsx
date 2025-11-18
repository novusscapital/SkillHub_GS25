import React, { useState } from "react";

const EnvironmentWidget = () => {
  const [environmentData, setEnvironmentData] = useState({
    temperatura: null,
    umidade: null,
    luminosidade: null,
    mensagem: "Os dados do ambiente ainda não foram carregados."
  });

  const handleAtualizar = () => {
    const dadosSimulados = {
      temperatura: 24,
      umidade: 55,
      luminosidade: 320,
      mensagem: "Ambiente adequado para estudo e trabalho."
    };

    setEnvironmentData(dadosSimulados);
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Ambiente de Estudo (IoT)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Temperatura</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {environmentData.temperatura ?? "--"}°C
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Umidade</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {environmentData.umidade ?? "--"}%
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Luminosidade</p>
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {environmentData.luminosidade ?? "--"}lx
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          {environmentData.mensagem}
        </p>
      </div>

      <button 
        type="button" 
        onClick={handleAtualizar}
        className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Atualizar dados
      </button>
    </section>
  );
};

const DarkModeWidget = ({ theme, onToggleTheme }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 transition-all duration-200 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        Tema (Dark / Light)
      </h3>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300">
            Tema atual: <span className="font-semibold">{theme === "dark" ? "Escuro" : "Claro"}</span>
          </p>
        </div>
        
        <button 
          type="button" 
          onClick={onToggleTheme}
          className="bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Alternar tema
        </button>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <p className="text-purple-800 dark:text-purple-300 text-sm">
          Este widget permite ao usuário alternar entre o modo claro e escuro do
          SkillHub. Depois você conecta este estado ao restante da aplicação.
        </p>
      </div>
    </section>
  );
};

const WidgetStore = () => {
  const [enabledWidgets, setEnabledWidgets] = useState({
    environment: true,
    darkMode: true
  });

  const [theme, setTheme] = useState("light");

  const handleToggleWidget = (widgetKey) => {
    setEnabledWidgets((prev) => ({
      ...prev,
      [widgetKey]: !prev[widgetKey]
    }));
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-200">
      <div className="container max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Widget Store do SkillHub
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Personalize sua experiência com widgets úteis
          </p>
        </div>

        {/* Seção de Configurações */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configurações dos Widgets
          </h2>

          <div className="space-y-4 mb-4">
            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={enabledWidgets.environment}
                onChange={() => handleToggleWidget("environment")}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-gray-800 dark:text-white font-medium">
                  Ambiente de Estudo (IoT)
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Monitora temperatura, umidade e luminosidade do ambiente
                </p>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={enabledWidgets.darkMode}
                onChange={() => handleToggleWidget("darkMode")}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <div>
                <span className="text-gray-800 dark:text-white font-medium">
                  Tema Dark/Light
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Alterna entre modo claro e escuro da aplicação
                </p>
              </div>
            </label>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              Aqui o usuário pode ativar ou desativar widgets extras que estendem o
              SkillHub. No futuro, novos widgets podem ser adicionados a esta lista.
            </p>
          </div>
        </section>

        {/* Divisor */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Seção de Widgets Ativos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Widgets Ativos
          </h2>

          {enabledWidgets.environment && <EnvironmentWidget />}

          {enabledWidgets.darkMode && (
            <DarkModeWidget theme={theme} onToggleTheme={handleToggleTheme} />
          )}

          {!enabledWidgets.environment && !enabledWidgets.darkMode && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Nenhum widget ativo
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ative alguns widgets nas configurações acima para começar a usar.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default WidgetStore;