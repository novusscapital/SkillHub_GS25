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

    return (
        <main>
            <h1>Meu Perfil</h1>

            <form onSubmit={handleSubmit}>
                {/* FOTO */}
                <section>
                    <h2>Foto do Perfil</h2>

                    {profile.photo && (
                        <img
                            src={profile.photo}
                            alt="Foto do usuário"
                            width="120"
                            height="120"
                        />
                    )}

                    <br />

                    <input type="file" accept="image/*" onChange={handlePhoto} />

                    <button type="button" onClick={handleRemovePhoto}>
                        Remover foto
                    </button>
                </section>

                <hr />

                {/* DADOS BÁSICOS */}
                <section>
                    <h2>Dados Básicos</h2>

                    <label>
                        Nome:
                        <input
                            type="text"
                            value={profile.name}
                            onChange={handleBasicChange("name")}
                        />
                    </label>
                    <br />

                    <label>
                        Cargo:
                        <input
                            type="text"
                            value={profile.role}
                            onChange={handleBasicChange("role")}
                        />
                    </label>
                    <br />

                    <label>
                        Cidade:
                        <input
                            type="text"
                            value={profile.city}
                            onChange={handleBasicChange("city")}
                        />
                    </label>
                    <br />

                    <label>
                        Área:
                        <input
                            type="text"
                            value={profile.area}
                            onChange={handleBasicChange("area")}
                        />
                    </label>
                </section>

                <hr />

                {/* DADOS PESSOAIS E ACADÊMICOS */}
                <section>
                    <h2>Dados Pessoais e Acadêmicos</h2>

                    <label>
                        Bio:
                        <textarea
                            value={profile.personal.bio}
                            onChange={handleNestedChange("personal", "bio")}
                        />
                    </label>
                    <br />

                    <label>
                        Idade:
                        <input
                            type="number"
                            value={profile.personal.age}
                            onChange={handleNestedChange("personal", "age")}
                        />
                    </label>
                    <br />

                    <label>
                        País:
                        <input
                            type="text"
                            value={profile.personal.country}
                            onChange={handleNestedChange("personal", "country")}
                        />
                    </label>
                    <br />

                    <label>
                        Formação:
                        <input
                            type="text"
                            value={profile.academic.degree}
                            onChange={handleNestedChange("academic", "degree")}
                        />
                    </label>
                    <br />

                    <label>
                        Instituição:
                        <input
                            type="text"
                            value={profile.academic.institution}
                            onChange={handleNestedChange("academic", "institution")}
                        />
                    </label>
                    <br />

                    <label>
                        Status:
                        <input
                            type="text"
                            value={profile.academic.status}
                            onChange={handleNestedChange("academic", "status")}
                        />
                    </label>
                </section>

                <hr />

                {/* SKILLS */}
                <section>
                    <h2>Skills Técnicas</h2>
                    <p>Digite separando por vírgulas.</p>

                    <label>
                        Skills Técnicas:
                        <input
                            type="text"
                            value={techString}
                            onChange={(e) => setTechString(e.target.value)}
                        />
                    </label>
                </section>

                <hr />

                <section>
                    <h2>Soft Skills e Hobbies</h2>

                    <label>
                        Soft Skills:
                        <input
                            type="text"
                            value={softString}
                            onChange={(e) => setSoftString(e.target.value)}
                        />
                    </label>
                    <br />

                    <label>
                        Hobbies:
                        <input
                            type="text"
                            value={hobbiesString}
                            onChange={(e) => setHobbiesString(e.target.value)}
                        />
                    </label>
                </section>

                <hr />

                <button type="submit">Salvar Perfil</button>
            </form>
        </main>
    );
};

export default Profile;
