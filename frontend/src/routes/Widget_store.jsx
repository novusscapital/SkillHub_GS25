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
    <section>
      <h3>Widget: Ambiente de Estudo (IoT)</h3>

      <p>Temperatura: {environmentData.temperatura ?? "--"} °C</p>
      <p>Umidade: {environmentData.umidade ?? "--"} %</p>
      <p>Luminosidade: {environmentData.luminosidade ?? "--"} lx</p>

      <p>{environmentData.mensagem}</p>

      <button type="button" onClick={handleAtualizar}>
        Atualizar dados
      </button>
    </section>
  );
};

const DarkModeWidget = ({ theme, onToggleTheme }) => {
  return (
    <section>
      <h3>Widget: Tema (Dark / Light)</h3>

      <p>Tema atual: {theme === "dark" ? "Escuro" : "Claro"}</p>

      <button type="button" onClick={onToggleTheme}>
        Alternar tema
      </button>

      <p>
        Este widget permite ao usuário alternar entre o modo claro e escuro do
        SkillHub. Depois você conecta este estado ao restante da aplicação.
      </p>
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
    <main>
      <h1>Widget Store do SkillHub</h1>

      <section>
        <h2>Meus Widgets</h2>

        <div>
          <label>
            <input
              type="checkbox"
              checked={enabledWidgets.environment}
              onChange={() => handleToggleWidget("environment")}
            />
            Ambiente de Estudo (IoT)
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={enabledWidgets.darkMode}
              onChange={() => handleToggleWidget("darkMode")}
            />
            Tema Dark/Light
          </label>
        </div>

        <p>
          Aqui o usuário pode ativar ou desativar widgets extras que estendem o
          SkillHub. No futuro, novos widgets podem ser adicionados a esta lista.
        </p>
      </section>

      <hr />

      <section>
        <h2>Widgets Ativos</h2>

        {enabledWidgets.environment && <EnvironmentWidget />}

        {enabledWidgets.darkMode && (
          <DarkModeWidget theme={theme} onToggleTheme={handleToggleTheme} />
        )}

        {!enabledWidgets.environment && !enabledWidgets.darkMode && (
          <p>Nenhum widget ativo no momento.</p>
        )}
      </section>
    </main>
  );
};

export default WidgetStore;
