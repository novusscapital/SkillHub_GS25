import { useState } from "react";

function Header({ user, setUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) return;
    setUser({ email });
    setEmail("");
    setPassword("");
  };

  return (
    <header>
      <h1>SkillHub</h1>

      {/* Se NÃO estiver logado → mostra login */}
      {!user && (
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div>
            <input
              type={show ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="button" onClick={() => setShow(!show)}>
              {show ? "Esconder" : "Mostrar"}
            </button>
          </div>

          <button onClick={handleLogin}>Login</button>

          {/* Link para Register */}
          <button
            type="button"
            onClick={() => (window.location.href = "/register")}
          >
            Registrar-se
          </button>
        </div>
      )}

      {user && (
        <div>
          <button
            type="button"
            onClick={() => (window.location.href = "/profile")}
          >
            👤 Perfil
          </button>

          <button
            type="button"
            onClick={() => setUser(null)}
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
