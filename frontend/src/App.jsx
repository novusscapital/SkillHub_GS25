import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Careers from "./components/Careers";
import CareersCards from "./components/CareersCards";

function App() {
  // estados dos filtros (controlados)
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [tech, setTech] = useState("");
  const [q, setQ] = useState("");

  // objeto passado para os cards aleatórios
  const filters = { area, city, tech, q };

  return (
    <>
      <Header />

      <div>
        <Careers />
      </div>

      <main>
        <div>
          {/* PROCURAR PROFISSIONAL (NOME ) */}
          <div>
            {/* FILTROS */}
            <select value={area} onChange={(e) => setArea(e.target.value)}>
              <option value="">Todas</option>
              <option>Web</option>
              <option>Data</option>
              <option>Cloud</option>
              <option>Design</option>
              <option>Mobile</option>
              <option>Quality</option>
              <option>Product</option>
            </select>

            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Todas</option>
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

            <select value={tech} onChange={(e) => setTech(e.target.value)}>
              <option value="">Qualquer</option>
              <option>React</option>
              <option>Tailwind</option>
              <option>Node</option>
              <option>Python</option>
              <option>SQL</option>
              <option>AWS</option>
              <option>Docker</option>
              <option>Figma</option>
            </select>
          </div>

          <label>
            <input
              type="text"
              placeholder="Buscar Profissional"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        <article>
          {/* CARDS DE CARREIRAS */}
          <CareersCards filters={filters} />
        </article>
      </main>

      <div></div>

      <Footer />
    </>
  );
}

export default App;
