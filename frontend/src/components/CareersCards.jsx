import React, { useState, useEffect } from "react";
import professionals from "../../../backend/data/professionals.json";

const CareersCards = ({ filters }) => {
  const [displayed, setDisplayed] = useState([]);
  const [selected, setSelected] = useState(null); // profissional selecionado (para o modal)

  const randomizeProfiles = () => {
    let filtered = [...professionals];

    // filtro por área (só funciona se tiver area no JSON)
    if (filters.area) {filtered = filtered.filter((p) => p.area === filters.area);}
    // filtro por cidade (só funciona se tiver city no JSON)
    if (filters.city) {filtered = filtered.filter((p) => p.city === filters.city);}
    // filtro por tecnologia → AGORA usando skills
    if (filters.tech) {filtered = filtered.filter((p) => p.skills?.includes(filters.tech));}

    // busca por nome
    if (filters.q) {
      const search = filters.q.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search)
      );
    }

    // embaralha e pega 3
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedThree = shuffled.slice(0, 3);

    setDisplayed(selectedThree);
  };

  useEffect(() => {
    randomizeProfiles();
  }, [filters]);
  
  // Enviar Mensagem - Abrir e Fechar perfil 
  const handleOpenProfile = (professional) => {setSelected(professional);};
  const handleCloseProfile = () => {setSelected(null);};
  const handleRecommend = () => {if (!selected) return;alert(`Você recomendou ${selected.name}.`); };
  const handleSendMessage = () => {if (!selected) return;alert(`Mensagem enviada para ${selected.name} (simulação).`);};

  return (
    <section>
      <h2>Profissionais em Destaque</h2>
      <button type="button" onClick={randomizeProfiles}>Aleatorizar</button>

      {displayed.length === 0 && (
        <p>Nenhum profissional encontrado com esses filtros.</p>
      )}

      {/* LISTA DE CARDS */}
      {displayed.map((p) => (
        <article
          key={p.id}
          onClick={() => handleOpenProfile(p)}
          style={{ cursor: "pointer" }}
        >
          <p><strong>ID:</strong> {p.id}</p>
          <p><strong>Nome:</strong> {p.name}</p>
          <p><strong>Cargo:</strong> {p.role}</p>
          <p>
            <strong>Skills:</strong>{" "}
            {p.skills?.length ? p.skills.join(", ") : "Não informado"}
          </p>
          <hr />
        </article>
      ))}

      {/* MODAL DE PERFIL */}
      {selected && (
        <div>
          {/* Fundo do modal */}
          <div onClick={handleCloseProfile}></div>

          {/* Conteúdo do modal */}
          <div>
            <button type="button" onClick={handleCloseProfile}>Fechar</button>
            {/* Foto */}
            {selected.photo && (
              <div>
                <img
                  src={selected.photo}
                  alt={selected.name}
                  width={120}
                  height={120}
                />
              </div>
            )}

            <h3>{selected.name}</h3>
            <p><strong>Cargo:</strong> {selected.role}</p>
            <p><strong>Cidade:</strong> {selected.city}</p>
            <p><strong>Área:</strong> {selected.area}</p>

            {/* Dados pessoais e acadêmicos */}
            <section>
              <h4>Dados Pessoais e Acadêmicos</h4>
              <p><strong>Bio:</strong> {selected.personal?.bio || "Não informado"}</p>
              <p><strong>Formação:</strong> {selected.academic?.degree || "Não informado"}</p>
              <p><strong>Instituição:</strong> {selected.academic?.institution || "Não informado"}</p>
              <p><strong>Status:</strong> {selected.academic?.status || "Não informado"}</p>
            </section>

            {/* Experiências e habilidades técnicas */}
            <section>
              <h4>Experiências e Habilidades Técnicas</h4>

              {selected.experience && selected.experience.length > 0 ? (
                selected.experience.map((exp, idx) => (
                  <div key={idx}>
                    <p><strong>Empresa:</strong> {exp.company}</p>
                    <p><strong>Cargo:</strong> {exp.role}</p>
                    <p><strong>Período:</strong> {exp.period}</p>
                    <p><strong>Descrição:</strong> {exp.description}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p>Nenhuma experiência cadastrada.</p>
              )}

              <p>
                <strong>Skills Técnicas:</strong>{" "}
                {selected.technicalSkills?.length
                  ? selected.technicalSkills.join(", ")
                  : selected.skills?.length
                    ? selected.skills.join(", ")
                    : "Não informado"}
              </p>
            </section>

            {/* Soft skills e hobbies */}
            <section>
              <h4>Soft Skills e Hobbies</h4>
              <p>
                <strong>Soft Skills:</strong>{" "}
                {selected.softSkills?.length
                  ? selected.softSkills.join(", ")
                  : "Não informado"}
              </p>
              <p>
                <strong>Hobbies:</strong>{" "}
                {selected.hobbies?.length
                  ? selected.hobbies.join(", ")
                  : "Não informado"}
              </p>
            </section>

            {/* Botões de ação */}
            <section>
              <button type="button" onClick={handleRecommend}>Recomendar profissional</button>
              <button type="button" onClick={handleSendMessage}>Enviar mensagem</button>
            </section>
          </div>
        </div>
      )}
    </section>
  );
};

export default CareersCards;
