import React, { useEffect, useState } from "react";
import professionalsData from "../../../backend/data/professionals.json";

const CareersCards = ({ filters }) => {
  const [displayed, setDisplayed] = useState([]);

  // aplica filtros e sorteia 3
  const randomizeProfiles = () => {
    let filtered = professionalsData.slice(); // cópia

    if (filters?.area) {
      filtered = filtered.filter((p) => p.area === filters.area);
    }
    if (filters?.city) {
      filtered = filtered.filter((p) => p.city === filters.city);
    }
    if (filters?.tech) {
      filtered = filtered.filter((p) => Array.isArray(p.techs) && p.techs.includes(filters.tech));
    }
    if (filters?.q) {
      const q = String(filters.q).toLowerCase();
      filtered = filtered.filter((p) =>
        String(p.name).toLowerCase().includes(q) ||
        String(p.role).toLowerCase().includes(q) ||
        (Array.isArray(p.techs) && p.techs.some(t => String(t).toLowerCase().includes(q)))
      );
    }

    // embaralha e pega até 3
    const shuffled = filtered.slice().sort(() => 0.5 - Math.random());
    setDisplayed(shuffled.slice(0, 3));
  };

  // inicializa e reage a mudanças de filtro
  useEffect(() => {
    randomizeProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.area, filters?.city, filters?.tech, filters?.q]);

  return (
    <section>
      <h2>Profissionais em Destaque</h2>
      <button onClick={randomizeProfiles}>🔄 Aleatorizar</button>

      {displayed.length === 0 ? (
        <p>Nenhum profissional encontrado.</p>
      ) : (
        displayed.map((p) => (
          <article key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.role}</p>
            <p>
              <strong>Área:</strong> {p.area} | <strong>Cidade:</strong> {p.city}
            </p>
            <ul>
              {(p.techs || []).map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </article>
        ))
      )}
    </section>
  );
};

export default CareersCards;
