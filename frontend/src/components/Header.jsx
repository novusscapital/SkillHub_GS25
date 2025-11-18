import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ user, setUser }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) return;
    if (!setUser) return;

    setUser({ email });
    setEmail("");
    setPassword("");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    if (!setUser) return;
    setUser(null);
    setMenuOpen(false);
  };

  const goToHome = () => {
    navigate("/");
    setMenuOpen(false);
  };

  const goToRegister = () => {
    navigate("/register");
    setMenuOpen(false);
  };

  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const goToWidgets = () => {
    navigate("/widgets");
    setMenuOpen(false);
  };

  // Ícones SVG
  const EyeIcon = ({ show }) => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {show ? (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </>
      )}
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            onClick={goToHome}
            className="flex items-center cursor-pointer group"
          >
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              SkillHub
            </h1>
            <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
              Beta
            </span>
          </div>

          {/* Menu Hamburguer */}
          <div className="flex items-center space-x-4">
            {/* Botão Menu Hamburguer */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-gray-200 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-2">
              <button
                type="button"
                onClick={goToHome}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
              >
                Home
              </button>
              <button
                type="button"
                onClick={goToProfile}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
              >
                Perfil
              </button>
              <button
                type="button"
                onClick={goToRegister}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
              >
                Registrar
              </button>
              <button
                type="button"
                onClick={goToWidgets}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
              >
                Widgets
              </button>
            </nav>

            {/* Área do Usuário */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Se NÃO estiver logado → mostra login */}
              {!user && (
                <div className="flex items-center space-x-4">
                  {/* Formulário de Login */}
                  <div className="hidden lg:flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-transparent border-none focus:outline-none focus:ring-0 w-32 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                    />

                    <div className="flex items-center space-x-2">
                      <input
                        type={show ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent border-none focus:outline-none focus:ring-0 w-24 text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <EyeIcon show={show} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogin}
                      disabled={!email || !password}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-3 py-1 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Entrar
                    </button>
                  </div>

                  {/* Botão Registrar */}
                  <button
                    type="button"
                    onClick={goToRegister}
                    className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Registrar-se
                  </button>
                </div>
              )}

              {/* Se estiver logado → ícone de perfil + sair */}
              {user && (
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={goToProfile}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 group"
                  >
                    <UserIcon />
                    <span className="font-medium">Perfil</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 rounded-lg font-medium transition-all duration-200"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menu Mobile Expandido */}
        {(menuOpen || !user) && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-2">
            {/* Navegação Mobile */}
            {menuOpen && (
              <nav className="mb-4 space-y-2">
                <button
                  type="button"
                  onClick={goToHome}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={goToProfile}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                >
                  Perfil
                </button>
                <button
                  type="button"
                  onClick={goToRegister}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                >
                  Registrar
                </button>
                <button
                  type="button"
                  onClick={goToWidgets}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all duration-200"
                >
                  Widgets
                </button>
              </nav>
            )}

            {/* Formulário de Login Mobile */}
            {!user && (
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                />

                <div className="flex space-x-2">
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button 
                    type="button"
                    onClick={() => setShow(!show)}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <EyeIcon show={show} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={!email || !password}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Entrar
                </button>

                <button
                  type="button"
                  onClick={goToRegister}
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-3 rounded-lg transition-all duration-200"
                >
                  Registrar
                </button>
              </div>
            )}

            {/* Usuário Logado Mobile */}
            {user && menuOpen && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={goToProfile}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                >
                  <UserIcon />
                  <span className="font-medium">Perfil</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 rounded-lg font-medium transition-all duration-200"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;