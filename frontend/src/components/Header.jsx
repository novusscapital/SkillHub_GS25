import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) return;
    setUser({ email });
    setEmail("");
    setPassword("");
  };

  const handleLogout = () => {setUser(null);};
  const goToRegister = () => {navigate("/register");};
  const goToProfile = () => {navigate("/profile");};

  return (
    <header>
      <h1>SkillHub</h1>

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

          <button type="button" onClick={handleLogin}>Login</button>
          <button type="button" onClick={goToRegister}>Registrar-se</button>
        </div>
      )}

      {user && (
        <div>
          <button type="button" onClick={goToProfile}>👤 Perfil</button>
          <button type="button" onClick={handleLogout}>Sair</button>
        </div>
      )}
    </header>
  );
}

export default Header;