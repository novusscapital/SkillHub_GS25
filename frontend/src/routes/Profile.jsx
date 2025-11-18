import { useState, useEffect } from "react";

const DEFAULT_PHOTO = "../src/assets/perfilgenerico.png";

const initialProfile = {
  name: "",
  role: "",
  city: "",
  area: "",
  personal: {
    bio: "",
    age: "",
    country: ""
  },
  academic: {
    degree: "",
    institution: "",
    status: ""
  },
  technicalSkills: [],
  softSkills: [],
  hobbies: [],
  photo: DEFAULT_PHOTO
};

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [techString, setTechString] = useState("");
  const [softString, setSoftString] = useState("");
  const [hobbiesString, setHobbiesString] = useState("");
  const [user, setUser] = useState(null);

  // pega o usuário logado do localStorage
  useEffect(() => {
    const stored = localStorage.getItem("skillhub_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // carrega o perfil do backend quando tiver user
  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      try {
        const res = await fetch(`http://localhost:5000/profiles/${user.id}`);
        if (!res.ok) return; // se não existir, fica com initialProfile

        const data = await res.json();

        setProfile({
          ...initialProfile,
          ...data
        });

        setTechString((data.technicalSkills || []).join(", "));
        setSoftString((data.softSkills || []).join(", "));
        setHobbiesString((data.hobbies || []).join(", "));
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
      }
    }

    loadProfile();
  }, [user]);

  // upload de foto
  const handlePhoto = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setProfile((prev) => ({
        ...prev,
        photo: reader.result // base64
      }));
    };

    reader.readAsDataURL(file);
  };

  // remover foto → volta para a padrão
  const handleRemovePhoto = () => {
    setProfile((prev) => ({
      ...prev,
      photo: DEFAULT_PHOTO
    }));
  };

  const handleBasicChange = (field) => (event) => {
    setProfile((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleNestedChange = (section, field) => (event) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: event.target.value
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      alert("Você precisa estar logado para salvar o perfil.");
      return;
    }

    const updatedProfile = {
      ...profile,
      technicalSkills: techString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      softSkills: softString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      hobbies: hobbiesString
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    };

    try {
      const response = await fetch(
        `http://localhost:5000/profiles/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProfile)
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao salvar perfil");
      }

      const data = await response.json();
      console.log("Salvo:", data);
      setProfile(data.profile || updatedProfile);
      alert("Perfil salvo com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar perfil.");
    }
  };

  // Ícones SVG
  const UserIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const AcademicIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  const SkillsIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const SoftSkillsIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );

  const CameraIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Meu Perfil</h1>
          <p className="text-gray-600 dark:text-gray-300">Complete seu perfil profissional para se conectar com oportunidades</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* FOTO DO PERFIL */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <CameraIcon />
              Foto do Perfil
            </h2>

            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Preview da Foto */}
              <div className="flex-shrink-0">
                {profile.photo && (
                  <img
                    src={profile.photo}
                    alt="Foto do usuário"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-lg"
                  />
                )}
              </div>

              {/* Controles de Upload */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload de Foto
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 transition-colors duration-200"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <TrashIcon />
                  Remover foto
                </button>
              </div>
            </div>
          </section>

          {/* DADOS BÁSICOS */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <UserIcon />
              Dados Básicos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={handleBasicChange("name")}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cargo
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={handleBasicChange("role")}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Seu cargo atual"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={handleBasicChange("city")}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Sua cidade"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Área de Atuação
                </label>
                <input
                  type="text"
                  value={profile.area}
                  onChange={handleBasicChange("area")}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Sua área profissional"
                />
              </div>
            </div>
          </section>

          {/* DADOS PESSOAIS E ACADÊMICOS */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <AcademicIcon />
              Dados Pessoais e Acadêmicos
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio Profissional
                </label>
                <textarea
                  value={profile.personal.bio}
                  onChange={handleNestedChange("personal", "bio")}
                  rows={4}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 resize-vertical"
                  placeholder="Conte um pouco sobre sua trajetória profissional..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Idade
                  </label>
                  <input
                    type="number"
                    value={profile.personal.age}
                    onChange={handleNestedChange("personal", "age")}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Sua idade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    value={profile.personal.country}
                    onChange={handleNestedChange("personal", "country")}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Seu país"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status Acadêmico
                  </label>
                  <input
                    type="text"
                    value={profile.academic.status}
                    onChange={handleNestedChange("academic", "status")}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Ex: Cursando, Concluído..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Formação
                  </label>
                  <input
                    type="text"
                    value={profile.academic.degree}
                    onChange={handleNestedChange("academic", "degree")}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Ex: Bacharelado em Ciência da Computação"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instituição
                  </label>
                  <input
                    type="text"
                    value={profile.academic.institution}
                    onChange={handleNestedChange("academic", "institution")}
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Nome da instituição"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS TÉCNICAS */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <SkillsIcon />
              Skills Técnicas
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Digite suas skills técnicas separadas por vírgulas
              </label>
              <input
                type="text"
                value={techString}
                onChange={(e) => setTechString(e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Ex: React, Node.js, Python, AWS, Docker..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Exemplo: JavaScript, React, Node.js, Python, SQL
              </p>
            </div>
          </section>

          {/* SOFT SKILLS E HOBBIES */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
              <SoftSkillsIcon />
              Soft Skills e Hobbies
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Soft Skills
                </label>
                <input
                  type="text"
                  value={softString}
                  onChange={(e) => setSoftString(e.target.value)}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ex: Liderança, Comunicação, Trabalho em equipe..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hobbies
                </label>
                <input
                  type="text"
                  value={hobbiesString}
                  onChange={(e) => setHobbiesString(e.target.value)}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ex: Leitura, Música, Esportes, Viagens..."
                />
              </div>
            </div>
          </section>

          {/* BOTÃO DE SUBMIT */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 text-lg"
            >
              Salvar Perfil
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Profile;
