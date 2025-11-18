import { useState } from "react";

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
            const response = await fetch(`http://localhost:5000/profiles/${USER_ID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProfile)
            });

            if (!response.ok) {
                console.error("Erro ao salvar perfil:", response.status);
                alert("Não foi possível salvar o perfil.");
                return;
            }

            console.log("Perfil salvo no backend:", updatedProfile);
            alert("Perfil salvo com sucesso!");
        } catch (error) {
            console.error("Erro de rede ao salvar perfil:", error);
            alert("Erro de conexão com o servidor.");
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
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Meu Perfil</h1>
                    <p className="text-gray-600">Complete seu perfil profissional para se conectar com oportunidades</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* FOTO DO PERFIL */}
                    <section className="card bg-white p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
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
                                        className="w-32 h-32 rounded-full object-cover border-4 border-future-teal shadow-lg"
                                    />
                                )}
                            </div>

                            {/* Controles de Upload */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload de Foto
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handlePhoto}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>

                                <button 
                                    type="button" 
                                    onClick={handleRemovePhoto}
                                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                >
                                    <TrashIcon />
                                    Remover foto
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* DADOS BÁSICOS */}
                    <section className="card bg-white p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <UserIcon />
                            Dados Básicos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={handleBasicChange("name")}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cargo
                                </label>
                                <input
                                    type="text"
                                    value={profile.role}
                                    onChange={handleBasicChange("role")}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Seu cargo atual"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    value={profile.city}
                                    onChange={handleBasicChange("city")}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Sua cidade"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Área de Atuação
                                </label>
                                <input
                                    type="text"
                                    value={profile.area}
                                    onChange={handleBasicChange("area")}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Sua área profissional"
                                />
                            </div>
                        </div>
                    </section>

                    {/* DADOS PESSOAIS E ACADÊMICOS */}
                    <section className="card bg-white p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <AcademicIcon />
                            Dados Pessoais e Acadêmicos
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio Profissional
                                </label>
                                <textarea
                                    value={profile.personal.bio}
                                    onChange={handleNestedChange("personal", "bio")}
                                    rows={4}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Conte um pouco sobre sua trajetória profissional..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Idade
                                    </label>
                                    <input
                                        type="number"
                                        value={profile.personal.age}
                                        onChange={handleNestedChange("personal", "age")}
                                        className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                        placeholder="Sua idade"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        País
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.personal.country}
                                        onChange={handleNestedChange("personal", "country")}
                                        className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                        placeholder="Seu país"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Acadêmico
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.academic.status}
                                        onChange={handleNestedChange("academic", "status")}
                                        className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                        placeholder="Ex: Cursando, Concluído..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Formação
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.academic.degree}
                                        onChange={handleNestedChange("academic", "degree")}
                                        className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                        placeholder="Ex: Bacharelado em Ciência da Computação"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Instituição
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.academic.institution}
                                        onChange={handleNestedChange("academic", "institution")}
                                        className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                        placeholder="Nome da instituição"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SKILLS TÉCNICAS */}
                    <section className="card bg-white p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <SkillsIcon />
                            Skills Técnicas
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Digite suas skills técnicas separadas por vírgulas
                            </label>
                            <input
                                type="text"
                                value={techString}
                                onChange={(e) => setTechString(e.target.value)}
                                className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                placeholder="Ex: React, Node.js, Python, AWS, Docker..."
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Exemplo: JavaScript, React, Node.js, Python, SQL
                            </p>
                        </div>
                    </section>

                    {/* SOFT SKILLS E HOBBIES */}
                    <section className="card bg-white p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <SoftSkillsIcon />
                            Soft Skills e Hobbies
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Soft Skills
                                </label>
                                <input
                                    type="text"
                                    value={softString}
                                    onChange={(e) => setSoftString(e.target.value)}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Ex: Liderança, Comunicação, Trabalho em equipe..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hobbies
                                </label>
                                <input
                                    type="text"
                                    value={hobbiesString}
                                    onChange={(e) => setHobbiesString(e.target.value)}
                                    className="input-field w-full border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-professional-blue focus:ring-2 focus:ring-professional-blue/20 transition-all duration-200 text-gray-800 bg-white"
                                    placeholder="Ex: Leitura, Música, Esportes, Viagens..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* BOTÃO DE SUBMIT */}
                    <div className="text-center">
                        <button 
                            type="submit"
                            className="btn bg-professional-blue hover:bg-blue-700 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-professional transform hover:-translate-y-0.5 text-lg"
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